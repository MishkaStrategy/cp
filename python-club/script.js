(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const reveals = [...document.querySelectorAll('.reveal')];

  if (header) {
    const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      observer.observe(node);
    });
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }

  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
        button.style.transform = `translate3d(${x}px,${y}px,0)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  if (!reduceMotion) {
    const parallaxNodes = [...document.querySelectorAll('[data-parallax]')];
    let ticking = false;
    const render = () => {
      const y = window.scrollY;
      parallaxNodes.forEach((node) => {
        const speed = Number(node.dataset.parallax || 0);
        node.style.transform = `translate3d(0,${Math.max(-18, Math.min(18, y * speed))}px,0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(render);
        ticking = true;
      }
    }, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  const scenarioTrack = document.querySelector('.scenario-track');
  if (scenarioTrack) {
    scenarioTrack.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      scenarioTrack.scrollBy({ left: direction * 320, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
})();
