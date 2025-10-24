import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Initialize Performance Monitoring
import { measureWebVitals, monitorSlowResources, logPerformanceSummary } from './lib/performance';
measureWebVitals();
monitorSlowResources();
logPerformanceSummary();

// Initialize Google Analytics 4 - DESABILITADO
// import { initGA4 } from './lib/analytics-ga4';
// initGA4();

// Initialize Sentry (Error Tracking)
// Descomente quando configurar seu DSN do Sentry
// import { initSentry } from './lib/sentry';
// initSentry();

// Register Service Worker (PWA) - DESABILITADO
// import { registerServiceWorker, checkOnlineStatus } from './lib/pwa';
// registerServiceWorker();
// checkOnlineStatus();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 