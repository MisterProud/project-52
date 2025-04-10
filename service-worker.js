const CACHE_NAME = 'marine-life-v4';
const ASSETS = [
  '/project-52/index.html',
  '/project-52/',
  '/project-52/styles.css',
  '/project-52/app.js',
  '/project-52/manifest.json',
  '/project-52/assets/images/dolphin.png',
  '/project-52/assets/images/coral_reef.png',
  '/project-52/assets/audio/dolphin_sound.mp3',
  '/project-52/assets/audio/ocean_waves.mp3',
  '/project-52/assets/data/marineLife.json'
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