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

| Команда                                           | Что делает                                                                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:stories`                               | Запускает play-функции сторис через `@storybook/test-runner`                                                                                                                          |
| `pnpm test:e2e`                                   | Playwright по всем проектам (chrome+firefox+safari+mobile)                                                                                                                            |
| `pnpm test:e2e:chrome`                            | Только chrome — дефолт во время разработки. Принимает path/`-g` фильтр: `pnpm test:e2e:chrome packages/<pkg>`                                                                         |
| `pnpm test:e2e:ui`                                | Playwright в интерактивном UI-режиме                                                                                                                                                  |
| `pnpm test:e2e:update-snapshots`                  | Обновляет **все** baseline скриншоты (chrome-only, `--update-snapshots=all` — переписывает и совпадающие)                                                                             |
| `pnpm test:e2e:update-snapshots:changed`          | Обновляет **только разошедшиеся** baseline'ы (chrome-only, `--update-snapshots=changed`) — не churn'ит неизменные PNG, самолечит флейки                                               |
| `pnpm test:e2e:docker`                            | Playwright chrome в Docker (Linux, образ как на CI) — для проверки visual на Mac                                                                                                      |
| `pnpm test:e2e:docker:update-snapshots`           | Переснять **все** baseline'ы в Linux (`=all`; коммитить PNG после review)                                                                                                             |
| `pnpm test:e2e:docker:update-snapshots:changed`   | Переснять в Linux **только разошедшиеся** baseline'ы (`=changed`)                                                                                                                     |
| `pnpm test:e2e:docker:visual`                     | Только `visual.spec.ts` в Docker                                                                                                                                                      |
| `pnpm test:e2e:docker:visual:update` / `:changed` | Только `visual.spec.ts` в Docker с пересъёмом baseline'ов — всех (`=all`) либо только разошедшихся (`:changed`)                                                                       |
| `pnpm test:e2e:audit`                             | Статический аудит Playwright spec'ов на соответствие [e2e-testing-standard.md](./.claude/rules/e2e-testing-standard.md). Опционально — фильтр по пакету: `pnpm test:e2e:audit button` |

Селективные команды для итеративной работы над одним пакетом — см. [`.claude/rules/fast-build-commands.md`](./.claude/rules/fast-build-commands.md).

## Локальное подключение пакетов к приложению (ds-link)

Когда в приложении обнаружился баг компонента и правку нужно проверить сразу — без ожидания CI, preview-версии и ручной сборки tarball'ов. Механизм тот же, что был в `cloudplatform-tools` на yalc, но реализован своими скриптами (`scripts/ds-link/`) и учитывает, что пакеты публикуются под другим скоупом: локальный `@ds/button` попадает к потребителю как `@sbercloud/snack-v2-button`, поэтому импорты в его коде переписывать не нужно. Подходит любому потребителю — микрофронту, монолитному сервису, песочнице.

Рабочий цикл — две команды: подключить один раз и оставить watch запущенным на всё время работы.

```bash
# 1. один раз за сессию: собрать, доставить, подключить (+ pnpm install у приложения)
pnpm ds:link ~/path/to/app modal

# 2. в отдельном терминале на всё время работы — правки в src уезжают сами
pnpm ds:watch

# 3. по завершении: вернуть версии из реестра
pnpm ds:unlink ~/path/to/app
```

**Без запущенного `ds:watch` правки к приложению не поедут.** `ds:link` доставляет пакет один раз, в момент подключения; дальше нужна либо непрерывная доставка (`ds:watch`), либо разовая (`ds:push`) после каждой правки. Обе команды без аргументов берут ровно те пакеты, что уже подключены, — перечислять их заново не нужно.

| Команда                           | Что делает                                                                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm ds:watch [<pkg>,...]`       | **Основной режим.** Следит за `packages/<pkg>/src`, на каждое сохранение пересобирает и доставляет. Без аргументов — все подключённые пакеты.                                                                                        |
| `pnpm ds:link <путь> [<pkg>,...]` | Собирает названные пакеты, размещает их в `<приложение>/.ds-link/`, прописывает `pnpm.overrides`, дополняет `.gitignore` и запускает `pnpm install`. Без списка пакетов — переподключает то, что за этим приложением уже закреплено. |
| `pnpm ds:push [<pkg>,...]`        | Разовая пересборка и доставка — когда watch держать не хочется.                                                                                                                                                                      |
| `pnpm ds:status`                  | Что и в какие приложения подключено.                                                                                                                                                                                                 |
| `pnpm ds:unlink <путь>`           | Снимает overrides и `.ds-link`, возвращает версии из реестра.                                                                                                                                                                        |

Флаги: `--with-deps` (подменить и workspace-зависимости названных пакетов), `--skip-build` (dist уже свежий), `--skip-install`, `--keep-scope` (работать под `@ds/*`), `--scope=` / `--prefix=`.

Что важно знать:

- **Подменяются только названные пакеты.** Их зависимости остаются теми, что стоят у потребителя: в staging-копии диапазоны заменены на `*`, и pnpm переиспользует уже установленную версию — одна копия в дереве и никаких незапрошенных обновлений соседних пакетов. Если правка задела несколько пакетов, перечисли их в команде либо возьми `--with-deps`.
- **Ключ override содержит версию** (`"@sbercloud/snack-v2-modal@3.0.0": "file:.ds-link/…"`), поэтому подменяется только та ветка графа, которая просит именно её. Если в дереве живёт вторая версия того же пакета и компонент приходит через неё, правка не будет видна — убери версию из ключа, тогда override применится ко всем веткам.
- **Локальная сборка компилировалась против версий монорепы.** Всё, что осталось версий потребителя, `ds:link` печатает таблицей: расхождение может дать ошибку в рантайме, если правка задевает изменившийся API.
- **Новая зависимость внутри пакета устанавливается автоматически.** Это частая проблема при локальном подключении: зависимость добавлена в пакет, у потребителя её в `node_modules` нет, и подключённый пакет перестаёт работать без явной ошибки. Здесь diff зависимостей отслеживается, и `pnpm install` у потребителя запускается автоматически.
- **Overrides перенаправляют зависимость, но не создают её.** Если пакет в приложении ещё не используется, сначала `pnpm add @sbercloud/snack-v2-<pkg>`.
- **Применит ли правку работающий dev-сервер — зависит от сборщика.** Next 16 на Turbopack пересобирает подключённый пакет сам: проверено на careerfront, правка разметки и стилей отобразилась на странице без перезапуска. Webpack по умолчанию не следит за `node_modules` (`watchOptions.ignored`), а Vite выполняет pre-bundling зависимостей — там нужно либо исключить пакет (`optimizeDeps.exclude`), либо перезапустить dev-сервер.
- **`ds:link` / `ds:unlink` запускают `pnpm install` у потребителя.** Он приводит `node_modules` в соответствие с lockfile, поэтому версии, установленные до этого вручную (`pnpm add` без коммита лока), вернутся к объявленным. Если это мешает — `--skip-install` и установка вручную.
- **Lock-файл потребителя может измениться из-за разницы версий pnpm.** Если локальный pnpm новее того, которым собирали lockfile, install допишет туда служебные поля (например `libc:`) — к подключению пакетов это отношения не имеет, коммитить такие правки не нужно: `git checkout pnpm-lock.yaml`.
- **Рабочее дерево не портится.** В отличие от `pnpm transform:scope` + `npm pack`, переименование скоупа живёт только в `.ds-link/stage/` (gitignored), а `packages/*/package.json` остаются нетронутыми.
- **pnpm разворачивает `file:`-зависимость копией, а не символической ссылкой.** Поэтому после доставки файлы копируются ещё и в реальную папку пакета внутри `node_modules/.pnpm/` — иначе потребитель видел бы старую сборку до следующего `pnpm install`.

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
