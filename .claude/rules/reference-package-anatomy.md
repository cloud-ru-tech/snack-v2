# Анатомия эталонного пакета

**Область действия:** все пакеты в `packages/*`. Эталон — [`packages/button`](../../packages/button/REFERENCE.md).

## Обязательные файлы и папки

```
packages/<pkg>/
├── src/
│   └── <Name>/                 # flat или nested — см. package-src-structure.md
│       ├── <Name>.tsx
│       ├── constants.ts
│       ├── index.ts            # export *
│       ├── styles.module.scss
│       ├── types.ts
│       └── utils.ts            # если есть чистые хелперы
│   ├── locale/                 # только если пакет показывает текст — см. locale-standard.md
│   │   └── index.ts            # приватная const defineMessages({ 'en-GB', 'ru-RU' }) + export type <Pkg>Messages + defineLocale('@ds/<pkg>', …)
│   └── index.ts                # корневой ре-экспорт пакета
├── stories/
│   └── <Name>/
│       ├── <Name>.Playground.stories.tsx   # обязателен
│       ├── <Name>.VisualMatrix.stories.tsx # обязателен
│       ├── examples/                       # сценарии для потребителя (Polymorphic, Composition, WithFooter, …)
│       │   └── <Name>.<Scenario>.stories.tsx
│       └── tests/                          # стори только для тестов (InteractionTest, Controlled, …)
│           └── <Name>.<Scenario>.stories.tsx
├── __test__/                   # Playwright E2E + visual (см. e2e-testing-standard.md)
│   └── <ParentComponent>/      # одна папка на parent-компонент; варианты сабкомпонентов параметризуются через args
│       ├── helpers.ts                # STORIES = { playground, visualMatrix, ... } как StoryRef-объекты
│       ├── rendering.spec.ts         # smoke render + props propagation (1–3 ключевых значения, не all-enum)
│       ├── interaction.spec.ts       # ТОЛЬКО browser-specific (file upload, DnD, viewport, scroll lock) — НЕ дублирует play
│       ├── keyboard.spec.ts          # ТОЛЬКО focus-trap / arrow-nav / multi-step keyboard — НЕ дублирует play
│       ├── polymorphism.spec.ts      # только при `as` — runtime attribute checks
│       ├── visual.spec.ts            # 1 VM snapshot + по 1 на состояние (hover/focus/pressed/open портала)
│       └── __snapshots__/            # baseline PNG'и (chrome-only) рядом со спеками
├── demos/
│   └── <Name>Demo.tsx          # для пакетов, рендерящихся в docs-сайте
├── docs/
│   ├── index.mdx               # обязателен, frontmatter + секции
│   └── props.json              # автогенерация
├── package.json
├── tsconfig.esm.json
├── tsconfig.cjs.json
└── README.md                   # автогенерация
```

## Общий туллинг для тестов

```
playwright/                     # корень монорепо
├── constants/
│   ├── common.ts               # STORYBOOK_BASE_URL, TEST_ID_ATTRIBUTE
│   └── projects.ts             # PROJECTS (chrome/firefox/safari/mobile), VISUAL_BASELINE_PROJECT
├── utils/
│   ├── dataTestIdSelector.ts
│   ├── getStorybookUrl.ts
│   └── waitForFonts.ts
├── fixtures.ts                 # test, expect, gotoStory, getByTestId, waitForFonts
└── index.ts
```

Импорт из пакетного spec — через TS-алиас `#playwright-tooling/*` (paths в корневом `tsconfig.json`, `tsconfig: './tsconfig.json'` в `playwright.config.ts`):

```ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common'
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects'
import { expect, test } from '#playwright-tooling/fixtures'
import { waitForFonts } from '#playwright-tooling/utils'
```

Относительные `'../../../../playwright/...'` запрещены.

Корневой `playwright.config.ts` указывает `testDir: './packages'`, `testMatch: ['**/__test__/**/*.spec.ts']` и `snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}'` — baseline'ы лежат рядом со спеками, внутри папки компонента. Префикс `{testDir}/` обязателен: `{testFileDir}` возвращает путь относительно `testDir`, и без него baseline'ы уйдут в `<cwd>/<pkg>/__test__/…` мимо папки `packages/`.

Docs-тесты живут отдельно в `tests/docs/` (их запускает отдельный конфиг `tests/playwright.config.ts` против `apps/docs`).

## Wire-точки (обновляются `pnpm add-package`)

1. Корневой `tsconfig.json` — `references`.
2. `packages/tsconfig.esm.json` / `packages/tsconfig.cjs.json` — `references`.
3. `apps/storybook/.storybook/main.ts` — alias `@ds/<pkg>` подхватывается автоматически: `collectDsAliases()` сканирует `packages/*/src/index.ts`. Никаких ручных вставок.
4. `apps/docs/astro.config.mjs` — `@ds/*` на исходники пакетов подхватываются автоматически (`dsWorkspaceSourceAliases`).
5. `apps/storybook/package.json` — dep `@ds/<pkg>: workspace:*`.

Группа в сайдбаре docs (и, по плану, в Storybook) определяется автоматически по префиксу имени пакета — отдельных wire-действий не требуется. Список префиксов и их человекочитаемые лейблы — в конфиге доменов; новый префикс заводится туда же одной записью. Подробнее — в [docs-structure.md](./docs-structure.md).

## Чек-лист перед PR

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.

## Что запрещено

- Добавлять пакет без обновления wire-точек.
- Держать stories вне `stories/<Name>/`.
- Заводить axis-per-file stories (`<Name>.Sizes`, `<Name>.Appearances`, `<Name>.LoadingState`, …) — они дублируют VisualMatrix. См. [stories-standard.md](./stories-standard.md) раздел «Запрещённые файлы».
- Заводить отдельные spec'и `<pkg>.url-args.spec.ts`, `<pkg>.states.spec.ts`, `<pkg>.dimensions.spec.ts` — их роль отдана `rendering.spec.ts` (props propagation через `gotoStory+args`) и visual regression.
- Писать визуальные матрицы flex-боксами вместо `StoryTable` из `#storybook/components`.
- Коммитить пакет без `docs/index.mdx` и без `demos/<Name>Demo.tsx` (кроме utility-пакетов без UI).
- Держать `README.md` руками — он генерируется.
