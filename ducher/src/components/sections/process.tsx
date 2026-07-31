'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { RevealItem, RevealGroup } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import { processSteps } from '@/content/business';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  // A linha da timeline se preenche conforme a seção atravessa a viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const height = useTransform(progress, [0, 1], ['0%', '100%']);
  const width = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <Section id="atendimento" ariaLabelledby="atendimento-title" className="bg-secondary/30">
      <div className="container">
        <SectionHeading
          id="atendimento-title"
          eyebrow="Como funciona"
          title={
            <>
              Do primeiro <span className="italic text-primary">oi</span> à peça na sacola
            </>
          }
          description="Quatro etapas, nenhuma delas apressada. Você define o ritmo — a gente só garante que nada saia daqui sem servir."
        />

        <div ref={containerRef} className="relative mt-16">
          {/* Trilho vertical (mobile / tablet) */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px bg-border lg:hidden"
          >
            <motion.div style={{ height }} className="w-full bg-primary" />
          </div>

          {/*
            Trilho horizontal (desktop). Começa e termina no centro dos ícones
            das pontas — 1.75rem é metade da bolha (size-14), e cada coluna
            ocupa 25% da largura.
          */}
          <div
            aria-hidden="true"
            className="absolute left-7 right-[calc(25%-1.75rem)] top-7 hidden h-px bg-border lg:block"
          >
            <motion.div style={{ width }} className="h-full bg-primary" />
          </div>

          <RevealGroup
            as="ol"
            className="relative grid gap-10 lg:grid-cols-4 lg:gap-8"
            stagger={0.12}
          >
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <RevealItem
                  as="li"
                  key={step.title}
                  className="relative flex gap-5 lg:flex-col lg:gap-0"
                >
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-border bg-background text-primary shadow-soft transition-colors duration-500 lg:size-14">
                    <Icon className="size-5" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-primary text-[11px] font-semibold tabular-nums text-primary-foreground">
                      {i + 1}
                    </span>
                  </span>

                  <div className="pt-1 lg:pt-7">
                    <h3 className="font-display text-xl">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
