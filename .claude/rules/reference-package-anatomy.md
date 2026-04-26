# Анатомия эталонного пакета

**Область действия:** все пакеты в `packages/*`. Правило действует всегда. Эталон — [`packages/button`](../../packages/button/REFERENCE.md).

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
│   └── index.ts                # корневой ре-экспорт пакета
├── stories/
│   └── <Name>/
│       ├── <Name>.Playground.stories.tsx   # обязателен
│       ├── <Name>.VisualMatrix.stories.tsx # обязателен
│       └── <Name>.<ExtraCase>.stories.tsx  # по правилам stories-standard.md — только если нельзя выразить args/VisualMatrix
├── __test__/                   # Playwright E2E + visual (см. e2e-testing-standard.md)
│   └── <Name>/                 # группировка по компоненту (зеркалит stories/<Name>/)
│       ├── helpers.ts
│       ├── rendering.spec.ts         # render + states + props propagation (через gotoStory+args)
│       ├── interaction.spec.ts       # tier M+
│       ├── keyboard.spec.ts          # tier M+
│       ├── polymorphism.spec.ts      # только если есть `as`
│       ├── visual.spec.ts
│       └── __snapshots__/            # baseline PNG'и (chrome-only) рядом со спеками
├── demos/
│   └── <Name>Demo.tsx          # для пакетов, рендерящихся в docs-сайте
├── docs/
│   ├── index.mdx               # обязателен, frontmatter + секции
│   └── props.json              # автогенерация
├── package.json
├── tsconfig.json
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

Импорт из пакетного spec: `import { expect, test } from '../../../../playwright/fixtures'` (4 уровня, т.к. тесты лежат в `packages/<pkg>/__test__/<Component>/`).

Корневой `playwright.config.ts` указывает `testDir: './packages'`, `testMatch: ['**/__test__/**/*.spec.ts']` и `snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}'` — baseline'ы лежат рядом со спеками, внутри папки компонента. Префикс `{testDir}/` обязателен: `{testFileDir}` возвращает путь относительно `testDir`, и без него baseline'ы уйдут в `<cwd>/<pkg>/__test__/…` мимо папки `packages/`.

Docs-тесты живут отдельно в `tests/docs/` (их запускает отдельный конфиг `tests/playwright.config.ts` против `apps/docs`).

## Wire-точки (обновляются `pnpm add-package`)

1. Корневой `tsconfig.json` — `references`.
2. `packages/tsconfig.esm.json` / `packages/tsconfig.cjs.json` — `references`.
3. `apps/storybook/.storybook/main.ts` — alias между маркерами `<add-package:aliases>`.
4. `apps/docs/astro.config.mjs` — `@ds/*` на исходники пакетов подхватываются автоматически (`dsWorkspaceSourceAliases`).
5. `apps/storybook/package.json` — dep `@ds/<pkg>: workspace:*`.

## Чек-лист перед PR

- [ ] `pnpm typecheck` зелёный
- [ ] `pnpm exec eslint packages/<pkg>` / `pnpm exec stylelint "packages/<pkg>/**/*.scss"` чистые (полные `pnpm lint` / `pnpm stylelint` — перед PR)
- [ ] `pnpm build:pkg <pkg>` зелёный (полный `pnpm build:packages` — только если правки затронули shared-пакеты/wire-точки; см. [fast-build-commands.md](./fast-build-commands.md))
- [ ] `docs/props.json` непустой — `pnpm gen:props`
- [ ] `README.md` актуален — `pnpm gen:readme`
- [ ] Storybook отрисовывает все новые stories без ошибок в консоли
- [ ] `pnpm test:stories` зелёный (play-функции)
- [ ] `pnpm test:e2e:chrome packages/<pkg>` зелёный (полный `pnpm test:e2e` по всем проектам — финальная сверка перед PR)
- [ ] Visual baselines осмысленные (ручной review diff перед коммитом)
- [ ] REFERENCE.md пакета не нужен — его заменяет это правило + [complexity-tiers.md](./complexity-tiers.md)

## Что запрещено

- Добавлять пакет без обновления wire-точек.
- Держать stories вне `stories/<Name>/`.
- Заводить axis-per-file stories (`<Name>.Sizes`, `<Name>.Appearances`, `<Name>.LoadingState`, …) — они дублируют VisualMatrix. См. [stories-standard.md](./stories-standard.md) раздел «Запрещённые файлы».
- Заводить отдельные spec'и `<pkg>.url-args.spec.ts`, `<pkg>.states.spec.ts`, `<pkg>.dimensions.spec.ts` — их роль отдана `rendering.spec.ts` (props propagation через `gotoStory+args`) и visual regression.
- Писать визуальные матрицы flex-боксами вместо `StoryTable` из `#storybook/components`.
- Коммитить пакет без `docs/index.mdx` и без `demos/<Name>Demo.tsx` (кроме utility-пакетов без UI).
- Держать `README.md` руками — он генерируется.
