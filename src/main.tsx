import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Global error handler para capturar erros JavaScript
window.addEventListener('error', (event) => {
  console.error('🚨 Global JavaScript Error:', event.error);
  console.error('🚨 Error Message:', event.message);
  console.error('🚨 Error Source:', event.filename, 'Line:', event.lineno, 'Column:', event.colno);
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

// Initialize Performance Monitoring
import { measureWebVitals, monitorSlowResources, logPerformanceSummary } from './lib/performance';
measureWebVitals();
monitorSlowResources();
logPerformanceSummary();

// Initialize Google Analytics 4
import { initGA4 } from './lib/analytics-ga4';
initGA4();

// Initialize Sentry (Error Tracking)
// Descomente quando configurar seu DSN do Sentry
// import { initSentry } from './lib/sentry';
// initSentry();

// Register Service Worker (PWA)
import { registerServiceWorker, checkOnlineStatus } from './lib/pwa';
registerServiceWorker();
checkOnlineStatus();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 