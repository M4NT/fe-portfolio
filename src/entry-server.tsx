import { renderToString } from 'react-dom/server';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

export function render(url: string) {
  // Normalizar URL para remover query params e hash
  const normalizedUrl = url.split('?')[0].split('#')[0] || '/';
  
  const html = renderToString(
    <React.StrictMode>
      <MemoryRouter initialEntries={[normalizedUrl]}>
        <App />
      </MemoryRouter>
    </React.StrictMode>
  );
  return html;
}

