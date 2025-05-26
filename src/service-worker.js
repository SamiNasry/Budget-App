import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

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