# Delícias da Xia Tân 🍰✨

## www.xiatan.com.br

Site oficial da confeitaria **Delícias da Xia Tân** - Bolos, doces e tortas artesanais feitos com amor e dedicação.

---

## 🚀 Deploy Rápido no Netlify

### Método 1: Drag & Drop (Mais Simples)

1. Acesse [Netlify Drop](https://app.netlify.com/drop)
2. Arraste toda a pasta do projeto para a área indicada
3. Aguarde o deploy (30-60 segundos)
4. Pronto! Seu site estará no ar com URL temporária

### Método 2: Netlify CLI

```bash
# Instalar Netlify CLI (apenas uma vez)
npm install -g netlify-cli

# Fazer login
netlify login

# Inicializar projeto
netlify init

# Deploy manual
netlify deploy --prod
```

### Método 3: GitHub Integration

1. Crie repositório no GitHub
2. Faça push dos arquivos
3. Conecte no Netlify: New site from Git
4. Deploy automático a cada push

---

## 📁 Estrutura do Projeto

```
xiatan/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interativo
├── netlify.toml        # Configuração Netlify
├── xiatan.png          # Logo oficial
└── README.md           # Este arquivo
```

---

## 💻 Desenvolvimento Local

### Opção 1: Script Start (Mais Rápido)

**Windows:**
```bash
# Clique duplo no arquivo ou execute:
start.bat
```

**Linux/Mac:**
```bash
npm start
```

### Opção 2: Linha de Comando

```bash
# Node.js com http-server (recomendado)
npm start
# ou
npm run dev

# Abre automaticamente em http://localhost:8080
```

### Opção 3: Sem Node.js

Use qualquer servidor HTTP local:
- **Python 3:** `python -m http.server 8080`
- **Python 2:** `python -m SimpleHTTPServer 8080`
- **PHP:** `php -S localhost:8080`
- **VS Code:** Extensão "Live Server"

### Para Parar o Servidor

- Pressione **Ctrl + C** no terminal
- Ou feche a janela do terminal

---

## 🎨 Características

### Design
- ✨ **Moderno e elegante** com paleta rosa, laranja e marrom chocolate
- 📱 **100% Responsivo** (mobile-first design)
- 🎭 **Animações suaves** com efeitos de hover e scroll
- 🖼️ **Galeria interativa** com filtros de categoria

### Funcionalidades
- 🏠 Hero section com logo animado
- 🎠 Carrossel de produtos (auto-play + swipe)
- 📱 Cardápio categorizado com filtros
- 📝 Formulários de encomenda e contato
- 💬 Integração WhatsApp (botão flutuante)
- 🗺️ Google Maps integrado
- 📊 Pronto para analytics (Google/Facebook)

### Tecnologia
- **HTML5** semântico com Schema.org para SEO
- **CSS3** com flexbox/grid e animações keyframes
- **JavaScript Vanilla** (sem dependências)
- **PWA-ready** (preparado para service worker)
- **Otimizado** para performance (lazy loading, minification)

---

## ⚙️ Configurações Necessárias

### 1. WhatsApp Business ✅ CONFIGURADO
**Número:** (11) 98462-6618
- ✅ Já atualizado em `index.html` (todas as ocorrências)
- ✅ Já atualizado em `script.js` (função `openWhatsApp`)
- ✅ Botão flutuante configurado
- ✅ Formulários redirecionam corretamente

### 2. Endereço ✅ CONFIGURADO
**Local:** Rua Bruna Gallea, 275, Casa 3 - CEP: 02652-010 - São Paulo - SP
- ✅ Exibido na seção Contato
- ✅ Atualizado no Footer
- ✅ Schema.org atualizado para SEO

### 3. Google Maps ⚠️ REQUER AÇÃO
- ⚠️ Embed do mapa é placeholder (genérico)
- 📝 Consulte [MAPS_SETUP.md](MAPS_SETUP.md) para instruções
- 🗺️ Acesse [Google Maps](https://www.google.com/maps)
- Busque: "Rua Bruna Gallea, 275, São Paulo, SP, 02652-010"
- Compartilhar > Incorporar mapa > Copiar código
- Cole em `index.html` (seção Contato, linha ~530)

### 4. E-mail de Contato
Atualize `contato@xiatan.com.br` conforme necessário

### 4. Analytics (Opcional)
Para adicionar Google Analytics/Facebook Pixel:

```html
<!-- No <head> do index.html, antes do </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 5. Domínio Personalizado
Após deploy no Netlify:
1. Vá em **Domain settings**
2. Adicione `xiatan.com.br` e `www.xiatan.com.br`
3. Configure DNS conforme instruções

---

## 🎯 Otimizações Incluídas

### SEO
- ✅ Meta tags completas (Open Graph, Twitter Cards)
- ✅ Schema.org markup para confeitaria
- ✅ Sitemap automático (plugin Netlify)
- ✅ URLs amigáveis e âncoras semânticas
- ✅ Alt text em imagens

### Performance
- ✅ CSS e JS otimizados
- ✅ Lazy loading para imagens
- ✅ Cache headers configurados
- ✅ Minificação automática (Netlify)
- ✅ Compressão GZIP/Brotli

### Segurança
- ✅ Headers de segurança (X-Frame-Options, CSP)
- ✅ HTTPS automático (Netlify)
- ✅ Proteção contra XSS

### Acessibilidade
- ✅ Semântica HTML5
- ✅ Aria labels em botões
- ✅ Navegação por teclado
- ✅ Contraste de cores adequado

---

## 🍰 Personalizações Futuras

### Adicionar Blog
Crie `blog.html` e adicione seção de receitas/notícias

### Sistema de Pedidos
Integre com:
- **iFood API** (requer cadastro comercial)
- **Shopify Lite** para e-commerce
- **Google Forms** para formulários avançados

### Galeria de Fotos
Adicione mais imagens de produtos:
1. Crie pasta `assets/images/`
2. Otimize imagens (WebP, <500KB)
3. Atualize `menu-card-image` backgrounds

### Newsletter
Integre com Mailchimp/SendGrid:

```html
<form action="https://seu-endpoint.us1.list-manage.com/subscribe/post" method="POST">
  <input type="email" name="EMAIL" placeholder="Seu e-mail" required>
  <button type="submit">Assinar</button>
</form>
```

---

## 📱 Redes Sociais

Atualize os links em:
- Header (navigation)
- Footer (social icons)
- Seção Contato

Substitua:
- `https://instagram.com/xiatan` → perfil real
- `https://facebook.com/xiatan` → página real

---

## 🐛 Troubleshooting

### Site não carrega estilos
- Verifique caminho do `styles.css`
- Certifique-se que está na mesma pasta do `index.html`

### Formulários não funcionam
- Verifique número do WhatsApp
- Teste URL gerada no console do navegador

### Carrossel não funciona
- Abra Console (F12) e verifique erros
- Verifique se `script.js` está carregando

### Deploy falha no Netlify
- Verifique `netlify.toml`
- Certifique-se que todos os arquivos estão na raiz

---

## 📞 Suporte

Para dúvidas sobre o código:
- Consulte comentários no código-fonte
- Verifique documentação do Netlify

Para dúvidas sobre a confeitaria:
- 📍 Rua Bruna Gallea, 275, Casa 3 - São Paulo - SP
- 📱 WhatsApp: +55 (11) 98462-6618
- ✉️ E-mail: contato@xiatan.com.br
- 🌐 Site: www.xiatan.com.br

---

## 📄 Licença

© 2026 Delícias da Xia Tân. Todos os direitos reservados.

---

## 🎉 Recursos Adicionais

### Fontes Utilizadas
- **Playfair Display** (títulos) - Google Fonts
- **Poppins** (corpo) - Google Fonts

### Paleta de Cores
- Rosa Vibrante: `#FF69B4`
- Laranja Dourado: `#FFA500`
- Creme/Bege: `#FFF8DC`
- Marrom Chocolate: `#8B4513`
- Preto: `#1a1a1a`
- Branco: `#FFFFFF`

### Easter Egg
Clique 5 vezes no logo da hero section para descobrir uma surpresa! 🎊

---

**Desenvolvido com 💖 e muito ☕**

**Status:** ✅ Pronto para produção  
**Última atualização:** Fevereiro 2026

---

## 🚀 Próximos Passos

1. ✅ Deploy no Netlify
2. ⏳ Configurar domínio personalizado
3. ⏳ Adicionar fotos reais dos produtos
4. ⏳ Configurar analytics
5. ⏳ Testar em diferentes dispositivos
6. ⏳ Solicitar feedback de clientes
7. ⏳ Otimizar baseado em métricas

**Boa sorte com sua confeitaria! 🎂✨**
