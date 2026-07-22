const CACHE_NAME = 'betkawa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/logo.png',
  './assets/aircraft.png',
  './assets/countdown.png',
  './assets/bg-optical.png',
  './assets/pfp1.png',
  './assets/pfp2.png',
  './assets/pfp3.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
