// PWA Installation and Management

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      console.log('✅ Service Worker registrado:', registration);

      // Verificar atualizações
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nova versão disponível
            console.log('🔄 Nova versão disponível');
            
            // Notificar usuário
            if (confirm('Nova versão disponível! Deseja atualizar?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        });
      });

      return registration;
    } catch (error) {
      console.error('❌ Erro ao registrar Service Worker:', error);
    }
  } else {
    console.warn('⚠️ Service Workers não são suportados neste navegador');
  }
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.log('Service Worker removido');
  }
};

// Verificar se o app pode ser instalado
export const checkInstallability = () => {
  let deferredPrompt: any = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('💾 App pode ser instalado');

    // Mostrar botão de instalação customizado
    showInstallButton(deferredPrompt);
  });

  window.addEventListener('appinstalled', () => {
    console.log('✅ App instalado com sucesso');
    deferredPrompt = null;
  });

  return deferredPrompt;
};

const showInstallButton = (deferredPrompt: any) => {
  // Criar botão de instalação
  const installButton = document.getElementById('install-button');
  
  if (installButton) {
    installButton.style.display = 'block';
    
    installButton.addEventListener('click', async () => {
      if (!deferredPrompt) return;

      // Mostrar prompt de instalação
      deferredPrompt.prompt();

      // Aguardar escolha do usuário
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} a instalação`);
      
      // Limpar prompt
      deferredPrompt = null;
      installButton.style.display = 'none';
    });
  }
};

// Verificar se está rodando como PWA
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Verificar status online/offline
export const checkOnlineStatus = () => {
  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      console.log('🟢 Online');
      document.body.classList.remove('offline');
      document.body.classList.add('online');
    } else {
      console.log('🔴 Offline');
      document.body.classList.remove('online');
      document.body.classList.add('offline');
      
      // Mostrar notificação de offline
      showOfflineNotification();
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  updateOnlineStatus();
};

const showOfflineNotification = () => {
  // Criar notificação customizada
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
      </svg>
      <span>Você está offline. Algumas funcionalidades podem não estar disponíveis.</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remover notificação quando voltar online
  const removeNotification = () => {
    if (navigator.onLine) {
      notification.remove();
      window.removeEventListener('online', removeNotification);
    }
  };
  
  window.addEventListener('online', removeNotification);
};

// Request Notification Permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('⚠️ Notificações não são suportadas neste navegador');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Show Notification
export const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        vibrate: [200, 100, 200],
        ...options
      });
    });
  }
};

