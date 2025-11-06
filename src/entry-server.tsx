import { renderToString } from 'react-dom/server';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock para APIs do navegador que não existem no servidor
if (typeof window === 'undefined') {
  global.window = {
    scrollTo: () => {},
    location: { pathname: '', hash: '', search: '', href: '' },
    history: { replaceState: () => {}, pushState: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    innerWidth: 1920,
    innerHeight: 1080,
    pageYOffset: 0,
  } as any;
  global.document = {
    createElement: () => ({}),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    head: { appendChild: () => {}, querySelector: () => null, removeChild: () => {} },
    body: { appendChild: () => {}, removeChild: () => {}, style: {} },
    cookie: '',
    hidden: false,
  } as any;
  global.navigator = { 
    userAgent: 'SSR',
    language: 'pt-BR',
    userLanguage: 'pt-BR',
  } as any;
  global.location = { href: '', pathname: '', search: '', hash: '' } as any;
  global.history = { replaceState: () => {}, pushState: () => {} } as any;
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  } as any;
  global.sessionStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  } as any;
  global.Intl = {
    DateTimeFormat: () => ({
      resolvedOptions: () => ({ timeZone: 'America/Sao_Paulo' }),
    }),
  } as any;
}

export function render(url: string) {
  try {
    // Normalizar URL para remover query params e hash
    const normalizedUrl = url.split('?')[0].split('#')[0] || '/';
    
    // Atualizar mock do window.location com a URL atual
    if (typeof window === 'undefined') {
      global.window.location.pathname = normalizedUrl;
      global.window.location.href = `https://yanmantovani.com${normalizedUrl}`;
      global.location.pathname = normalizedUrl;
      global.location.href = `https://yanmantovani.com${normalizedUrl}`;
    }
    
    // Timeout para evitar travamentos
    const timeout = 10000; // 10 segundos
    let html = '';
    let error: Error | null = null;
    
    // Tentar renderizar com timeout
    const startTime = Date.now();
    
    try {
      html = renderToString(
        <React.StrictMode>
          <MemoryRouter initialEntries={[normalizedUrl]}>
            <App />
          </MemoryRouter>
        </React.StrictMode>
      );
      
      // Se a renderização demorou muito, pode haver problema
      if (Date.now() - startTime > timeout) {
        console.warn(`[SSR] Renderização lenta para ${normalizedUrl}: ${Date.now() - startTime}ms`);
      } else {
        console.log(`[SSR] Renderizado com sucesso: ${normalizedUrl} (${Date.now() - startTime}ms)`);
      }
    } catch (renderError: any) {
      error = renderError;
      console.error(`[SSR] Erro ao renderizar ${normalizedUrl}:`, renderError);
      console.error(`[SSR] Stack trace:`, renderError?.stack);
      console.error(`[SSR] Message:`, renderError?.message);
      
      // Retornar HTML básico com fallback
      html = `
        <div class="min-h-screen bg-black text-white flex items-center justify-center">
          <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Yan Mantovani - Desenvolvedor Frontend Freelancer</h1>
            <p class="text-gray-400">Carregando conteúdo...</p>
          </div>
        </div>
      `;
    }
    
    // Se o HTML está vazio ou muito pequeno, pode haver problema
    if (!html || html.trim().length < 100) {
      console.warn(`[SSR] HTML muito pequeno para ${normalizedUrl}: ${html.length} caracteres`);
      html = `
        <div class="min-h-screen bg-black text-white flex items-center justify-center">
          <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Yan Mantovani - Desenvolvedor Frontend Freelancer</h1>
            <p class="text-gray-400">Carregando conteúdo...</p>
          </div>
        </div>
      `;
    }
    
    return html;
  } catch (e: any) {
    console.error(`[SSR] Erro crítico ao renderizar ${url}:`, e);
    console.error(`[SSR] Stack trace:`, e?.stack);
    console.error(`[SSR] Message:`, e?.message);
    
    // Retornar HTML mínimo para não quebrar completamente
    return `
      <div class="min-h-screen bg-black text-white flex items-center justify-center">
        <div class="text-center p-8">
          <h1 class="text-2xl font-bold mb-4">Yan Mantovani</h1>
          <p class="text-gray-400">Desenvolvedor Frontend Freelancer</p>
          <p class="text-gray-500 mt-4">Carregando...</p>
        </div>
      </div>
    `;
  }
}

