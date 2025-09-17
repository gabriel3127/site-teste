const CACHE_NAME = 'psr-embalagens-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/contato.html',
    '/style.css',
    '/main.js',
    '/images/PSR LOGO.svg',
    '/images/hero.JPG',
    '/images/favicon.ico'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar requisições
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Retorna do cache se disponível
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});