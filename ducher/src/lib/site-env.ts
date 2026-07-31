/**
 * Trava de indexação.
 *
 * O padrão é NÃO indexar. Só quando a variável for explicitamente `true` o
 * site libera robôs de busca — assim um deploy de prévia nunca vaza para o
 * Google por esquecimento. É o inverso do padrão usual, de propósito: o erro
 * silencioso aqui (indexar um site com dados provisórios) é bem mais caro que
 * o erro barulhento (esquecer de ligar e não aparecer na busca).
 *
 * Para o deploy definitivo, defina na Vercel:
 *   NEXT_PUBLIC_SITE_INDEXABLE=true
 */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

/** Verdadeiro em qualquer build que ainda não é o site oficial. */
export const isPreview = !isIndexable;
