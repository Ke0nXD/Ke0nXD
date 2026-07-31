/**
 * DU'CHER — camada de movimento.
 *
 * GSAP + ScrollTrigger + SplitText para o scroll e as entradas; Lenis para o
 * scroll suave; anime.js para os loops orgânicos (formas flutuantes, menu).
 *
 * Tudo aqui é progressivo: se este arquivo falhar, o site segue navegável —
 * script.js já cuida do comportamento e das transições CSS.
 */
(function () {
  'use strict';

  const { $, $$, onFrame, reduceMotion, finePointer } = window.DUCHER.utils;
  const DUCHER = window.DUCHER;

  if (!window.gsap) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out', duration: 1 });

  const EASE = 'expo.out';
  const still = reduceMotion.matches;
  /* Multiplicador de duração: com `prefers-reduced-motion`, tudo é instantâneo. */
  const D = still ? 0 : 1;

  /* ═══════════════════════════════════════════════════════ SCROLL SUAVE ══ */

  function initLenis() {
    if (still || typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    DUCHER.lenis = lenis;
  }

  DUCHER.refresh = () => ScrollTrigger.refresh();

  /* ══════════════════════════════════════════════ BARRA DE PROGRESSO ══ */

  function initProgress() {
    const bar = $('#scroll-progress-bar');
    if (!bar) return;
    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  }

  /* ══════════════════════════════════════════════════════ TELA DE CARGA ══ */

  DUCHER.fx.hideLoader = (loader, done) => {
    if (still) { done(); return; }
    gsap.timeline({ onComplete: done })
      .to('.loader__inner', { opacity: 0, y: -24, duration: 0.5 * D, ease: 'power2.in' })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1 * D, ease: EASE }, '-=0.15');
  };

  /* ═════════════════════════════════════════════════════════════ HERÓI ══ */

  function heroIntro() {
    const hero = $('[data-hero]');
    if (!hero) return;

    const title = $('.hero__title');
    const tl = gsap.timeline({ defaults: { ease: EASE } });

    /* Imagem revela em escala + desfoque; o texto entra letra por letra. */
    tl.fromTo(
      '[data-hero-img]',
      { scale: 1.28, filter: 'blur(18px)' },
      { scale: 1, filter: 'blur(0px)', duration: 2.2 },
      0
    );

    if (title) {
      const split = new SplitText(title, { type: 'chars,words' });
      gsap.set(title, { visibility: 'visible' });
      tl.from(
        split.chars,
        { yPercent: 120, opacity: 0, rotateX: -60, stagger: 0.018, duration: 1.4 },
        0.25
      );
    }

    tl.fromTo(
      '[data-hero-el]',
      { y: 42, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 1.2 },
      0.7
    );

    /* Parallax do fundo durante o scroll. */
    gsap.to('[data-hero-img]', {
      yPercent: 16,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__inner', {
      yPercent: -12,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /** Parallax de mouse: fundo e formas reagem ao ponteiro, com inércia. */
  function heroMouse() {
    const hero = $('[data-hero]');
    if (!hero || !finePointer.matches || still) return;

    const layers = $$('[data-float]', hero).map((el) => ({
      el,
      depth: parseFloat(el.dataset.float) || 1,
      x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3' }),
    }));

    const bgX = gsap.quickTo('[data-hero-img]', 'xPercent', { duration: 1.4, ease: 'power3' });
    const bgY = gsap.quickTo('[data-hero-img]', 'yPercent', { duration: 1.4, ease: 'power3' });

    hero.addEventListener('pointermove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach(({ depth, x, y }) => { x(nx * 60 * depth); y(ny * 60 * depth); });
      bgX(nx * -2.5);
      bgY(ny * -2.5);
    });
  }

  /* ═══════════════════════════════════════════════ REVELAÇÕES NO SCROLL ══ */

  const revealDefaults = { start: 'top 84%', once: true };

  function initReveals() {
    $$('[data-reveal]').forEach((el) => {
      /* Títulos com data-split já têm sua própria entrada — não animar duas vezes. */
      if (el.hasAttribute('data-split')) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const mode = el.dataset.reveal;
      const stagger = mode === 'stagger';
      const targets = stagger ? Array.from(el.children) : el;

      /* O container só esconde o conteúdo; quem anima é o alvo. */
      if (stagger) gsap.set(el, { opacity: 1 });

      const from = { opacity: 0 };
      if (mode === 'right') Object.assign(from, { x: 60, scale: 0.97 });
      else Object.assign(from, { y: 44 });

      gsap.fromTo(
        targets,
        from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: EASE,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: el, ...revealDefaults },
        }
      );
    });
  }

  /** Títulos de seção: revela linha a linha, com máscara. */
  function initSplitHeadings() {
    $$('[data-split]').forEach((el) => {
      if (el.classList.contains('hero__title')) return;

      const split = new SplitText(el, { type: 'lines', mask: 'lines' });
      gsap.set(el, { visibility: 'visible' });

      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: el, ...revealDefaults },
      });
    });
  }

  /* ════════════════════════════════════════════════════════════ PARALLAX ══ */

  function initParallax() {
    $$('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 0.15;
      gsap.fromTo(
        el,
        { yPercent: -amount * 50 },
        {
          yPercent: amount * 50,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('figure, section, div') || el, scrub: true },
        }
      );
    });
  }

  /* ═════════════════════════════════════════════════════ NÚMEROS ANIMADOS ══ */

  function initCounters() {
    $$('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const plain = 'plain' in el.dataset;
      const proxy = { value: 0 };

      gsap.to(proxy, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          const n = Math.round(proxy.value);
          el.textContent = (plain ? String(n) : n.toLocaleString('pt-BR')) + suffix;
        },
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════ TILT ══ */

  function initTilt() {
    if (!finePointer.matches || still) return;

    $$('[data-tilt]').forEach((card) => {
      const max = parseFloat(card.dataset.tiltMax) || 9;
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3' });
      const sc = gsap.quickTo(card, 'scale', { duration: 0.7, ease: 'power3' });

      gsap.set(card, { transformPerspective: 1000, transformOrigin: 'center' });

      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        rx((0.5 - (e.clientY - r.top) / r.height) * max * 2);
        ry(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      });

      card.addEventListener('pointerenter', () => sc(1.015));
      card.addEventListener('pointerleave', () => { rx(0); ry(0); sc(1); });
    });
  }

  /* ═══════════════════════════════════════════════════ BOTÕES MAGNÉTICOS ══ */

  function initMagnetic() {
    if (!finePointer.matches || still) return;

    $$('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      const y = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      const strength = 0.32;

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * strength);
        y((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  /* ═════════════════════════════════════════════════════════════ CURSOR ══ */

  function initCursor() {
    const cursor = $('#cursor');
    if (!cursor || !finePointer.matches || still) return;

    const label = $('.cursor__label', cursor);
    const dot = $('.cursor__dot', cursor);
    const ring = $('.cursor__ring', cursor);

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

    window.addEventListener('pointermove', (e) => {
      cursor.classList.add('is-on');
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    });

    document.addEventListener('pointerover', (e) => {
      const labelled = e.target.closest('[data-cursor]');
      const hoverable = e.target.closest('a, button, input, [role="tab"]');

      cursor.classList.toggle('is-label', Boolean(labelled));
      cursor.classList.toggle('is-hover', Boolean(hoverable) && !labelled);
      if (labelled) label.textContent = labelled.dataset.cursor;
    });

    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
  }

  /* ════════════════════════════════════════════════════════════ MARQUEE ══ */

  function initMarquee() {
    const wrap = $('[data-marquee]');
    const track = $('[data-marquee-track]');
    if (!wrap || !track) return;

    gsap.set(wrap, { opacity: 1 });

    /* Duplica o conteúdo até cobrir duas telas — o loop fica sem emenda. */
    const original = track.innerHTML;
    while (track.scrollWidth < window.innerWidth * 2) track.innerHTML += original;
    track.innerHTML += track.innerHTML;

    if (still) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 34,
      ease: 'none',
      repeat: -1,
    });

    /* A velocidade do scroll empurra a faixa — detalhe que dá vida. */
    ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3.5);
        gsap.to(loop, { timeScale: boost * (self.direction || 1), duration: 0.4, overwrite: true });
      },
    });
  }

  /* ══════════════════════════════════════════ LINHA DO TEMPO E PROCESSO ══ */

  function initTimelines() {
    const timeline = $('[data-timeline]');
    if (timeline) {
      gsap.to(timeline, {
        '--tl-progress': '100%',
        ease: 'none',
        scrollTrigger: { trigger: timeline, start: 'top 78%', end: 'bottom 60%', scrub: 0.5 },
      });
      $$('.tl', timeline).forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 72%',
          onEnter: () => item.classList.add('is-live'),
        });
      });
    }

    const steps = $('[data-steps]');
    if (!steps) return;

    gsap.to(steps, {
      '--steps-progress': '100%',
      ease: 'none',
      scrollTrigger: { trigger: steps, start: 'top 68%', end: 'bottom 75%', scrub: 0.5 },
    });

    $$('[data-step]', steps).forEach((step) => {
      gsap.from(step, {
        opacity: 0,
        x: 40,
        duration: 1.1,
        ease: EASE,
        scrollTrigger: { trigger: step, start: 'top 82%', once: true },
      });
      ScrollTrigger.create({
        trigger: step,
        start: 'top 62%',
        end: 'bottom 40%',
        onToggle: (self) => step.classList.toggle('is-live', self.isActive),
      });
    });
  }

  /* ═════════════════════════════════════════════════ FORMAS FLUTUANTES ══ */

  /** anime.js cuida dos loops orgânicos — deriva lenta, sem repetir o padrão. */
  function initFloating() {
    if (still || typeof anime === 'undefined') return;

    $$('.shape').forEach((shape, i) => {
      anime.animate(shape, {
        translateY: [
          { to: -28 - i * 8, duration: 5200 + i * 900 },
          { to: 0, duration: 5200 + i * 900 },
        ],
        scale: [{ to: 1.08, duration: 6400 }, { to: 1, duration: 6400 }],
        ease: 'inOutSine',
        loop: true,
        delay: i * 420,
      });
    });

    const badge = $('.badge-float');
    if (badge) {
      anime.animate(badge, {
        translateY: [{ to: -14, duration: 3800 }, { to: 0, duration: 3800 }],
        ease: 'inOutQuad',
        loop: true,
      });
    }
  }

  /* ══════════════════════════════════════════════════ EFEITOS SOB DEMANDA ══ */

  /* Menu mobile: cortina + links em cascata (anime.js). */
  DUCHER.fx.menuOpen = (menu) => {
    gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8 * D, ease: EASE });
    if (typeof anime === 'undefined') return;
    anime.animate($$('.menu__link', menu), {
      opacity: [0, 1],
      translateY: [36, 0],
      duration: 900 * D,
      ease: 'outExpo',
      delay: anime.stagger(60, { start: 180 }),
    });
  };

  DUCHER.fx.menuClose = (menu, done) => {
    gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.6 * D, ease: 'power3.inOut', onComplete: done });
  };

  /* Accordion do FAQ. */
  DUCHER.fx.accordion = (panel, open) => {
    gsap.killTweensOf(panel);
    if (open) {
      gsap.set(panel, { height: 'auto' });
      gsap.from(panel, { height: 0, duration: 0.55 * D, ease: EASE });
      gsap.from(panel.firstElementChild, { opacity: 0, y: 12, duration: 0.6 * D, delay: 0.08 * D, ease: EASE });
    } else {
      gsap.to(panel, { height: 0, duration: 0.4 * D, ease: 'power2.inOut' });
    }
  };

  /* Lightbox. */
  DUCHER.fx.lightboxOpen = (box) => {
    gsap.fromTo(box, { opacity: 0 }, { opacity: 1, duration: 0.35 * D, ease: 'power2.out' });
    gsap.fromTo($('#lightbox-img'), { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 * D, ease: EASE });
  };
  DUCHER.fx.lightboxClose = (box, done) => {
    gsap.to(box, { opacity: 0, duration: 0.3 * D, ease: 'power2.in', onComplete: done });
  };
  DUCHER.fx.lightboxSwap = (img) => {
    gsap.fromTo(img, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5 * D, ease: EASE });
  };

  /* Re-entrada dos itens da galeria após filtrar. */
  DUCHER.fx.gridIn = (tiles) => {
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 26, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75 * D, ease: EASE, stagger: 0.045 * D, overwrite: true }
    );
  };

  /* ══════════════════════════════════════════════════════════════ BOOT ════ */

  /*
   * Com `prefers-reduced-motion`, nada de revelar/parallax/loops: o conteúdo
   * já nasce no estado final. Os efeitos sob demanda (menu, FAQ, lightbox)
   * seguem registrados, só que com duração zero.
   */
  if (still) {
    gsap.set('[data-reveal], [data-hero-el], .marquee', { opacity: 1 });
    gsap.set('[data-split]', { visibility: 'visible' });
    gsap.set('[data-timeline]', { '--tl-progress': '100%' });
    gsap.set('[data-steps]', { '--steps-progress': '100%' });
    $$('[data-count]').forEach((el) => {
      const n = parseFloat(el.dataset.count);
      el.textContent =
        ('plain' in el.dataset ? String(n) : n.toLocaleString('pt-BR')) + (el.dataset.suffix || '');
    });
    initMarquee();
    return;
  }

  initLenis();
  initProgress();
  initReveals();
  initParallax();
  initCounters();
  initTilt();
  initMagnetic();
  initCursor();
  initTimelines();
  initFloating();

  /*
   * Split depende de métrica de fonte: esperar evita quebra de linha errada.
   * O timeout é a rede de segurança — nenhum título pode ficar invisível
   * porque uma fonte demorou.
   */
  Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ]).then(() => {
    initSplitHeadings();
    initMarquee();
    ScrollTrigger.refresh();
  });

  /* A abertura do herói só começa quando a tela de carga sai. */
  document.addEventListener('ducher:ready', () => {
    heroIntro();
    heroMouse();
  }, { once: true });

  window.addEventListener('resize', onFrame(() => ScrollTrigger.refresh()), { passive: true });
})();
