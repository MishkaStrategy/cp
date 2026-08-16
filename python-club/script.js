(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(pointer: coarse)');

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Header state
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  // Reveal choreography: observer first, immediate fallback.
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.children].filter((node) => node.classList?.contains('reveal'))
          : [];
        const order = Math.max(0, siblings.indexOf(entry.target));
        entry.target.style.transitionDelay = `${Math.min(order * 55, 260)}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }

  // Serpent line draws with document progress.
  const serpentPath = document.querySelector('[data-serpent-path]');
  let ticking = false;
  const updateScrollEffects = () => {
    ticking = false;
    if (!serpentPath || reducedMotion.matches) return;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = clamp(window.scrollY / maxScroll, 0, 1);
    serpentPath.style.strokeDashoffset = String(1 - progress * 1.08);
    root.style.setProperty('--page-progress', progress.toFixed(4));
  };
  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollEffects);
  };
  updateScrollEffects();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });

  // Guest scenarios.
  const scenarioData = {
    first: {
      number: '01', label: 'First visit / confidence',
      title: 'Снять неопределённость до двери.',
      copy: 'Коротко объяснить формат, вход, атмосферу, правила и первый сценарий вечера — чтобы интерес был сильнее неловкости и сомнений.',
      word: 'FIRST'
    },
    friends: {
      number: '02', label: 'Friends / social energy',
      title: 'Продать вечер, а не набор услуг.',
      copy: 'Показать общий ритм, бар, шоу и удобный сценарий для компании — с быстрым переходом к столу и вопросу «во сколько приезжать?».',
      word: 'CREW'
    },
    birthday: {
      number: '03', label: 'Birthday / ready scenario',
      title: 'Превратить повод в готовый маршрут.',
      copy: 'Не заставлять гостя собирать вечер по кускам. Показать понятный пакет сценария: компания, стол, шоу, special moments и контакт администратора.',
      word: 'B-DAY'
    },
    party: {
      number: '04', label: 'Bachelor party / group intent',
      title: 'Сразу говорить с самым горячим намерением.',
      copy: 'Мальчишник — отдельный landing-story: что получает компания, как проходит вечер, что можно подготовить заранее и как быстро подтвердить бронь.',
      word: 'PARTY'
    },
    private: {
      number: '05', label: 'VIP / privacy first',
      title: 'Продавать тишину внутри громкой ночи.',
      copy: 'Для VIP важна не громкость обещаний, а контроль: приватность, отдельный уровень сервиса, инкогнито и понятный персональный контакт.',
      word: 'PRIVATE'
    }
  };

  const scenarioShell = document.querySelector('[data-scenarios]');
  if (scenarioShell) {
    const buttons = [...scenarioShell.querySelectorAll('[data-scenario]')];
    const panel = scenarioShell.querySelector('.scenario-panel');
    const number = scenarioShell.querySelector('[data-scenario-number]');
    const label = scenarioShell.querySelector('[data-scenario-label]');
    const title = scenarioShell.querySelector('[data-scenario-title]');
    const copy = scenarioShell.querySelector('[data-scenario-copy]');
    const word = scenarioShell.querySelector('[data-scenario-word]');

    const activateScenario = (key, focusPanel = false) => {
      const data = scenarioData[key];
      if (!data) return;
      buttons.forEach((button) => button.setAttribute('aria-selected', String(button.dataset.scenario === key)));
      number.textContent = data.number;
      label.textContent = data.label;
      title.textContent = data.title;
      copy.textContent = data.copy;
      word.textContent = data.word;
      panel.classList.remove('is-switching');
      // force restart without layout-heavy loops across the page
      void panel.offsetWidth;
      panel.classList.add('is-switching');
      if (focusPanel) panel.focus({ preventScroll: true });
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activateScenario(button.dataset.scenario));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        buttons[next].focus();
        activateScenario(buttons[next].dataset.scenario);
      });
    });
  }

  // Material microtexture responds to pointer, never required for comprehension.
  const board = document.querySelector('[data-tilt]');
  if (board && !reducedMotion.matches && !coarsePointer.matches) {
    board.addEventListener('pointermove', (event) => {
      const rect = board.getBoundingClientRect();
      const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const rx = (0.5 - py) * 4.2;
      const ry = (px - 0.5) * 5.2;
      board.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      board.style.setProperty('--scale-x', `${(px - 0.5) * 12}px`);
      board.style.setProperty('--scale-y', `${(py - 0.5) * 8}px`);
    });
    board.addEventListener('pointerleave', () => {
      board.style.transform = '';
      board.style.setProperty('--scale-x', '0px');
      board.style.setProperty('--scale-y', '0px');
    });
  }

  // Spotlight inside prototype.
  const spotlight = document.querySelector('[data-spotlight]');
  if (spotlight && !reducedMotion.matches && !coarsePointer.matches) {
    spotlight.addEventListener('pointermove', (event) => {
      const rect = spotlight.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      spotlight.style.setProperty('--spot-x', `${x.toFixed(1)}%`);
      spotlight.style.setProperty('--spot-y', `${y.toFixed(1)}%`);
    });
  }

  // Magnetic CTAs on precise pointers only.
  const magnetic = [...document.querySelectorAll('.magnetic')];
  if (!reducedMotion.matches && !coarsePointer.matches) {
    magnetic.forEach((node) => {
      node.addEventListener('pointermove', (event) => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
        node.style.transform = `translate3d(${x}px,${y}px,0)`;
      });
      node.addEventListener('pointerleave', () => { node.style.transform = ''; });
    });
  }

  // Ensure state follows live accessibility setting changes.
  const onMotionPreference = () => {
    if (reducedMotion.matches) {
      document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
      if (serpentPath) serpentPath.style.strokeDashoffset = '0';
      magnetic.forEach((node) => { node.style.transform = ''; });
      if (board) board.style.transform = '';
    }
  };
  reducedMotion.addEventListener?.('change', onMotionPreference);
})();
