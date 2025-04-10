const CACHE_NAME = 'marine-life-v3';\
const ASSETS = [\
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/assets/images/dolphin.png',
    '/assets/images/coral_reef.png',
    '/assets/audio/dolphin_sound.mp3',
    '/assets/audio/ocean_waves.mp3',
    '/assets/data/marineLife.json'
];
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});