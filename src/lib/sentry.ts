// Sentry Error Tracking Setup
// Para usar, você precisa:
// 1. npm install @sentry/react
// 2. Criar conta em sentry.io
// 3. Substituir o DSN abaixo

export const SENTRY_DSN = 'https://YOUR_SENTRY_DSN@sentry.io/YOUR_PROJECT_ID';

// Inicializar Sentry
export const initSentry = async () => {
  if (typeof window === 'undefined') return;

  try {
    const Sentry = await import('@sentry/react');
    const { BrowserTracing } = await import('@sentry/tracing');

    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [
        new BrowserTracing(),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],

      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of transactions (ajuste em produção)

      // Session Replay
      replaysSessionSampleRate: 0.1, // 10% das sessões
      replaysOnErrorSampleRate: 1.0, // 100% quando houver erro

      // Environment
      environment: import.meta.env.MODE,

      // Release tracking
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',

      // Ignore specific errors
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
        'ChunkLoadError',
      ],

      // Before sending
      beforeSend(event, hint) {
        // Filtrar informações sensíveis
        if (event.request) {
          delete event.request.cookies;
        }

        // Log no console durante desenvolvimento
        if (import.meta.env.DEV) {
          console.error('Sentry Error:', event, hint);
        }

        return event;
      },
    });

    console.log('✅ Sentry inicializado');
  } catch (error) {
    console.error('❌ Erro ao inicializar Sentry:', error);
  }
};

// Capturar erro manualmente
export const captureError = (error: Error, context?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  import('@sentry/react').then(({ captureException, setContext }) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        setContext(key, value);
      });
    }
    captureException(error);
  });
};

// Capturar mensagem
export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (typeof window === 'undefined') return;

  import('@sentry/react').then(({ captureMessage: sentryCaptureMessage }) => {
    sentryCaptureMessage(message, level);
  });
};

// Adicionar breadcrumb
export const addBreadcrumb = (message: string, category: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (typeof window === 'undefined') return;

  import('@sentry/react').then(({ addBreadcrumb: sentryAddBreadcrumb }) => {
    sentryAddBreadcrumb({
      message,
      category,
      level,
      timestamp: Date.now(),
    });
  });
};

// Set user context
export const setUserContext = (userId: string, email?: string, username?: string) => {
  if (typeof window === 'undefined') return;

  import('@sentry/react').then(({ setUser }) => {
    setUser({
      id: userId,
      email,
      username,
    });
  });
};

// Clear user context
export const clearUserContext = () => {
  if (typeof window === 'undefined') return;

  import('@sentry/react').then(({ setUser }) => {
    setUser(null);
  });
};

// Performance monitoring
export const startTransaction = (name: string, op: string) => {
  if (typeof window === 'undefined') return null;

  return import('@sentry/react').then(({ startTransaction: sentryStartTransaction }) => {
    return sentryStartTransaction({
      name,
      op,
    });
  });
};

