import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';

import { RevealGroup, RevealItem } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import { Button } from '@/components/ui/button';
import { services, waMessages, whatsappUrl } from '@/content/business';

export function Services() {
  return (
    <Section id="colecoes" ariaLabelledby="colecoes-title" className="bg-secondary/30">
      <div className="container">
        <SectionHeading
          id="colecoes-title"
          eyebrow="O que você encontra"
          title={
            <>
              Coleções escolhidas peça por peça,{' '}
              <span className="italic text-primary">não por catálogo</span>
            </>
          }
          description="Cada linha tem grade ampliada e provador liberado. Se não servir, a gente troca — mas a ideia é acertar antes de você levar para casa."
        />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="object-cover transition-transform duration-900 ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                    <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-2xl border border-white/25 bg-white/85 text-primary shadow-soft backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 dark:bg-neutral-900/80">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild variant="outline" size="sm" className="mt-7 w-full">
                      <a
                        href={whatsappUrl(waMessages.service(service.title))}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Consultar {service.title.toLowerCase()}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
