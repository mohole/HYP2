const cacheName = 'Cache';
const staticAssets = [
    './',
    './src/Login.jsx',
    './src/Login.scss',
    './src/variables.scss',
    './src/components/Header.jsx',
    './src/components/Header.scss',
    './src/components/Tabbar.jsx',
    './src/components/Tabbar.scss',
    './src/pages/Eventi.jsx',
    './src/pages/Eventis.scss',
    './src/pages/Home.jsx',
    './src/pages/Home.scss',
    './src/pages/Materials.jsx',
    './src/pages/Rewards.jsx',
    './src/pages/Rewards.scss',
    './src/pages/Rooms.jsx',
    './src/pages/Rooms.scss',
    './src/pages/Materials.jsx',
    './manifest.json'
];

//installazione degli assets statici

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

//intecetto richieste fetch dall'applicazione

self.addEventListener('fetch', async e =>{
    const req = e.request;
    const url = new URL(req.url);

if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
} else {
    e.respondWith(networkAndCache(req));
}
});

//controllo se c'è una cache presente

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

//se non riesco a fetchare 'pesco' ciò che è gia presente

async function networkAndCache(req){
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}