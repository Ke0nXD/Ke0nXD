'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';

import { Lightbox } from '@/components/common/lightbox';
import { RevealGroup, RevealItem } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import { Button } from '@/components/ui/button';
import { contact, gallery } from '@/content/business';

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="galeria" ariaLabelledby="galeria-title" className="bg-secondary/30">
      <div className="container">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galeria"
          title={
            <>
              Um recorte do que passa <span className="italic text-primary">pela loja</span>
            </>
          }
          description="Coleções, provador e bastidores. As mesmas peças que você encontra no Instagram — agora sem depender do algoritmo."
        />

        {/* Masonry via CSS columns: mantém alturas naturais sem JS de layout. */}
        <RevealGroup className="mt-16 columns-2 gap-4 md:columns-3 lg:gap-5" stagger={0.05}>
          {gallery.map((item, index) => (
            <RevealItem key={item.src} className="mb-4 break-inside-avoid lg:mb-5">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Ampliar imagem: ${item.alt}`}
                className="group relative block w-full overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-soft transition-all duration-500 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  sizes="(max-width: 768px) 46vw, 31vw"
                  className="h-auto w-full object-cover transition-transform duration-900 ease-out group-hover:scale-[1.08]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span className="text-sm font-medium text-white drop-shadow">{item.caption}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm">
                    <Expand className="size-4" />
                  </span>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
              Ver mais no Instagram {contact.instagramHandle}
            </a>
          </Button>
        </div>
      </div>

      <Lightbox
        items={gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </Section>
  );
}
