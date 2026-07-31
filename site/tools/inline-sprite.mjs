/**
 * Injeta o sprite de ícones no index.html, entre os marcadores.
 *
 * Por que inline e não <use href="arquivo.svg#id">: referência externa em SVG
 * é bloqueada quando a página é aberta via file:// e custa uma requisição a
 * mais. Com ~10 KB, embutir sai mais barato que buscar.
 */
import { readFile, writeFile } from 'node:fs/promises';

const [spritePath, htmlPath] = process.argv.slice(2);

const sprite = (await readFile(spritePath, 'utf8')).trim();
const html = await readFile(htmlPath, 'utf8');

const START = '<!-- @sprite -->';
const END = '<!-- /@sprite -->';

const block = `${START}\n${sprite}\n${END}`;
const existing = new RegExp(`${START}[\\s\\S]*?${END}`);

let out;
if (existing.test(html)) out = html.replace(existing, block);
else if (html.includes(START)) out = html.replace(START, block);
else throw new Error(`Marcador ${START} não encontrado em ${htmlPath}`);

await writeFile(htmlPath, out, 'utf8');
console.log(`sprite embutido em ${htmlPath}`);
