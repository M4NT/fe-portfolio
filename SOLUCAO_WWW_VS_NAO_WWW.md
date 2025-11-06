# 🔧 Solução: Problema com www vs não-www no Sitemap

## 🚨 PROBLEMA IDENTIFICADO

Você está tentando adicionar o sitemap no Google usando:
- `https://www.yanmantovani.com/sitemap.xml` (com www)

Mas o sitemap está gerando URLs com:
- `https://yanmantovani.com` (sem www)

**Isso pode causar problemas no Google Search Console!**

---

## ✅ SOLUÇÃO IMPLEMENTADA

### 1. Sitemap Dinâmico Baseado no Domínio
- ✅ Sitemap agora detecta se a requisição veio com www ou não-www
- ✅ URLs no sitemap correspondem ao domínio da requisição
- ✅ Funciona tanto com `www.yanmantovani.com` quanto `yanmantovani.com`

### 2. Ajuste Automático de URLs
- ✅ Se o sitemap for lido de arquivo, as URLs são ajustadas automaticamente
- ✅ Garante que todas as URLs correspondam ao domínio da requisição

---

## 📋 O QUE FOI FEITO

### 1. Atualizado `api/sitemap.xml.js`
- Função `generateSitemap()` agora recebe o objeto `req`
- Detecta o domínio da requisição (www ou não-www)
- Gera URLs correspondentes ao domínio da requisição
- Ajusta URLs de arquivos estáticos para corresponder ao domínio

---

## 🚀 PRÓXIMOS PASSOS

### Passo 1: Fazer Deploy (OBRIGATÓRIO)
```bash
git add .
git commit -m "fix: sitemap ajusta URLs para corresponder ao domínio da requisição (www ou não-www)"
git push
```

### Passo 2: Aguardar Deploy (2-5 minutos)
- Aguarde o deploy completar na Vercel

### Passo 3: Testar Ambas as Versões
1. Teste sem www: https://yanmantovani.com/sitemap.xml
2. Teste com www: https://www.yanmantovani.com/sitemap.xml
3. **Ambas devem funcionar e mostrar URLs correspondentes**

### Passo 4: Verificar Qual Versão Usar no Google
1. Acesse: https://search.google.com/search-console
2. Veja qual propriedade você tem:
   - `yanmantovani.com` (sem www)
   - `www.yanmantovani.com` (com www)
   - Ambas

### Passo 5: Adicionar Sitemap no Google
**Use a versão correspondente à sua propriedade:**

- Se sua propriedade é `yanmantovani.com` (sem www):
  - Adicione: `https://yanmantovani.com/sitemap.xml`

- Se sua propriedade é `www.yanmantovani.com` (com www):
  - Adicione: `https://www.yanmantovani.com/sitemap.xml`

- Se você tem ambas as propriedades:
  - Adicione o sitemap em ambas as propriedades
  - Use a URL correspondente a cada propriedade

---

## 🔍 VERIFICAÇÕES

### Verificar 1: Sitemap Funciona com www?
1. Acesse: https://www.yanmantovani.com/sitemap.xml
2. Deve mostrar XML formatado
3. URLs devem começar com `https://www.yanmantovani.com`

### Verificar 2: Sitemap Funciona sem www?
1. Acesse: https://yanmantovani.com/sitemap.xml
2. Deve mostrar XML formatado
3. URLs devem começar com `https://yanmantovani.com`

### Verificar 3: Headers Estão Corretos?
1. Abra DevTools (F12)
2. Vá em "Network"
3. Acesse ambas as versões do sitemap
4. Veja "Response Headers"
5. Deve ter: `Content-Type: application/xml; charset=utf-8`

---

## ⚠️ IMPORTANTE

### Qual Versão Usar no Google Search Console?

**Use a versão que corresponde à sua propriedade no Google Search Console:**

1. **Se sua propriedade é `yanmantovani.com` (sem www):**
   - Use: `https://yanmantovani.com/sitemap.xml`

2. **Se sua propriedade é `www.yanmantovani.com` (com www):**
   - Use: `https://www.yanmantovani.com/sitemap.xml`

3. **Se você tem ambas as propriedades:**
   - Adicione o sitemap em ambas
   - Use a URL correspondente a cada propriedade

### Configurar Preferência de Domínio

1. Acesse: https://search.google.com/search-console
2. Vá em "Configurações" > "Preferências de domínio"
3. Escolha qual versão prefere (www ou não-www)
4. Configure redirecionamento se necessário

---

## 💡 DICA IMPORTANTE

**O Google recomenda usar apenas uma versão do domínio (www ou não-www) e redirecionar a outra.** Isso evita problemas de conteúdo duplicado e facilita a indexação.

---

## ✅ CHECKLIST

### Antes de Adicionar no Google:
- [ ] Deploy foi feito
- [ ] Sitemap funciona com www: https://www.yanmantovani.com/sitemap.xml
- [ ] Sitemap funciona sem www: https://yanmantovani.com/sitemap.xml
- [ ] URLs no sitemap correspondem ao domínio da requisição
- [ ] Headers estão corretos (Content-Type: application/xml)

### Ao Adicionar no Google:
- [ ] Verificou qual propriedade tem no Google Search Console
- [ ] Usou a URL correspondente à propriedade
- [ ] Clicou em "Enviar"
- [ ] Aguardou processamento

### Após Adicionar:
- [ ] Verificou status (Sucesso/Erro)
- [ ] Viu quantas URLs foram descobertas
- [ ] Monitorou progresso

---

**Última atualização**: Janeiro 2025

