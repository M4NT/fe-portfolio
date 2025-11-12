// Handler para Vercel Serverless Functions
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cache para o módulo SSR em produção
let render;
let template;

// Função de inicialização lazy
async function initialize() {
  if (!render || !template) {
    const { render: renderProd } = await import('../dist/server/entry-server.js');
    render = renderProd.render;
    template = fs.readFileSync(
      path.resolve(__dirname, '../dist/client/index.html'),
      'utf-8'
    );
  }
  return { render, template };
}

export default async function handler(req, res) {
  try {
    // Inicializar se necessário
    const { render: renderFn, template: htmlTemplate } = await initialize();
    
    // Normalizar URL - garantir que não há redirecionamentos
    let url = req.url || '/';
    
    // Remover query params e hash para normalizar
    url = url.split('?')[0].split('#')[0];
    
    // Garantir que a URL começa com /
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    
    // Log para debug
    console.log(`[SSR] Renderizando: ${url} (original: ${req.url})`);

    // Renderizar o app no servidor com timeout
    let appHtml;
    try {
      appHtml = renderFn(url);
      
      // Verificar se o HTML foi gerado
      if (!appHtml || appHtml.trim().length === 0) {
        console.warn(`[SSR] HTML vazio para ${url}`);
        appHtml = '<div class="min-h-screen bg-black text-white flex items-center justify-center"><div class="text-center"><h1 class="text-2xl font-bold">Carregando...</h1></div></div>';
      }
    } catch (renderError) {
      console.error(`[SSR] Erro ao renderizar ${url}:`, renderError);
      console.error(`[SSR] Stack:`, renderError?.stack);
      // HTML de fallback
      appHtml = `
        <div class="min-h-screen bg-black text-white flex items-center justify-center">
          <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Yan Mantovani</h1>
            <p class="text-gray-400">Desenvolvedor Frontend Freelancer</p>
            <p class="text-gray-500 mt-4">Carregando conteúdo...</p>
          </div>
        </div>
      `;
    }

    // Injetar HTML renderizado
    const html = htmlTemplate.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    // Headers importantes para SEO - SEM redirecionamentos
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Garantir que não há redirecionamentos
    res.setHeader('X-Robots-Tag', 'index, follow');
    
    // IMPORTANTE: Retornar sempre 200 OK - NUNCA fazer redirecionamentos
    res.status(200).send(html);
  } catch (e) {
    console.error('[SSR] Erro crítico:', e);
    console.error('[SSR] Stack:', e.stack);
    
    // Tentar retornar HTML básico mesmo com erro - SEMPRE 200 OK
    try {
      const { template: htmlTemplate } = await initialize();
      const fallbackHtml = `
        <div class="min-h-screen bg-black text-white flex items-center justify-center">
          <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Yan Mantovani</h1>
            <p class="text-gray-400">Desenvolvedor Frontend Freelancer</p>
            <p class="text-gray-500 mt-4">Por favor, recarregue a página.</p>
          </div>
        </div>
      `;
      const html = htmlTemplate.replace(
        `<div id="root"></div>`,
        `<div id="root">${fallbackHtml}</div>`
      );
      // IMPORTANTE: Retornar 200 OK mesmo com erro - NUNCA 500
      res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    } catch (fallbackError) {
      console.error('[SSR] Erro no fallback:', fallbackError);
      // Último recurso: retornar HTML mínimo com 200 OK
      res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Yan Mantovani - Desenvolvedor Frontend Freelancer</title>
        </head>
        <body>
          <div style="min-height: 100vh; background: black; color: white; display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center; padding: 2rem;">
              <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">Yan Mantovani</h1>
              <p style="color: #9ca3af;">Desenvolvedor Frontend Freelancer</p>
            </div>
          </div>
        </body>
        </html>
      `);
    }
  }
}

