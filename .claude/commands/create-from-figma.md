---
description: План НОВОГО пакета @ds/* только по Figma-ноде (без legacy) в .claude/plan/<pkg>.md — когда заводят пакет с нуля по дизайну.
argument-hint: <pkg-name> <figma-url> [<figma-url> ...] [--note "..."]
---

Создай план **нового** компонентного пакета `@ds/<pkg-name>` на основе единственного источника истины — Figma. План сохрани в `.claude/plan/<pkg-name>.md`.

В отличие от `/migrate-to-v2`, здесь **нет** legacy-пакета для портирования. Публичное API компонента нужно **спроектировать с нуля** на основе variant-осей Figma-мастера и общих конвенций репозитория. Любая функциональная семантика (что значит prop, какие коллбэки нужны, controlled vs uncontrolled) — твоя гипотеза, которую обязательно подтверждает пользователь до начала имплементации.

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

Распарси:
- **`<pkg-name>`** (обязательно) — целевое имя пакета в `packages/`, будет опубликован как `@ds/<pkg-name>`. kebab-case, без скоупа.
- **Figma URL(ы)** (обязательно, минимум одна) — `figma.com/design/...`. Извлеки `fileKey` и все `node-id` (преобразуй `A-B` → `A:B`). Несколько URL — если компонент состоит из нескольких субкомпонентов / мастеров.
- **Комментарий** (`--note "..."`) — заметки про scope, ожидаемое поведение, ограничения, аналоги.

Если имя пакета или Figma не переданы — спроси одним сообщением, не начинай работу.

**Обязательный чекпойнт-2** — после research-фазы остановись и предъяви пользователю **черновик публичного API** (типы пропов, осей, коллбэков, slots). Без явного «ок» от пользователя не финализируй план. Это главное отличие от migrate-команды: там API диктуется legacy, здесь — твоей гипотезой.

## Обязательный research перед написанием плана

**Принцип:** Figma — единственный ground truth. Variant-оси мастера = публичные визуальные пропы. Layer'ы `stateLayer/...`, `material/...`, `focusedFrame/...` = триггеры миксинов `@ds/materials` и `:focus-visible`. Функциональную семантику (коллбэки, controlled state, async-поведение) выводишь по аналогии с уже существующими пакетами этого репо и здравым смыслом — и обязательно подтверждаешь у пользователя.

1. **Figma metadata** для каждой переданной ноды:
   - `mcp__figma-remote-mcp__get_metadata` → полный список variant-осей (`size`, `appearance`, `view`, `state`, `disabled`, `loading`, `composition`, …) и их значений. Сохрани сырой output в план.
   - `mcp__figma-remote-mcp__get_variable_defs` на 1–2 ключевых variant'ах (default + самый «тяжёлый») → таблица токенов (`sn/theme/color/…`, `sn/density/typography/…`, `sn/primitive/dimension/…`).
   - `mcp__figma-remote-mcp__get_design_context` — raw CSS / структура слоёв (нужно для понимания DOM и slot'ов: иконки, label, counter, описание, тултип…).
   - `mcp__figma-remote-mcp__get_screenshot` — для визуальной сверки в плане (опционально: вставь ссылку, если pre-render возможен).
   - Зафиксируй `fileKey` / `nodeId` как ключ в `FIGMA_NODES` для `apps/docs/src/lib/figma.ts`.

2. **Декодинг имён слоёв** (см. `.claude/rules/figma-to-code.md`):
   - `stateLayer/<group>/<role>` → `<span class={styles.stateLayer} data-state="..." aria-hidden />` + `m.has-state-layer-as-child(...)`.
   - `material/acrylic/...` → `<span class={styles.acrylic} aria-hidden />` + `m.with-material('acrylic', ...)`.
   - `focusedFrame/...` → НЕ DOM, а `:focus-visible { outline: ... }`.
   - Список найденных материальных слоёв и focus-frame'ов → в план отдельной таблицей.

3. **Соседи в репо.** Найди 1–3 близких по семантике пакета в `packages/*` (по типу взаимодействия / количеству slot'ов / tier'у), прочитай их `src/index.ts`, `constants.ts`, `types.ts`, `stories/` — отметь конвенции (naming осей, форма пропов, как реализованы slots, как организован controlled/uncontrolled state, как сделан polymorphism). Эти пакеты — твой шаблон для предлагаемого API.

4. **Tier.** Определи по `.claude/rules/complexity-tiers.md` (XS/S/M/L/XL). Считай по: количеству публичных компонентов, наличию state, polymorphism, keyboard navigation, async-данных.

5. **Черновик API → подтверждение пользователя** (обязательный чекпойнт):
   - Предложи `constants.ts` (все оси из Figma в формате `as const` объектов — см. `.claude/rules/component-api-surface.md`).
   - Предложи `types.ts` (`<Name>Props` через `type`, JSDoc на каждом поле, polymorphism через `as` + `innerRef`, если tier M+).
   - Перечисли slots (если есть `icon`/`label`/`counter`/`description`/`tooltip` и т.п. в Figma) — какой тип, обязательный или нет, как именуется.
   - Перечисли коллбэки (`onClick`, `onChange`, `onOpen`, …) — гипотеза по сигнатурам.
   - Перечисли `TEST_IDS` для внутренних слотов (см. `component-api-surface.md`).
   - **Явно выдели гипотезы**, помеченные `❓` — те, что не выводятся из Figma напрямую (например: «`loading` блокирует `onClick`?», «есть ли встроенный controlled value?», «какое поведение `Enter` на focus?»).
   - Спроси пользователя одним сообщением: подтвердить, скорректировать, отклонить отдельные пункты. План не финализируется до явного ответа.

## Структура плана (обязательные секции)

Пиши план на русском, markdown. Скелет ниже — обязательный.

1. **Заголовок** + 1-строчное summary с указанием Figma `fileKey` и tier'а.
2. **Зафиксированные решения** — таблица `# | Вопрос | Решение | Кто решил`. Сюда уезжают все гипотезы, утверждённые пользователем на чекпойнте-2.
3. **Research** — Figma nodes (URL, fileKey, nodeId), variant-оси (таблица: ось, значения, default), список слоёв `stateLayer/material/focusedFrame`, ссылки на соседние пакеты-шаблоны.
4. **Публичное API** (главная секция этой команды):
   - `constants.ts` — все `as const` объекты + `TEST_IDS`.
   - `types.ts` — типы пропов, slot'ов, коллбэков. Полный экспорт `<Name>Props`.
   - `src/index.ts` skeleton.
   - Маппинг `Figma variant axis → React prop → DOM data-attribute`.
5. **Структура `src/`** — дерево (flat для XS/S, nested для M+ — по `.claude/rules/package-src-structure.md`).
6. **Stories** — дерево `stories/<Name>/` (Playground + VisualMatrix обязательны; *Test/Polymorphic/Composition по tier'у — см. `.claude/rules/stories-standard.md`).
7. **Тесты** — список spec-файлов в `__test__/<Name>/` по tier'у (см. `.claude/rules/e2e-testing-standard.md`).
8. **Docs** — `docs/index.mdx` (frontmatter + плоские H2 по `.claude/config/docSections.mjs`), `demos/`, `demos/examples/`, плюс ключ пакета в `FIGMA_NODES` (`apps/docs/src/lib/figma.ts`). Решение про секцию `## Демо` (Canvas) — по правилу из `docs-structure.md`: только для props-driven компонентов без центральных коллбэков и state.
9. **Wire-точки** — чеклист: корневой `tsconfig.json::references`, `packages/tsconfig.esm.json` / `.cjs.json::references`, `apps/storybook/package.json::deps`. (Aliases `@ds/<pkg>` для Storybook и docs подхватываются автоматически — Storybook сканирует `packages/*/src/index.ts`, docs читает `package.json`.) Совет: `pnpm add-package <pkg>` делает большинство wire'ов автоматически.
10. **Фазы** — пронумерованные Phase 1…N. **Явно разделяй API/логику и стили**:
    - _Scaffold_ — `pnpm add-package <pkg>` + базовый `src/<Name>.tsx` со всеми пропами из утверждённого API + JSDoc + dummy DOM.
    - _Стили из Figma_ — для каждого структурного элемента берётся CSS из Figma (`get_design_context` или `get_variable_defs`) и прогоняется через `npx @sbercloud/figma-selected-block --css-file <path> --component <hint> --format scss` (см. `.claude/skills/figma-selected-block.md`). Output вставляется в `styles.module.scss`. Hardcoded `px`/`rem`/hex допустимы только если токена реально нет в `@sbercloud/figma-variables` — сопровождаются комментарием с обоснованием.
    - _State layers / material / focus_ — `stateLayer/...` → `m.has-state-layer-as-child(...)`, `material/acrylic/...` → `m.with-material('acrylic', ...)`, `focusedFrame/...` → `:focus-visible { outline: ... }`. Raw `:hover { color: ... }` — только если соответствующего слоя в Figma нет.
    - _Stories → Tests → Docs → Verification_ — стандартный хвост.
    Рекомендуемый порядок: Research → API draft → **(чекпойнт пользователя)** → Scaffold → Figma-truth styles → Stories → Tests → Docs → Verification.
11. **Риски** — точки с неочевидными проблемами:
    - Гипотезы по поведению, которые остались без подтверждения (если такие есть — вернись на чекпойнт-2).
    - Отсутствующие токены в `@sbercloud/figma-variables` (→ hardcode + комментарий).
    - Слои в Figma, которые не маппятся ни на один из паттернов `stateLayer/material/focusedFrame` — требуют ручного решения.
    - Опечатки в variant-именах Figma — в API используем корректное имя, в `constants.ts` приписываем комментарий `// Figma variant: <axis>=<typo> (typo, корректное — <fixed>)`.
    - Visual regression flakiness, отсутствие `FIGMA_TOKEN` (→ CSS-in режим CLI вместо `--url`).
12. **Success criteria** — чеклист `[ ]`:
    - `typecheck` / `lint` / `stylelint` / `build:pkg <pkg>` зелёные.
    - `test:stories`, `test:e2e:chrome packages/<pkg>` зелёные, visual baselines ручно-отсмотрены.
    - `gen:props` и `gen:readme` прогнаны, `props.json` непустой.
    - **Все значения spacing/color/typography/radius в `*.module.scss` — через `base.$sn-*` или `base.composite-var(...)`.** Захардкоженных `px`/`rem`/`#hex`/`rgba()` нет (кроме явно обоснованных в комментарии).
    - Каждый Figma-слой `stateLayer/...` / `material/...` реализован через миксин `@ds/materials`, не через raw CSS.
    - Оси React API ↔ Figma variant metadata взаимно-однозначны (или расхождения зафиксированы в «Зафиксированных решениях»).
    - Ключ пакета добавлен в `FIGMA_NODES` (`apps/docs/src/lib/figma.ts`), `<FigmaEmbed node={figmaNode('<pkg>')} />` в `docs/index.mdx` работает.
    - В `package.json` нет `react`/`react-dom`/`@types/react*`, версии строгие (см. `.claude/rules/packages-deps.md`).
13. **Связанные правила** — обязательно сошлись на: `component-api-surface.md`, `package-src-structure.md`, `figma-integration.md`, `figma-to-code.md`, `.claude/skills/figma-selected-block.md`, `packages/materials/docs/index.mdx`, `complexity-tiers.md`, `stories-standard.md`, `e2e-testing-standard.md`, `docs-structure.md`.

## Конвенции

- Версии зависимостей — строгие (см. `.claude/rules/packages-deps.md`). Никаких `react`/`react-dom` в `packages/<pkg>/package.json`.
- Figma-переменные — через `@sbercloud/figma-variables`. Значения берём через CLI `@sbercloud/figma-selected-block`, не на глаз.
- Material / state-layer / acrylic — через миксины `@ds/materials` (см. `packages/materials/docs/index.mdx`).
- Naming: `SCREAMING_SNAKE_CASE` имя `as const` объекта, `PascalCase` ключи, `lowercase` значения (совпадают с DOM `data-*` и Figma variant values).
- Не используй TypeScript `enum` и `React.*`-типы. См. `react-types.md`, `imports-exports.md`.
- Полиморфизм — через `as` + `innerRef`, не `forwardRef` (см. `component-api-surface.md`).
- Если в Figma — опечатки в variant-именах: корректное имя в React API + комментарий-сноска в `constants.ts`.

## Итог

- Запиши план в `.claude/plan/<pkg-name>.md` (создай папку, если её нет).
- Если файл уже существует — спроси, перезаписать или дополнить.
- В конце ответа — короткое summary (3–5 строк): tier, кол-во публичных компонентов, ключевые оси API, сколько фаз, открытые гипотезы (если что-то осталось без подтверждения).
