/**
 * Gera as imagens do site como SVG vetorial — leves, nítidas em qualquer tela
 * e trocáveis por fotos reais depois (mesmo nome, extensão diferente).
 *
 * Motivo: o ambiente de build não tem acesso às fotos do Instagram da marca.
 * O motivo visual ("seda drapeada") foi desenhado para conversar com o
 * segmento — lingerie, moda praia e fitness — sem parecer placeholder genérico.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = process.argv[2];

const PALETTE = {
  ink: '#14100E',
  inkSoft: '#2A2422',
  cream: '#F7F2ED',
  sand: '#EFE4DC',
  taupe: '#D8BFB4',
  rose: '#A9646F',
  roseDeep: '#7E4550',
  gold: '#C8A96B',
};

/** PRNG determinístico: o mesmo nome de arquivo gera sempre a mesma arte. */
function rng(seed) {
  let s = [...String(seed)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Uma faixa de tecido: curva de Bézier fechada, com espessura variável. */
function ribbon(rand, w, h, i) {
  const y = h * (0.12 + 0.2 * i) + rand() * h * 0.12;
  const amp = h * (0.10 + rand() * 0.14);
  const thick = h * (0.10 + rand() * 0.16);
  const x1 = w * 0.28 + rand() * w * 0.2;
  const x2 = w * 0.62 + rand() * w * 0.2;
  const top = `M ${-w * 0.1} ${y} C ${x1} ${y - amp}, ${x2} ${y + amp}, ${w * 1.1} ${y - amp * 0.4}`;
  const bottom = `L ${w * 1.1} ${y - amp * 0.4 + thick} C ${x2} ${y + amp + thick}, ${x1} ${y - amp + thick}, ${-w * 0.1} ${y + thick} Z`;
  return top + ' ' + bottom;
}

function silk({ w, h, seed, tone = 'light', label }) {
  const rand = rng(seed);
  const dark = tone === 'dark';

  const bgA = dark ? PALETTE.ink : PALETTE.sand;
  const bgB = dark ? PALETTE.inkSoft : PALETTE.taupe;

  /* A ordem das faixas gira por seed: sem isso todas as peças saem iguais. */
  const base = dark
    ? [PALETTE.roseDeep, PALETTE.rose, PALETTE.gold, PALETTE.taupe]
    : [PALETTE.rose, PALETTE.taupe, PALETTE.gold, PALETTE.roseDeep];
  const shift = Math.floor(rand() * base.length);
  const ribbonTones = base.map((_, i) => base[(i + shift) % base.length]);

  const count = 4 + Math.floor(rand() * 2);
  const ribbons = Array.from({ length: count }, (_, i) => {
    const c = ribbonTones[i % ribbonTones.length];
    const o = (dark ? 0.42 : 0.58) + rand() * 0.3;
    const path = ribbon(rand, w, h, i);
    /* A linha fina sobre a faixa sugere a dobra do tecido. */
    return `<path d="${path}" fill="url(#rb${i})" opacity="${o.toFixed(2)}"/>
      <path d="${path}" fill="none" stroke="${c}" stroke-opacity="0.28" stroke-width="1.5"/>`;
  }).join('\n    ');

  const ribbonDefs = Array.from({ length: count }, (_, i) => {
    const a = ribbonTones[i % ribbonTones.length];
    const b = ribbonTones[(i + 2) % ribbonTones.length];
    return `<linearGradient id="rb${i}" x1="0" y1="0" x2="1" y2="${(0.3 + rand()).toFixed(2)}">
      <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}" stop-opacity="0.35"/>
    </linearGradient>`;
  }).join('\n    ');

  const glowX = (20 + rand() * 60).toFixed(0);
  const glowY = (18 + rand() * 40).toFixed(0);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"
  role="img" aria-label="${label}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stop-color="${bgA}"/><stop offset="100%" stop-color="${bgB}"/>
    </linearGradient>
    ${ribbonDefs}
    <radialGradient id="glow" cx="${glowX}%" cy="${glowY}%" r="58%">
      <stop offset="0%" stop-color="${dark ? PALETTE.rose : PALETTE.cream}" stop-opacity="${dark ? 0.35 : 0.6}"/>
      <stop offset="100%" stop-color="${dark ? PALETTE.rose : PALETTE.cream}" stop-opacity="0"/>
    </radialGradient>
    <!-- Desfoque suficiente para o tecido “cair”, não tanto que vire mancha. -->
    <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${(Math.min(w, h) * 0.008).toFixed(1)}"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${Math.floor(rand() * 99)}"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g filter="url(#soften)">
    ${ribbons}
  </g>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="${dark ? 0.1 : 0.06}" style="mix-blend-mode:overlay"/>
</svg>
`;
}

/** Avatar monograma para depoimentos — sem foto de pessoa real inventada. */
function avatar(initials, seed) {
  const rand = rng(seed);
  const tones = [
    [PALETTE.taupe, PALETTE.rose],
    [PALETTE.sand, PALETTE.taupe],
    [PALETTE.rose, PALETTE.roseDeep],
    [PALETTE.gold, PALETTE.taupe],
  ][Math.floor(rand() * 4)];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Monograma ${initials}">
  <defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${tones[0]}"/><stop offset="100%" stop-color="${tones[1]}"/>
  </linearGradient></defs>
  <rect width="120" height="120" rx="60" fill="url(#a)"/>
  <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
    font-family="Georgia, 'Times New Roman', serif" font-size="42" fill="${PALETTE.ink}" fill-opacity="0.62">${initials}</text>
</svg>
`;
}

const jobs = [];
const add = (path, content) => jobs.push({ path, content });

// Hero + CTA + Sobre
add('hero.svg', silk({ w: 1600, h: 2000, seed: 'hero', tone: 'dark', label: 'Tecido drapeado em tons profundos' }));
add('sobre.svg', silk({ w: 1200, h: 1500, seed: 'sobre', label: 'Ateliê da loja em tons de areia' }));
add('cta.svg', silk({ w: 1800, h: 1000, seed: 'cta', tone: 'dark', label: 'Composição têxtil em tom profundo' }));
add('og.svg', silk({ w: 1200, h: 630, seed: 'og', tone: 'dark', label: "DU'CHER" }));

// Coleções
for (const s of ['lingerie', 'moda-praia', 'moda-fitness', 'pijamas', 'consultoria', 'presentes']) {
  add(`colecoes/${s}.svg`, silk({ w: 900, h: 1100, seed: `col-${s}`, label: `Coleção ${s.replace('-', ' ')}` }));
}

// Galeria — proporções variadas para o masonry respirar
const galleryShapes = [
  [900, 1200], [900, 900], [900, 1350], [900, 1100], [900, 760],
  [900, 1200], [900, 900], [900, 1300], [900, 1000], [900, 1150],
  [900, 820], [900, 1250],
];
galleryShapes.forEach(([w, h], i) => {
  const n = String(i + 1).padStart(2, '0');
  add(`galeria/${n}.svg`, silk({ w, h, seed: `gal-${n}`, tone: i % 4 === 3 ? 'dark' : 'light', label: `Peça ${n} da curadoria` }));
});

// Antes e depois (caimento errado × caimento certo)
add('comparativo/antes.svg', silk({ w: 1400, h: 900, seed: 'antes', label: 'Caimento antes do ajuste' }));
add('comparativo/depois.svg', silk({ w: 1400, h: 900, seed: 'depois-x', tone: 'dark', label: 'Caimento depois do ajuste' }));

// Avatares dos depoimentos
[['AC', 1], ['JP', 2], ['FS', 3], ['ML', 4], ['PR', 5], ['RC', 6]].forEach(([ini, s]) =>
  add(`avatares/${ini.toLowerCase()}.svg`, avatar(ini, `av-${s}`))
);

for (const job of jobs) {
  const full = `${OUT}/${job.path}`;
  await mkdir(full.slice(0, full.lastIndexOf('/')), { recursive: true });
  await writeFile(full, job.content, 'utf8');
}
console.log(`${jobs.length} imagens geradas`);
