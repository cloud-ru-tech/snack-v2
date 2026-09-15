# Design System

Монорепозиторий для разработки компонентной библиотеки на React + TypeScript. Включает компоненты, Storybook, документационный портал на Astro и e2e-тесты.

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
│       ├── docs/                        # index.mdx + props.json (генерируется)
│       ├── __test__/<ParentComponent>/  # Playwright spec'и пакета + baselines
│       │   ├── helpers.ts
│       │   ├── rendering.spec.ts
│       │   ├── visual.spec.ts
│       │   ├── interaction.spec.ts      # при наличии browser-specific сценариев
│       │   ├── keyboard.spec.ts         # при наличии сценариев клавиатурной навигации
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
| `pnpm test:stories`                               | Запускает play-функции stories через `@storybook/addon-vitest`                                                                                                                        |
| `pnpm test:e2e`                                   | Playwright по всем проектам (chrome+firefox+safari+mobile)                                                                                                                            |
| `pnpm test:e2e:chrome`                            | Только chrome — основной режим при разработке. Принимает фильтр по пути или `-g`: `pnpm test:e2e:chrome packages/<pkg>`                                                               |
| `pnpm test:e2e:ui`                                | Playwright в интерактивном UI-режиме                                                                                                                                                  |
| `pnpm test:e2e:update-snapshots`                  | Обновляет **все** baseline скриншоты (chrome-only, `--update-snapshots=all` — переписывает и совпадающие)                                                                             |
| `pnpm test:e2e:update-snapshots:changed`          | Обновляет **только разошедшиеся** baseline'ы (chrome-only, `--update-snapshots=changed`) — совпадающие PNG не перезаписываются                                                        |
| `pnpm test:e2e:docker`                            | Playwright chrome в Docker (Linux, образ как на CI) — для проверки visual на Mac                                                                                                      |
| `pnpm test:e2e:docker:update-snapshots`           | Переснять **все** baseline'ы в Linux (`=all`; PNG коммитить после проверки)                                                                                                           |
| `pnpm test:e2e:docker:update-snapshots:changed`   | Переснять в Linux **только разошедшиеся** baseline'ы (`=changed`)                                                                                                                     |
| `pnpm test:e2e:docker:visual`                     | Только `visual.spec.ts` в Docker                                                                                                                                                      |
| `pnpm test:e2e:docker:visual:update` / `:changed` | Только `visual.spec.ts` в Docker с пересъёмом baseline'ов — всех (`=all`) либо только разошедшихся (`:changed`)                                                                       |
| `pnpm test:e2e:audit`                             | Статический аудит Playwright spec'ов на соответствие [e2e-testing-standard.md](./.claude/rules/e2e-testing-standard.md). Опционально — фильтр по пакету: `pnpm test:e2e:audit button` |

Селективные команды для итеративной работы над одним пакетом — см. [`.claude/rules/fast-build-commands.md`](./.claude/rules/fast-build-commands.md).

## Локальное подключение пакетов к приложению (ds-link)

Когда в приложении обнаружился баг компонента и правку нужно проверить сразу — без ожидания CI, preview-версии и ручной сборки tarball'ов. Механизм похож на yalc, но реализован своими скриптами (`scripts/ds-link/`) и учитывает, что пакеты публикуются под другим скоупом: локальный `@ds/button` попадает к потребителю как `@cloud-ru/ds-button`, поэтому импорты в его коде переписывать не нужно. Подходит любому потребителю — микрофронтенду, монолитному сервису, песочнице.

Рабочий цикл — две команды: подключить один раз и оставить watch запущенным на всё время работы.

```bash
# 1. один раз за сессию: собрать, доставить, подключить (+ pnpm install у приложения)
pnpm ds:link ~/path/to/app modal

# 2. в отдельном терминале на всё время работы — правки в src доставляются автоматически
pnpm ds:watch

# 3. по завершении: вернуть версии из реестра
pnpm ds:unlink ~/path/to/app
```

**Без запущенного `ds:watch` правки не попадут в приложение.** `ds:link` доставляет пакет один раз, в момент подключения; дальше нужна либо непрерывная доставка (`ds:watch`), либо разовая (`ds:push`) после каждой правки. Обе команды без аргументов берут ровно те пакеты, что уже подключены, — перечислять их заново не нужно.

| Команда                           | Что делает                                                                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm ds:watch [<pkg>,...]`       | **Основной режим.** Следит за `packages/<pkg>/src`, на каждое сохранение пересобирает и доставляет. Без аргументов — все подключённые пакеты.                                                                                        |
| `pnpm ds:link <путь> [<pkg>,...]` | Собирает названные пакеты, размещает их в `<приложение>/.ds-link/`, прописывает `pnpm.overrides`, дополняет `.gitignore` и запускает `pnpm install`. Без списка пакетов — переподключает то, что за этим приложением уже закреплено. |
| `pnpm ds:push [<pkg>,...]`        | Разовая пересборка и доставка — когда watch держать не хочется.                                                                                                                                                                      |
| `pnpm ds:status`                  | Что и в какие приложения подключено.                                                                                                                                                                                                 |
| `pnpm ds:unlink <путь>`           | Снимает overrides и `.ds-link`, возвращает версии из реестра.                                                                                                                                                                        |

Флаги: `--with-deps` (подменить и workspace-зависимости названных пакетов), `--skip-build` (dist уже свежий), `--skip-install`, `--keep-scope` (работать под `@ds/*`), `--scope=` / `--prefix=`.

Что важно знать:

- **Подменяются только названные пакеты.** Их зависимости остаются теми, что стоят у потребителя: в staging-копии диапазоны заменены на `*`, и pnpm переиспользует уже установленную версию — одна копия в дереве и никаких незапрошенных обновлений соседних пакетов. Если правка задела несколько пакетов, перечисли их в команде либо используй `--with-deps`.
- **Ключ override содержит версию** (`"@cloud-ru/ds-modal@3.0.0": "file:.ds-link/…"`), поэтому подменяется только та ветка графа, которая просит именно её. Если в дереве есть вторая версия того же пакета и компонент приходит через неё, правка не будет видна — убери версию из ключа, тогда override применится ко всем веткам.
- **Локальная сборка компилировалась против версий монорепозитория.** Зависимости, для которых остались версии потребителя, `ds:link` выводит таблицей: расхождение может дать ошибку в рантайме, если правка задевает изменившийся API.
- **Новая зависимость внутри пакета устанавливается автоматически.** Это частая проблема при локальном подключении: зависимость добавлена в пакет, у потребителя её в `node_modules` нет, и подключённый пакет перестаёт работать без явной ошибки. Здесь diff зависимостей отслеживается, и `pnpm install` у потребителя запускается автоматически.
- **Overrides перенаправляют зависимость, но не создают её.** Если пакет в приложении ещё не используется, сначала `pnpm add @cloud-ru/ds-<pkg>`.
- **Применит ли правку работающий dev-сервер — зависит от сборщика.** Next 16 на Turbopack пересобирает подключённый пакет сам: правки разметки и стилей отображаются на странице без перезапуска. Webpack по умолчанию не следит за `node_modules` (`watchOptions.ignored`), а Vite выполняет pre-bundling зависимостей — там нужно либо исключить пакет (`optimizeDeps.exclude`), либо перезапустить dev-сервер.
- **`ds:link` / `ds:unlink` запускают `pnpm install` у потребителя.** Он приводит `node_modules` в соответствие с lockfile, поэтому версии, установленные до этого вручную (`pnpm add` без коммита lockfile), вернутся к объявленным. Если это мешает — используй `--skip-install` и установи зависимости вручную.
- **Lock-файл потребителя может измениться из-за разницы версий pnpm.** Если локальный pnpm новее того, которым собирали lockfile, install допишет туда служебные поля (например `libc:`) — к подключению пакетов это отношения не имеет, коммитить такие правки не нужно: `git checkout pnpm-lock.yaml`.
- **Рабочее дерево не изменяется.** В отличие от `pnpm transform:scope` + `npm pack`, переименование скоупа выполняется только в `.ds-link/stage/` (gitignored), а `packages/*/package.json` остаются нетронутыми.
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

Базовый процесс через Claude Code (`/<slash-command>` работают и в Claude Code, и в Cursor):

```bash
pnpm add-package                    # создаёт packages/<pkg>/ и подключает его к репо
/add-stories <pkg>                  # Playground + VisualMatrix (+ examples/ / tests/ при необходимости)
pnpm dev:storybook                  # в отдельном терминале
pnpm test:e2e:update-snapshots packages/<pkg>   # baselines на Linux-хосте; на Mac — через Docker, см. ниже
/add-tests <pkg>                    # Playwright spec'и по rules
/test-coverage <pkg>                # отчёт coverage + аудит E2E перед PR
/add-docs <pkg>                     # docs/index.mdx + demos/
pnpm gen:props && pnpm gen:readme   # генерация props.json и README
/make-commit                        # conventional commit из staged diff
```

### Visual baselines на Mac (Linux как на CI)

Baseline PNG для visual regression нужно снимать в **Linux** — иначе проверка на CI завершается с ошибкой из‑за разницы рендеринга шрифтов (macOS CoreText vs Linux FreeType). Локально на Mac:

#### Установка Docker

Нужен Docker с эмуляцией `linux/amd64`: Storybook собирается на хосте, а `pnpm install` и Chromium, который снимает baseline'ы, работают в контейнере под `linux/amd64` — как на CI.

Используется **Docker Desktop**. Установке через Homebrew Cask нужен `sudo` для симлинка `docker-credential-osxkeychain` в `/usr/local/bin`, поэтому запускай её **из своего терминала**: в сессии без TTY (агент, CI-раннер, `ssh` без `-t`) установка дойдёт до этого шага и откатится целиком.

```bash
brew install --cask docker-desktop
```

Дальше в приложении: **Settings → General → Use Rosetta for x86_64/amd64 emulation**. Без Rosetta `linux/amd64` эмулируется через QEMU, и `pnpm install` и прогон Chromium в контейнере замедляются в разы. Проверка, что эмуляция работает:

```bash
docker run --rm --platform=linux/amd64 alpine uname -m   # x86_64
```

#### За корпоративным прокси

Docker Desktop берёт доверенные корневые сертификаты и DNS-резолверы из macOS, поэтому перехват TLS прокси и внутренние имена хостов обычно работают без настройки. Остаётся проблема, которую Docker Desktop не решает.

**`Hash Sum mismatch` при сборке образа** (шаг `playwright install-deps`). Встречается за прокси, которые кэшируют или проверяют скачиваемые файлы: `.deb` приходит с верным размером, но битым SHA256, причём при повторе «портятся» другие пакеты. Решается настройками apt, они уже заданы в `docker/e2e/Dockerfile` (`/etc/apt/apt.conf.d/99fix-broken-proxy`: `No-Cache` + `BrokenProxy` + `Pipeline-Depth 0`). Если образ собирается другой командой или на другом базовом образе, этот файл нужно создать **до** установки пакетов.

#### Команды

```bash
pnpm test:e2e:docker:visual                                   # прогон visual-тестов в Linux
pnpm test:e2e:docker:visual:update packages/calendar          # переснять один пакет (все baseline'ы, =all)
pnpm test:e2e:docker:visual:update:changed packages/calendar  # переснять только разошедшиеся (=changed)
pnpm test:e2e:docker:visual:update                            # все visual.spec.ts
```

`=all` (`…:update`) переписывает **каждый** baseline пакета, включая совпадающие; `=changed` (`…:update:changed`) — **только** те, что реально разошлись с текущим рендером. `:changed` предпочтителен для точечной пересъёмки: не раздувает diff неизменными PNG и не записывает случайный нестабильный рендер как новый эталон.

Образ: `snack-v2-e2e:local`, собирается из `docker/e2e/Dockerfile` (bookworm + установленные в образ chromium и его OS-зависимости — во время запуска браузер не скачивается). Первый build — минуты, дальше из кэша слоёв Docker (повторно ~1–2 сек, если Dockerfile и версия Playwright не менялись). Другой образ задаётся через `DOCKER_E2E_IMAGE`.

`storybook-static` собирает **хост**, а не контейнер: бандл платформо-нейтрален, а пиксельный паритет с CI даёт Chromium внутри `linux/amd64`, который остаётся в контейнере. На Apple Silicon это нативная arm64-сборка вместо эмулируемой — около минуты вместо нескольких; `/work` подключается через bind mount, поэтому контейнер видит статику хоста. Первый прогон дольше на время сборки образа. `build:packages` по умолчанию **не** запускается — storybook static резолвит `@ds/*` → `packages/*/src` через vite-алиасы, dist не нужен (на CI пакеты перед e2e тоже не собираются). Принудительная сборка dist для диагностики — `DOCKER_E2E_BUILD_PACKAGES=1`.

#### Переиспользование статики между прогонами

Сборка статики — самая долгая часть прогона, и она нужна только когда менялись стори или исходники компонентов. Если несколько пакетов снимаются подряд без правок между ними, второй и следующие прогоны можно запустить на уже собранной статике:

```bash
DOCKER_E2E_INSTALL=0 DOCKER_E2E_SKIP_STORYBOOK_BUILD=1 \
  pnpm test:e2e:docker:visual:update:changed packages/<pkg>  # ~30 сек на пакет
```

С `DOCKER_E2E_SKIP_STORYBOOK_BUILD=1` после правки стори эталоны снимаются со **старой** статики, и устаревший рендер записывается в baseline. Используй переменную, только если с прошлой сборки ничего не менялось.

Не запускай несколько visual-контейнеров параллельно: под эмуляцией они делят CPU, и снимки с `hover` / тултипами / анимацией становятся нестабильными. С `:update` нестабильный кадр запишется в эталон.

#### Частые ошибки

- **`Segmentation fault` / `Exit status 139` в фазе `build:storybook` (`transforming...`).** Актуально для сборки **внутри контейнера** — прямой запуск `docker/e2e/run.sh`; через `pnpm test:e2e:docker*` статику собирает хост нативно, и этот сценарий не возникает. Сборке Storybook нужен V8-heap 8192 МБ (задан в `apps/storybook/package.json`; со значением по умолчанию ~2 ГБ сборка завершается с OOM на большом наборе сторей). На Apple Silicon контейнер работает как эмулируемый `linux/amd64`, и heap вместе с накладными расходами эмуляции не помещается в память VM Docker Desktop → процесс завершается с SIGSEGV (139), а не с OOM (137). Симптом «до этого работало, а теперь медленно и падает» обычно означает, что обновление Docker Desktop сбросило Resources к значениям по умолчанию. Два способа:
  - **Поднять память Docker Desktop** (рекомендуется — сохраняет amd64-рендеринг = паритет с CI). Docker Desktop → **Settings** → **Resources** → **Memory** → **16 GB** (минимум 12 GB) → **Apply & restart**. Проверка:

    ```bash
    docker info --format '{{.MemTotal}}'   # ожидаем ~16000000000
    ```

    Там же в **Settings → General** проверь опцию «Use Rosetta for x86_64/amd64 emulation» — без неё amd64 эмулируется через QEMU и сборка замедляется ещё сильнее.

  - **Уменьшить heap сборки** без изменения памяти VM — `STORYBOOK_HEAP_MB=<МБ>` (читает скрипт `build` в `apps/storybook/package.json`, поэтому работает и на хосте, и внутри контейнера):

    ```bash
    STORYBOOK_HEAP_MB=6144 pnpm test:e2e:docker:visual:update:changed packages/<pkg>
    ```

    Это запасной вариант для VM с небольшим объёмом памяти: слишком низкое значение приведёт к OOM (137) — тогда увеличь число (7168) либо добавь памяти VM. Без переменной используется 8192, поведение CI не меняется.

- **`Cannot find module '@ds/...'` при build в Docker.** Конфликт macOS `packages/*/node_modules` (bind-mount) с Linux root `node_modules` (volume). Скрипт `docker/e2e/run.sh` скрывает macOS-`node_modules` на время install/build и восстанавливает после выхода. Сброс volume: `docker volume rm snack-v2-e2e-root-node-modules`.

Перед первым PR прочитать [`.claude/rules/`](./.claude/rules/) — там стандарты на структуру, stories, тесты, документацию.

### Доменная группировка пакетов

Главная страница и сайдбар docs группируют пакеты по **префиксу имени** через конфиг `apps/docs/src/config/domains.ts`:

| Префикс пакета    | Домен в портале и Storybook |
| ----------------- | --------------------------- |
| `uikit-product-*` | Uikit Product               |
| `ai-*`            | AI                          |
| `admin-*`         | Admin                       |
| (всё остальное)   | Components                  |

Чтобы завести новый домен — добавить блок в `DOMAINS` массив и убедиться, что префикс пакета совпадает с `prefix`. Вручную распределять пакеты по доменам не нужно.

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
