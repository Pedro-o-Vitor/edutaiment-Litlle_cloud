const CACHE_NAME = 'cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/arrastaresoltar.html',
  '/telainicial.html',
  '/publicaeprivada.html',
  '/protegernuvens.html',
  '/painelparental.html',
  '/login.html',
  '/Jogos.html',
  '/home.html',
  '/conectarfios.html',
  '/cadastro.html',
  '/style.css',
    '/tailwind.css',
  '/cadastro.html',
  '/arrastaresoltar.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});