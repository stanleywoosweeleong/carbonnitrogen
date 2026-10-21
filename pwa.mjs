// Registers the service worker, offers "install", and shows a tap-to-update bar when a new version is ready.
import {chooseLanguage} from './i18n.mjs';
const lang = chooseLanguage();
const T = {
  zh: {install: '安装到手机主屏幕', ios: 'iPhone：点 Safari 底部的分享按钮 ⬆，再选「添加到主屏幕」', update: '有新版本，点此更新', ready: '已可离线使用'},
  en: {install: 'Install on this phone', ios: 'iPhone: tap Share ⬆ in Safari, then “Add to Home Screen”', update: 'New version ready — tap to update', ready: 'Ready to use offline'},
  ms: {install: 'Pasang pada telefon ini', ios: 'iPhone: tekan Kongsi ⬆ dalam Safari, kemudian “Tambah ke Skrin Utama”', update: 'Versi baharu sedia — tekan untuk kemas kini', ready: 'Sedia digunakan tanpa internet'},
}[lang];

const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const installBtn = document.getElementById('install-app');
const installHint = document.getElementById('install-hint');

// Android / desktop Chrome & Edge: real install prompt.
let deferred = null;
addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferred = e;
  installBtn.textContent = '⤓ ' + T.install;
  installBtn.hidden = false;
});
installBtn?.addEventListener('click', async () => {
  if (!deferred) return;
  deferred.prompt();
  await deferred.userChoice;
  deferred = null;
  installBtn.hidden = true;
});
addEventListener('appinstalled', () => { installBtn.hidden = true; });

// iPhone / iPad Safari has no install prompt — show the manual steps instead.
if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent) && installHint) {
  installHint.textContent = T.ios;
  installHint.hidden = false;
}

function showUpdateBar(worker) {
  if (document.getElementById('update-bar')) return;
  const bar = document.createElement('button');
  bar.id = 'update-bar';
  bar.type = 'button';
  bar.textContent = '↻ ' + T.update;
  bar.onclick = () => { bar.disabled = true; worker.postMessage('skip-waiting'); };
  document.body.append(bar);
}

if ('serviceWorker' in navigator) {
  addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      const firstInstall = !navigator.serviceWorker.controller;
      if (reg.waiting && navigator.serviceWorker.controller) showUpdateBar(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        w?.addEventListener('statechange', () => {
          if (w.state !== 'installed') return;
          if (navigator.serviceWorker.controller) showUpdateBar(w);
          else if (firstInstall) {
            const toast = document.getElementById('toast');
            if (toast) { toast.textContent = '✓ ' + T.ready; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000); }
          }
        });
      });
      // Check for a new version each time the app is brought back to the screen.
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    } catch (err) {
      console.warn('Service worker registration failed', err);
    }
  });
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading || !document.getElementById('update-bar')) return; // only reload when the farmer asked to update
    reloading = true;
    location.reload();
  });
}
