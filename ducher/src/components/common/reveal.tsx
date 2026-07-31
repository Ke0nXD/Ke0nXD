'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direção de entrada do elemento. */
  direction?: Direction;
  /** Atraso em segundos — útil para escalonar itens irmãos. */
  delay?: number;
  duration?: number;
  /** Fração do elemento visível antes de disparar. */
  amount?: number;
  as?: ElementType;
};

/**
 * Envelope de scroll reveal. Anima uma única vez e, quando o usuário pede
 * menos movimento, entrega o conteúdo estático em vez de suprimi-lo.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.25,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, ...OFFSET[direction], filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reduceMotion ? 0.2 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

/** Container que escalona a entrada dos filhos. Use com `RevealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  amount = 0.2,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: ElementType;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  direction = 'up',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, ...OFFSET[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: reduceMotion ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
