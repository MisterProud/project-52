{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = 'marine-life-v1';\
const ASSETS = [\
    '/',\
    '/index.html',\
    '/styles.css',\
    '/app.js',\
    '/assets/images/dolphin.png',\
    '/assets/images/coral_reef.png',\
    '/assets/audio/dolphin_sound.mp3',\
    '/assets/audio/ocean_waves.mp3',\
    '/assets/data/marineLife.json'\
];\
\
self.addEventListener('install', (event) => \{\
    event.waitUntil(\
        caches.open(CACHE_NAME).then((cache) => \{\
            return cache.addAll(ASSETS);\
        \})\
    );\
\});\
\
self.addEventListener('fetch', (event) => \{\
    event.respondWith(\
        caches.match(event.request).then((response) => \{\
            return response || fetch(event.request);\
        \})\
    );\
\});}