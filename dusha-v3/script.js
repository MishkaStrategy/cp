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

    const stage = document.querySelector('[data-soul-stage]');
    const red = document.querySelector('[data-soul-red]');
    const blue = document.querySelector('[data-soul-blue]');
    stage?.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (red) red.style.transform = `translate3d(${x * -28 - 13}px, ${y * -18}px, 0) rotate(${-1.5 + x * -2}deg)`;
      if (blue) blue.style.transform = `translate3d(${x * 32 + 13}px, ${y * 20}px, 0) rotate(${1.4 + x * 2}deg)`;
    }, { passive: true });
    stage?.addEventListener('pointerleave', () => {
      if (red) red.style.transform = '';
      if (blue) blue.style.transform = '';
    });
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
