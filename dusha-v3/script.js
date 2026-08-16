(() => {
  const doc = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const loader = document.querySelector('.loader');
  const finishLoader = () => loader?.classList.add('is-done');
  if (reduceMotion) finishLoader();
  else window.addEventListener('load', () => window.setTimeout(finishLoader, 820), { once: true });
  window.setTimeout(finishLoader, 1800);

  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-line span');
  let scrollTicking = false;
  const updateScrollUI = () => {
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    scrollTicking = false;
  };
  updateScrollUI();
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollUI);
  }, { passive: true });

  if (!reduceMotion && finePointer) {
    body.classList.add('has-pointer');
    const aura = document.querySelector('.cursor-aura');
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let auraX = pointerX;
    let auraY = pointerY;

    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    }, { passive: true });

    const animateAura = () => {
      auraX += (pointerX - auraX) * 0.14;
      auraY += (pointerY - auraY) * 0.14;
      if (aura) aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
      window.requestAnimationFrame(animateAura);
    };
    animateAura();
  }

  const stage = document.querySelector('[data-soul-stage]');
  if (!reduceMotion && stage) {
    const illustration = stage.querySelector('.soul-illustration');
    const svg = illustration?.querySelector('svg');
    const paths = svg ? Array.from(svg.querySelectorAll(':scope > path')) : [];
    const ellipses = svg ? Array.from(svg.querySelectorAll(':scope > ellipse')) : [];
    const bodyShape = paths[0] || null;
    const spiritShape = paths[1] || null;
    const redGlow = ellipses[2] || null;
    const blueGlow = ellipses[3] || null;
    const beam = svg?.querySelector(':scope > rect') || null;
    const ghostRed = stage.querySelector('[data-soul-red]');
    const ghostBlue = stage.querySelector('[data-soul-blue]');

    [bodyShape, spiritShape, redGlow, blueGlow, beam].forEach((element) => {
      if (!element) return;
      element.style.transformBox = 'fill-box';
      element.style.transformOrigin = 'center';
      element.style.willChange = 'transform, opacity, filter';
    });

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let heroVisible = true;

    if ('IntersectionObserver' in window) {
      const stageObserver = new IntersectionObserver((entries) => {
        heroVisible = entries.some((entry) => entry.isIntersecting);
      }, { rootMargin: '18% 0px 18% 0px' });
      stageObserver.observe(stage);
    }

    if (finePointer) {
      stage.addEventListener('pointermove', (event) => {
        const rect = stage.getBoundingClientRect();
        targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
        targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
        stage.classList.add('is-awake');
      }, { passive: true });

      stage.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
        stage.classList.remove('is-awake');
      });
    }

    const animateSoul = (time) => {
      if (heroVisible) {
        currentX += (targetX - currentX) * 0.065;
        currentY += (targetY - currentY) * 0.065;

        const t = time * 0.001;
        const idleX = Math.sin(t * 0.42) * 1.7;
        const idleY = Math.cos(t * 0.34) * 1.45;
        const breath = Math.sin(t * 0.92);
        const pointerWeight = finePointer ? 1 : 0.32;
        const px = currentX * pointerWeight;
        const py = currentY * pointerWeight;

        if (illustration) {
          const x = px * 8 + idleX;
          const y = py * 6 + idleY;
          illustration.style.transform = `translate3d(${x}px, ${y}px, 0) rotateY(${px * 2.4}deg) rotateX(${-py * 1.8}deg)`;
        }

        if (bodyShape) {
          bodyShape.style.transform = `translate(${-px * 4.5}px, ${-py * 2.5 + breath * 0.8}px) rotate(${-px * 0.35}deg) scale(${1 + breath * 0.0025})`;
        }

        if (spiritShape) {
          spiritShape.style.transform = `translate(${px * 13 + Math.sin(t * 0.56) * 2.8}px, ${py * 8 + Math.cos(t * 0.48) * 3.6}px) rotate(${px * 0.75 + Math.sin(t * 0.31) * 0.22}deg) scale(${1 + Math.cos(t * 0.62) * 0.0035})`;
        }

        if (redGlow) {
          redGlow.style.transform = `translate(${-px * 10 + Math.sin(t * 0.39) * 2}px, ${-py * 5 + Math.cos(t * 0.44) * 2}px) scale(${1 + Math.sin(t * 0.7) * 0.018})`;
        }

        if (blueGlow) {
          blueGlow.style.transform = `translate(${px * 14 + Math.cos(t * 0.35) * 3}px, ${py * 9 + Math.sin(t * 0.41) * 2.5}px) scale(${1 + Math.cos(t * 0.63) * 0.022})`;
        }

        if (beam) {
          beam.style.transform = `translate(${px * 3}px, ${py * 1.5}px) scaleX(${1 + Math.abs(px) * 0.045})`;
        }

        if (ghostRed) {
          ghostRed.style.transform = `translate3d(${-13 - px * 9}px, ${-py * 5}px, 0) rotate(${-1.5 - px * 0.8}deg)`;
        }

        if (ghostBlue) {
          ghostBlue.style.transform = `translate3d(${13 + px * 11}px, ${py * 6}px, 0) rotate(${1.4 + px * 0.9}deg)`;
        }
      }

      window.requestAnimationFrame(animateSoul);
    };
    window.requestAnimationFrame(animateSoul);
  }

  const tabButtons = Array.from(document.querySelectorAll('[data-demo-tab]'));
  const scenes = Array.from(document.querySelectorAll('[data-demo-scene]'));
  const activateScene = (name, focus = false) => {
    tabButtons.forEach((button) => {
      const active = button.dataset.demoTab === name;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    scenes.forEach((scene) => scene.classList.toggle('is-active', scene.dataset.demoScene === name));
  };
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateScene(button.dataset.demoTab));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'ArrowRight') next = (index + 1) % tabButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabButtons.length - 1;
      activateScene(tabButtons[next].dataset.demoTab, true);
    });
  });

  const soundButton = document.querySelector('[data-sound-demo]');
  soundButton?.addEventListener('click', () => {
    const next = soundButton.getAttribute('aria-pressed') !== 'true';
    soundButton.setAttribute('aria-pressed', String(next));
    const label = soundButton.querySelector('span');
    if (label) label.textContent = next ? 'sound concept / on' : 'sound concept / off';
  });

  const dialog = document.getElementById('contactDialog');
  document.querySelectorAll('[data-open-contact]').forEach((button) => {
    button.addEventListener('click', () => dialog?.showModal());
  });
  document.querySelectorAll('[data-close-contact]').forEach((button) => {
    button.addEventListener('click', () => dialog?.close());
  });
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
})();
