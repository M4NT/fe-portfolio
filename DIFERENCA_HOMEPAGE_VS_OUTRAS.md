# 🔍 Diferença entre Homepage e Outras Páginas - Erro 5xx

## 🎯 PROBLEMA IDENTIFICADO

A homepage (`https://yanmantovani.com`) funciona e pode ser indexada, mas as outras páginas (blog, páginas legais) dão erro 5xx.

---

## 🔍 DIFERENÇAS ENCONTRADAS

### ✅ Homepage (`/`)
- **Componentes:** Hero, About, Services, SelectedWorks, etc.
- **Estrutura:** Componentes simples renderizados dentro do App.tsx
- **Problemas:** Nenhum problema crítico encontrado
- **Status:** ✅ Funciona

### ❌ Páginas de Blog (`/blog`, `/blog/:slug`)
- **Componentes:** BlogIndex, BlogPost, Navigation, Footer
- **Estrutura:** Páginas completas com Navigation e Footer próprios
- **Problemas encontrados:**
  1. ✅ `console.log` sem verificação (corrigido)
  2. ✅ Uso de `window` em LatestPosts (corrigido)
  3. ⚠️ Pode ter problemas com `useParams` no SSR

### ❌ Páginas Legais (`/privacy-policy`, `/terms-of-use`, `/cookie-policy`)
- **Componentes:** PrivacyPolicy, TermsOfUse, CookiePolicy
- **Estrutura:** Páginas completas com Navigation e Footer próprios
- **Problemas encontrados:**
  1. ✅ `new Date().toLocaleDateString('pt-BR')` sem verificação de Intl (corrigido)
  2. ⚠️ Pode ter problemas com formatação de data no SSR

---

## ✅ CORREÇÕES APLICADAS

### 1. LatestPosts.tsx
- ✅ Adicionada verificação `typeof window === 'undefined'` antes de usar `window.innerWidth`
- ✅ Default para desktop no SSR (`setIsMobile(false)`)

### 2. Páginas Legais (PrivacyPolicy, TermsOfUse, CookiePolicy)
- ✅ Adicionada verificação `typeof Intl !== 'undefined' && Intl.DateTimeFormat` antes de usar `toLocaleDateString`
- ✅ Fallback para data fixa: `'06/11/2025'`

### 3. BlogPost.tsx
- ✅ Adicionada verificação `typeof console !== 'undefined' && console.log` antes de usar `console.log`

---

## 🚨 POSSÍVEIS CAUSAS RESTANTES

### 1. useParams no SSR
**Problema:** `useParams` pode não funcionar corretamente no SSR se a rota não estiver configurada corretamente.

**Solução:** Verificar se o `MemoryRouter` está configurado corretamente no `entry-server.tsx`.

### 2. Navigation e Footer nas Páginas
**Problema:** As páginas de blog e legais renderizam Navigation e Footer dentro delas, enquanto a homepage não.

**Solução:** Verificar se Navigation e Footer têm problemas de SSR.

### 3. getPost() no SSR
**Problema:** A função `getPost()` pode ter problemas se os posts não estiverem disponíveis no servidor.

**Solução:** Verificar se os posts estão sendo importados corretamente.

---

## 📝 PRÓXIMOS PASSOS

1. **Fazer deploy das correções:**
   ```bash
   git add .
   git commit -m "fix: corrigir problemas de SSR em LatestPosts, páginas legais e BlogPost"
   git push
   ```

2. **Aguardar deploy (2-5 minutos)**

3. **Testar cada página:**
   - Usar URL Inspection Tool do Google
   - Verificar logs da Vercel
   - Testar manualmente no navegador

4. **Se ainda houver erro 5xx:**
   - Verificar logs da Vercel para ver qual componente está causando erro
   - Verificar se Navigation e Footer têm problemas de SSR
   - Verificar se `getPost()` funciona no SSR

---

**Última atualização**: Janeiro 2025

