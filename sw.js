const CACHE = 'safeher-v2';
const FILES = ['./', './index.html', './manifest.json', './reflection.m4a'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
