// src/serviceWorkerRegistration.ts
export function register(config?: { onSuccess?: (registration: ServiceWorkerRegistration) => void; onUpdate?: (registration: ServiceWorkerRegistration) => void }) {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        
        navigator.serviceWorker.register(swUrl).then(registration => {
          console.log('ServiceWorker registration successful');
          if (config?.onSuccess) {
            config.onSuccess(registration);
          }
        }).catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }