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
- **Референсные пакеты (`--ref <pkg>`)** — npm-пакеты старой ДС (`@snack-uikit/*`, `@cloud-ru/uikit-product-mobile-*` и т.п.), которые надо найти в `node_modules` или скачать через `npm pack` и проанализировать как legacy-источник (см. шаг 2 research). Можно передать несколько флагов.
- **Комментарий** — произвольные заметки про доп. функциональность, scope, ограничения. Обычно после `--note` или в конце строки.

Если чего-то критичного не хватает (имя пакета отсутствует, Figma не дана и legacy-источник неясен) — спроси у пользователя одним сообщением, не начинай работу.

**Второй обязательный чекпойнт** — после research-фазы, если Figma-метадата расходится с API легаси (подробности в разделе «Reconcile Figma ↔ legacy» ниже), нужно остановиться и явно спросить пользователя, как разрешать каждое расхождение. Не принимай таких решений самостоятельно — даже «очевидных».

## Обязательный research перед написанием плана

**Принцип:** Figma — ground truth для визуального API и осей варьирования. Референс-пакет — ground truth для функционального поведения (таймеры, коллбэки, slots, side-effects). План = пересечение. Не принимай за чистую монету ни то ни другое, не сверив одно с другим. Любая ось/токен, упомянутый только в референсе и отсутствующий в Figma (или наоборот), — это явное **design decision**, которое должно попасть в «Зафиксированные решения» до единой строки кода.

1. **Figma первым делом** (до чтения легаси-исходников, чтобы не ангажироваться API легаси-библиотеки):
   - `mcp__figma-remote-mcp__get_metadata` на корневую ноду → полный список variant-осей (`state`, `size`, `appearance`, `view`, …) и их значений. Это исчерпывающий список визуальных пропов, которые ДОЛЖНЫ быть в API. Сохрани сырой output в план.
   - `mcp__figma-remote-mcp__get_variable_defs` на 1–2 ключевых variant'ах (default + самый сложный) → таблица используемых токенов (`sn/theme/color/…`, `sn/density/typography/…`, `sn/primitive/dimension/…`, `sn/button/anatomy/…`). Это черновик будущего SCSS.
   - `mcp__figma-remote-mcp__get_design_context` (если нужна точная структура DOM) — даёт raw CSS каждого вложенного слоя; пригодится на имплементации.
   - Составь таблицу `Figma variant → React prop` (колонки: Figma axis, значения, prop, default, data-attribute).
   - Проверь имена слоёв на `stateLayer/...`, `material/acrylic/...`, `focusedFrame/...` — это триггеры для `@ds/materials`-миксинов и `:focus-visible` (см. `.claude/rules/figma-to-code.md` и `packages/materials/docs/index.mdx`). Список найденных материальных слоёв → в план.
   - Зафиксируй `fileKey` / `nodeId` как константы `FIGMA_<NAME>` для `apps/docs/src/lib/figma.ts`.

2. **Legacy-источник.** Источники задаются пользователем через флаги `--ref <pkg>` (один или несколько npm-пакетов старой ДС — `@snack-uikit/*`, `@cloud-ru/uikit-product-mobile-*` и т.п.). Для каждого `--ref`:
   - Сначала найди пакет в `node_modules` этого монорепо (может уже быть установлен как транзитивная зависимость): `find node_modules -maxdepth 4 -type d -name '<pkg>'` либо `pnpm why <pkg>`. Если нашёлся — бери `src/` (если опубликован) или разобранные `dist/*.js` + `.d.ts` оттуда.
   - Если в `node_modules` нет — скачай во временную папку: `mkdir -p .claude/tmp/<pkg> && cd .claude/tmp/<pkg> && npm pack <pkg> && tar -xzf *.tgz`. Если опубликован `src/` в tarball'е — читай его; иначе работай с `dist/` + `.d.ts`.
   - Путь(и) к найденному/распакованному коду зафиксируй в секции «Legacy источники» плана (абсолютные или относительно корня репо).
   - Прочитай код: **только функциональный слой** — коллбэки, хуки, таймеры, slots, truncate/clipboard/async-логика, structural composition, публичные типы из `.d.ts`. Визуальные константы (SIZES map, цвета, spacing-константы) **не** подтягивай в план как факт — они часто пришли из другой Figma и могут расходиться с текущей.

3. **Reconcile Figma ↔ legacy** (обязательный шаг):
   - Для каждой оси из Figma metadata — есть ли она в API легаси? Для каждого prop из легаси — есть ли соответствующая ось в Figma metadata?
   - **Любое расхождение — это блокирующий вопрос пользователю, а не авто-решение агента.** Не выкидывай prop из API и не добавляй новые оси молча. Собери все расхождения в один список и **явно спроси пользователя** одним сообщением:
     - `prop X есть в легаси (@<scope>/<pkg>@<ver>), но в Figma ноде <nodeId> такой оси нет — выкинуть, оставить legacy-extension с пометкой «не из Figma», или это означает, что я смотрю не ту Figma-ноду?`
     - `ось Y есть в Figma, но в легаси её нет — добавить новый prop в API или скипнуть эту ось в первой итерации?`
     - `цвет/spacing Z в легаси расходится с токеном Figma — идём за Figma или сохраняем легаси-значение?`
   - Решения пользователя фиксируются в «Зафиксированные решения» с пометкой кто принял решение и обоснованием. Без ответа на эти вопросы — план не финализируется.

4. **Референсные пакеты.** Для каждого `--ref <pkg>`:
   - Прочитай `packages/<pkg>/src/index.ts`, `stories/`, `docs/index.mdx` — отметь повторяемые паттерны (структура, naming, composition, использование `@ds/materials`-миксинов).

5. **Tier.** Определи по `.claude/rules/complexity-tiers.md` (XS/S/M/L/XL) — от tier'а зависит объём stories/tests/docs.

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
9. **Wire-точки** — чеклист (tsconfig references, storybook/docs aliases, package.json deps).
10. **Фазы** — пронумерованные Phase 1…N. **Явно разделяй логику и стили**:
    - _Логика_ — порт из референса 1:1, меняются только импорты (`@snack-uikit/*` / `@cloud-ru/*` → `@ds/*`) и (если нужно) замена сторонних утилит на внутренние аналоги из «Маппинга зависимостей». Без «улучшений» и рефакторингов сверх паритета.
    - _Стили_ — **не писать числа/hex вручную**. Для каждого структурного элемента берётся CSS из Figma (`get_design_context` или `get_variable_defs`) и прогоняется через `npx @sbercloud/figma-selected-block --css-file <path> --component <hint> --format scss` (см. `.claude/skills/figma-selected-block.md`). Output вставляется в `styles.module.scss`. Hardcoded `px`/`rem`/hex допустимы только если токена для значения реально нет в `@sbercloud/figma-variables` — и сопровождаются комментарием с обоснованием.
    - Для `hover`/`pressed`/`focus`: если в Figma metadata есть слой `stateLayer/...` → использовать `@ds/materials::has-state-layer-as-child` (см. `packages/materials/docs/index.mdx`). Если `material/acrylic/...` → `with-material('acrylic', …)`. Если `focusedFrame/...` → `:focus-visible { outline: … }` (это **не** DOM-нода). Raw `:hover { color: … }` допустим только для состояний, которых нет в Figma как отдельный слой.
    - Рекомендуемый порядок: Research → Scaffold → Functional port (логика из референса, стили-заглушка) → Figma-truth styles (прогон CLI по каждому слою) → Stories → Tests → Docs → Verification.
11. **Риски** — точки с неочевидными проблемами:
    - Ось в легаси, которой нет в Figma (или наоборот) — явно перечислить, указать решение.
    - Цвета/spacing/typography в легаси, расходящиеся с Figma-токенами — список «что именно будет пересмотрено».
    - Отсутствующие зависимости, async edge-cases, visual-regression flakiness, отсутствие `FIGMA_TOKEN` (→ CSS-in режим CLI вместо `--url`).
12. **Success criteria** — чеклист `[ ]`:
    - `typecheck` / `lint` / `stylelint` / `build:packages` зелёные.
    - `test:stories`, `test:e2e:chrome` зелёные, visual baselines ручно-отсмотрены.
    - `gen:props` и `gen:readme` прогнаны, props.json непустой.
    - **Все значения spacing/color/typography/radius в `*.module.scss` — через `base.$sn-*` или `base.composite-var(...)`.** Захардкоженных `px`/`rem`/`#hex`/`rgba()` нет (кроме явно обоснованных в комментарии).
    - Каждый Figma-слой `stateLayer/...` / `material/...` реализован через соответствующий миксин `@ds/materials`, а не через raw CSS.
    - Оси React API ↔ Figma variant metadata взаимно-однозначны (или расхождения задокументированы в «Зафиксированных решениях»).
    - Figma-embed в `docs/index.mdx` работает (константа `FIGMA_<NAME>` добавлена в `apps/docs/src/lib/figma.ts`).
13. **Связанные правила** — ссылки на релевантные `.claude/rules/*.md` и `.claude/skills/*.md`. Обязательно: `figma-integration.md`, `figma-to-code.md`, `.claude/skills/figma-selected-block.md`, `packages/materials/docs/index.mdx`.
14. **Legacy источники** — пути к распакованному коду / ссылки в соседнем репо, чтобы агент-имплементатор знал, откуда портировать **только логику** (не копировать константы цветов/размеров 1:1).

## Конвенции

- Версии зависимостей — строгие (см. `.claude/rules/packages-deps.md`).
- Никаких `react`/`react-dom` в `packages/*/package.json`.
- Маппинг зависимостей legacy → наши — **обязательная таблица** (`@snack-uikit/icons` → `@ds/icons`, `@snack-uikit/utils::ValueOf` → `@ds/utils::ValueOf`, и т.д.).
- Figma-переменные — через `@sbercloud/figma-variables`, не `@snack-uikit/figma-tokens`. Значения берём через CLI `@sbercloud/figma-selected-block`, а не на глаз.
- Material/state-layer/acrylic — через миксины `@ds/materials` (см. `packages/materials/docs/index.mdx`), а не через raw CSS.
- Логика из референса, визуал из Figma. Это **не** взаимозаменяемые источники истины.
- Если в Figma есть опечатки в variant-именах — зафиксируй их в «Рисках» и реши в плане (корректное имя в API + комментарий-сноска в `constants.ts`).

## Итог

- Запиши план в `.claude/plan/<pkg-name>.md` (создай папку `.claude/plan/`, если её нет).
- Если файл уже существует — спроси, перезаписать или дополнить.
- В конце ответа пользователю — короткое summary (3–5 строк): tier, кол-во публичных компонентов, сколько фаз, ключевые риски.
