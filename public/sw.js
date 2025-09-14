self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('ts-cache').then((cache) =>
      cache.match(event.request).then((res) =>
        res || fetch(event.request).then((r) => {
          cache.put(event.request, r.clone());
          return r;
        })
      )
    )
  );
});
