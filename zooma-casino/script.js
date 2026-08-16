(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const progress = document.querySelector('[data-scroll-progress]');
  const topbar = document.querySelector('[data-topbar]');
  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const y = scrollY;
    if (progress) progress.style.transform = `scaleY(${clamp(y / max, 0, 1)})`;
    topbar?.classList.toggle('scrolled', y > 30);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealNodes = [...document.querySelectorAll('.reveal')];
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    revealNodes.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 45}ms`;
      io.observe(el);
    });
  } else revealNodes.forEach((el) => el.classList.add('in'));

  const glow = document.querySelector('[data-cursor-glow]');
  if (!reduce && !coarse && glow) {
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; glow.style.opacity = '1'; }, { passive: true });
    const tick = () => { gx += (tx-gx)*.09; gy += (ty-gy)*.09; glow.style.left = `${gx}px`; glow.style.top = `${gy}px`; requestAnimationFrame(tick); };
    tick();
  }

  if (!reduce && !coarse) {
    const hero = document.querySelector('[data-hero-scene]');
    const depths = [...document.querySelectorAll('[data-depth]')];
    addEventListener('pointermove', (e) => {
      const nx = (e.clientX / innerWidth - .5) * 2;
      const ny = (e.clientY / innerHeight - .5) * 2;
      if (hero) hero.style.transform = `translateY(-50%) rotateY(${nx*2.6}deg) rotateX(${-ny*2}deg)`;
      depths.forEach(el => {
        const d = Number(el.dataset.depth || .4);
        el.style.transform = `translate3d(${nx*18*d}px,${ny*14*d}px,0)`;
      });
    }, { passive: true });

    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) * .12;
        const y = (e.clientY - r.top - r.height/2) * .18;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('pointerleave', () => el.style.transform = '');
    });
  }

  const constellation = document.querySelector('[data-constellation]');
  if (constellation && !reduce) {
    constellation.addEventListener('pointermove', (e) => {
      const r = constellation.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      constellation.querySelectorAll('.planet').forEach((p,i)=>{ const d=(i%3+1)*2.2; p.style.translate=`${x*d}px ${y*d}px`; });
    });
    constellation.addEventListener('pointerleave',()=>constellation.querySelectorAll('.planet').forEach(p=>p.style.translate=''));
  }

  const universe = document.querySelector('[data-universe-stage]');
  if (universe && !reduce) {
    const sats=[...universe.querySelectorAll('.sat')];
    universe.addEventListener('pointermove',(e)=>{
      const r=universe.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
      sats.forEach((s,i)=>{const d=7+(i%3)*5;s.style.transform=`translate(${x*d}px,${y*d}px)`});
    });
    universe.addEventListener('pointerleave',()=>sats.forEach(s=>s.style.transform=''));
  }

  const counters = [...document.querySelectorAll('[data-count]')];
  if ('IntersectionObserver' in window && !reduce) {
    const cio = new IntersectionObserver((entries)=>entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el=entry.target,target=Number(el.dataset.count||0),start=performance.now(),duration=1100;
      const step=(t)=>{const p=clamp((t-start)/duration,0,1);const eased=1-Math.pow(1-p,3);el.textContent=Math.round(target*eased).toLocaleString('ru-RU');if(p<1)requestAnimationFrame(step)};
      requestAnimationFrame(step);cio.unobserve(el);
    }),{threshold:.45}); counters.forEach(c=>cio.observe(c));
  } else counters.forEach(c=>c.textContent=Number(c.dataset.count).toLocaleString('ru-RU'));

  const process = document.querySelector('[data-process-track]');
  if (process && !reduce && innerWidth > 1100) {
    let raf=0;
    const update=()=>{raf=0;const sec=process.closest('.process');if(!sec)return;const r=sec.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(r.height+innerHeight),0,1);process.style.transform=`translateX(${-p*260}px)`};
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update)},{passive:true}); update();
  }

  // Touch keeps motion through lightweight tap feedback rather than hover-only effects.
  if (coarse && !reduce) {
    document.querySelectorAll('.planet,.feed-card,.scope-row').forEach(el=>{
      el.addEventListener('pointerdown',()=>el.animate([{transform:'scale(1)'},{transform:'scale(.985)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'}));
    });
  }
})();
