const CACHE = 'safeher-v27';
const FILES = ['./', './index.html', './manifest.json', './reflection.m4a', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  // The page itself comes from the network first, so a safety fix reaches her on the next open; the cache is the offline fallback.
  if (e.request.mode === 'navigate') return e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return r; }).catch(() => caches.match('./index.html')));
  if (e.request.headers.has('range')) return; // Safari asks for audio in byte ranges; a full cached reply can leave the ringtone silent
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
