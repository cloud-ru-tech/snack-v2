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
│       └── <Name>.VisualMatrix.stories.tsx # обязателен
│       └── <Name>.<UseCase>.stories.tsx    # по tier (см. complexity-tiers.md)
├── __tests__/                  # Playwright E2E + visual (см. e2e-testing-standard.md)
│   ├── helpers.ts
│   ├── <pkg>.rendering.spec.ts
│   ├── <pkg>.states.spec.ts
│   ├── <pkg>.url-args.spec.ts
│   ├── <pkg>.dimensions.spec.ts
│   ├── <pkg>.interaction.spec.ts
│   ├── <pkg>.polymorphism.spec.ts
│   ├── <pkg>.keyboard.spec.ts
│   ├── <pkg>.a11y.spec.ts
│   └── <pkg>.visual.spec.ts
├── __snapshots__/              # Chrome-only baseline PNG'и для visual regression
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

Импорт из пакетного spec: `import { expect, test } from '../../../playwright/fixtures'`.

Корневой `playwright.config.ts` указывает `testDir: './packages'`, `testMatch: ['**/__tests__/**/*.spec.ts']` и `snapshotPathTemplate: '{testDir}/{testFileDir}/../__snapshots__/{arg}-{projectName}{ext}'`.

Docs-тесты живут отдельно в `tests/docs/` (их запускает отдельный конфиг `tests/playwright.config.ts` против `apps/docs`).

## Wire-точки (обновляются `pnpm add-package`)

1. Корневой `tsconfig.json` — `references`.
2. `packages/tsconfig.esm.json` / `packages/tsconfig.cjs.json` — `references`.
3. `apps/storybook/.storybook/main.ts` — alias между маркерами `<add-package:aliases>`.
4. `apps/docs/astro.config.mjs` — alias между маркерами `<add-package:aliases>`.
5. `apps/storybook/package.json` — dep `@ds/<pkg>: workspace:*`.

## Чек-лист перед PR

- [ ] `pnpm typecheck` зелёный
- [ ] `pnpm lint` / `pnpm stylelint` чистые
- [ ] `pnpm build:packages` зелёный
- [ ] `docs/props.json` непустой — `pnpm gen:props`
- [ ] `README.md` актуален — `pnpm gen:readme`
- [ ] Storybook отрисовывает все новые stories без ошибок в консоли
- [ ] `pnpm test:stories` зелёный (play-функции)
- [ ] `pnpm test:e2e` зелёный для нового пакета
- [ ] Visual baselines осмысленные (ручной review diff перед коммитом)
- [ ] REFERENCE.md пакета не нужен — его заменяет это правило + [complexity-tiers.md](./complexity-tiers.md)

## Что запрещено

- Добавлять пакет без обновления wire-точек.
- Держать stories вне `stories/<Name>/`.
- Писать визуальные матрицы flex-боксами вместо `StoryTable` из `#storybook/components`.
- Коммитить пакет без `docs/index.mdx` и без `demos/<Name>Demo.tsx` (кроме utility-пакетов без UI).
- Держать `README.md` руками — он генерируется.
