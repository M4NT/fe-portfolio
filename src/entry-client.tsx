import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

// Verificar se o HTML já foi renderizado no servidor
const rootElement = document.getElementById('root')!;
const hasHydrationContent = rootElement.hasChildNodes();

if (hasHydrationContent) {
  // Hydrate se o conteúdo já existe (SSR)
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Renderizar do zero se não houver conteúdo (fallback para CSR)
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

