/**
 * Gera um sprite SVG contendo APENAS os ícones Lucide usados no site.
 * Evita carregar o pacote UMD completo (~400 KB) só para desenhar ~30 ícones.
 */
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = require.resolve('lucide/package.json').replace('/package.json', '');

const ICONS = [
  'menu', 'x', 'arrow-right', 'arrow-up-right', 'arrow-down', 'arrow-left',
  'plus', 'minus', 'chevron-down', 'chevron-left', 'chevron-right',
  'star', 'check', 'quote', 'phone', 'mail', 'map-pin', 'clock',
  'message-circle', 'send', 'external-link', 'sparkles', 'waves-horizontal', 'dumbbell',
  'moon', 'gift', 'heart-handshake', 'ruler', 'shield-check', 'truck', 'store',
  'recycle', 'gem', 'leaf', 'badge-check', 'users', 'calendar-check',
  'credit-card', 'move-horizontal', 'hand-heart', 'scissors',
  'package', 'eye', 'maximize-2', 'sun', 'award',
];

/** O módulo ESM do Lucide exporta um array [tag, attrs] por nó do ícone. */
async function iconToSymbol(name) {
  const { default: nodes } = await import(`${root}/dist/esm/icons/${name}.mjs`);
  const body = nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== 'key')
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${a}/>`;
    })
    .join('');
  return `<symbol id="i-${name}" viewBox="0 0 24 24">${body}</symbol>`;
}

const symbols = await Promise.all(ICONS.map(iconToSymbol));

const brand = [
  '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" stroke="none"/></symbol>',
  '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M3 21l1.35-4.4A8.5 8.5 0 1 1 7.6 19.7L3 21z"/><path d="M9.2 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.3 0 .5-.1.6l-.4.5c-.1.2-.2.3-.1.5.4.8 1.4 1.8 2.3 2.2.2.1.4 0 .5-.1l.5-.5c.2-.2.4-.2.6-.1l1.6.8c.3.2.4.3.4.5 0 .8-.6 1.5-1.3 1.6-.6.1-1.3.2-3.4-.8-2.5-1.2-4-3.8-4.1-4-.1-.2-.9-1.3-.9-2.4s.6-1.7.8-1.9z"/></symbol>',
];

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true"
 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
${[...symbols, ...brand].join('\n')}
</svg>
`;

await writeFile(process.argv[2], sprite, 'utf8');
console.log(`sprite: ${ICONS.length} ícones, ${(sprite.length / 1024).toFixed(1)} KB`);
