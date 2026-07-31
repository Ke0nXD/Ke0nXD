import Image from 'next/image';

import { Reveal, RevealGroup, RevealItem } from '@/components/common/reveal';
import { Section } from '@/components/common/section';
import { about, brand } from '@/content/business';

export function About() {
  return (
    <Section id="sobre" ariaLabelledby="sobre-title">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagem + selo de tempo de casa */}
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border/60 shadow-soft sm:aspect-square lg:aspect-[4/5]">
              <Image
                src="/images/sobre.svg"
                alt={`Interior da loja ${brand.name} em ${'Lagoa da Prata'}`}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-3 -top-3 rounded-3xl border border-border bg-card px-6 py-5 text-center shadow-lift sm:-right-6 sm:-top-6">
              <p className="font-display text-3xl font-semibold text-primary">
                {new Date().getFullYear() - brand.foundedYear}+
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                anos de loja
              </p>
            </div>
          </Reveal>

          {/* Texto */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="rule mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {about.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id="sobre-title" className="font-display text-display-sm text-balance">
                {about.title}
              </h2>
            </Reveal>

            <RevealGroup className="mt-7 space-y-5">
              {about.paragraphs.map((paragraph, i) => (
                <RevealItem key={i}>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{paragraph}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
              {[about.mission, about.values, about.vision].map((block) => (
                <RevealItem
                  key={block.title}
                  className="rounded-3xl border border-border bg-card/50 p-5 transition-colors duration-300 hover:border-primary/40"
                >
                  <h3 className="font-display text-lg">{block.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Faixa de números */}
        <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:mt-20 lg:grid-cols-4">
          {about.stats.map((stat) => (
            <RevealItem key={stat.label} className="bg-background p-6 text-center sm:p-8">
              <p className="font-display text-3xl font-semibold sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
