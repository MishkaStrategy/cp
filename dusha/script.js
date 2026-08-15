(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  const progress = document.querySelector('.scroll-progress i');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const art = document.querySelector('.hero-art');
    const orb = document.querySelector('.orb-main');
    art?.addEventListener('pointermove', (event) => {
      const rect = art.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (orb) orb.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
    });
    art?.addEventListener('pointerleave', () => {
      if (orb) orb.style.transform = '';
    });
  }

  const dialog = document.getElementById('contactDialog');
  document.querySelectorAll('[data-open-contact]').forEach(btn => btn.addEventListener('click', () => dialog?.showModal()));
  document.querySelectorAll('[data-close-contact]').forEach(btn => btn.addEventListener('click', () => dialog?.close()));
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
})();
