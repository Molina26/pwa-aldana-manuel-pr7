self.addEventListener('install', (event) => {
    console.log('SW: Instalado');

    try {
        const respCacheAppShell = caches.open('cache-app-shell').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/js/app.js',
                '/images/icons/android-launchericon-48-48.png',
                '/images/icons/android-launchericon-72-72.png',
                '/images/icons/android-launchericon-96-96.png',
                '/images/icons/android-launchericon-144-144.png',
                '/images/icons/android-launchericon-192-192.png',
                '/images/icons/android-launchericon-512-512.png',
                '/manifest.json'
            ]);
        });

        const service = caches.open('cache-dynamic').then((cache) => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.ttf',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2'
            ]);
        });

        event.waitUntil(Promise.all([respCacheAppShell, service]));

    } catch (err) {
        console.log(`error to install cache ${err}`)
    }
})

self.addEventListener('fetch', (event) => {
    const respCache = caches.match(event.request);

    const response = respCache.then((resp) => {

        if (resp) {
            return resp
        }

        // return fetch(event.request)
    })

    event.respondWith(response);
})