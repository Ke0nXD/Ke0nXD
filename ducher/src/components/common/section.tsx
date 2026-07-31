import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

export function Section({
  id,
  className,
  children,
  ariaLabelledby,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn('relative scroll-mt-24 py-20 sm:py-28 lg:py-32', className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="rule mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 id={id} className="font-display text-display-sm text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
