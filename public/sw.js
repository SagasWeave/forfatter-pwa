const CACHE_NAME = 'forfatter-pwa-v1'
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        console.log('Service worker installed')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      })
      .then(() => {
        console.log('Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - network first for API, cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // API requests - network first with fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response for caching
          const responseClone = response.clone()
          
          // Cache successful responses
          if (response.ok) {
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone))
          }
          
          return response
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              
              // Return offline response for API calls
              return new Response(
                JSON.stringify({ error: 'Offline', message: 'No network connection' }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: { 'Content-Type': 'application/json' }
                }
              )
            })
        })
    )
    return
  }

  // Static assets - cache first
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response.ok) {
              return response
            }
            
            // Clone response for caching
            const responseClone = response.clone()
            
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone))
            
            return response
          })
      })
  )
})

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle queued offline actions
      handleBackgroundSync()
    )
  }
})

// Handle push notifications (placeholder)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192.svg',
        badge: '/icon-192.svg',
        tag: 'forfatter-notification'
      })
    )
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    self.clients.openWindow('/')
  )
})

// Placeholder for background sync handler
async function handleBackgroundSync() {
  try {
    // Get queued actions from IndexedDB
    // Process offline actions when back online
    console.log('Background sync triggered')
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}