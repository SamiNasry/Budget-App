import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'budget-app-cache-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        '/', // Cache the root page
        '/index.html', // Cache the main HTML file
        '/static/js/bundle.js', // Cache the JS bundle
        '/static/css/main.css', // Cache the CSS
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        return response || caches.match(OFFLINE_URL);
      });
    })
  );
});

// Cache API responses
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new StaleWhileRevalidate()
);

// Offline fallback
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async () => {
    try {
      return await caches.match('/offline.html') || 
        Response.redirect('/offline.html');
    } catch (error) {
      return Response.redirect('/offline.html');
    }
  }
);