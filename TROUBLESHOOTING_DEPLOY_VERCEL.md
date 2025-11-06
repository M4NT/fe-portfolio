# 🔧 Troubleshooting: Deploy Parou na Vercel

## 🚨 PROBLEMA: Deploy não está funcionando

---

## ✅ SOLUÇÕES RÁPIDAS

### Solução 1: Verificar Logs da Vercel
1. Acesse: https://vercel.com/dashboard
2. Vá em seu projeto
3. Veja "Deployments"
4. Clique no último deploy (com erro)
5. Veja os logs
6. **Identifique o erro específico**

### Solução 2: Testar Build Localmente
```bash
npm run build
```

Se funcionar localmente, o problema é na configuração do Vercel.

### Solução 3: Remover Redirect Temporariamente
Se o redirect estiver causando problemas, remova temporariamente:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "rewrites": [
    {
      "source": "/assets/(.*)",
      "destination": "/assets/$1"
    },
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap.xml.js"
    },
    {
      "source": "/((?!assets/|images/|favicon|robots|sitemap|api|_next).*)",
      "destination": "/api/index.js"
    }
  ],
  "headers": [
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml; charset=utf-8"
        }
      ]
    }
  ]
}
```

**Depois configure o redirect diretamente no dashboard da Vercel.**

---

## 🔍 POSSÍVEIS CAUSAS

### Causa 1: Erro no Build
**Sintoma:** Deploy falha durante o build

**Solução:**
1. Verifique logs da Vercel
2. Teste build localmente: `npm run build`
3. Corrija erros encontrados

### Causa 2: Problema com Redirect
**Sintoma:** Deploy falha na validação do vercel.json

**Solução:**
1. Remova o redirect temporariamente
2. Configure redirect no dashboard da Vercel
3. Ou ajuste a sintaxe do redirect

### Causa 3: Problema com Integração Git
**Sintoma:** Deploy não é acionado

**Solução:**
1. Verifique integração Git na Vercel
2. Verifique permissões do repositório
3. Tente fazer push novamente

### Causa 4: Variáveis de Ambiente
**Sintoma:** Deploy falha por variáveis ausentes

**Solução:**
1. Verifique variáveis de ambiente na Vercel
2. Configure variáveis necessárias

---

## 🚀 SOLUÇÃO ALTERNATIVA: Configurar Redirect no Dashboard

Se o redirect no `vercel.json` continuar causando problemas:

1. **Remova o redirect do vercel.json**
2. **Configure no dashboard da Vercel:**
   - Acesse: https://vercel.com/dashboard
   - Vá em seu projeto
   - Vá em "Settings" > "Domains"
   - Configure redirecionamento de `www.yanmantovani.com` para `yanmantovani.com`

---

## 📋 CHECKLIST DE DIAGNÓSTICO

### Verificações Básicas:
- [ ] Build funciona localmente: `npm run build`
- [ ] Vercel.json está válido (sem erros de sintaxe)
- [ ] Logs da Vercel verificados
- [ ] Integração Git funcionando
- [ ] Variáveis de ambiente configuradas

### Se Ainda Não Funcionar:
- [ ] Remover redirect do vercel.json
- [ ] Configurar redirect no dashboard
- [ ] Verificar status do Vercel: https://www.vercel-status.com
- [ ] Contatar suporte da Vercel

---

**Última atualização**: Janeiro 2025

