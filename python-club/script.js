(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const mobile = matchMedia('(max-width:680px)').matches;
  const header = document.querySelector('[data-header]');
  const glow = document.querySelector('[data-cursor-glow]');
  const reveals = [...document.querySelectorAll('.reveal')];

  if (header) {
    const sync = () => header.classList.toggle('scrolled', scrollY > 24);
    sync();
    addEventListener('scroll', sync, { passive: true });
  }

  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
      io.observe(el);
    });
  } else reveals.forEach(el => el.classList.add('visible'));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });

  if (!reduce && fine && glow) {
    let x = innerWidth * .7, y = innerHeight * .3, tx = x, ty = y;
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const draw = () => {
      x += (tx - x) * .09; y += (ty - y) * .09;
      glow.style.left = `${x}px`; glow.style.top = `${y}px`;
      requestAnimationFrame(draw);
    };
    draw();
  } else if (glow) glow.style.display = 'none';

  if (!reduce) {
    const heroPhoto = document.querySelector('.hero-photo');
    const heroTitle = document.querySelector('.hero h1');
    const visuals = [...document.querySelectorAll('.visual')];
    let ticking = false;
    const render = () => {
      const y = scrollY, vh = innerHeight || 1;
      if (heroPhoto) heroPhoto.style.transform = `translate3d(0,${Math.min(24, y * .025)}px,0) scale(${1 + Math.min(.035, y / 30000)})`;
      if (heroTitle && !mobile) heroTitle.style.transform = `translate3d(0,${Math.min(20, y * .018)}px,0)`;
      visuals.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (vh * .5 - (r.top + r.height * .5)) / vh));
        card.style.setProperty('--heat-shift', `${p * (i % 2 ? 8 : -8)}px`);
      });
      ticking = false;
    };
    const request = () => { if (!ticking) { requestAnimationFrame(render); ticking = true; } };
    render();
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request, { passive: true });
  }
})();
