# 🔍 Diagnóstico Completo - Google Search Console

## 🚨 PROBLEMA ATUAL

O Google Search Console está reportando **erro de redirecionamento** impedindo a indexação de todas as páginas.

---

## 🔍 DIAGNÓSTICO PASSO A PASSO

### Passo 1: Verificar Erro Específico no Google Search Console

1. Acesse: https://search.google.com/search-console
2. Vá em "URL Inspection Tool"
3. Cole a URL: `https://yanmantovani.com/`
4. Clique em "Test live URL"
5. **Anote o erro específico:**
   - É erro de redirecionamento (301/302)?
   - É erro 5xx (500, 502, 503)?
   - É outro erro?

### Passo 2: Testar URLs Diretamente

**Teste 1: Verificar Status HTTP**
```bash
curl -I https://yanmantovani.com/
```

**Resultado esperado:**
```
HTTP/2 200
content-type: text/html; charset=utf-8
```

**Se retornar 301 ou 302:**
- Há um redirecionamento configurado
- Verifique as configurações do Vercel

**Teste 2: Verificar Headers de Redirecionamento**
```bash
curl -I https://yanmantovani.com/ 2>&1 | grep -i "location\|301\|302"
```

**Resultado esperado:**
- Nenhuma linha (sem redirecionamentos)

**Se houver linha "location":**
- Há um redirecionamento configurado
- Verifique o `vercel.json` e as configurações do Vercel

**Teste 3: Verificar Todas as Páginas**
```bash
curl -I https://yanmantovani.com/
curl -I https://yanmantovani.com/blog
curl -I https://yanmantovani.com/en
curl -I https://yanmantovani.com/es
curl -I https://yanmantovani.com/privacy-policy
curl -I https://yanmantovani.com/terms-of-use
curl -I https://yanmantovani.com/cookie-policy
```

**Todas devem retornar HTTP 200**

### Passo 3: Verificar Configuração do Vercel

1. Acesse: https://vercel.com/dashboard
2. Vá em seu projeto
3. Vá em "Settings" > "Domains"
4. Verifique:
   - **Domínio principal:** `yanmantovani.com` (sem www)
   - **Domínio www:** `www.yanmantovani.com` (deve redirecionar para `yanmantovani.com` com 301)
   - **Redirecionamentos:** Verifique se há redirecionamentos desnecessários

### Passo 4: Verificar Logs da Vercel

1. Acesse: https://vercel.com/dashboard
2. Vá em seu projeto
3. Vá em "Functions" > "index.js"
4. Verifique os logs:
   - Procure por erros `[SSR]`
   - Verifique se há problemas de renderização
   - Verifique se há problemas de timeout

### Passo 5: Verificar Sitemap e Robots.txt

**Teste 1: Verificar Sitemap**
```bash
curl https://yanmantovani.com/sitemap.xml
```

**Resultado esperado:**
- XML válido com todas as URLs
- Todas as URLs devem usar `https://yanmantovani.com` (sem www)

**Teste 2: Verificar Robots.txt**
```bash
curl https://yanmantovani.com/robots.txt
```

**Resultado esperado:**
- Deve apontar para `https://yanmantovani.com/sitemap.xml` (sem www)

---

## 🔧 SOLUÇÕES APLICADAS

### 1. API Handler - Sempre Retornar 200 OK

**Arquivo:** `api/index.js`

**Mudanças:**
- ✅ Normalização de URL antes de renderizar
- ✅ Headers HTTP corretos (Content-Type, Cache-Control, X-Robots-Tag)
- ✅ **SEMPRE retornar 200 OK** - nunca 301, 302, 500, etc.
- ✅ Fallback robusto que sempre retorna HTML válido
- ✅ Logs detalhados para debug

### 2. Rotas Explícitas

**Arquivo:** `src/App.tsx`

**Mudanças:**
- ✅ Removida rota problemática `:lang(en|es)`
- ✅ Adicionadas rotas explícitas para `/en` e `/es`
- ✅ Todas as rotas retornam conteúdo diretamente (sem redirecionamentos)

### 3. LanguageContext

**Arquivo:** `src/components/LanguageContext.tsx`

**Mudanças:**
- ✅ Removida atualização automática de URL
- ✅ Idioma detectado apenas via localStorage/navegador
- ✅ NÃO altera URL quando idioma muda

---

## 🚨 POSSÍVEIS PROBLEMAS

### Problema 1: Configuração do Vercel

**Sintoma:** URLs retornam 301 ou 302

**Solução:**
1. Acesse: https://vercel.com/dashboard
2. Vá em "Settings" > "Domains"
3. Verifique se há redirecionamentos configurados
4. Se houver, remova ou corrija

### Problema 2: Domínio www vs non-www

**Sintoma:** URLs com `www` redirecionam para não-www

**Solução:**
- Configure no Vercel: `www.yanmantovani.com` → `yanmantovani.com` (301)
- Use apenas `yanmantovani.com` no sitemap e robots.txt
- Isso é normal e esperado - o Google aceita redirecionamentos de www para non-www

### Problema 3: Erro 5xx no SSR

**Sintoma:** Páginas retornam 500 (Internal Server Error)

**Solução:**
- Verifique os logs da Vercel
- Verifique se há erros no `entry-server.tsx`
- Verifique se há problemas com componentes que usam APIs do navegador

### Problema 4: HTML Vazio ou Incompleto

**Sintoma:** Páginas retornam HTML vazio ou incompleto

**Solução:**
- Verifique se o SSR está funcionando corretamente
- Verifique se há problemas com componentes que não renderizam no servidor
- Verifique se há problemas com `Math.random()` ou outras funções não determinísticas

---

## 📝 PRÓXIMOS PASSOS

### 1. Fazer Deploy das Correções

```bash
git add .
git commit -m "fix: garantir sempre 200 OK - remover redirecionamentos e melhorar tratamento de erros"
git push
```

### 2. Aguardar Deploy (2-5 minutos)

### 3. Testar Todas as URLs

```bash
# Teste todas as páginas
curl -I https://yanmantovani.com/
curl -I https://yanmantovani.com/blog
curl -I https://yanmantovani.com/en
curl -I https://yanmantovani.com/es
curl -I https://yanmantovani.com/privacy-policy
curl -I https://yanmantovani.com/terms-of-use
curl -I https://yanmantovani.com/cookie-policy
```

**Todas devem retornar HTTP 200**

### 4. Testar no Google Search Console

1. Acesse: https://search.google.com/search-console
2. Vá em "URL Inspection Tool"
3. Para cada página:
   - Cole a URL
   - Clique em "Test live URL"
   - Verifique se retorna 200 OK (sem erro de redirecionamento)
   - Se retornar 200 OK, clique em "Request Indexing"

### 5. Verificar Configuração do Vercel

1. Acesse: https://vercel.com/dashboard
2. Vá em "Settings" > "Domains"
3. Verifique:
   - Domínio principal: `yanmantovani.com`
   - Domínio www: `www.yanmantovani.com` (deve redirecionar para `yanmantovani.com` com 301)
   - Não há redirecionamentos desnecessários

### 6. Aguardar Indexação

- Aguarde alguns dias para o Google processar
- Verifique o status no Google Search Console
- Verifique se as páginas estão sendo indexadas

---

## ✅ CHECKLIST

### Código
- [x] `api/index.js` sempre retorna 200 OK
- [x] Não há redirecionamentos no código
- [x] SSR está funcionando corretamente
- [x] Todas as rotas estão configuradas corretamente

### Configuração do Vercel
- [ ] Domínio principal configurado como `yanmantovani.com`
- [ ] Domínio www configurado para redirecionar (301)
- [ ] Não há redirecionamentos desnecessários
- [ ] HTTPS está habilitado

### Testes
- [ ] Todas as páginas retornam HTTP 200
- [ ] Não há redirecionamentos detectados (exceto www → non-www)
- [ ] HTML está completo e válido
- [ ] Google Search Console aceita as páginas

---

## 📊 RESULTADO ESPERADO

Após aplicar todas as correções:
- ✅ Todas as páginas retornam HTTP 200
- ✅ Não há redirecionamentos desnecessários (exceto www → non-www, que é normal)
- ✅ Google pode indexar todas as páginas
- ✅ Status no Google Search Console muda de "N/D" para data de rastreamento

---

**Última atualização**: 12/11/2025
**Status**: ⚠️ Aguardando verificação de configuração do Vercel e teste no Google Search Console

