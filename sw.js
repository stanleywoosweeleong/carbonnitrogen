// C:N Learning Garden service worker — offline-first.
// VERSION and FILES are rewritten by `node update-sw.mjs` (run it after editing anything in dist/).
const VERSION = '2b59681a7a3a';
const FILES = ["./","./actions.mjs","./app.js","./catalog.mjs","./cn-decision.mjs","./core.mjs","./crop-tiles.mjs","./durian-guide.mjs","./education.mjs","./flower.mjs","./guide.mjs","./i18n-crops.mjs","./i18n-en.mjs","./i18n-ms.mjs","./i18n-research.mjs","./i18n-ui.mjs","./i18n.mjs","./icons/apple-touch-icon.png","./icons/favicon-32.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./icons/icon.svg","./index.html","./manifest.webmanifest","./pwa.mjs","./sources.mjs","./style.css"];
const CACHE = 'cn-garden-' + VERSION;

self.addEventListener('install', event => {
  // All-or-nothing: if any file fails to download, the old version stays in charge.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('cn-garden-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

// The page asks the waiting worker to take over when the farmer taps "update".
self.addEventListener('message', event => { if (event.data === 'skip-waiting') self.skipWaiting(); });

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // research links etc. go straight to the network

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // ignoreSearch: app.js?v=…, durian-guide.mjs?v=… and index.html?lang=en all map to the cached file.
    if (req.mode === 'navigate') {
      return (await cache.match('./index.html')) || fetch(req);
    }
    const hit = await cache.match(req, {ignoreSearch: true});
    if (hit) return hit;
    try {
      return await fetch(req);
    } catch {
      return new Response('Offline and not cached', {status: 503, headers: {'Content-Type': 'text/plain'}});
    }
  })());
});
