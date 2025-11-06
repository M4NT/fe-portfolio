# 🔧 Como Configurar Redirect 301 no Dashboard da Vercel

## 🎯 OBJETIVO: Redirecionar www para não-www sem usar vercel.json

---

## ✅ SOLUÇÃO: Configurar no Dashboard da Vercel

### Passo 1: Acessar Configurações de Domínio
1. Acesse: https://vercel.com/dashboard
2. Vá em seu projeto
3. Clique em "Settings" (Configurações)
4. Vá em "Domains" (Domínios)

### Passo 2: Configurar Redirect
1. Na seção "Domains", você verá seus domínios:
   - `yanmantovani.com` (principal)
   - `www.yanmantovani.com` (se configurado)

2. **Para o domínio `www.yanmantovani.com`:**
   - Clique nos três pontos (...) ao lado do domínio
   - Selecione "Redirect" ou "Configure"
   - Configure para redirecionar para: `yanmantovani.com`
   - Tipo: **301 (Permanent)**

### Passo 3: Verificar Configuração
1. Após configurar, teste:
   - Acesse: https://www.yanmantovani.com
   - Deve redirecionar para: https://yanmantovani.com

---

## 📋 ALTERNATIVA: Usar Middleware (Se Disponível)

Se a Vercel não tiver opção de redirect no dashboard, você pode criar um middleware:

### Criar `middleware.js` na raiz do projeto:

```javascript
export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Se o host começar com www, redirecionar para versão sem www
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace('www.', '');
    return Response.redirect(url, 301);
  }
}
```

**Nota:** Isso funciona apenas se você estiver usando Next.js. Para React puro, use a configuração do dashboard.

---

## 🚀 PRÓXIMOS PASSOS

### 1. Fazer Deploy Sem Redirect
```bash
git add .
git commit -m "fix: remover redirect do vercel.json para corrigir deploy"
git push
```

### 2. Aguardar Deploy (2-5 minutos)

### 3. Configurar Redirect no Dashboard
- Siga os passos acima
- Configure redirect de www para não-www

### 4. Testar Redirect
- Acesse: https://www.yanmantovani.com
- Deve redirecionar para: https://yanmantovani.com

---

## ⚠️ IMPORTANTE

**O redirect no `vercel.json` foi removido temporariamente para que o deploy funcione.** Configure o redirect no dashboard da Vercel após o deploy funcionar.

---

**Última atualização**: Janeiro 2025

