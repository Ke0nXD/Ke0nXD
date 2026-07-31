# DU'CHER — site institucional

Landing page de página única para a DU'CHER (lingerie, moda praia e moda fitness,
Lagoa da Prata/MG). HTML5 estático, sem framework e sem build obrigatório para
rodar: é só servir a pasta.

---

## ⚠️ Antes de publicar — leia isto

**Não foi possível acessar as fontes primárias durante a construção.** O ambiente
de build bloqueia `instagram.com` e `maps.app.goo.gl` (403 no CONNECT do proxy),
então nada abaixo veio do perfil real da loja:

| O quê | Estado | Onde trocar |
| --- | --- | --- |
| Telefone / WhatsApp | **Fictício** (`5537900000000`) | `index.html` — todas as ocorrências |
| Endereço e CEP | **Fictício** | `index.html` (rodapé, JSON-LD, mapa) |
| Horário de funcionamento | **Fictício** | `index.html` (rodapé + JSON-LD) |
| E-mail e domínio | **Fictício** (`ducher.com.br`) | `index.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest` |
| Depoimentos | **Fictícios** | `index.html` → seção `#depoimentos` |
| Ano de fundação e linha do tempo | Não confirmados | `index.html` → seção `#sobre` |
| Fotos | Arte vetorial gerada | `assets/images/` |

Dois pontos merecem atenção especial:

1. **Os depoimentos são exemplos, não avaliações reais.** Publicá-los como se
   fossem de clientes é propaganda enganosa. Substitua por avaliações reais (com
   autorização de quem escreveu) ou remova a seção inteira.
2. **Não há `AggregateRating` no Schema.org de propósito.** Marcar nota e número
   de avaliações sem dados reais viola as diretrizes do Google e pode render
   penalização manual. Adicione só quando tiver os números verdadeiros.

Busca rápida pelos pontos a trocar:

```bash
grep -rn "5537900000000\|ducher.com.br\|Avenida Brasil, 600\|35590-000" index.html
```

---

## Como rodar

```bash
npm install      # só para os scripts de build (Tailwind, ícones, imagens)
npm run serve    # http://localhost:4173
```

Para editar só conteúdo e estilo, nem precisa do Node: abra `index.html` num
servidor estático qualquer. O `npm` entra em cena apenas quando você mexe nos
tokens do Tailwind, na lista de ícones ou nas imagens geradas.

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run build` | Roda os três passos abaixo |
| `npm run build:css` | Compila `css/src/tailwind.css` → `css/tailwind.css` (minificado) |
| `npm run build:icons` | Gera o sprite Lucide e o embute no `index.html` |
| `npm run build:images` | Regenera as imagens SVG em `assets/images/` |
| `npm run dev` | Tailwind em modo `--watch` |

---

## Estrutura

```
.
├── assets/
│   ├── fonts/          Fraunces + Inter (woff2, subsets latin/latin-ext)
│   ├── icons/          favicon + sprite Lucide (fonte para o build)
│   ├── images/         Arte gerada: herói, coleções, galeria, avatares
│   └── videos/         (vazio — reservado para vídeo de fundo, se houver)
├── css/
│   ├── src/tailwind.css   Design tokens (@theme) — entrada do build
│   ├── fonts.css          @font-face das fontes auto-hospedadas
│   ├── tailwind.css       Gerado — não editar à mão
│   └── style.css          Componentes (escrito à mão)
├── js/
│   ├── script.js       Comportamento, estado e acessibilidade
│   └── animations.js   GSAP, ScrollTrigger, SplitText, Lenis, anime.js
├── libs/               Bibliotecas versionadas localmente
├── tools/              Geradores de sprite e de imagens
├── index.html
├── robots.txt · sitemap.xml · site.webmanifest
└── package.json
```

### Por que o Tailwind está dividido em dois arquivos

`css/src/tailwind.css` declara o design system num bloco `@theme`: cores,
famílias tipográficas, escala fluida de texto, sombras, easings e espaçamentos.
O Tailwind compila isso em custom properties (`--color-ink`, `--text-h2`…) e nas
classes utilitárias.

`css/style.css` é escrito à mão e **consome** esses tokens via `var()`. Nenhum
valor de cor ou tipografia é redefinido lá — mudar um token no `@theme` propaga
para o site inteiro. A alternativa (encher o HTML de utilitários) deixaria o
markup ilegível numa página com este volume de componentes.

Ordem de carregamento, que importa: `fonts.css` → `tailwind.css` → `style.css`.

---

## Stack

| Camada | Escolha | Observação |
| --- | --- | --- |
| Estilo | TailwindCSS 4 (CSS-first) + CSS próprio | Compilado, sem CDN em runtime |
| Movimento | GSAP 3 + ScrollTrigger + SplitText | SplitText é gratuito desde o GSAP 3.13 |
| Scroll suave | Lenis | Desligado sob `prefers-reduced-motion` |
| Loops orgânicos | anime.js 4 | Formas flutuantes e cascata do menu |
| Ícones | Lucide | Sprite com os ~46 ícones usados, embutido |
| Fontes | Fraunces + Inter (Google Fonts) | Auto-hospedadas — zero requisição externa |

Sem Bootstrap e sem jQuery, conforme especificado.

Tudo é servido do próprio domínio: nenhuma requisição sai para CDN, o que evita
uma rodada extra de DNS/TLS no carregamento e mantém o site funcionando offline.
A única exceção é o `<iframe>` do Google Maps, no rodapé, carregado com `lazy`.

### Atualizar as bibliotecas

Os arquivos em `libs/` foram copiados dos pacotes npm. Para atualizar:

```bash
npm i gsap@latest lenis@latest animejs@latest
cp node_modules/gsap/dist/{gsap,ScrollTrigger,SplitText}.min.js libs/gsap/
cp node_modules/lenis/dist/lenis.min.js                          libs/lenis/
cp node_modules/animejs/dist/bundles/anime.umd.min.js            libs/anime/
```

---

## Como o movimento está organizado

`script.js` cuida de comportamento; `animations.js` cuida de movimento. A ponte
entre os dois é `window.DUCHER`:

```js
DUCHER.utils   // helpers compartilhados ($, $$, clamp, media queries)
DUCHER.lenis   // instância do scroll suave (ou undefined)
DUCHER.fx      // efeitos que animations.js registra e script.js chama
DUCHER.refresh // ScrollTrigger.refresh(), para depois de mudar o layout
```

O contrato é de degradação: `script.js` sempre checa se o efeito existe antes de
chamar e cai num equivalente em CSS/Web Animations quando não existe. Na prática:

- **Sem `animations.js`** → o site continua navegável, com transições CSS.
- **Sem JavaScript** → tudo aparece; a classe `anim-ready` (que esconde o
  conteúdo para animar) só é adicionada por um script inline no `<head>`.
- **Sem GSAP** → `script.js` remove `anim-ready`, garantindo que nada fique
  invisível esperando uma animação que não vai rodar.
- **Com `prefers-reduced-motion`** → `animations.js` pinta o estado final e sai;
  contadores mostram o número, timelines aparecem completas, sem loops.

### Hooks de animação (atributos `data-*`)

| Atributo | Efeito |
| --- | --- |
| `data-reveal` | Entrada ao entrar na viewport. `="stagger"` anima os filhos em cascata; `="right"` desliza da direita |
| `data-split` | Título revelado linha a linha com SplitText (letra por letra no herói) |
| `data-parallax="0.2"` | Parallax vertical proporcional ao scroll |
| `data-count="100"` | Número animado; `data-suffix` e `data-plain` ajustam a formatação |
| `data-tilt` | Inclinação 3D seguindo o ponteiro (`data-tilt-max` limita o ângulo) |
| `data-magnetic` | Elemento atraído pelo cursor |
| `data-float="1.4"` | Camada de parallax de mouse + deriva contínua |
| `data-cursor="Ver"` | Rótulo exibido dentro do cursor customizado |
| `data-ripple` | Ondulação a partir do ponto do clique |

---

## Acessibilidade

- HTML semântico com landmarks e um `<h1>` único; hierarquia de headings contínua.
- Skip link para o conteúdo, foco visível em tudo que é focável.
- Menu mobile com foco preso, fechamento por `Esc` e devolução do foco ao gatilho.
- Lightbox operável por teclado (`Esc`, `←`, `→`) e com foco restaurado ao fechar.
- FAQ com `aria-expanded` / `aria-controls`; filtros da galeria com `role="tab"`.
- Todas as imagens têm `alt` descritivo; as decorativas usam `alt=""`.
- Contraste conferido para AA. O rosé claro (`--color-rose`) é decorativo: para
  texto corrido sobre fundo claro use `--color-rose-deep` (6.6:1).
- `prefers-reduced-motion` respeitado em CSS e em JS.

## Performance

- Fontes auto-hospedadas, subsetadas em latin/latin-ext, com `preload` nas duas
  usadas acima da dobra.
- Sprite de ícones embutido: 46 ícones em ~10 KB, contra ~400 KB do pacote UMD.
- CSS do Tailwind compilado e minificado (~12 KB), sem JIT no navegador.
- Imagens em SVG, com `width`/`height` declarados para não causar layout shift.
- Tudo abaixo da dobra com `loading="lazy"`; o herói com `fetchpriority="high"`.
- Scripts com `defer`, na ordem de dependência.

## SEO

Meta tags, Open Graph e Twitter Cards preenchidos; JSON-LD de `ClothingStore` e
`FAQPage`; `robots.txt` e `sitemap.xml` prontos. Ao publicar, troque o domínio
`ducher.com.br` nos quatro arquivos e gere um PNG de 1200×630 para o
`og:image` — algumas redes sociais não renderizam SVG na prévia.

## Navegadores

Chrome/Edge, Firefox e Safari recentes. O layout usa `color-mix()` e
`overflow: clip`; em navegadores sem suporte o site continua legível, apenas com
bordas e sobreposições menos refinadas.
