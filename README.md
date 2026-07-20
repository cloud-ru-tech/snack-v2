# Design System

Монорепозиторий для разработки компонентной библиотеки на React + TypeScript. Включает компоненты, Storybook, документационный портал на Astro и полный набор e2e-тестов.

## Структура репозитория

```
design-system/
├── packages/                            # Публикуемые npm-пакеты @ds/*
│   └── <pkg>/
│       ├── src/<Name>/                  # Nested-раскладка по компоненту
│       │   ├── <Name>.tsx
│       │   ├── constants.ts             # Оси API + TEST_IDS (если есть)
│       │   ├── types.ts
│       │   ├── styles.module.scss
│       │   └── index.ts
│       ├── stories/<Name>/              # Playground + VisualMatrix (+ examples/, tests/)
│       │   ├── <Name>.Playground.stories.tsx
│       │   ├── <Name>.VisualMatrix.stories.tsx
│       │   ├── examples/                # Сценарии, копируемые потребителем (опц.)
│       │   └── tests/                   # Story только для тест-обвязки (опц.)
│       ├── demos/                       # <Name>Demo.tsx + examples/ для MDX (?raw)
│       ├── docs/                        # index.mdx + props.json (автоген)
│       ├── __test__/<ParentComponent>/  # Playwright spec'и пакета + baselines
│       │   ├── helpers.ts
│       │   ├── rendering.spec.ts
│       │   ├── visual.spec.ts
│       │   ├── interaction.spec.ts      # при наличии browser-specific сценариев
│       │   ├── keyboard.spec.ts         # при наличии kbd-сценариев
│       │   └── __snapshots__/           # baseline PNG (chrome-only)
│       ├── tsconfig.esm.json / tsconfig.cjs.json
│       └── package.json
│
├── apps/
│   ├── docs/                            # Документационный портал (Astro + MDX)
│   │   └── src/
│   │       ├── config/                  # docSections.mjs, domains.ts, external-links.ts
│   │       ├── content/patterns/        # MDX-паттерны не привязанные к пакетам
│   │       ├── components/              # Canvas, PropsTable, StorybookEmbed, FigmaEmbed
│   │       ├── lib/figma.ts             # FIGMA_NODES — карта Figma-узлов по пакету
│   │       └── pages/
│   │           ├── components/[...slug].astro
│   │           └── patterns/[...slug].astro
│   └── storybook/                       # Storybook 10
│       └── .storybook/                  # main.ts (auto-alias из packages/*/src/index.ts)
│
├── playwright/                          # Корневые fixtures, constants, utils
│   ├── fixtures.ts                      # test, expect, gotoStory, getByTestId, waitForFonts
│   ├── constants/{common,projects}.ts
│   └── utils/{getStorybookUrl,waitForFonts,…}.ts
├── playwright.config.ts                 # Сканирует packages/**/__test__/**/*.spec.ts
│
├── scripts/                             # add-package, build-pkg, gen-props, gen-readme
├── .claude/                             # Rules / Skills / Commands для Claude Code и Cursor
│
├── tsconfig.base.json                   # Единый источник общих compilerOptions
├── tsconfig.json                        # Typecheck-профиль (noEmit), #playwright-tooling/*
├── lerna.json                           # Lerna: версионирование и публикация
└── pnpm-workspace.yaml                  # pnpm workspaces + catalog внешних deps
```

Spec-файлы Playwright живут **внутри пакета** (`packages/<pkg>/__test__/<ParentComponent>/`), а не в корневой папке. Корневой `playwright/` хранит только общие fixtures и утилиты, импортируемые через TS-алиас `#playwright-tooling/*`.

## Сборка пакетов компонентов

1. **`tspc -b`** по `packages/tsconfig.esm.json` и `packages/tsconfig.cjs.json` (после `pnpm deps` применяется **ts-patch** для transformers и типов CSS modules).
2. **Маркер CommonJS** — `dist/cjs/package.json` с `"type": "commonjs"` (скрипт `build:cjs-package-meta`).
3. **`pnpm build:css`** — компиляция SCSS в `dist/esm` и `dist/cjs`, копирование ассетов, агрегат **`style.css`** в каждой сборке.
4. **`pnpm build:cjs-css-modules`** — постобработка CJS через `babel-plugin-react-css-modules`.

## Быстрый старт

```bash
# Установить зависимости
pnpm deps

# Установить браузеры для e2e-тестов (один раз)
pnpm --filter @ds/tests exec playwright install
```

## Команды разработки

| Команда                         | Что делает                                                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev:storybook`            | Запускает Storybook на `localhost:6006`                                                                                                           |
| `pnpm dev:docs`                 | Запускает документационный портал на `localhost:4321`                                                                                             |
| `pnpm dev`                      | Параллельный запуск Storybook (`localhost:6006`) и docs (`localhost:4321`)                                                                        |
| `pnpm build`                    | Собирает пакеты, затем Storybook и docs                                                                                                           |
| `pnpm build:packages`           | Только пакеты: TS (ESM+CJS) + CSS + CJS css-modules                                                                                               |
| `pnpm build:pkg <pkg>[,<pkg2>]` | Селективная инкрементальная сборка одного пакета (`scripts/build-pkg.mts`) — на порядки быстрее `build:packages` при работе над одним компонентом |
| `pnpm build:fast`               | `build:packages` + `build:docs:fast` (без Storybook static)                                                                                       |
| `pnpm gen:props`                | Генерирует `docs/props.json` для каждого пакета из TypeScript-типов                                                                               |
| `pnpm gen:readme`               | Генерирует `README.md` для каждого пакета из docs/index.mdx + props.json                                                                          |
| `pnpm gen`                      | Запускает `gen:props` + `gen:readme` (полная регенерация)                                                                                         |

## Тесты

| Команда                          | Что делает                                                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:stories`              | Запускает play-функции сторис через `@storybook/test-runner`                                                                                                                                |
| `pnpm test:e2e`                  | Playwright по всем проектам (chrome+firefox+safari+mobile)                                                                                                                                  |
| `pnpm test:e2e:chrome`           | Только chrome — дефолт во время разработки. Принимает path/`-g` фильтр: `pnpm test:e2e:chrome packages/<pkg>`                                                                             |
| `pnpm test:e2e:ui`               | Playwright в интерактивном UI-режиме                                                                                                                                                        |
| `pnpm test:e2e:update-snapshots` | Обновляет **все** baseline скриншоты (chrome-only, `--update-snapshots=all` — переписывает и совпадающие)                                                                                    |
| `pnpm test:e2e:update-snapshots:changed` | Обновляет **только разошедшиеся** baseline'ы (chrome-only, `--update-snapshots=changed`) — не churn'ит неизменные PNG, самолечит флейки                                             |
| `pnpm test:e2e:docker`           | Playwright chrome в Docker (Linux, образ как на CI) — для проверки visual на Mac                                                                                                            |
| `pnpm test:e2e:docker:update-snapshots` | Переснять **все** baseline'ы в Linux (`=all`; коммитить PNG после review)                                                                                                             |
| `pnpm test:e2e:docker:update-snapshots:changed` | Переснять в Linux **только разошедшиеся** baseline'ы (`=changed`)                                                                                                             |
| `pnpm test:e2e:docker:visual`    | Только `visual.spec.ts` в Docker                                                                                                                                                            |
| `pnpm test:e2e:docker:visual:update` / `:changed` | Только `visual.spec.ts` в Docker с пересъёмом baseline'ов — всех (`=all`) либо только разошедшихся (`:changed`)                                                              |
| `pnpm test:e2e:audit`            | Статический аудит Playwright spec'ов на соответствие [e2e-testing-standard.md](./.claude/rules/e2e-testing-standard.md). Опционально — фильтр по пакету: `pnpm test:e2e:audit button`         |

Селективные команды для итеративной работы над одним пакетом — см. [`.claude/rules/fast-build-commands.md`](./.claude/rules/fast-build-commands.md).

## Публикация пакетов

```bash
# Проставить новые версии и создать git-теги
pnpm version:packages

# Собрать и опубликовать в npm
pnpm release
```

## Как добавить новый компонент

Подробное руководство — в [Contribution Guide](/apps/docs/src/content/patterns/contribution-guide.mdx) документационного портала.

Базовый поток через Claude Code (`/<slash-command>` работают и в Claude Code, и в Cursor):

```bash
pnpm add-package                    # создаёт packages/<pkg>/ и подключает его к репо
/add-stories <pkg>                  # Playground + VisualMatrix (+ examples/ / tests/ при необходимости)
pnpm dev:storybook                  # в отдельном терминале
pnpm test:e2e:update-snapshots packages/<pkg>   # baselines на Linux-хосте; на Mac — docker ниже
/add-tests <pkg>                    # Playwright spec'и по rules
/test-coverage <pkg>                # отчёт coverage + аудит E2E перед PR
/add-docs <pkg>                     # docs/index.mdx + demos/
pnpm gen:props && pnpm gen:readme   # автоген артефактов
/make-commit                        # conventional commit из staged diff
```

### Visual baselines на Mac (Linux как на CI)

Baseline PNG для visual regression нужно снимать в **Linux** — иначе CI падает из‑за разницы рендеринга шрифтов (macOS CoreText vs Linux FreeType). Локально на Mac:

```bash
# ~/.npmrc с _authToken для pkg.sbercloud.tech — монтируется автоматически

pnpm test:e2e:docker:visual                                   # прогон visual-тестов в Linux
pnpm test:e2e:docker:visual:update packages/calendar          # переснять один пакет (все baseline'ы, =all)
pnpm test:e2e:docker:visual:update:changed packages/calendar  # переснять только разошедшиеся (=changed)
pnpm test:e2e:docker:visual:update                            # все visual.spec.ts
```

`=all` (`…:update`) переписывает **каждый** baseline пакета, включая совпадающие; `=changed` (`…:update:changed`) — **только** те, что реально разошлись с текущим рендером. `:changed` предпочтителен для точечной пересъёмки: не раздувает diff неизменными PNG и не фиксирует случайный флейк-рендер как новый эталон.

Образ: `snack-v2-e2e:local`, собирается из `docker/e2e/Dockerfile` (bookworm + вшитые chromium и его OS-deps — на рантайме браузер не докачивается). Первый build — минуты, дальше из кэша слоёв Docker (повторно ~1–2 сек, если Dockerfile и версия Playwright не менялись). Override — `DOCKER_E2E_IMAGE`.

Первый прогон долгий (~10–15 мин): docker build образа + `build:storybook`. Повторный быстрее: `DOCKER_E2E_SKIP_STORYBOOK_BUILD=1` (reuse предыдущей статики). `build:packages` по умолчанию **не** запускается — storybook static резолвит `@ds/*` → `packages/*/src` через vite-алиасы, dist не нужен (на CI пакеты перед e2e тоже не собираются). Форс сборки dist для диагностики — `DOCKER_E2E_BUILD_PACKAGES=1`.

#### Быстрый цикл: собрать статику на маке

Контейнер идёт как `linux/amd64`, а на Apple Silicon это Rosetta-эмуляция — именно `build:storybook` в ней и съедает основное время. Но сборка **платформо-нейтральна**: `storybook-static` — обычный JS/CSS/HTML-бандл, а пиксельный паритет с CI даёт Chromium внутри linux/amd64, который остаётся в контейнере. Значит статику можно собрать на хосте нативно и переиспользовать (`/work` приходит bind-mount'ом):

```bash
pnpm build:storybook                                         # нативно на arm64, ~1 мин вместо минут в эмуляции

DOCKER_E2E_INSTALL=0 DOCKER_E2E_SKIP_STORYBOOK_BUILD=1 \
  pnpm test:e2e:docker:visual:update:changed packages/<pkg>  # ~30 сек на пакет
```

Проверено прогоном **всех** visual-спеков на macOS-собранной статике: 342 снимка совпали с эталонами. Пересобирать статику нужно только когда менялись стори или исходники компонентов.

Не запускай несколько visual-контейнеров параллельно: под эмуляцией они делят CPU, и снимки с `hover` / тултипами / анимацией начинают флейкать. С `:update` флейковый кадр запишется в эталон как истина.

#### Частые ошибки

- **`Segmentation fault` / `Exit status 139` в фазе `build:storybook` (`transforming...`).** Сборке Storybook нужен V8-heap 8192 МБ (запинен в `apps/storybook/package.json`; дефолтные ~2 ГБ падают OOM на большом наборе сторей). На Apple Silicon контейнер идёт как эмулируемый `linux/amd64`, и heap + накладные расходы эмуляции не влезают в память VM Docker Desktop → процесс падает с SIGSEGV (139), а не с чистым OOM (137). Симптом «до этого работало, а теперь медленно и падает» обычно означает, что обновление Docker Desktop сбросило Resources к дефолту. Два способа:
  - **Поднять память Docker Desktop** (рекомендуется — сохраняет amd64-рендеринг = паритет с CI). Docker Desktop → **Settings** → **Resources** → **Memory** → **16 GB** (минимум 12 GB) → **Apply & restart**. Проверка:

    ```bash
    docker info --format '{{.MemTotal}}'   # ожидаем ~16000000000
    ```

    Заодно там же в **Settings → General** проверь галку «Use Rosetta for x86_64/amd64 emulation» — без неё amd64 идёт через QEMU и всё становится ещё медленнее.
  - **Занизить heap сборки** без изменения памяти VM — `DOCKER_E2E_STORYBOOK_HEAP=<МБ>`:

    ```bash
    DOCKER_E2E_STORYBOOK_HEAP=6144 pnpm test:e2e:docker:visual:update:changed packages/<pkg>
    ```

    Это escape-hatch «уместить сборку под маленькую VM»: слишком низкое значение упрётся уже в чистый OOM (137) — тогда подними число (7168) либо всё же добавь памяти VM. Дефолт (без переменной) — 8192, поведение CI не меняется.
- **`Cannot find module '@ds/...'` при build в Docker.** Конфликт macOS `packages/*/node_modules` (bind-mount) с Linux root `node_modules` (volume). Скрипт `docker/e2e/run.sh` временно прячет macOS-`node_modules` на время install/build и восстанавливает после выхода. Сброс volume: `docker volume rm snack-v2-e2e-root-node-modules`.

Перед первым PR прочитать [`.claude/rules/`](./.claude/rules/) — там стандарты на структуру, stories, тесты, документацию.

### Доменная группировка пакетов

Главная страница и сайдбар docs группируют пакеты по **префиксу имени** через конфиг `apps/docs/src/config/domains.ts`:

| Префикс пакета    | Домен в портале и Storybook |
| ----------------- | --------------------------- |
| `uikit-product-*` | Uikit Product               |
| `ai-*`            | AI                          |
| `admin-*`         | Admin                       |
| (всё остальное)   | Components                  |

Чтобы завести новый домен — добавить блок в `DOMAINS` массив и убедиться, что префикс пакета совпадает с `prefix`. Никаких ручных вписываний пакета по доменам не нужно.

## Технологии

| Роль                         | Инструмент                                         |
| ---------------------------- | -------------------------------------------------- |
| Пакетный менеджер            | pnpm workspaces                                    |
| Версионирование и публикация | Lerna                                              |
| Сборка компонентов           | TypeScript (`tspc` + project references), ts-patch |
| Стили                        | SCSS → CSS (sass + postcss), CSS Modules           |
| Документационный портал      | Astro + MDX                                        |
| Среда разработки компонентов | Storybook 10                                       |
| E2E-тесты                    | Playwright                                         |
