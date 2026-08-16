(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const header = document.querySelector('[data-header]');
  const reveals = [...document.querySelectorAll('.reveal')];
  const serpent = document.querySelector('#serpentPath');
  const hero = document.querySelector('.hero');
  const heroAtmosphere = document.querySelector('.hero-atmosphere');
  const materialBoard = document.querySelector('.material-board');
  const browserFrame = document.querySelector('.browser-frame');
  const processRibbon = document.querySelector('.process-ribbon');
  const finalTitle = document.querySelector('.final-title');

  document.documentElement.classList.add('motion-ready');

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
    }, { threshold: 0.11, rootMargin: '0px 0px -5% 0px' });

    reveals.forEach((node, index) => {
      node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
      observer.observe(node);
    });
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }

  if (serpent && !reduceMotion) {
    const length = serpent.getTotalLength();
    serpent.style.strokeDasharray = `${length}`;
    serpent.style.strokeDashoffset = `${length}`;

    const drawSerpent = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / max));
      serpent.style.strokeDashoffset = `${length * (1 - progress)}`;
      serpent.style.opacity = `${0.18 + progress * 0.42}`;
    };
    drawSerpent();
    window.addEventListener('scroll', drawSerpent, { passive: true });
  }

  if (!reduceMotion && finePointer) {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = ((y / rect.height) - .5) * -4;
        const ry = ((x / rect.width) - .5) * 5;
        card.style.setProperty('--spot-x', `${x}px`);
        card.style.setProperty('--spot-y', `${y}px`);
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
        button.style.transform = `translate3d(${x}px,${y}px,0) scale(1.025)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });

    if (hero && heroAtmosphere) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        heroAtmosphere.style.transform = `translate3d(${x * -12}px,${y * -8}px,0) scale(1.015)`;
        hero.style.setProperty('--hero-x', `${50 + x * 16}%`);
        hero.style.setProperty('--hero-y', `${42 + y * 14}%`);
      });
      hero.addEventListener('pointerleave', () => { heroAtmosphere.style.transform = ''; });
    }
  }

  if (!reduceMotion) {
    const parallaxNodes = [...document.querySelectorAll('[data-parallax]')];
    let ticking = false;

    const render = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 1;

      parallaxNodes.forEach((node) => {
        const speed = Number(node.dataset.parallax || 0);
        node.style.transform = `translate3d(0,${Math.max(-28, Math.min(28, y * speed))}px,0)`;
      });

      const shiftByViewport = (node, amount, rotate = 0) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (vh * .5 - (rect.top + rect.height * .5)) / vh));
        node.style.transform = `translate3d(0,${progress * amount}px,0) rotate(${rotate + progress * .4}deg)`;
      };

      shiftByViewport(materialBoard, 18, 2);
      shiftByViewport(browserFrame, 12, 0);
      if (processRibbon) {
        const rect = processRibbon.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        processRibbon.style.setProperty('--ribbon-shift', `${progress * -38}px`);
      }
      if (finalTitle) {
        const rect = finalTitle.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (vh - rect.top) / vh));
        finalTitle.style.setProperty('--final-track', `${progress * -0.018}em`);
      }

      ticking = false;
    };

    const requestRender = () => {
      if (!ticking) {
        requestAnimationFrame(render);
        ticking = true;
      }
    };

    render();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender, { passive: true });
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
