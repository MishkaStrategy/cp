(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.progress i');
  const glow = document.querySelector('.cursor-glow');
  const reveals = [...document.querySelectorAll('.reveal')];

  const updateProgress = () => {
    const root = document.documentElement;
    const max = Math.max(1, root.scrollHeight - innerHeight);
    const pct = Math.min(100, Math.max(0, scrollY / max * 100));
    if (progress) progress.style.width = `${pct}%`;
  };

  updateProgress();
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });

  if (reduce) {
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  if (glow && !reduce && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      glow.style.transform = `translate(${e.clientX - 210}px, ${e.clientY - 210}px)`;
    }, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const soul = document.querySelector('.soul-stage');
  if (soul && !reduce && matchMedia('(pointer:fine)').matches) {
    soul.addEventListener('pointermove', e => {
      const r = soul.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      soul.style.setProperty('--rx', `${y * -3}deg`);
      soul.style.setProperty('--ry', `${x * 5}deg`);
      soul.querySelector('.soul-body').style.transform = `rotate(5deg) perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 5}deg)`;
    });
    soul.addEventListener('pointerleave', () => {
      soul.querySelector('.soul-body').style.transform = 'rotate(5deg)';
    });
  }
})();