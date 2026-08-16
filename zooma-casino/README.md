# ZOOMA — THE NEXT LEVEL

Изолированное коммерческое предложение для **Zooma Casino / ZMA25** в общем репозитории `MishkaStrategy/cp`.

## Цель

Показать следующий этап развития Zooma: не «ещё один редизайн casino lobby», а переход к цельной entertainment-платформе с собственной продуктовой вселенной, design system, live/event layer, персонализированным discovery и зрелым responsive UX.

## Концепция

**CASINO IS ONLY THE BEGINNING.** Почти чёрная graphite-среда, controlled ultraviolet / acid cyan, многослойная глубина, orbital product composition, UI-as-world и motion как часть навигации. Визуальная система сознательно избегает generic gold luxury, stock casino imagery и копирования текущего ZMA25.

Все демонстрационные числа и будущие механики на странице явно помечены как concept / mock data и не выдаются за реальные показатели клиента.

## Stack

- Semantic HTML5
- Modern CSS (responsive design system, glass/depth, CSS procedural visuals)
- Vanilla JavaScript (IntersectionObserver, counters, pointer depth, magnetic CTA, touch feedback)
- Dependency-free Node build validation

Стек выбран по архитектуре общего `cp`: независимые статические подпроекты позволяют публиковать КП через GitHub Pages без общих runtime-зависимостей и риска для соседних проектов.

## Structure

- `index.html` — storytelling, semantic sections, conceptual Zooma UI
- `styles-core.css` — tokens, hero, opportunity, universe, lobby
- `styles-sections.css` — product sections, event/system/final styling
- `styles-responsive.css` — tablet/mobile adaptations and reduced motion
- `script.js` — motion, reveal, counters, pointer/touch interactions
- `assets/favicon.svg` — original local favicon
- `build.mjs` — production integrity checks
- `package.json` — build command

## Local run

```bash
cd zooma-casino
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

## Production validation

```bash
npm run build
```

## Public URL

https://mishkastrategy.github.io/cp/zooma-casino/
