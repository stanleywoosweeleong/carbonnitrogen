// Farmer-friendly controls:
//  - every <select> becomes a row of rectangular buttons (the hidden select keeps the value,
//    so the rest of the app reads and saves it exactly as before)
//  - language button shows the CURRENT language (中文 / EN / BM) and opens three choices
//  - Aa button cycles three text sizes, remembered on this phone
//  - first launch asks for the language once, then remembers it
import {chooseLanguage} from './i18n.mjs';
const lang = chooseLanguage();
const $ = id => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

/* ---------- dropdowns -> button groups ---------- */
function syncGroup(group) {
  const select = group.previousElementSibling;
  for (const b of group.children) b.setAttribute('aria-pressed', String(b.dataset.value === select.value));
}
function toButtons(select) {
  if (select.hidden || select.dataset.buttons) return; // crop pickers already show tiles
  select.dataset.buttons = '1';
  const group = document.createElement('div');
  group.className = 'choice-group';
  group.setAttribute('role', 'group');
  const label = select.closest('label');
  if (label) group.setAttribute('aria-label', [...label.childNodes].find(n => n.nodeType === 3)?.textContent.trim() || '');
  for (const option of select.options) {
    if ('prompt' in option.dataset) continue; // "choose one…" rows are not real answers
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.value = option.value;
    b.textContent = option.textContent;
    group.append(b);
  }
  group.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    e.preventDefault();
    select.value = b.dataset.value;
    select.dispatchEvent(new Event('input', {bubbles: true}));
    select.dispatchEvent(new Event('change', {bubbles: true}));
    if (group.isConnected) syncGroup(group);
  });
  select.hidden = true;
  select.after(group);
  syncGroup(group);
}
const enhanceAll = () => document.querySelectorAll('select:not([data-buttons])').forEach(toButtons);
enhanceAll();
new MutationObserver(enhanceAll).observe(document.body, {childList: true, subtree: true});
document.addEventListener('change', () => document.querySelectorAll('.choice-group').forEach(syncGroup));

/* ---------- language button + menu ---------- */
const words = {
  zh: {lang: '语言', size: '字体大小'},
  en: {lang: 'Language', size: 'Text size'},
  ms: {lang: 'Bahasa', size: 'Saiz teks'},
}[lang];
const switchBtn = $('language-switch'), menu = $('language-menu');
switchBtn.setAttribute('aria-label', words.lang);
switchBtn.onclick = () => {
  menu.hidden = !menu.hidden;
  switchBtn.setAttribute('aria-expanded', String(!menu.hidden));
};
document.addEventListener('click', e => {
  if (!menu.hidden && !e.target.closest('#language-menu,#language-switch')) {
    menu.hidden = true;
    switchBtn.setAttribute('aria-expanded', 'false');
  }
});
for (const b of menu.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === lang));

/* ---------- Aa text size ---------- */
const sizeBtn = $('text-size');
sizeBtn.setAttribute('aria-label', words.size);
sizeBtn.onclick = () => {
  const next = String(((Number(document.documentElement.dataset.size) || 0) + 1) % 3);
  document.documentElement.dataset.size = next;
  store.set('cn-text-size', next);
};

/* ---------- first launch: pick language once ---------- */
const urlLang = new URLSearchParams(location.search).get('lang');
if (!store.get('cn-language-v1')) {
  if (urlLang) store.set('cn-language-v1', lang); // arrived with ?lang=… — keep it
  else {
    const screen = document.createElement('div');
    screen.className = 'first-run notranslate';
    screen.innerHTML = `<img src="icons/icon-192.png" alt="" width="96" height="96">
      <h1>碳氮学习园</h1><p>C:N Learning Garden<br>Taman Pembelajaran C:N</p>
      <div class="first-run-langs"><button type="button" data-first="zh">中文</button><button type="button" data-first="en">English</button><button type="button" data-first="ms">Malay</button></div>`;
    screen.addEventListener('click', e => {
      const b = e.target.closest('[data-first]');
      if (!b) return;
      store.set('cn-language-v1', b.dataset.first);
      if (b.dataset.first === lang) { screen.remove(); return; }
      const url = new URL(location.href);
      url.searchParams.set('lang', b.dataset.first);
      location.replace(url.href);
    });
    document.body.append(screen);
  }
}
