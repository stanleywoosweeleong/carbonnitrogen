// Registers the service worker, saves the app for offline use, and offers "install".
import {chooseLanguage} from './i18n.mjs';
const T = {
  zh: {install: '安装到手机主屏幕', ios: 'iPhone：点 Safari 底部的分享按钮 ⬆，再选「添加到主屏幕」', ready: '✓ 已可离线使用'},
  en: {install: 'Install on this phone', ios: 'iPhone: tap Share ⬆ in Safari, then “Add to Home Screen”', ready: '✓ Ready to use offline'},
  ms: {install: 'Pasang pada telefon ini', ios: 'iPhone: tekan Kongsi ⬆ dalam Safari, kemudian “Tambah ke Skrin Utama”', ready: '✓ Sedia digunakan tanpa internet'},
}[chooseLanguage()];

const installBtn = document.getElementById('install-app');
const installHint = document.getElementById('install-hint');
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

// Android / desktop Chrome & Edge: real install prompt.
let deferred = null;
addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferred = e;
  installBtn.textContent = '⤓ ' + T.install;
  installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
  if (!deferred) return;
  deferred.prompt();
  await deferred.userChoice;
  deferred = null;
  installBtn.hidden = true;
});
addEventListener('appinstalled', () => { installBtn.hidden = true; });

// iPhone / iPad Safari has no install prompt — show the manual steps.
if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent)) {
  installHint.textContent = T.ios;
  installHint.hidden = false;
}

if ('serviceWorker' in navigator) {
  addEventListener('load', async () => {
    try {
      const firstVisit = !navigator.serviceWorker.controller;
      await navigator.serviceWorker.register('./sw.js');
      const reg = await navigator.serviceWorker.ready;
      if (!firstVisit) return; // later visits are saved automatically as files load
      const loaded = performance.getEntriesByType('resource').map(r => r.name).filter(u => u.startsWith(location.origin));
      const extra = ['manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];
      const urls = [...new Set([location.href, ...loaded, ...extra.map(f => new URL(f, location.href).href)])];
      const channel = new MessageChannel();
      const reply = new Promise(resolve => { channel.port1.onmessage = e => resolve(e.data); });
      reg.active.postMessage({type: 'save', urls}, [channel.port2]);
      const {saved, total} = await reply;
      if (saved !== total) return; // not everything saved: say nothing rather than promise offline use
      const toast = document.getElementById('toast');
      toast.textContent = T.ready;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    } catch (err) {
      console.warn('Service worker registration failed', err);
    }
  });
}
