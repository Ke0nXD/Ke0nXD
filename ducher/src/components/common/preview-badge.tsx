import { AlertTriangle } from 'lucide-react';

import { isPreview } from '@/lib/site-env';

/**
 * Selo de prévia. Aparece enquanto NEXT_PUBLIC_SITE_INDEXABLE não for `true`,
 * deixando explícito que telefone, endereço, horários, fotos e depoimentos
 * ainda são provisórios — para ninguém confundir esta URL com o site oficial.
 */
export function PreviewBadge() {
  if (!isPreview) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 max-w-[min(20rem,calc(100vw-6rem))] sm:bottom-7 sm:left-7">
      <p className="flex items-start gap-2.5 rounded-2xl border border-amber-500/40 bg-amber-50/90 px-4 py-3 text-xs leading-relaxed text-amber-900 shadow-soft backdrop-blur-sm dark:bg-amber-950/80 dark:text-amber-100">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          <strong className="font-semibold">Prévia de layout.</strong> Contato, horários, fotos e
          depoimentos são provisórios e não representam a loja.
        </span>
      </p>
    </div>
  );
}
