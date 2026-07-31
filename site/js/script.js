/**
 * DU'CHER — camada de interface.
 *
 * Responsabilidade deste arquivo: estado, acessibilidade e comportamento dos
 * componentes. As animações de scroll/entrada ficam em animations.js e são
 * plugadas aqui por `DUCHER.fx` — se elas não carregarem, tudo abaixo continua
 * funcionando com transições CSS.
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════ UTILITÁRIOS ══ */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /** Agrupa leituras/escritas de layout num único frame. */
  function onFrame(fn) {
    let queued = false;
    return (...args) => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        fn(...args);
      });
    };
  }

  /** Namespace público — animations.js registra seus efeitos em `fx`. */
  const DUCHER = (window.DUCHER = {
    fx: {},
    utils: { $, $$, clamp, onFrame, reduceMotion, finePointer },
  });

  /* Sem GSAP não há como animar as entradas: revela tudo e segue o jogo. */
  if (!window.gsap) {
    document.documentElement.classList.remove('anim-ready');
  }

  /* ═════════════════════════════════════════════════════════ SCROLL SUAVE ══ */

  /** Rola até um alvo respeitando a altura da navbar e o Lenis, se houver. */
  function scrollToTarget(target) {
    const offset = window.innerWidth >= 1024 ? -90 : -70;
    if (DUCHER.lenis) {
      DUCHER.lenis.scrollTo(target, { offset, duration: 1.4 });
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(target);
  });

  /* ═══════════════════════════════════════════════════════ LOADING SCREEN ══ */

  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;

    const bar = $('#loader-bar');
    const pct = $('#loader-pct');
    const images = $$('img');
    const total = Math.max(images.length, 1);
    let loaded = 0;
    let shown = 0;

    const paint = (value) => {
      shown = Math.max(shown, value);
      bar.style.width = shown + '%';
      pct.textContent = Math.round(shown) + '%';
    };

    const bump = () => paint(clamp((++loaded / total) * 100, 0, 96));

    images.forEach((img) => {
      if (img.complete) bump();
      else {
        img.addEventListener('load', bump, { once: true });
        img.addEventListener('error', bump, { once: true });
      }
    });

    /* Nenhuma tela de carregamento deve durar mais que isso. */
    const failsafe = setTimeout(finish, 3500);

    function finish() {
      clearTimeout(failsafe);
      paint(100);
      loader.classList.add('is-done');
      const done = () => {
        loader.remove();
        document.dispatchEvent(new CustomEvent('ducher:ready'));
      };
      if (DUCHER.fx.hideLoader) DUCHER.fx.hideLoader(loader, done);
      else {
        loader.style.transition = 'opacity .5s ease';
        loader.style.opacity = '0';
        setTimeout(done, 500);
      }
    }

    window.addEventListener('load', () => setTimeout(finish, 260), { once: true });
  }

  /* ═════════════════════════════════════════════════════════════ NAVBAR ════ */

  function initNav() {
    const nav = $('#nav');
    if (!nav) return;

    let lastY = window.scrollY;

    const update = onFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle('is-solid', y > 40);
      /* Esconde ao descer, revela ao subir — sem interferir no menu aberto. */
      const hiding = y > lastY && y > 320 && !document.body.classList.contains('menu-open');
      nav.classList.toggle('is-hidden', hiding);
      lastY = y;
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* Destaca o link da seção visível. */
  function initScrollSpy() {
    const links = $$('[data-nav-link]');
    if (!links.length) return;

    const map = new Map();
    links.forEach((link) => {
      const section = $(link.getAttribute('href'));
      if (section) map.set(section, link);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.remove('is-current'));
          map.get(entry.target)?.classList.add('is-current');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    map.forEach((_, section) => observer.observe(section));
  }

  /* ══════════════════════════════════════════════════════════ MENU MOBILE ══ */

  const menuEl = $('#menu');
  const menuToggle = $('#nav-toggle');
  let menuOpen = false;
  let lastFocused = null;

  function openMenu() {
    if (menuOpen || !menuEl) return;
    menuOpen = true;
    lastFocused = document.activeElement;
    menuEl.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('menu-open');
    DUCHER.lenis?.stop();

    if (DUCHER.fx.menuOpen) DUCHER.fx.menuOpen(menuEl);
    else menuEl.style.clipPath = 'inset(0 0 0 0)';

    $('[data-menu-link]', menuEl)?.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!menuOpen || !menuEl) return;
    menuOpen = false;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
    DUCHER.lenis?.start();

    const hide = () => { menuEl.hidden = true; };
    if (DUCHER.fx.menuClose) DUCHER.fx.menuClose(menuEl, hide);
    else { menuEl.style.clipPath = 'inset(0 0 100% 0)'; setTimeout(hide, 450); }

    lastFocused?.focus({ preventScroll: true });
  }

  function initMenu() {
    if (!menuEl || !menuToggle) return;
    menuToggle.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));

    /* Foco preso enquanto o menu cobre a tela. */
    menuEl.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = $$('a, button', menuEl).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ═════════════════════════════════════════════════════════════ GALERIA ══ */

  function initGallery() {
    const grid = $('[data-gallery]');
    const bar = $('[data-filters]');
    if (!grid || !bar) return;

    const tiles = $$('.tile', grid);
    const empty = $('[data-gallery-empty]');

    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;

      $$('.filter', bar).forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      const cat = btn.dataset.filter;
      let visible = 0;

      tiles.forEach((tile) => {
        const show = cat === 'todos' || tile.dataset.cat === cat;
        tile.hidden = !show;
        if (show) visible++;
      });

      if (empty) empty.hidden = visible > 0;
      if (DUCHER.fx.gridIn) DUCHER.fx.gridIn(tiles.filter((t) => !t.hidden));
      DUCHER.refresh?.();
    });
  }

  /* ════════════════════════════════════════════════════════════ LIGHTBOX ══ */

  function initLightbox() {
    const box = $('#lightbox');
    if (!box) return;

    const img = $('#lightbox-img');
    const cap = $('#lightbox-cap');
    const closeBtn = $('[data-lightbox-close]', box);
    let items = [];
    let index = 0;
    let opener = null;

    const collect = () =>
      $$('[data-lightbox]').filter((btn) => !btn.closest('.tile')?.hidden);

    function render() {
      const btn = items[index];
      const source = $('img', btn);
      img.src = source.src;
      img.alt = source.alt;
      cap.textContent = $('.tile__cap span', btn)?.textContent ?? '';
      if (DUCHER.fx.lightboxSwap) DUCHER.fx.lightboxSwap(img);
    }

    function open(btn) {
      items = collect();
      index = Math.max(items.indexOf(btn), 0);
      opener = btn;
      box.hidden = false;
      render();
      document.body.classList.add('menu-open');
      DUCHER.lenis?.stop();
      if (DUCHER.fx.lightboxOpen) DUCHER.fx.lightboxOpen(box);
      else box.style.opacity = '1';
      closeBtn.focus({ preventScroll: true });
    }

    function close() {
      const hide = () => { box.hidden = true; };
      if (DUCHER.fx.lightboxClose) DUCHER.fx.lightboxClose(box, hide);
      else { box.style.opacity = '0'; setTimeout(hide, 300); }
      document.body.classList.remove('menu-open');
      DUCHER.lenis?.start();
      opener?.focus({ preventScroll: true });
    }

    const step = (dir) => {
      index = (index + dir + items.length) % items.length;
      render();
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox]');
      if (trigger) open(trigger);
    });

    closeBtn.addEventListener('click', close);
    $('[data-lightbox-prev]', box).addEventListener('click', () => step(-1));
    $('[data-lightbox-next]', box).addEventListener('click', () => step(1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });

    document.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ══════════════════════════════════════════════════════ ANTES / DEPOIS ══ */

  function initCompare() {
    $$('[data-compare]').forEach((root) => {
      const range = $('[data-compare-range]', root);
      if (!range) return;
      const apply = () => root.style.setProperty('--pos', range.value + '%');
      range.addEventListener('input', apply);
      apply();
    });
  }

  /* ══════════════════════════════════════════════════════════ CARROSSEL ═══ */

  function initCarousel() {
    const root = $('[data-carousel]');
    const track = $('[data-carousel-track]');
    if (!root || !track) return;

    const slides = $$('.quote', track);
    const prev = $('[data-carousel-prev]');
    const next = $('[data-carousel-next]');

    const stepBy = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap || '0');
      return slides[0].getBoundingClientRect().width + gap;
    };

    const go = (dir) => {
      const max = track.scrollWidth - track.clientWidth;
      /* Chegou na ponta? Volta para a outra — o carrossel não tem fim. */
      const atEnd = dir > 0 && track.scrollLeft >= max - 8;
      const atStart = dir < 0 && track.scrollLeft <= 8;
      if (atEnd) track.scrollTo({ left: 0 });
      else if (atStart) track.scrollTo({ left: max });
      else track.scrollBy({ left: dir * stepBy() });
    };

    prev?.addEventListener('click', () => { go(-1); pause(); });
    next?.addEventListener('click', () => { go(1); pause(); });

    /* Autoplay discreto, que respeita foco, hover, aba oculta e reduced-motion. */
    let timer = null;
    let paused = false;

    const tick = () => { if (!paused && !document.hidden) go(1); };
    const start = () => { if (!timer && !reduceMotion.matches) timer = setInterval(tick, 5200); };
    const pause = () => { paused = true; clearTimeout(root._resume); root._resume = setTimeout(() => (paused = false), 9000); };

    ['pointerenter', 'focusin'].forEach((ev) => root.addEventListener(ev, () => (paused = true)));
    ['pointerleave', 'focusout'].forEach((ev) => root.addEventListener(ev, () => (paused = false)));

    start();
  }

  /* ═════════════════════════════════════════════════════════════════ FAQ ══ */

  function initFaq() {
    const faq = $('[data-faq]');
    if (!faq) return;

    faq.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq__q');
      if (!btn) return;

      const panel = $('#' + btn.getAttribute('aria-controls'));
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      /* Accordion de item único: abrir um fecha o que estava aberto. */
      if (!isOpen) {
        $$('.faq__q[aria-expanded="true"]', faq).forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
          togglePanel($('#' + other.getAttribute('aria-controls')), false);
        });
      }

      btn.setAttribute('aria-expanded', String(!isOpen));
      togglePanel(panel, !isOpen);
    });

    function togglePanel(panel, open) {
      if (!panel) return;
      if (DUCHER.fx.accordion) { DUCHER.fx.accordion(panel, open); return; }
      /* Fallback sem GSAP: Web Animations API sobre a altura real do conteúdo. */
      const target = open ? panel.scrollHeight : 0;
      panel.animate(
        [{ height: panel.getBoundingClientRect().height + 'px' }, { height: target + 'px' }],
        { duration: reduceMotion.matches ? 0 : 420, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }
      );
      panel.style.height = open ? 'auto' : '0px';
    }
  }

  /* ══════════════════════════════════════════════════ MICROINTERAÇÕES ══ */

  /** Ondulação a partir do ponto do clique. */
  function initRipple() {
    document.addEventListener('pointerdown', (e) => {
      const host = e.target.closest('[data-ripple]');
      if (!host || reduceMotion.matches) return;

      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      Object.assign(ripple.style, {
        width: size + 'px',
        height: size + 'px',
        left: e.clientX - rect.left + 'px',
        top: e.clientY - rect.top + 'px',
      });
      host.appendChild(ripple);

      ripple
        .animate(
          [
            { transform: 'translate(-50%,-50%) scale(0)', opacity: 0.55 },
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 0 },
          ],
          { duration: 680, easing: 'cubic-bezier(.16,1,.3,1)' }
        )
        .addEventListener('finish', () => ripple.remove());
    });
  }

  /** Brilho que acompanha o ponteiro nos cards de diferenciais. */
  function initGlow() {
    const grid = $('[data-glow]');
    if (!grid || !finePointer.matches) return;

    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.glow-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  }

  /** Botão de WhatsApp entra depois que o herói sai de cena. */
  function initFab() {
    const fab = $('.fab');
    if (!fab) return;
    const hero = $('#inicio');
    if (!hero) { fab.classList.add('is-in'); return; }

    new IntersectionObserver(
      ([entry]) => fab.classList.toggle('is-in', !entry.isIntersecting),
      { threshold: 0.15 }
    ).observe(hero);
  }

  function initYear() {
    const el = $('#ano');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ══════════════════════════════════════════════════════════════ BOOT ════ */

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  const boot = () => {
    initLoader();
    initNav();
    initScrollSpy();
    initMenu();
    initGallery();
    initLightbox();
    initCompare();
    initCarousel();
    initFaq();
    initRipple();
    initGlow();
    initFab();
    initYear();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
