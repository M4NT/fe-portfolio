import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  let vite;
  let render;

  if (!isProduction) {
    // Modo desenvolvimento: usar Vite dev server
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.ssrLoadModule);
  } else {
    // Modo produção: servir arquivos estáticos
    app.use(express.static(path.resolve(__dirname, 'dist/client'), {
      index: false
    }));
    
    // Carregar módulo SSR de produção
    const { render: renderProd } = await import('./dist/server/entry-server.js');
    render = renderProd.render;
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      // 1. Ler index.html
      let template;
      if (isProduction) {
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );
      }

      // 2. Aplicar transformações do Vite no HTML (apenas em dev)
      if (!isProduction) {
        template = await vite.transformIndexHtml(url, template);
      }

      // 3. Renderizar o app
      let appHtml;
      if (isProduction) {
        appHtml = render(url);
      } else {
        const { render: renderDev } = await vite.ssrLoadModule('/src/entry-server.tsx');
        appHtml = renderDev(url);
      }

      // 4. Injetar o HTML renderizado no template
      const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

      // 5. Enviar a resposta
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // Se houver erro, deixe o Vite corrigir o stack trace (apenas em dev)
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  return app;
}

createServer().then((app) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor SSR rodando em http://localhost:${port}`);
    console.log(`📦 Modo: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
  });
});

