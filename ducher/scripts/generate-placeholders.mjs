/**
 * Gera as imagens placeholder do site.
 *
 * Não foi possível baixar fotos reais do Instagram no ambiente de build, então
 * este script produz composições SVG na paleta da marca — elas ocupam o mesmo
 * espaço das fotos definitivas e mantêm o layout estável (sem CLS).
 *
 * Para publicar com fotos reais: apague os SVGs de /public/images, coloque os
 * .webp/.jpg no lugar e atualize os caminhos em src/content/business.ts.
 *
 * Uso: node scripts/generate-placeholders.mjs
 */

import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'images');

/** Paleta: marfim quente, areia, espresso e rosé. */
const PALETTES = [
  { a: '#F6EDE7', b: '#E3CFC3', c: '#B76E79', ink: '#2A2422' },
  { a: '#EFE4DC', b: '#D8BFB4', c: '#A9646F', ink: '#2A2422' },
  { a: '#F8F2EC', b: '#E8D9CC', c: '#C58C8F', ink: '#2A2422' },
  { a: '#EADFD7', b: '#CDB3A6', c: '#9E5C68', ink: '#241F1D' },
];

function svg({ width, height, label, seed }) {
  const p = PALETTES[seed % PALETTES.length];
  const id = `g${seed}`;
  const cx1 = 24 + ((seed * 37) % 52);
  const cy1 = 20 + ((seed * 53) % 46);
  const cx2 = 30 + ((seed * 71) % 50);
  const cy2 = 40 + ((seed * 29) % 48);
  const r1 = 26 + ((seed * 13) % 18);
  const r2 = 18 + ((seed * 17) % 16);
  const rot = (seed * 23) % 90;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.a}"/>
      <stop offset="100%" stop-color="${p.b}"/>
    </linearGradient>
    <radialGradient id="blob-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.c}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${p.c}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${Math.round(Math.min(width, height) / 22)}"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg-${id})"/>

  <g filter="url(#soft-${id})" opacity="0.9">
    <circle cx="${(cx1 / 100) * width}" cy="${(cy1 / 100) * height}" r="${(r1 / 100) * Math.min(width, height)}" fill="url(#blob-${id})"/>
    <circle cx="${(cx2 / 100) * width}" cy="${(cy2 / 100) * height}" r="${(r2 / 100) * Math.min(width, height)}" fill="${p.a}" opacity="0.5"/>
  </g>

  <g transform="rotate(${rot} ${width / 2} ${height / 2})" opacity="0.13" stroke="${p.ink}" fill="none" stroke-width="1">
    <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.34}" ry="${height * 0.2}"/>
    <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.22}" ry="${height * 0.32}"/>
  </g>

  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="18" fill="none" stroke="${p.ink}" stroke-opacity="0.1"/>

  <text x="50%" y="49%" text-anchor="middle" fill="${p.ink}" fill-opacity="0.72"
        font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(Math.min(width, height) * 0.075)}"
        font-style="italic">DU&#8217;CHER</text>
  <text x="50%" y="57%" text-anchor="middle" fill="${p.ink}" fill-opacity="0.45"
        font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(Math.min(width, height) * 0.032)}"
        letter-spacing="${Math.round(Math.min(width, height) * 0.012)}">${label.toUpperCase()}</text>
</svg>
`;
}

const FILES = [
  { path: 'hero.svg', width: 1000, height: 1250, label: 'coleção', seed: 1 },
  { path: 'sobre.svg', width: 1000, height: 1250, label: 'nossa loja', seed: 2 },

  { path: 'colecoes/lingerie.svg', width: 960, height: 600, label: 'lingerie', seed: 3 },
  { path: 'colecoes/moda-praia.svg', width: 960, height: 600, label: 'moda praia', seed: 4 },
  { path: 'colecoes/moda-fitness.svg', width: 960, height: 600, label: 'moda fitness', seed: 5 },
  { path: 'colecoes/pijamas.svg', width: 960, height: 600, label: 'pijamas', seed: 6 },
  { path: 'colecoes/consultoria.svg', width: 960, height: 600, label: 'consultoria', seed: 7 },
  { path: 'colecoes/presentes.svg', width: 960, height: 600, label: 'presentes', seed: 8 },

  { path: 'galeria/01.svg', width: 900, height: 1200, label: 'vitrine', seed: 9 },
  { path: 'galeria/02.svg', width: 900, height: 900, label: 'renda', seed: 10 },
  { path: 'galeria/03.svg', width: 900, height: 1350, label: 'fitness', seed: 11 },
  { path: 'galeria/04.svg', width: 900, height: 1100, label: 'praia', seed: 12 },
  { path: 'galeria/05.svg', width: 900, height: 700, label: 'loja', seed: 13 },
  { path: 'galeria/06.svg', width: 900, height: 1200, label: 'presente', seed: 14 },
  { path: 'galeria/07.svg', width: 900, height: 900, label: 'homewear', seed: 15 },
  { path: 'galeria/08.svg', width: 900, height: 1300, label: 'provador', seed: 16 },
  { path: 'galeria/09.svg', width: 900, height: 1000, label: 'coleção', seed: 17 },
];

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="#B76E79"/>
  <text x="32" y="45" text-anchor="middle" fill="#ffffff"
        font-family="Georgia, serif" font-size="38" font-weight="600">D</text>
</svg>
`;

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // Roda como `prebuild`, então por padrão não sobrescreve nada: se você já
  // trocou um placeholder por foto real, ele fica. Use --force para regerar.
  const force = process.argv.includes('--force');
  let written = 0;
  let kept = 0;

  for (const file of FILES) {
    const target = join(OUT, file.path);
    if (!force && (await exists(target))) {
      kept++;
      continue;
    }
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, svg(file), 'utf8');
    written++;
  }

  const favicon = join(ROOT, 'public', 'favicon.svg');
  if (force || !(await exists(favicon))) {
    await writeFile(favicon, FAVICON, 'utf8');
    written++;
  } else {
    kept++;
  }

  console.log(`✓ placeholders: ${written} gerado(s), ${kept} preservado(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
