# Design System

React-компонентная библиотека с документацией на Storybook и Astro.

## Возможности

- **Design Tokens** — интеграция с Figma Variables (`@sbercloud/figma-variables`)
- **Storybook** — интерактивная документация компонентов (порт 6006)
- **Astro Docs** — сайт документации на Starlight (порт 4321)
- **Accessibility** — проверка a11y (addon-a11y)
- **Figma** — addon-designs для просмотра макетов
- **Vitest + Playwright** — unit- и e2e-тесты
- **Monorepo** — Lerna + pnpm workspaces, пакеты `@design-system/*`

## Быстрый старт

### Установка зависимостей

```bash
pnpm deps
```

### Запуск Storybook

```bash
pnpm storybook    # http://localhost:6006
```

### Запуск Astro

```bash
pnpm dev          # Astro docs http://localhost:4321
```

### Основные команды

| Действие             | Команда                        |
| -------------------- | ------------------------------ |
| Storybook            | `pnpm storybook`               |
| Документация (Astro) | `pnpm dev`                     |
| Сборка всего         | `pnpm build` (packages + docs) |
| Полная сборка        | `pnpm build:all` (+ storybook) |
| Линт                 | `pnpm lint`                    |
| Unit-тесты           | `pnpm test:unit`               |
| E2E-тесты            | `pnpm test:e2e`                |

### Сборка

```bash
pnpm build:packages     # Пакеты (TS + CSS)
pnpm build:docs         # Astro docs (по умолчанию BASE_PATH=/snack-v2/)
pnpm build:storybook    # Статика Storybook
pnpm build              # Пакеты + docs
pnpm build:all          # Пакеты + docs + storybook
```

Сборка документации для корня домена: `pnpm --filter @design-system/docs build:root`.  
Кастомный BASE_PATH: `BASE_PATH=/path/ pnpm build:docs`.

## Структура репозитория

```
├── astro/                 # Сайт документации (Starlight)
├── packages/              # Пакеты @design-system/*
│   ├── avatar/
│   ├── button/
│   ├── counter/
│   └── typography/
├── storybook/             # Конфиг Storybook (main.ts, preview.tsx)
├── scripts/               # Сборка, docgen, add-package
├── playwright/            # E2E утилиты
├── docs/                  # Техническая документация (архитектура, миграции)
├── .cursor/               # Правила и инструкции для Cursor
└── types/                 # Глобальные типы (css.d.ts, scss.d.ts, …)
```

## Новый компонент

Генератор создаёт пакет со структурой, stories и конфигами:

```bash
pnpm add-package
```

Подробнее: [scripts/README.md](./scripts/README.md).

## Storybook аддоны

- **addon-docs** — автодокументация
- **addon-designs** — Figma
- **addon-links** — навигация между stories
- **addon-a11y** — доступность
- **addon-vitest** — тесты в Storybook
- **@chromatic-com/storybook** — visual regression

Подробнее: [storybook/ADDONS.md](./storybook/ADDONS.md).

## Тестирование

```bash
pnpm test                 # Все тесты (pnpm -r test)
pnpm test:unit            # Vitest, один прогон
pnpm test:unit:watch      # Vitest, watch
pnpm test:e2e             # Playwright
pnpm test:e2e:ui          # Playwright UI
pnpm test:e2e:report      # Открыть отчёт
```

## Docgen

Генерация таблиц пропсов и README из типов и MDX:

```bash
pnpm docgen           # Таблицы пропсов во все пакеты
pnpm docgen:readme    # README по пакетам
pnpm docgen:all       # Всё разом
pnpm docgen:staged    # Только по изменённым пакетам
```

## Документация

- [docs/README.md](./docs/README.md) — техническая документация (архитектура, миграции, тесты)
- [.cursor/docs/](./.cursor/docs/README.md) — инструкции для Cursor / LLM.txt
- [storybook/README.md](./storybook/README.md) — конфигурация Storybook
- [storybook/ADDONS.md](./storybook/ADDONS.md) — аддоны
- [scripts/README.md](./scripts/README.md) — скрипты и генератор
- [astro/README.md](./astro/README.md) — сайт документации на Astro

## Стек

- React 19, TypeScript 5.9
- Storybook 10, Astro (Starlight)
- Vitest, Playwright
- SCSS Modules, Figma Variables
- Lerna, pnpm
