'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

import { Logo } from '@/components/common/logo';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import { navigation, waMessages, whatsappUrl, contact } from '@/content/business';
import { cn } from '@/lib/utils';

const SECTION_IDS = navigation.map((item) => item.href.replace('#', ''));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('inicio');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca no menu a seção que está ocupando a faixa central da viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'border-b border-border/60 glass py-2' : 'border-b border-transparent py-4'
        )}
      >
        <nav className="container flex items-center justify-between gap-6" aria-label="Menu principal">
          <a href="#inicio" className="shrink-0" aria-label="Ir para o início">
            <Logo className={cn('transition-all duration-500', scrolled ? 'h-8' : 'h-9')} />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const id = item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-active={active === id}
                    aria-current={active === id ? 'true' : undefined}
                    className={cn(
                      'link-underline text-sm font-medium transition-colors duration-300',
                      active === id ? 'text-primary' : 'text-foreground/75 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
              <a href={whatsappUrl(waMessages.quote)} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="grid size-10 place-items-center rounded-full border border-border/70 transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
            >
              <Menu className="size-[18px]" />
            </button>
          </div>
        </nav>

        {/* Barra de progresso de leitura. */}
        <motion.div
          style={{ scaleX: progress }}
          className={cn(
            'absolute inset-x-0 bottom-0 h-px origin-left bg-primary transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[55] lg:hidden"
        >
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
            className="absolute inset-0 bg-foreground/25 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col border-l border-border bg-background shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <Logo className="h-8" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary/50 hover:text-primary"
              >
                <X className="size-[18px]" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-6 py-6">
              {navigation.map((item, i) => {
                const id = item.href.replace('#', '');
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.35, ease: 'easeOut' }}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-between border-b border-border/60 py-4 font-display text-xl transition-colors',
                        active === id ? 'text-primary' : 'hover:text-primary'
                      )}
                    >
                      {item.label}
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <div className="space-y-3 border-t border-border px-6 py-6">
              <Button asChild variant="default" className="w-full">
                <a href={whatsappUrl(waMessages.quote)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {contact.fullAddress}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
