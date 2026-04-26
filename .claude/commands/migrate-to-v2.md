---
description: Создать план миграции компонента со старой дизайн-системы (@snack-uikit/*, @cloud-ru/*) в @ds/* (пишется в .claude/plan/<pkg>.md)
argument-hint: <pkg-name> [figma-url ...] [--ref <pkg> ...] [--note "..."]
---

Создай план миграции компонента в новую дизайн-систему `@ds/*`. План сохрани в `.claude/plan/<pkg-name>.md`.

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

Распарси:
- **`<pkg-name>`** (обязательно) — целевое имя пакета в `packages/`, будет опубликован как `@ds/<pkg-name>`.
- **Figma URL(ы)** — любые `figma.com/design/...` ссылки. Извлеки `fileKey` и все `node-id` (преобразуй `A-B` → `A:B`).
- **Референсные пакеты** — уже мигрированные `@ds/*`-пакеты, на которые стоит ориентироваться (структура, API, стили). Обычно после флага `--ref` или через «похож на X».
- **Комментарий** — произвольные заметки про доп. функциональность, scope, ограничения. Обычно после `--note` или в конце строки.

Если чего-то критичного не хватает (имя пакета отсутствует, Figma не дана и legacy-источник неясен) — спроси у пользователя одним сообщением, не начинай работу.

## Обязательный research перед написанием плана

1. **Legacy-источник.** Найди старую реализацию:
   - Проверь соседний репозиторий `storybook/packages/<pkg-name>/` (скаффолд-утилита — `scripts/migrate-package.mts`).
   - Если нет — `npm pack @snack-uikit/<pkg-name>` и/или `@cloud-ru/uikit-product-mobile-<pkg-name>` во временную папку, распакуй `src/`. Путь к распакованному коду включи в секцию «Legacy источники» плана.
   - Прочитай `src/` legacy: публичный API, типы, константы, хуки, subcomponents.

2. **Figma.** Для каждого полученного `nodeId`:
   - `mcp__figma-remote-mcp__get_metadata` — структура слоёв, variant axes.
   - Составь таблицу `Figma variant → StepState/Prop` (см. пример Stepper — «Figma Step variant → StepState»).
   - Запомни значения `fileKey` / `nodeId` для секции `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts`.

3. **Референсные пакеты.** Для каждого `--ref <pkg>`:
   - Прочитай `packages/<pkg>/src/index.ts`, `stories/`, `docs/index.mdx` — отметь повторяемые паттерны (структура, naming, composition).

4. **Tier.** Определи по `.claude/rules/complexity-tiers.md` (XS/S/M/L/XL) — от tier'а зависит объём stories/tests/docs.

## Структура плана (обязательные секции)

Пиши план на русском, markdown. Скелет ниже — обязательный.

1. **Заголовок** + 1-строчное summary с указанием legacy-источников и Figma `fileKey`.
2. **Зафиксированные решения** — таблица `# | Вопрос | Решение` (scope, tier, API-совместимость drop-in vs breaking, специфика).
3. **Research** — Figma nodes, variant → prop mapping, legacy API (типы/константы/хуки), **Маппинг зависимостей legacy → наши** таблицей.
4. **Scope и публичное API** — `src/index.ts` export-skeleton + список публичных компонентов/хуков/типов/констант.
5. **Структура `src/`** — дерево (flat или nested по `.claude/rules/package-src-structure.md`).
6. **Stories** — дерево `stories/<Name>/` (кол-во файлов по tier'у, обязательно Playground + VisualMatrix + *Test).
7. **Тесты** — список spec-файлов в `__test__/<ComponentName>/` по `.claude/rules/e2e-testing-standard.md` (блоки по tier'у).
8. **Docs** — `docs/*.mdx` + `demos/` + `demos/examples/` + `FIGMA_<NAME>` константы для `apps/docs/src/lib/figma.ts`.
9. **Wire-точки** — чеклист (tsconfig references, storybook/docs aliases, package.json deps со строгими версиями, без `react`/`react-dom`).
10. **Фазы** — пронумерованные Phase 1…N (Research → Core → Subcomponents → Stories → Tests → Docs → Verification).
11. **Риски** — точки с неочевидными проблемами (отсутствующие зависимости, async edge-cases, token naming, visual flakiness).
12. **Success criteria** — чеклист `[ ]` (typecheck/lint/build/test/docs/tier audit).
13. **Связанные правила** — ссылки на релевантные `.claude/rules/*.md`.
14. **Legacy источники** — пути к распакованному коду / ссылки в соседнем репо, чтобы агент-имплементатор знал, откуда портировать.

## Конвенции

- Версии зависимостей — строгие (см. `.claude/rules/packages-deps.md`).
- Никаких `react`/`react-dom` в `packages/*/package.json`.
- Маппинг зависимостей legacy → наши — **обязательная таблица** (`@snack-uikit/icons` → `@ds/icons`, `@snack-uikit/utils::ValueOf` → `@ds/utils::ValueOf`, и т.д.).
- Figma-переменные — через `@cloud-ru/figma-variables`, не `@snack-uikit/figma-tokens`.
- Если в Figma есть опечатки в variant-именах — зафиксируй их в «Рисках» и реши в плане (корректное имя в API + комментарий-сноска в `constants.ts`).

## Итог

- Запиши план в `.claude/plan/<pkg-name>.md` (создай папку `.claude/plan/`, если её нет).
- Если файл уже существует — спроси, перезаписать или дополнить.
- В конце ответа пользователю — короткое summary (3–5 строк): tier, кол-во публичных компонентов, сколько фаз, ключевые риски.
