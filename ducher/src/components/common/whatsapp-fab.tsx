'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';

import { contact, waMessages, whatsappUrl } from '@/content/business';
import { cn } from '@/lib/utils';

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

/**
 * Par de ações flutuantes: WhatsApp (sempre visível, com balão de convite que
 * aparece uma vez) e voltar ao topo (aparece depois de rolar).
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (bubbleDismissed) return;
    const timer = window.setTimeout(() => setShowBubble(true), 6000);
    return () => window.clearTimeout(timer);
  }, [bubbleDismissed]);

  const dismissBubble = () => {
    setShowBubble(false);
    setBubbleDismissed(true);
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            key="to-top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo da página"
            className="pointer-events-auto grid size-11 place-items-center rounded-full border border-border glass text-foreground shadow-soft transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowUp className="size-[18px]" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto flex items-center gap-2">
        <AnimatePresence>
          {showBubble && (
            <motion.div
              key="bubble"
              initial={{ opacity: 0, x: 16, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative hidden max-w-64 rounded-2xl rounded-br-md border border-border bg-card px-4 py-3 pr-9 text-sm shadow-lift sm:block"
            >
              <p className="leading-snug text-muted-foreground">
                Dúvida de tamanho? Manda mensagem — respondemos no horário da loja.
              </p>
              <button
                type="button"
                onClick={dismissBubble}
                aria-label="Fechar aviso"
                className="absolute right-2 top-2 grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={whatsappUrl(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismissBubble}
          aria-label={`Conversar com a ${'DU’CHER'} pelo WhatsApp (${contact.phoneDisplay})`}
          className={cn(
            'relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105 active:scale-95'
          )}
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366]/60 motion-safe:animate-pulse-ring" aria-hidden="true" />
          <WhatsAppGlyph className="relative size-7" />
        </a>
      </div>
    </div>
  );
}

export { WhatsAppGlyph };
