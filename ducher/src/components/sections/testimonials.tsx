'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

import { Reveal } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import { Button } from '@/components/ui/button';
import {
  googleRating,
  testimonials,
  testimonialsArePlaceholder,
  type Testimonial,
} from '@/content/business';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: 'trimSnaps' },
    [Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Section id="depoimentos" ariaLabelledby="depoimentos-title">
      <div className="container">
        <SectionHeading
          id="depoimentos-title"
          eyebrow="Depoimentos"
          title={
            <>
              O que dizem <span className="italic text-primary">quem já provou</span>
            </>
          }
          description={`Avaliações de clientes no Google — média ${googleRating.value
            .toFixed(1)
            .replace('.', ',')} em ${googleRating.count} avaliações.`}
        />

        {/*
          Aviso visível apenas em desenvolvimento: impede que depoimentos
          fictícios cheguem à produção sem alguém notar.
        */}
        {process.env.NODE_ENV === 'development' && testimonialsArePlaceholder && (
          <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-center text-sm text-destructive">
            <strong>Aviso de desenvolvimento:</strong> os depoimentos abaixo são fictícios
            (<code>testimonialsArePlaceholder = true</code>). Substitua por avaliações reais do
            Google antes de publicar.
          </p>
        )}

        <Reveal className="mt-14" amount={0.1}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y gap-5">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Depoimento anterior"
            className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={selected === i}
                aria-label={`Ir para o depoimento ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-400',
                  selected === i ? 'w-7 bg-primary' : 'w-1.5 bg-border hover:bg-primary/40'
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Próximo depoimento"
            className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="ghost" size="sm">
            <a href={googleRating.url} target="_blank" rel="noopener noreferrer">
              Ver todas as avaliações no Google
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
      <Quote className="size-7 text-primary/30" aria-hidden="true" />

      <div
        className="mt-4 flex gap-0.5"
        role="img"
        aria-label={`Avaliação: ${item.rating} de 5 estrelas`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn(
              'size-4',
              i < item.rating ? 'fill-primary text-primary' : 'text-border'
            )}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        &ldquo;{item.text}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-sm font-semibold text-primary"
        >
          {item.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">{item.name}</span>
          <span className="block text-xs text-muted-foreground">
            {item.source} · {item.date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
