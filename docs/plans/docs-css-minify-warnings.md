# План: убрать esbuild `Unexpected "{"` warnings в `apps/docs` build

## Проблема

При `astro build` в логе появляются (3 × 2 пары — по одной на каждый из двух build-pass'ов
astro: client + server):

```
[WARN] [vite] [esbuild css minify]
▲ [WARNING] Unexpected "{" [css-syntax-error]
    <stdin>:13296:1
    <stdin>:13320:1
    <stdin>:13379:1
```

Warnings benign — итоговый CSS работает в браузере, layout не ломается.
Но шумят в build-логах CI/локально, маскируют реальные предупреждения.

## Что известно

- Источник: vite пайплайн → esbuild `cssMinify` пропускает финальный bundled CSS.
- В bundled CSS на этих позициях стоят валидные `@layer`-конструкции из:
  - `apps/docs/src/styles/global.css` — `@layer reset, docs-prose;` + `@layer reset {...}` + `@layer docs-prose {...}`.
  - `apps/docs/src/styles/_doc-prose.scss` — повторное `@layer reset, docs-prose;` (комментарий объясняет: нужно для корректной precedence в prod-сборке, см. FF-8129) + ещё один `@layer docs-prose {...}`.
  - `apps/docs/src/styles/doc-page.scss` — ещё один `@layer docs-prose {...}`.
- При мердже партиалов получается несколько `@layer X {...}` блоков рядом + повторные top-level декларации порядка — esbuild спотыкается.

## Что уже пробовали

1. **`rollupOptions.onwarn` фильтр** — не ловит, потому что эти warnings идут не через Rollup, а напрямую от esbuild внутри vite.
2. **`cssMinify: 'lightningcss'` + `css.transformer: 'lightningcss'`** — падает на `@import url('https://fonts.googleapis.com/css2?family=Inter...')` в `packages/fonts/src/fonts.css`: lightningcss пытается resolve remote URL как локальный файл. Чтобы работать с lightningcss, нужно либо локализовать fonts (скачать .woff2 в `packages/fonts/src/`, выкинуть Google Fonts CDN), либо настроить lightningcss `visitor` с пропуском https-URL.

## Варианты решения (выбрать)

### Вариант A: `cssMinify: false`
- **Pros**: warnings уходят сразу, нулевой риск.
- **Cons**: bundle ~+20% (десятки KB на docs-сайте).
- **Effort**: 1 строка в `apps/docs/astro.config.mjs`.

### Вариант B: Переход на lightningcss
- **Pros**: warnings уходят, минификация лучше esbuild на ~2-3%, поддержка modern CSS (@layer, @scope).
- **Cons**: trivial — раньше блокировался remote `@import url(https://fonts.googleapis.com/...)` в `@ds/fonts`, но эта зависимость уже устранена (Inter+RobotoMono локализованы в `packages/fonts/fonts/`).
- **Effort**: 5-10 минут: добавить `lightningcss` в `apps/docs/package.json`, выставить `cssMinify: 'lightningcss'` + `css.transformer: 'lightningcss'` в `apps/docs/astro.config.mjs`.

### Вариант C: Разобраться в конкретных @layer-конструкциях
- **Pros**: остаёмся на esbuild, никаких новых зависимостей.
- **Cons**: тонкий рефакторинг CSS, рискуем сломать layering. Возможно требует upstream-фикс в esbuild.
- **Effort**: непредсказуемо (полчаса-несколько часов).

### Вариант D: Подождать обновление esbuild
- vite 7.3.2 использует esbuild 0.27.x. В changelog esbuild 0.28+ возможны фиксы CSS @layer parsing. Обновить esbuild + проверить.
- **Effort**: 15 минут проверить актуальные версии + патч в vite/esbuild.

## Рекомендация

Сначала **D** (дешёвый shot), если не сработает — **A** на время, фоном делать **B**.

## Где смотреть

- `apps/docs/astro.config.mjs` — vite config docs-сайта.
- `apps/docs/src/styles/global.css` — top-level @layer declarations.
- `apps/docs/src/styles/_doc-prose.scss` — повторный @layer + основной prose.
- `apps/docs/src/styles/doc-page.scss` — page-level @layer.
- `packages/fonts/src/fonts.css` — remote @import (блокер для lightningcss).
- vite docs: <https://vite.dev/config/build-options.html#build-cssminify>.

## Связанные коммиты

- `4a8d4a2d` — попытка lightningcss (откатана).
- (текущий) — фикс FigmaNodeRef type-import + TagRow circular dep (две из трёх warning-категорий).
