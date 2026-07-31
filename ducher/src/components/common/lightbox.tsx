'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { GalleryItem } from '@/content/business';

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Lightbox acessível: fecha no Esc e no clique fora, navega com as setas
 * do teclado e devolve o foco ao fechar (o gatilho é um <button> na grade).
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ${index + 1} de ${items.length}: ${current.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[65] flex items-center justify-center bg-neutral-950/92 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar imagem"
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Imagem anterior"
            className="absolute left-3 z-10 grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Próxima imagem"
            className="absolute right-3 z-10 grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>

          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-5xl flex-col items-center gap-4"
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(max-width: 768px) 92vw, 70vw"
              className="max-h-[76vh] w-auto rounded-2xl object-contain shadow-2xl"
              priority
            />
            <figcaption className="text-center text-sm text-white/70">
              {current.caption}
              <span className="ml-3 tabular-nums text-white/40">
                {index + 1}/{items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
