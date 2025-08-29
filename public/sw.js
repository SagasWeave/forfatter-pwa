const CACHE_NAME = 'forfatter-pwa-v3';
const STATIC_CACHE = 'static-assets-v3';
const IMAGE_CACHE = 'image-cache-v3';
const API_CACHE = 'api-cache-v3';

const ALL_CACHES = [
  CACHE_NAME,
  STATIC_CACHE,
  IMAGE_CACHE,
  API_CACHE
];

// Filer der skal pre-caches
const PRECACHE_ASSETS = [
  '/offline.html', // En fallback-side for offline-adgang
  '/icon-192.svg',
  '/icon-512.svg',
  '/icon-512-maskable.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching offline page');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!ALL_CACHES.includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // API-kald (Network First)
  if (request.url.includes('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache => {
        return fetch(request)
          .then(response => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cache.match(request).then(res => res || fetch(request))); // Fallback til cache, så til netværk igen
      })
    );
    return;
  }

  // Navigation (Network First, fallback til offline-side)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Billeder (Cache First, med Stale-While-Revalidate logik)
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(response => {
          const fetchPromise = fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // Statiske filer (Cache First)
  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(request)
        .then(response => {
          return response || fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192.svg',
        badge: '/icon-192.svg',
        tag: 'forfatter-notification',
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('/'));
});

async function handleBackgroundSync() {
  try {
    console.log('Background sync triggered');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}