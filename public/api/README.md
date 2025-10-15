# 📧 API de Envio de Email - Configuração

## 🚀 Como Configurar

### 1. Edite o arquivo `send-email.php`

Abra o arquivo e atualize as seguintes linhas (linhas 27-33):

```php
// Email que receberá as mensagens
define('RECIPIENT_EMAIL', 'seu@email.com'); // ← MUDE AQUI

// Nome do remetente (seu nome/empresa)
define('RECIPIENT_NAME', 'Seu Nome'); // ← MUDE AQUI

// Assunto padrão dos emails
define('EMAIL_SUBJECT_PREFIX', '[Portfolio] Novo Contato');
```

### 2. Requisitos do Servidor

#### **Opção A: Servidor com PHP (Apache/Nginx)**
- ✅ PHP 7.4 ou superior
- ✅ Função `mail()` habilitada
- ✅ Permissões de escrita em `/logs` (opcional)

#### **Opção B: Hospedagem Compartilhada**
- ✅ cPanel, Hostinger, HostGator, etc
- ✅ PHP já vem configurado
- ✅ Função `mail()` geralmente habilitada por padrão

#### **Opção C: VPS/Cloud (AWS, DigitalOcean, etc)**
- ✅ Instale PHP: `sudo apt install php php-cli`
- ✅ Configure sendmail ou SMTP
- ✅ Ou use serviço externo (SendGrid, Mailgun)

### 3. Teste Local (Desenvolvimento)

#### **Com PHP Built-in Server:**
```bash
# Na pasta public/
php -S localhost:8000

# Teste em: http://localhost:8000
```

⚠️ **Nota**: Em localhost, emails podem não funcionar. Use Formspree ou configure SMTP.

#### **Com XAMPP/WAMP/MAMP:**
1. Coloque o projeto na pasta `htdocs/`
2. Acesse: `http://localhost/seu-projeto`
3. Configure `sendmail` no `php.ini` (opcional)

### 4. Deploy em Produção

#### **Vercel** (Recomendado para frontend)
```bash
npm run build
vercel --prod
```

⚠️ **Importante**: Vercel não suporta PHP! Use uma das opções:
- **Opção 1**: Hospede o PHP separadamente (ex: Hostinger, cPanel)
- **Opção 2**: Use Formspree (gratuito, fácil)
- **Opção 3**: Use Vercel Serverless Functions (Node.js)

#### **Netlify** (Frontend + Netlify Functions)
```bash
npm run build
netlify deploy --prod
```

⚠️ **Importante**: Netlify não suporta PHP! Use Netlify Functions ou Formspree.

#### **Hostinger/cPanel** (Suporta PHP)
1. Faça upload via FTP/SFTP
2. Coloque arquivos na pasta `public_html/`
3. Configure permissões: `chmod 755 api/`
4. Teste: `https://seusite.com/api/send-email.php`

#### **DigitalOcean/AWS** (VPS)
```bash
# Instale Apache + PHP
sudo apt update
sudo apt install apache2 php libapache2-mod-php

# Configure virtual host
sudo nano /etc/apache2/sites-available/portfolio.conf

# Reinicie Apache
sudo systemctl restart apache2
```

### 5. Configuração Avançada (SMTP)

Se a função `mail()` não funcionar, use SMTP:

#### **Instale PHPMailer:**
```bash
composer require phpmailer/phpmailer
```

#### **Configure SMTP no PHP:**
```php
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'seu@email.com';
$mail->Password = 'sua_senha_app';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

### 6. Segurança

✅ **Implementado:**
- Rate limiting (1 minuto entre envios)
- Validação de campos
- Sanitização de HTML
- Proteção contra XSS
- CORS configurado

⚠️ **Recomendações:**
- Use HTTPS em produção
- Configure reCAPTCHA (opcional)
- Monitore logs regularmente
- Limite tamanho de mensagens

### 7. Logs

Logs são salvos em: `/logs/contact.log`

```bash
# Ver últimos logs
tail -f logs/contact.log

# Limpar logs
rm logs/contact.log
```

### 8. Troubleshooting

#### **Email não chega:**
1. Verifique spam/lixeira
2. Confirme que `mail()` está habilitado: `php -i | grep mail`
3. Teste com: `php -r "mail('seu@email.com', 'Teste', 'Mensagem teste');"`
4. Configure SMTP se `mail()` não funcionar

#### **Erro 500:**
1. Verifique logs do PHP: `tail -f /var/log/apache2/error.log`
2. Ative debug: `error_reporting(E_ALL);`
3. Verifique permissões: `chmod 755 api/`

#### **CORS Error:**
1. Verifique `.htaccess`
2. Configure headers no Apache/Nginx
3. Use proxy em desenvolvimento

### 9. Alternativas Recomendadas

Se não quiser configurar PHP:

#### **Formspree** (Mais fácil)
- ✅ Gratuito: 50 emails/mês
- ✅ Sem configuração
- ✅ Dashboard web
- 🔗 https://formspree.io/

#### **EmailJS** (JavaScript)
- ✅ Gratuito: 200 emails/mês
- ✅ Sem backend
- ✅ Templates customizáveis
- 🔗 https://www.emailjs.com/

#### **Vercel Serverless Functions** (Node.js)
- ✅ Integrado com Vercel
- ✅ Escalável
- ✅ Gratuito (tier generoso)

### 10. Suporte

📧 Dúvidas? Entre em contato: hello@yan-m.dev

---

**Criado por Yan.M** | Portfolio System v1.0

