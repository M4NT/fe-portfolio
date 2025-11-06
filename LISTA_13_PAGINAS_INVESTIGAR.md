# 📋 Lista das 13 Páginas para Investigar - Erro 5xx

## 🚨 PROBLEMA: Todas as páginas dão erro 5xx ao tentar indexar

---

## 📋 LISTA DAS 13 PÁGINAS

### Páginas Principais (2):
1. 🔍 `https://yanmantovani.com` (Homepage)
2. 🔍 `https://yanmantovani.com/blog` (Blog Index)

### Posts do Blog (8):
3. 🔍 `https://yanmantovani.com/blog/a-revolucao-silenciosa-por-que-o-futuro-do-wordpress-e-escrito-em-react`
4. 🔍 `https://yanmantovani.com/blog/seu-site-e-uma-vitrine-bonita-ou-uma-maquina-de-vendas`
5. 🔍 `https://yanmantovani.com/blog/por-que-seu-site-lento-esta-roubando-seus-clientes`
6. 🔍 `https://yanmantovani.com/blog/o-que-e-landing-page-melhores-ferramentas-gratuitas`
7. 🔍 `https://yanmantovani.com/blog/quanto-custa-landing-page-2025`
8. 🔍 `https://yanmantovani.com/blog/como-aumentar-conversoes-landing-page`
9. 🔍 `https://yanmantovani.com/blog/etapas-para-lancar-seu-site`
10. 🔍 `https://yanmantovani.com/blog/melhores-ferramentas-desenvolvimento-web-2025`

### Páginas Legais (3):
11. 🔍 `https://yanmantovani.com/privacy-policy`
12. 🔍 `https://yanmantovani.com/terms-of-use`
13. 🔍 `https://yanmantovani.com/cookie-policy`

---

## ✅ CORREÇÕES APLICADAS

### 1. ErrorBoundary
- ✅ Adicionada verificação `typeof window !== 'undefined'` antes de usar `window.location`
- ✅ Adicionada verificação `typeof process !== 'undefined'` antes de usar `process.env`

### 2. App.tsx
- ✅ Removido `lazy()` e `Suspense` das páginas legais (PrivacyPolicy, TermsOfUse, CookiePolicy)
- ✅ Import direto de todas as páginas para SSR funcionar corretamente
- ✅ Removido import de `lazy` e `Suspense` não utilizados

### 3. entry-server.tsx
- ✅ Melhorado logging de erros com `[SSR]` prefix
- ✅ Adicionado log de sucesso para debug
- ✅ Melhorado tratamento de erros com stack trace

---

## 🔍 COMO INVESTIGAR CADA PÁGINA

### Método 1: URL Inspection Tool (Google Search Console)
1. Acesse: https://search.google.com/search-console
2. Vá em "URL Inspection Tool"
3. Cole cada URL da lista acima
4. Clique em "Test live URL"
5. Veja o erro específico

### Método 2: Testar Manualmente
1. Acesse cada URL no navegador
2. Verifique se carrega corretamente
3. Veja se há erros no console (F12)

### Método 3: Verificar Logs da Vercel
1. Acesse: https://vercel.com/dashboard
2. Vá em seu projeto
3. Veja "Functions" > "index.js"
4. Veja logs de erros (procure por `[SSR]`)

---

## 🚨 POSSÍVEIS CAUSAS DO ERRO 5xx

### Causa 1: APIs do Navegador no SSR ✅ CORRIGIDO
**Sintoma:** Erro ao renderizar no servidor

**Solução:**
- ✅ Verificar se há uso de `window`, `document`, `localStorage` sem verificação
- ✅ Adicionar `typeof window !== 'undefined'` antes de usar

### Causa 2: Lazy Loading com Suspense ✅ CORRIGIDO
**Sintoma:** Erro em componentes lazy-loaded

**Solução:**
- ✅ Removido `lazy()` e `Suspense` das páginas legais
- ✅ Import direto de todos os componentes

### Causa 3: ErrorBoundary no SSR ✅ CORRIGIDO
**Sintoma:** Erro ao usar `window.location` no ErrorBoundary

**Solução:**
- ✅ Adicionada verificação `typeof window !== 'undefined'` no ErrorBoundary

---

## ✅ CHECKLIST DE INVESTIGAÇÃO

### Para Cada Página:
- [ ] Testada no navegador (carrega corretamente?)
- [ ] Testada no URL Inspection Tool (qual erro?)
- [ ] Verificados logs da Vercel (há erros com `[SSR]`?)
- [ ] Verificado código-fonte (HTML completo?)

---

## 📝 PRÓXIMOS PASSOS

1. **Fazer deploy das correções:**
   ```bash
   git add .
   git commit -m "fix: corrigir erro 5xx no SSR - remover lazy loading e corrigir ErrorBoundary"
   git push
   ```

2. **Aguardar deploy (2-5 minutos)**

3. **Testar cada uma das 13 páginas:**
   - Usar URL Inspection Tool do Google
   - Verificar logs da Vercel
   - Testar manualmente no navegador

4. **Se ainda houver erro 5xx:**
   - Verificar logs da Vercel para ver qual componente está causando erro
   - Verificar se há outros componentes usando APIs do navegador sem verificação

---

**Última atualização**: Janeiro 2025

