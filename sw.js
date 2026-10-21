// C:N Learning Garden service worker — no build step, no version number to bump.
// Online: always fetch the latest file (so a new upload reaches phones on their next open)
//         and keep a copy. Slow signal: use the saved copy after 3 seconds.
// Offline: use the saved copy.
const CACHE = 'cn-garden';
const WAIT_MS = 3000;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// The page sends the list of files it has already loaded, so the very first visit
// is saved for offline use without keeping a file list here.
self.addEventListener('message', event => {
  if (event.data?.type !== 'save') return;
  event.waitUntil(caches.open(CACHE).then(async cache => {
    const results = await Promise.all(event.data.urls.map(url =>
      fetch(url).then(res => res.ok && cache.put(keyOf(url), res).then(() => true)).catch(() => false)));
    event.ports[0]?.postMessage({saved: results.filter(Boolean).length, total: results.length});
  }));
});

// One saved copy per file: drop "?lang=en" etc., and store pages under index.html.
function keyOf(url) {
  const u = new URL(url, self.location.href);
  return u.origin + (u.pathname.endsWith('/') ? u.pathname + 'index.html' : u.pathname);
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // research links go straight to the web
  const key = keyOf(req.url);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const network = fetch(req).then(res => {
      if (res.ok) cache.put(key, res.clone());
      return res;
    });
    const timeout = new Promise(resolve => setTimeout(resolve, WAIT_MS));
    try {
      const fresh = await Promise.race([network, timeout]);
      if (fresh) return fresh;
    } catch {}
    const saved = await cache.match(key);
    if (saved) return saved;
    try { return await network; } catch { return new Response('Offline', {status: 503}); }
  })());
});
