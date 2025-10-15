# 🔄 Guia de Migração: Formspree → PHP Backend

## 📋 Status Atual

✅ **Formspree configurado** (temporário)
✅ **Backend PHP criado** (pronto para usar)
⏳ **Aguardando configuração de domínio**

---

## 🚀 Quando Configurar o Domínio da Hostinger

### **Passo 1: Configure o Domínio na Vercel**

1. Acesse: https://vercel.com/dashboard
2. Vá no seu projeto
3. Clique em **"Settings" → "Domains"**
4. Adicione seu domínio: `yanmantovani.com`
5. Copie os registros DNS (CNAME/A)

### **Passo 2: Configure DNS na Hostinger**

1. Acesse o painel da Hostinger
2. Vá em **"Domínios" → "Gerenciar DNS"**
3. Adicione os registros da Vercel:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
4. Aguarde propagação (até 48h, geralmente 1-2h)

### **Passo 3: Configure Subdomínio para API**

Na Hostinger, crie um subdomínio para o backend:

1. **Crie subdomínio**: `api.yanmantovani.com`
2. **Aponte para**: Pasta do PHP na Hostinger
3. **Upload arquivos**:
   ```
   api.yanmantovani.com/
   ├── send-email.php
   └── .htaccess
   ```

### **Passo 4: Atualize o Frontend**

Em `src/components/ContactForm.tsx`, mude:

```typescript
// Linha 51: Mude para true
const USE_PHP_BACKEND = true;

// Ou, se preferir URL completa:
const API_ENDPOINT = 'https://api.yanmantovani.com/send-email.php';
```

### **Passo 5: Configure o Email no PHP**

Em `public/api/send-email.php`, linha 33:

```php
define('RECIPIENT_EMAIL', 'hello@yanmantovani.com');
```

### **Passo 6: Teste**

1. **Rebuild**:
   ```bash
   npm run build
   vercel --prod
   ```

2. **Teste o formulário** no site
3. **Verifique** se o email chegou
4. **Monitore logs** em `logs/contact.log`

---

## 🔧 Estrutura Final

```
Frontend (Vercel):
https://yanmantovani.com
├── index.html
├── assets/
└── ...

Backend PHP (Hostinger):
https://api.yanmantovani.com
├── send-email.php
├── .htaccess
└── logs/
    └── contact.log
```

---

## 📊 Comparação

| Feature | Formspree (Atual) | PHP Backend (Futuro) |
|---------|-------------------|----------------------|
| **Custo** | 50/mês grátis | Ilimitado* |
| **Controle** | ❌ Limitado | ✅ Total |
| **Customização** | ❌ Pouca | ✅ Total |
| **Logs** | ✅ Dashboard | ✅ Arquivo local |
| **SMTP** | ✅ Sim | ✅ Configurável |
| **Setup** | ✅ Fácil | ⚠️ Médio |

*Incluído na hospedagem Hostinger

---

## ⚡ Migração Rápida (Quando Pronto)

```bash
# 1. Atualize o código
# Em ContactForm.tsx, linha 51:
const USE_PHP_BACKEND = true;

# 2. Rebuild e deploy
npm run build
vercel --prod

# 3. Upload PHP para Hostinger
# Via FTP ou File Manager

# 4. Teste!
```

---

## 🎯 Por Enquanto

✅ **Use Formspree** - Funciona perfeitamente
✅ **Backend PHP pronto** - Quando precisar
✅ **Migração fácil** - Apenas 1 variável para mudar

---

## 📧 Emails Configurados

- **Formspree**: `hello@yanmantovani.com` ✅
- **PHP Backend**: `hello@yanmantovani.com` ✅

Ambos já estão configurados com seu email!

---

**Tudo pronto! Use Formspree agora e migre para PHP quando configurar o domínio!** 🚀✨

Quer que eu faça mais alguma melhoria no site? 🤔
