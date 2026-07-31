import { cn } from '@/lib/utils';
import { brand } from '@/content/business';

/**
 * Marca tipográfica. É SVG inline de propósito: nenhum request extra,
 * herda a cor do tema e escala sem perda.
 *
 * Se a DU'CHER tiver um logotipo oficial, troque o conteúdo do <svg>
 * pelo arquivo real mantendo o mesmo viewBox e o <title>.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 44"
      role="img"
      aria-label={`${brand.name} — ${brand.tagline}`}
      className={cn('h-8 w-auto text-foreground', className)}
      fill="none"
    >
      <title>{brand.name}</title>
      <text
        x="0"
        y="27"
        fill="currentColor"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="30"
        fontWeight="600"
        letterSpacing="3.5"
      >
        DU&apos;CHER
      </text>
      <text
        x="2"
        y="40"
        fill="hsl(var(--primary))"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="7"
        fontWeight="600"
        letterSpacing="4.4"
      >
        LINGERIE · PRAIA · FITNESS
      </text>
    </svg>
  );
}

/** Monograma quadrado — favicon, avatar, rodapé compacto. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg font-semibold text-primary-foreground',
        className
      )}
    >
      D
    </span>
  );
}
