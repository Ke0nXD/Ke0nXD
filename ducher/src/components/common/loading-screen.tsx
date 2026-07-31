'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { brand } from '@/content/business';

/**
 * Cortina de entrada. Some assim que a página termina de carregar (ou após
 * um teto curto, para nunca segurar o conteúdo). É puramente decorativa:
 * fica marcada como aria-hidden e não bloqueia leitores de tela, e some
 * imediatamente para quem prefere menos movimento.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const hide = () => setVisible(false);
    // Teto de segurança: a cortina nunca dura mais que 1,6s.
    const timer = window.setTimeout(hide, 1600);

    if (document.readyState === 'complete') {
      const quick = window.setTimeout(hide, 650);
      return () => {
        window.clearTimeout(timer);
        window.clearTimeout(quick);
      };
    }

    window.addEventListener('load', hide);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', hide);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[70] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.p
              initial={{ opacity: 0, y: 10, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl font-semibold sm:text-4xl"
            >
              {brand.name}
            </motion.p>
            <div className="h-px w-40 overflow-hidden bg-border">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/2 bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
