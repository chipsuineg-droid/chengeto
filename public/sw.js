const CACHE_NAME = 'chengeto-cache-v2';

// We want to aggressively cache everything on the first visit
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.svg',
  './manifest.json',
  // Dynamic assets (JS/CSS) will be cached as they are requested
];

// Install Event: Cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First for static assets, Network-First for dynamic data
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and ignore non-http requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Determine if this is a static asset or a navigation request
  const isStaticAsset = event.request.url.match(/\.(js|css|svg|png|jpg|jpeg|woff|woff2)$/i);
  const isNavigation = event.request.mode === 'navigate';

  if (isStaticAsset) {
    // Cache First Strategy for static assets
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          console.log('[Service Worker] Static asset fetch failed');
        });
      })
    );
  } else {
    // Stale-While-Revalidate for everything else (HTML, JSON, etc)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const networkFetch = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch((err) => {
          console.log('[Service Worker] Background fetch failed (offline):', err);
        });

        // Return cached immediately if available, otherwise wait for network
        return cachedResponse || networkFetch.catch(() => {
          if (isNavigation) {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});
