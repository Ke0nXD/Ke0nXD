'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, MessageCircle, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  brand,
  contact,
  googleRating,
  waMessages,
  whatsappUrl,
} from '@/content/business';

const HEADLINE = ['A', 'peça', 'certa', 'muda', 'o', 'jeito'];
const HEADLINE_ACCENT = ['que', 'você', 'se', 'olha.'];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const wordVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: '55%' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.85,
        delay: reduceMotion ? 0 : 0.35 + i * 0.06,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Camadas decorativas de fundo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
        <div className="absolute -left-40 top-[-10%] size-[38rem] rounded-full bg-primary/12 blur-[110px] motion-safe:animate-float" />
        <div className="absolute -right-32 bottom-[-15%] size-[32rem] rounded-full bg-accent/50 blur-[110px]" />
        <div className="absolute inset-0 bg-grain opacity-[0.035] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen" />
      </div>

      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Coluna de texto */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border/70 glass px-4 py-2 text-xs font-medium"
            >
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              <span className="text-muted-foreground">
                {contact.address.city}/{contact.address.state}
              </span>
              <span className="h-3 w-px bg-border" aria-hidden="true" />
              <span className="uppercase tracking-[0.16em] text-primary">{brand.tagline}</span>
            </motion.div>

            <h1 id="hero-title" className="font-display text-display-md text-balance">
              <span className="sr-only">
                {brand.name} — {brand.slogan}
              </span>
              <span aria-hidden="true" className="block">
                {HEADLINE.map((word, i) => (
                  <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <motion.span
                      className="inline-block"
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
                {HEADLINE_ACCENT.map((word, i) => (
                  <span key={`${word}-a-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <motion.span
                      className="inline-block italic text-primary"
                      custom={HEADLINE.length + i}
                      variants={wordVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {brand.shortDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.02, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" variant="default">
                <a href={whatsappUrl(waMessages.quote)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#atendimento">
                  Agendar atendimento
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-foreground">
                    {googleRating.value.toFixed(1).replace('.', ',')}
                  </strong>{' '}
                  no Google
                </span>
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
              <span>Provador reservado, sem hora marcada</span>
            </motion.div>
          </div>

          {/* Composição visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border/60 shadow-lift">
              <Image
                src="/images/hero.svg"
                alt={`Composição de peças da ${brand.name} — lingerie, moda praia e moda fitness`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 88vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            {/* Cartão flutuante em glass — só aqui, onde há imagem por baixo. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 left-4 right-4 rounded-3xl border border-white/25 glass p-5 shadow-lift sm:left-8 sm:right-auto sm:w-72"
            >
              <p className="font-display text-lg leading-snug">Do PP ao G4</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Grade ampliada em todas as linhas — e encomenda quando faltar o seu.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-primary"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  );
}
