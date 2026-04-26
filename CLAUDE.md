# CLAUDE.md

Инструкции для Claude Code при работе с этим репозиторием.

## Проект

Монорепо дизайн-системы `@ds/*` — React-компоненты, Storybook 8 для интерактивной документации и Astro-сайт для публичных docs. pnpm workspaces, TypeScript 5.8, React 18, SCSS Modules, Figma-переменные через `@sbercloud/figma-variables`.

Исторически пакеты мигрируют из соседнего репо `storybook/` (`@design-system/*`). Для генерации плана миграции конкретного пакета — слэш-команда `/migrate-to-v2`.

## Команды

```bash
pnpm install                     # Установить зависимости workspace
pnpm typecheck                   # tsc -b tsconfig.json (project references)
pnpm build:packages              # Собрать ESM + CJS + CSS для всех пакетов
pnpm build                       # build:packages + storybook + docs
pnpm dev:storybook               # Storybook dev (localhost:6006)
pnpm dev:docs                    # Astro docs dev (localhost:4321)
pnpm lint                        # ESLint
pnpm stylelint                   # SCSS/CSS lint
pnpm test:stories                # @storybook/test-runner (play-функции)
pnpm test:e2e                    # Playwright E2E + visual (packages/*/__tests__/)
pnpm test:e2e:chrome             # Только chrome (включая visual baselines)
pnpm test:e2e:update-snapshots   # Регенерация visual baselines в packages/*/__snapshots__/
pnpm test:e2e:docs               # Отдельный suite для apps/docs (tests/docs/)
pnpm gen:props                   # Сгенерировать props.json для каждого пакета
pnpm gen:readme                  # Сгенерировать README.md из docs + props
pnpm gen                         # gen:props + gen:readme
pnpm add-package                 # Создать новый пакет (scaffold.mts + wire.mts)
```

## Структура

```
packages/          # Компонентные пакеты @ds/*
  <pkg>/
    __tests__/     # Playwright E2E + visual, живут внутри пакета
    __snapshots__/ # Baselines визуальной регрессии (chrome-only)
apps/
  storybook/       # Storybook 8 (stories + alias @ds/* в main.ts)
  docs/            # Astro (docs-site; @ds/* из packages/ — astro.config.mjs)
playwright/        # Общий туллинг Playwright: fixtures, utils, browser matrix
playwright.config.ts  # Корневой конфиг: сканирует packages/*/__tests__/*.spec.ts
tsconfig.base.json    # Единый источник общих compilerOptions для всего репо
tsconfig.json         # Typecheck-профиль (noEmit, paths, include)
packages/tsconfig.esm.json / tsconfig.cjs.json  # Оркестраторы сборки пакетов (project references)
scripts/
  add-package/     # Scaffold/wire новых пакетов
tests/             # Docs-only Playwright (тесты apps/docs)
```

Шаблон пакета:

```
packages/<pkg>/
├── src/           # см. .claude/rules/package-src-structure.md
├── stories/       # *.stories.tsx (Storybook 8, @storybook/test)
├── demos/         # *Demo.tsx с Canvas из ~docs/components/Canvas
├── docs/          # index.mdx + props.json
├── package.json
├── tsconfig.json          # aggregator references
├── tsconfig.esm.json      # extends ../tsconfig.esm.json
└── tsconfig.cjs.json      # extends ../tsconfig.cjs.json
```

## Правила

Правила уровня репозитория лежат в `.claude/rules/*.md`. Читай их в контексте любой работы с этим проектом:

| Файл | О чём |
|------|-------|
| [packages-deps.md](.claude/rules/packages-deps.md) | Строгие версии, отсутствие `react`/`react-dom` в пакетах |
| [package-src-structure.md](.claude/rules/package-src-structure.md) | Структура `src/`: flat vs nested `components/<Name>/`, сохранение раскладки при миграции |
| [react-types.md](.claude/rules/react-types.md) | Типы из `'react'`, без префикса `React.*` |
| [imports-exports.md](.claude/rules/imports-exports.md) | Без `import type`, без `export type`, `export *` по барелям |
| [stories-standard.md](.claude/rules/stories-standard.md) | Структура stories: Playground + use cases + VisualMatrix на `StoryTable` из `#storybook/components` |
| [reference-package-anatomy.md](.claude/rules/reference-package-anatomy.md) | Анатомия эталонного пакета, чек-лист перед PR (эталон — `@ds/button`) |
| [complexity-tiers.md](.claude/rules/complexity-tiers.md) | Tier XS/S/M/L/XL — минимальный набор артефактов по сложности компонента |
| [component-api-surface.md](.claude/rules/component-api-surface.md) | `constants.ts` (`as const`) + `types.ts` (`ValueOf`) + JSDoc на пропсах; связь API ↔ VisualMatrix |
| [e2e-testing-standard.md](.claude/rules/e2e-testing-standard.md) | Playwright E2E: блоки `describe` по tier'у, параметрика через `gotoStory` + URL args |
| [visual-regression-standard.md](.claude/rules/visual-regression-standard.md) | Screenshot-тесты: стабилизация, static/interaction/responsive, обновление baselines |
| [docs-structure.md](.claude/rules/docs-structure.md) | MDX-шаблон пакета: обязательные секции, StorybookEmbed, FigmaEmbed |
| [figma-integration.md](.claude/rules/figma-integration.md) | Figma MCP, карта `Figma variant → React prop`, `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts` |
| [dont-do-that.md](.claude/rules/dont-do-that.md) | Общий свод запретов |

### Skills — пошаговые воркфлоу

Лежат в `.claude/skills/*.md` — используются как композитные шаги для типовых задач на компонентных пакетах:

| Skill | Когда вызывать |
|-------|----------------|
| [new-component-package](.claude/skills/new-component-package.md) | «добавить компонент», «новый пакет», «портировать из storybook/» |
| [component-story-set](.claude/skills/component-story-set.md) | «написать stories», «покрыть состояния», «обновить baselines» — Playground + VisualMatrix + доп. по правилам; финальным шагом снимает visual baselines |
| [component-e2e-tests](.claude/skills/component-e2e-tests.md) | «написать e2e», «playwright» — max 5 specs: rendering (+states +props propagation), interaction, keyboard, polymorphism, a11y |
| [component-docs](.claude/skills/component-docs.md) | «написать docs», «страница пакета», «добавить Storybook embed» |
| [figma-component-import](.claude/skills/figma-component-import.md) | Пользователь дал Figma URL / nodeId |
| [component-tier-audit](.claude/skills/component-tier-audit.md) | «проверь эталонность», «обнови под эталон», «аудит пакета» |
| [component-validation-loop](.claude/skills/component-validation-loop.md) | «проверь готовность компонента», «запусти цикл валидации» — сквозной итеративный цикл (scope → Figma parity → runtime screenshot → docs/demos → build). Стадия 2 включает чек-лист Figma-слоёв (state-layer/focused/material). |

## Слэш-команды

Лежат в `.claude/commands/`:

- `/make-commit` — создать conventional-commit из staged diff
- `/up-cloud-deps` — обновить пакеты скоупов `@snack-uikit/*` / `@cloud-ru/*`
- `/add-stories <pkg>` — сгенерить Playground + VisualMatrix (+ оправданные доп. stories) в `packages/<pkg>/stories/<Name>/`
- `/add-tests <pkg>` — сгенерить набор Playwright E2E specs в `packages/<pkg>/__test__/<Name>/` по tier'у
- `/add-docs <pkg>` — Сгенерировать `docs/index.mdx` + demos для `packages/<pkg>`

## Stories / Docs конвенции

Stories уровня пакета (полные правила — [.claude/rules/stories-standard.md](./.claude/rules/stories-standard.md)):

- Структура: `stories/<ComponentName>/<ComponentName>.Playground.stories.tsx` + `<ComponentName>.VisualMatrix.stories.tsx` — обязательный минимум.
- `title` — nesting по пакету: single-component пакет → `Components/<ComponentName>`; multi-component пакет → `Components/<PackageDisplayName>/<ComponentName>` (`@ds/button` → `Components/Button/Button` + `Components/Button/ButtonGroup`).
- CSF3, `Meta<typeof Component>` + `StoryObj<typeof Component>` из `@storybook/react`.
- `expect`, `userEvent`, `within`, `fn` из `storybook/test`.
- Playground содержит полную `meta` + `argTypes` на **все** публичные пропсы (оси живут здесь, не в отдельных файлах).
- VisualMatrix покрывает все оси × состояния через `StoryTable` из `#storybook/components`.
- Доп. файлы (`Polymorphic`, `ClickTest`, `KeyboardTest`, `Composition`, scenario-stories) — только если сценарий нельзя выразить через `args` или `StoryTable`.
- **Запрещено**: отдельные файлы под одну ось/состояние (`Sizes`, `Appearances`, `Views`, `LoadingState`, `DisabledState`, `WithIcon`, `IconOnly`, `WithCounter`).

Demo:

- `demos/<Name>Demo.tsx` для каждого публичного компонента.
- Использует `<Canvas>` из `~docs/components/Canvas`.
- `componentDoc` читается из `../docs/props.json`.

Docs:

- `docs/index.mdx` — главная страница пакета, frontmatter `title`, `package`, `description`, `order`.
- Доп. компоненты — отдельные файлы `docs/<name>.mdx`.
- `docs/props.json` генерится `pnpm gen:props`.
- `README.md` генерится `pnpm gen:readme`.

## Wire-скрипт

При добавлении/регистрации пакета правятся следующие файлы (автоматизируется через `scripts/add-package/wire.mts`):

1. `packages/tsconfig.esm.json` — `references`
2. `packages/tsconfig.cjs.json` — `references`
3. `apps/storybook/.storybook/main.ts` — alias между маркерами `<add-package:aliases>`
4. `apps/storybook/package.json` — dep `@ds/<pkg>: workspace:*`

(Корневой `tsconfig.json` — noEmit-профиль, пакеты не перечисляет; typecheck идёт через `include`.)

(`apps/docs` подхватывает `@ds/*` из `packages/*/package.json` + `src/index.ts` — см. `dsWorkspaceSourceAliases` в `astro.config.mjs`, править вручную не нужно.)

## MCP-серверы

Настроены на уровне репозитория в `.cursor/mcp.json` (работают и в Claude Code, если включены у пользователя): Context7, Figma, Astro docs server, Playwright.

## Миграция пакетов

Пакеты портируются из соседнего репо `storybook/` (`@design-system/*` → `@ds/*`) и из legacy-скоупов `@snack-uikit/*` / `@cloud-ru/*`. Для разового скаффолда из `storybook/` есть `scripts/migrate-package.mts`. Для генерации плана миграции конкретного компонента — команда `/migrate-to-v2 <pkg> <figma-url> [--ref <pkg>] [--note "..."]`; план пишется в `.claude/plan/<pkg>.md` (папка создаётся по мере надобности).
