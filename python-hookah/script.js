(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const topbar = document.querySelector('[data-topbar]');
  const progress = document.querySelector('[data-scroll-progress]');
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];

  const updateScroll = () => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
    if (topbar) topbar.classList.toggle('scrolled', y > 32);

    const sections = navLinks
      .map(a => ({ a, section: document.querySelector(a.getAttribute('href')) }))
      .filter(x => x.section);
    let current = null;
    for (const item of sections) {
      if (item.section.getBoundingClientRect().top < window.innerHeight * 0.45) current = item;
    }
    navLinks.forEach(a => a.classList.toggle('active', current?.a === a));
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  const revealEls = [...document.querySelectorAll('.reveal, .reveal-mask')];
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  const hero = document.querySelector('.hero');
  const depthEls = [...document.querySelectorAll('[data-depth]')];
  if (hero && depthEls.length && !reduced && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - .5;
      const ny = (e.clientY - rect.top) / rect.height - .5;
      for (const el of depthEls) {
        const d = Number(el.dataset.depth || 1);
        el.style.transform = `translate3d(${nx * 18 * d}px, ${ny * 14 * d}px, 0)`;
      }
    });
    hero.addEventListener('pointerleave', () => depthEls.forEach(el => el.style.transform = ''));
  }

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * .08}px, ${y * .12}px)`;
      });
      btn.addEventListener('pointerleave', () => btn.style.transform = '');
    });
  }

  const seven = document.querySelector('.seven');
  const sevenCounter = document.querySelector('[data-seven-counter]');
  let sevenPlayed = false;
  if (seven && sevenCounter && !reduced && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting || sevenPlayed) return;
      sevenPlayed = true;
      let v = 7;
      sevenCounter.textContent = '07';
      const timer = setInterval(() => {
        v -= 1;
        sevenCounter.textContent = String(Math.max(0, v)).padStart(2, '0');
        if (v <= 0) {
          clearInterval(timer);
          setTimeout(() => { sevenCounter.textContent = '07'; }, 700);
        }
      }, 180);
      obs.disconnect();
    }, { threshold: .35 }).observe(seven);
  }

  const modes = {
    smoke: ['SMOKE / 01','Кальянная карта как часть опыта.','Не длинный PDF, а понятная система вкусов, крепости и рекомендаций — с быстрым переходом к броне.','CURATED / 12 SIGNATURES'],
    bar: ['BAR / 02','Бар начинается с настроения, не со списка.','Авторские напитки можно собирать по характеру, вкусу и сценарию вечера — визуально, быстро и без перегруза.','COCKTAILS / SIGNATURE'],
    music: ['MUSIC / 03','Сегодняшний звук становится причиной прийти.','Афиша, DJ и музыкальный режим Python живут на первом уровне интерфейса и регулярно меняют ощущение сайта.','LIVE / TONIGHT'],
    private: ['PRIVATE / 04','Приватность — отдельный пользовательский путь.','Гость сразу видит доступные форматы, вместимость и уровень приватности, а затем переходит к короткой брони.','TABLES / VIP'],
    night: ['NIGHT / 05','Каждая ночь может иметь собственный digital-сценарий.','Special nights и сезонные события меняют промо-слой сайта без перестройки основной архитектуры.','EVENTS / SPECIAL']
  };
  const modeBtns = [...document.querySelectorAll('[data-mode]')];
  const modeTitle = document.querySelector('[data-mode-title]');
  const modeCopy = document.querySelector('[data-mode-copy]');
  const modeKicker = document.querySelector('[data-mode-kicker]');
  const modeStatus = document.querySelector('[data-mode-status]');
  modeBtns.forEach(btn => btn.addEventListener('click', () => {
    const data = modes[btn.dataset.mode];
    if (!data) return;
    modeBtns.forEach(b => b.classList.toggle('active', b === btn));
    if (modeKicker) modeKicker.textContent = data[0];
    if (modeTitle) modeTitle.textContent = data[1];
    if (modeCopy) modeCopy.textContent = data[2];
    if (modeStatus) modeStatus.textContent = data[3];
  }));

  document.querySelectorAll('[data-jump-booking]').forEach(btn => {
    btn.addEventListener('click', () => document.querySelector('#booking')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));
  });

  const booking = document.querySelector('[data-booking]');
  if (booking) {
    let step = 0;
    let guests = 4;
    const state = { date: 'СБ 22', time: '23:00', zone: 'LOUNGE' };
    const steps = [...booking.querySelectorAll('[data-book-step]')];
    const panes = [...booking.querySelectorAll('[data-pane]')];
    const next = booking.querySelector('[data-book-next]');
    const back = booking.querySelector('[data-book-back]');
    const progressEl = booking.querySelector('[data-book-progress]');

    const render = () => {
      steps.forEach((b, i) => b.classList.toggle('active', i === step));
      panes.forEach((p, i) => p.classList.toggle('active', i === step));
      if (progressEl) progressEl.textContent = `STEP ${String(step + 1).padStart(2,'0')} / 06`;
      if (back) back.disabled = step === 0;
      if (next) {
        next.textContent = step === 5 ? 'СНАЧАЛА ↺' : 'ДАЛЬШЕ →';
      }
      booking.querySelector('[data-summary-date]')?.replaceChildren(document.createTextNode(state.date));
      booking.querySelector('[data-summary-time]')?.replaceChildren(document.createTextNode(state.time));
      booking.querySelector('[data-summary-guests]')?.replaceChildren(document.createTextNode(String(guests)));
      booking.querySelector('[data-summary-zone]')?.replaceChildren(document.createTextNode(state.zone.toUpperCase()));
    };

    steps.forEach((b, i) => b.addEventListener('click', () => { step = i; render(); }));
    next?.addEventListener('click', () => { step = step === 5 ? 0 : step + 1; render(); });
    back?.addEventListener('click', () => { step = Math.max(0, step - 1); render(); });

    booking.querySelectorAll('[data-choice]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.choice;
        const value = btn.dataset.value;
        booking.querySelectorAll(`[data-choice="${type}"]`).forEach(b => b.classList.toggle('selected', b === btn));
        if (type === 'date') state.date = value;
        if (type === 'time') state.time = value;
        if (type === 'zone') state.zone = value;
        render();
      });
    });

    booking.querySelector('[data-guest-minus]')?.addEventListener('click', () => {
      guests = Math.max(2, guests - 1);
      const el = booking.querySelector('[data-guest-count]');
      if (el) el.textContent = guests;
      render();
    });
    booking.querySelector('[data-guest-plus]')?.addEventListener('click', () => {
      guests = Math.min(8, guests + 1);
      const el = booking.querySelector('[data-guest-count]');
      if (el) el.textContent = guests;
      render();
    });
    render();
  }

  const dialog = document.querySelector('[data-contact-dialog]');
  document.querySelector('[data-open-contact]')?.addEventListener('click', () => {
    if (dialog?.showModal) dialog.showModal();
  });
  document.querySelectorAll('[data-close-contact]').forEach(btn => btn.addEventListener('click', () => dialog?.close()));
  dialog?.addEventListener('click', (e) => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
})();