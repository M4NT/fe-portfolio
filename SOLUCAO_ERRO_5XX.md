# 🔧 Solução para Erro 5xx no Google Search Console

## Problema Identificado

O Google está recebendo erro **5xx (Erro no servidor)** ao tentar rastrear as páginas do blog. Isso acontece porque:

1. **Componentes usam APIs do navegador** (`window`, `document`) que não existem no servidor
2. **SSR não tinha tratamento de erros adequado**
3. **Falta de fallbacks** quando a renderização falha

## Soluções Implementadas

### 1. Melhorias no SSR (`src/entry-server.tsx`)
- ✅ Adicionado mocks para APIs do navegador
- ✅ Tratamento de erros robusto
- ✅ Fallbacks quando renderização falha
- ✅ Logs para debug

### 2. Melhorias na API (`api/index.js`)
- ✅ Tratamento de erros em múltiplas camadas
- ✅ Fallback HTML mesmo em caso de erro
- ✅ Headers corretos para SEO
- ✅ Logs detalhados para debug

### 3. Correções no BlogPost (`src/pages/BlogPost.tsx`)
- ✅ Verificações `typeof window !== 'undefined'` antes de usar APIs do navegador
- ✅ Verificações `typeof document !== 'undefined'` antes de manipular DOM
- ✅ Código condicional que só executa no cliente

### 4. Rota específica para Sitemap (`api/sitemap.xml.js`)
- ✅ Handler dedicado para servir sitemap.xml
- ✅ Múltiplos fallbacks para encontrar o arquivo
- ✅ Headers corretos (Content-Type: application/xml)

### 5. Configuração Vercel (`vercel.json`)
- ✅ Rota específica para `/sitemap.xml`
- ✅ Headers corretos para sitemap
- ✅ Cache apropriado

## Próximos Passos

### 1. Fazer Deploy
```bash
git add .
git commit -m "fix: corrigir erro 5xx no SSR para páginas do blog"
git push
```

### 2. Aguardar Deploy na Vercel
- Aguarde o deploy completar (2-5 minutos)
- Verifique se não há erros no build

### 3. Testar Localmente (Opcional)
```bash
npm run build
npm run preview
```
Acesse: http://localhost:3000/blog/nome-do-post

### 4. Verificar no Google Search Console
1. Aguarde 10-15 minutos após o deploy
2. Vá em "Inspecionar URL"
3. Cole a URL do blog: `https://yanmantovani.com/blog/nome-do-post`
4. Clique em "Testar URL publicada"
5. Verifique se não há mais erro 5xx

### 5. Solicitar Nova Indexação
1. No Google Search Console
2. Use "Inspecionar URL"
3. Para cada post do blog:
   - Cole a URL
   - Clique em "Solicitar indexação"
   - Aguarde confirmação

## Verificações

### Verificar se SSR está funcionando:
1. Acesse: https://yanmantovani.com/blog/nome-do-post
2. Clique com botão direito > "Ver código-fonte"
3. Deve ver HTML completo dentro de `<div id="root">...</div>`
4. Se ver apenas `<div id="root"></div>` vazio, o SSR não está funcionando

### Verificar logs na Vercel:
1. Acesse: https://vercel.com/dashboard
2. Vá em seu projeto
3. Clique em "Deployments" > Último deploy
4. Clique em "Functions" > `api/index.js`
5. Veja os logs para erros

## Se Ainda Houver Erros

### Verificar logs:
```bash
# Na Vercel Dashboard > Functions > api/index.js > Logs
# Procure por:
# - [SSR] Erro ao renderizar
# - [SSR] Erro crítico
# - Erro ao renderizar
```

### Testar localmente:
```bash
npm run build
npm run preview
# Acesse: http://localhost:3000/blog/nome-do-post
# Verifique console para erros
```

### Verificar se o post existe:
- Verifique se o slug do post está correto
- Verifique se o post existe em `src/blog/posts.ts`
- Verifique se o post tem conteúdo válido

## Monitoramento

### Após 24 horas:
1. Verifique Google Search Console
2. Veja se ainda há erros 5xx
3. Verifique se as páginas foram indexadas
4. Veja quantas páginas foram rastreadas com sucesso

### Métricas para acompanhar:
- **Erros 5xx**: Deve ser 0
- **Páginas indexadas**: Deve aumentar
- **Cobertura**: Deve melhorar
- **Status de rastreamento**: Deve ser "Sucesso"

## Notas Importantes

1. **Paciência**: Pode levar 24-48 horas para o Google re-rastrear
2. **Cache**: Google pode usar cache antigo por algumas horas
3. **Rate Limiting**: Não solicite indexação de muitas URLs de uma vez
4. **Logs**: Monitore logs na Vercel para identificar problemas

---

**Última atualização**: Janeiro 2025

