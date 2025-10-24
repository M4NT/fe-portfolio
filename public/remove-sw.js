// Script para remover Service Workers existentes
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister().then(function(boolean) {
        console.log('Service Worker removido:', boolean);
      });
    }
  });
}
