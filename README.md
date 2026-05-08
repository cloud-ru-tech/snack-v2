# Design System

Монорепозиторий для разработки компонентной библиотеки на React + TypeScript. Включает компоненты, Storybook, документационный портал на Astro и полный набор e2e-тестов.

## Структура репозитория

```
design-system/
├── packages/               # Публикуемые npm-пакеты
│   ├── tokens/             # Дизайн-токены (SCSS-переменные + CSS-кастом-пропсы)
│   └── button/             # Пример компонента
│       ├── src/            # Исходники (Button.tsx, styles.module.scss)
│       ├── stories/        # Storybook-сторис (Button.stories.tsx)
│       ├── demos/          # Интерактивные демо для доки (ButtonDemo.tsx)
│       ├── docs/           # MDX-документация пакета (overview.mdx, ...)
│       ├── tsconfig.esm.json / tsconfig.cjs.json  # Сборка ESM + CJS
│       └── package.json    # Экспорт src + dist
│
├── scripts/                # Корневые скрипты (SCSS → CSS, CSS modules для CJS)
├── apps/
│   ├── docs/               # Документационный портал (Astro)
│   │   └── src/
│   │       ├── content.config.ts    # Astro content collections
│   │       ├── content/
│   │       │   └── patterns/        # MDX-паттерны не привязанные к пакетам
│   │       ├── components/
│   │       │   └── Canvas.tsx       # Интерактивное превью с контролами
│   │       ├── layouts/
│   │       └── pages/
│   │           ├── components/[...slug].astro
│   │           └── patterns/[...slug].astro
│   └── storybook/          # Корневой Storybook
│       └── .storybook/
│           ├── main.ts     # Глобует stories из packages/*/stories/
│           └── preview.ts
│
├── tests/                  # E2E-тесты (Playwright)
│   ├── storybook/          # Тесты компонентов против Storybook iframe
│   ├── visual/             # Визуальная регрессия (скриншоты)
│   ├── docs/               # Тесты документационного портала
│   ├── helpers/storybook.ts
│   └── playwright.config.ts
│
├── tsconfig.base.json      # Единый источник общих compilerOptions
├── tsconfig.json           # Typecheck-профиль (noEmit)
├── lerna.json              # Lerna: версионирование и публикация
└── pnpm-workspace.yaml     # pnpm workspaces + catalog для общих внешних deps
```

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

| Команда | Что делает |
|---------|------------|
| `pnpm dev:storybook` | Запускает Storybook на `localhost:6006` |
| `pnpm dev:docs` | Запускает документационный портал на `localhost:4321` |
| `pnpm dev` | Параллельный запуск Storybook (`localhost:6006`) и docs (`localhost:4321`) |
| `pnpm build` | Собирает пакеты, затем Storybook и docs |
| `pnpm build:packages` | Только пакеты: TS (ESM+CJS) + CSS + CJS css-modules |
| `pnpm build:pkg <pkg>[,<pkg2>]` | Селективная инкрементальная сборка одного пакета (`scripts/build-pkg.mts`) — на порядки быстрее `build:packages` при работе над одним компонентом |
| `pnpm build:fast` | `build:packages` + `build:docs:fast` (без Storybook static) |
| `pnpm gen:props` | Генерирует `docs/props.json` для каждого пакета из TypeScript-типов |
| `pnpm gen:readme` | Генерирует `README.md` для каждого пакета из docs/overview.mdx + props.json |
| `pnpm gen` | Запускает `gen:props` + `gen:readme` (полная регенерация) |

## Тесты

| Команда | Что делает |
|---------|------------|
| `pnpm test:stories` | Запускает play-функции сторис через `@storybook/test-runner` |
| `pnpm test:e2e` | Playwright по всем проектам (chrome+firefox+safari+mobile) |
| `pnpm test:e2e:chrome` | Только chrome — дефолт во время разработки. Принимает path/`-g` фильтр: `pnpm test:e2e:chrome packages/<pkg>` |
| `pnpm test:e2e:ui` | Playwright в интерактивном UI-режиме |
| `pnpm test:e2e:update-snapshots` | Обновляет baseline скриншоты (chrome-only) |

Селективные команды для итеративной работы над одним пакетом — см. [`.claude/rules/fast-build-commands.md`](./.claude/rules/fast-build-commands.md).

## Публикация пакетов

```bash
# Проставить новые версии и создать git-теги
pnpm version:packages

# Собрать и опубликовать в npm
pnpm release
```

## Как добавить новый компонент

Подробное руководство — в [Contribution Guide](/patterns/contribution-guide) документационного портала.

Краткий алгоритм:

1. Запустить `pnpm add-package` или скопировать `packages/button/` → `packages/my-component/`
2. Переименовать `name` в `package.json` → `@ds/my-component`
3. Добавить пакет в `packages/tsconfig.esm.json` и `packages/tsconfig.cjs.json` (скрипт `add-package` делает это автоматически)
4. Описать сторис в `stories/MyComponent.stories.tsx`
5. Написать демо в `demos/MyComponentDemo.tsx`
6. Задокументировать в `docs/index.mdx` — страница появится в портале автоматически

### Доменная группировка пакетов

Главная страница и сайдбар docs группируют пакеты по **префиксу имени** через конфиг `apps/docs/src/config/domains.mjs`:

| Префикс пакета | Домен в портале и Storybook |
|----------------|------------------------------|
| `uikit-product-*` | Uikit Product |
| `ai-*` | AI |
| `admin-*` | Admin |
| (всё остальное) | Components |

Чтобы завести новый домен — добавить блок в `DOMAINS` массив и убедиться, что префикс пакета совпадает с `prefix`. Никаких ручных вписываний пакета по доменам не нужно.

## Технологии

| Роль | Инструмент |
|------|-----------|
| Пакетный менеджер | pnpm workspaces |
| Версионирование и публикация | Lerna |
| Сборка компонентов | TypeScript (`tspc` + project references), ts-patch |
| Стили | SCSS → CSS (sass + postcss), CSS Modules |
| Документальный портал | Astro + MDX |
| Среда разработки компонентов | Storybook 10 |
| E2E-тесты | Playwright |
