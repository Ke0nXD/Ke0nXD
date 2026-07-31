# DU'CHER — site institucional

Site de página única em Next.js 15 (App Router) + TypeScript + Tailwind, com
animações em Framer Motion, tema claro/escuro e SEO completo.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir o build
npm run typecheck
```

---

## ⚠️ Leia antes de publicar

O ambiente onde este site foi gerado **não teve acesso de rede ao Instagram
(@ducheroficial) nem ao Google Maps** — a política de egresso do contêiner
bloqueia esses hosts (403 no CONNECT; até `google.com` é recusado). Nenhum dado
da empresa pôde ser confirmado na fonte primária.

O segmento (lingerie / moda praia / moda fitness, em Lagoa da Prata/MG) veio de
uma **busca web indireta** e é plausível, mas **não confirmado**.

Todo o conteúdo vive em um único arquivo:

```
src/content/business.ts
```

Cada bloco lá está marcado com `[INDÍCIO]`, `[PLACEHOLDER]` ou `[ESTRUTURAL]`.
Faça uma busca por `PLACEHOLDER` e resolva **todos** antes do deploy.

### Checklist mínimo de publicação

| Item | Onde | Situação |
| --- | --- | --- |
| Número de WhatsApp | `contact.whatsapp` | ❌ fictício — os botões não funcionam até trocar |
| Telefone / e-mail | `contact` | ❌ fictício |
| Endereço e CEP | `contact.address` | ⚠️ indício, confirmar |
| Coordenadas do mapa | `contact.address.lat/lng` | ⚠️ centro aproximado da cidade |
| Horários | `openingHours` | ❌ fictício |
| Domínio | `brand.siteUrl` | ❌ ajustar (afeta canonical, OG, sitemap, schema) |
| Depoimentos | `testimonials` | ❌ **fictícios** — ver abaixo |
| Fotos | `/public/images/` | ⚠️ placeholders gerados |
| Serviços e textos | `services`, `about`, `faq` | ⚠️ revisar com a loja |

### Sobre os depoimentos

`testimonials` é conteúdo **inventado** para dar forma à seção. Publicar
avaliação fictícia como se fosse real é propaganda enganosa.

Duas proteções já estão no código:

- Em `npm run dev`, um aviso vermelho aparece acima da seção.
- Em `src/lib/schema.ts`, os blocos `aggregateRating` e `review` do JSON-LD
  **só são emitidos** quando `testimonialsArePlaceholder = false` — evitando
  penalização por dados estruturados falsos.

Ao inserir avaliações reais do Google, troque a flag para `false` em
`src/content/business.ts`. Se preferir não ter a seção, remova `<Testimonials />`
de `src/app/page.tsx`.

### Sobre as imagens

`/public/images/**` contém composições SVG geradas por
`scripts/generate-placeholders.mjs`, na paleta da marca. Elas seguram o layout
sem causar CLS, mas não são fotos.

Para trocar por fotos reais:

1. Coloque os arquivos (`.webp` de preferência) em `/public/images/`.
2. Atualize `image`/`src` e os textos `alt` em `src/content/business.ts`.
   Mantenha `width`/`height` iguais aos reais em `gallery`.
3. Em `next.config.mjs`, remova `dangerouslyAllowSVG`,
   `contentDispositionType` e `contentSecurityPolicy` — só existem para permitir
   os placeholders SVG.

---

## Arquitetura

```
src/
├── app/
│   ├── layout.tsx            metadados, fontes, JSON-LD, providers
│   ├── page.tsx              composição das seções
│   ├── opengraph-image.tsx   OG image PNG gerada em build
│   ├── sitemap.ts / robots.ts
│   └── globals.css           tokens de tema (claro/escuro)
├── components/
│   ├── ui/                   primitivas (Button, Accordion, campos de form)
│   ├── common/               Reveal, Section, Lightbox, tema, FABs, logo
│   ├── layout/               Navbar (+ menu mobile), Footer
│   └── sections/             uma seção por arquivo
├── content/business.ts       ← todo o conteúdo
└── lib/                      utils + gerador de Schema.org
```

O conteúdo é dado, não markup: adicionar um serviço, uma pergunta no FAQ ou uma
foto na galeria é editar um array — nenhum componente muda.

## Decisões técnicas

**Formulário sem backend.** `ContactForm` valida com Zod + React Hook Form e
abre o WhatsApp com a mensagem já montada. Não há armazenamento de dados, o que
elimina a superfície de LGPD do site. Se um dia existir uma API, basta trocar o
corpo de `onSubmit`.

**Swiper foi deixado de fora.** O briefing pedia Swiper *e* Embla. Carregar duas
bibliotecas de carrossel para um único slider custaria ~40 kB de JS a troco de
nada, contra a meta de Lighthouse > 95. Ficou só o Embla, que é mais leve.

**Glassmorphism só onde há algo por baixo:** navbar sobre o conteúdo rolando e o
cartão flutuante sobre a foto do hero. Em fundo chapado ele vira ruído.

**Acessibilidade.** Skip link, foco visível em tudo, `aria-label` nos controles
de ícone, lightbox operável por teclado (Esc / ← / →), navegação anunciada por
`aria-current`, e `prefers-reduced-motion` desliga as animações de verdade — não
só as encurta.

## Deploy

Build 100% estático. Em Vercel, importar o repositório e apontar o *root
directory* para `ducher/`. Antes: ajustar `brand.siteUrl` para o domínio final.
