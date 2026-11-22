Создай план **нового** компонентного пакета `@ds/<pkg-name>` на основе единственного источника истины — Figma. Сохрани план по [правилам component-planning](../SKILL.md).

Публичное API компонента нужно **спроектировать с нуля** на основе variant-осей Figma-мастера и общих конвенций репозитория. Любая функциональная семантика (что значит prop, какие коллбэки нужны, controlled vs uncontrolled) — твоя гипотеза, которую обязательно подтверждает пользователь до начала имплементации.

## Входные аргументы

Пользователь передал: аргументы задачи

Распарси:
- **`<pkg-name>`** (обязательно) — целевое имя пакета в `packages/`, будет опубликован как `@ds/<pkg-name>`. kebab-case, без скоупа.
- **Figma URL(ы)** (обязательно, минимум одна) — `figma.com/design/...`. Извлеки `fileKey` и все `node-id` (преобразуй `A-B` → `A:B`). Несколько URL — если компонент состоит из нескольких субкомпонентов / мастеров.
- **Комментарий** (`--note "..."`) — заметки про scope, ожидаемое поведение, ограничения, аналоги.

Если имя пакета или Figma не переданы — спроси одним сообщением, не начинай работу.

**Обязательный чекпойнт-2** — после research-фазы остановись и предъяви пользователю **черновик публичного API** (типы пропсов, осей, коллбэков, slots). Без явного «ок» от пользователя не финализируй план. Это главное отличие от migrate-команды: там API диктуется legacy, здесь — твоей гипотезой.

## Обязательный research перед написанием плана

**Принцип:** Figma — единственный ground truth. Variant-оси мастера = публичные визуальные пропсы. Layer'ы `stateLayer/...`, `material/...`, `focusedFrame/...` = триггеры миксинов `@ds/materials` и `:focus-visible`. Функциональную семантику (коллбэки, controlled state, async-поведение) выводишь по аналогии с уже существующими пакетами этого репо и здравым смыслом — и обязательно подтверждаешь у пользователя.

1. **Figma metadata** для каждой переданной ноды:
   - `get_metadata` → полный список variant-осей (`size`, `appearance`, `view`, `state`, `disabled`, `loading`, `composition`, …) и их значений. Сохрани сырой output в план.
   - `get_variable_defs` на 1–2 ключевых variant'ах (default + самый «тяжёлый») → таблица токенов (`sn/theme/color/…`, `sn/density/typography/…`, `sn/primitive/dimension/…`).
   - `get_design_context` — raw CSS / структура слоёв (нужно для понимания DOM и slot'ов: иконки, label, counter, описание, тултип…).
   - `get_screenshot` — для визуальной сверки в плане (опционально: вставь ссылку, если pre-render возможен).
   - Зафиксируй `fileKey` / `nodeId` как ключ в `FIGMA_NODES` для `apps/docs/src/lib/figma.ts`.

2. **Декодинг имён слоёв** (см. `.agents/skills/figma-to-code/references/figma-to-code.md`):
   - `stateLayer/<group>/<role>` → `<span className={styles.stateLayer} data-state="..." aria-hidden />` + `m.has-state-layer-as-child(...)`.
   - `material/acrylic/...` → `<span className={styles.acrylic} aria-hidden />` + `m.with-material('acrylic', ...)`.
   - `focusedFrame/...` → НЕ DOM, а `:focus-visible { outline: ... }`.
   - Список найденных материальных слоёв и focus-frame'ов → в план отдельной таблицей.

3. **Соседи в репо.** Найди 1–3 близких по семантике пакета в `packages/*` (по типу взаимодействия / количеству slot'ов / tier'у), прочитай их `src/index.ts`, `constants.ts`, `types.ts`, `stories/` — отметь конвенции (naming осей, форма пропсов, как реализованы slots, как организован controlled/uncontrolled state, как сделан polymorphism). Эти пакеты — твой шаблон для предлагаемого API.

4. **Tier.** Определи по `.agents/skills/new-component-package/references/complexity-tiers.md` (XS/S/M/L/XL). Считай по: количеству публичных компонентов, наличию state, polymorphism, keyboard navigation, async-данных.

5. **Черновик API → подтверждение пользователя** (обязательный чекпойнт):
   - Предложи `constants.ts` (все оси из Figma в формате `as const` объектов — см. `.agents/skills/component-development/references/component-api-surface.md`).
   - Предложи `types.ts` (`<Name>Props` через `type`, JSDoc на каждом поле, polymorphism через `as` + `innerRef`, если tier M+).
   - Перечисли slots (если есть `icon`/`label`/`counter`/`description`/`tooltip` и т.п. в Figma) — какой тип, обязательный или нет, как именуется.
   - Перечисли коллбэки (`onClick`, `onChange`, `onOpen`, …) — гипотеза по сигнатурам.
   - Перечисли `TEST_IDS` для внутренних слотов (см. `component-api-surface.md`).
   - **Явно выдели гипотезы**, помеченные `❓` — те, что не выводятся из Figma напрямую (например: «`loading` блокирует `onClick`?», «есть ли встроенный controlled value?», «какое поведение `Enter` на focus?»).
   - Спроси пользователя одним сообщением: подтвердить, скорректировать, отклонить отдельные пункты. План не финализируется до явного ответа.

## Структура плана (обязательные секции)

Пиши план на русском, markdown. Скелет ниже — обязательный.

1. **Заголовок** + 1-строчное summary с указанием Figma `fileKey` и tier'а.
2. **Зафиксированные решения** — таблица `# | Вопрос | Решение | Кто решил | Источник`. Сюда уезжают все гипотезы, утверждённые пользователем на чекпойнте-2. Источник — проверяемая ссылка: Figma-нода (`nodeId`) или реплика пользователя (дата). Решение без источника уходит в раздел «Открытые вопросы» (сразу после этой таблицы): вопрос, кому он адресован (пользователь / дизайн), цена ошибки, предлагаемый ответ.
3. **Research** — Figma nodes (URL, fileKey, nodeId), variant-оси (таблица: ось, значения, default), список слоёв `stateLayer/material/focusedFrame`, ссылки на соседние пакеты-шаблоны.
4. **Публичное API** (главная секция этой команды):
   - `constants.ts` — все `as const` объекты + `TEST_IDS`.
   - `types.ts` — типы пропсов, slot'ов, коллбэков. Полный экспорт `<Name>Props`.
   - `src/index.ts` skeleton.
   - Маппинг `Figma variant axis → React prop → DOM data-attribute`.
5. **Структура `src/`** — дерево (по составу публичных компонентов — по `.agents/skills/component-development/references/package-src-structure.md`).
6. **Stories** — дерево `stories/<Name>/` (Playground + VisualMatrix обязательны; *Test/Polymorphic/Composition по tier'у — см. `.agents/skills/component-story-set/references/stories-standard.md`).
7. **Тесты** — список spec-файлов в `__test__/<Name>/` по tier'у (см. `.agents/skills/component-e2e-tests/references/e2e-testing-standard.md`).
8. **Docs** — `docs/index.mdx` (frontmatter + плоские H2 по `apps/docs/src/config/docSections.mjs`), `demos/`, `demos/examples/`, плюс ключ пакета в `FIGMA_NODES` (`apps/docs/src/lib/figma.ts`). Решение про секцию `## Демо` (Canvas) — по правилу из `docs-structure.md`: только для props-driven компонентов без центральных коллбэков и state.
9. **Wire-точки** — чеклист: корневой `tsconfig.json::include`, `packages/tsconfig.esm.json` / `.cjs.json::references`, `apps/storybook/package.json::deps`. (Aliases `@ds/<pkg>` для Storybook и docs подхватываются автоматически — Storybook сканирует `packages/*/src/index.ts`, docs читает `package.json`.) Интерактивный `pnpm add-package` обновляет эти точки подключения. См. [создание пакета](../../new-component-package/references/workflow.md#шаги).
10. **Фазы** — пронумерованные Phase 1…N. **Явно разделяй API/логику и стили**:
    - _Scaffold_ — пакет по [сценарию создания](../../new-component-package/references/workflow.md#шаги) и базовый `src/<Name>.tsx` со всеми пропсами из утверждённого API + JSDoc + dummy DOM.
    - _Стили из Figma_ — для каждого структурного элемента берётся CSS из Figma (`get_design_context` или `get_variable_defs`) и прогоняется через `pnpm figma:selected-block --css-file <path> --component <hint> --format scss` (см. `.agents/skills/figma-inspection/references/layer-scss.md`). Output вставляется в `styles.module.scss`. Hardcoded `px`/`rem`/hex допустимы только если токена реально нет в `@ds/figma-variables` — сопровождаются комментарием с обоснованием.
    - _State layers / material / focus_ — `stateLayer/...` → `m.has-state-layer-as-child(...)`, `material/acrylic/...` → `m.with-material('acrylic', ...)`, `focusedFrame/...` → `:focus-visible { outline: ... }`. Raw `:hover { color: ... }` — только если соответствующего слоя в Figma нет.
    - _Stories → Tests → Docs → Verification_ — стандартный хвост.
    Рекомендуемый порядок: Research → API draft → **(чекпойнт пользователя)** → Scaffold → Figma-truth styles → Stories → Tests → Docs → Verification.
11. **Риски** — точки с неочевидными проблемами:
    - Гипотезы по поведению, которые остались без подтверждения (если такие есть — вернись на чекпойнт-2).
    - Отсутствующие токены в `@ds/figma-variables` (→ hardcode + комментарий).
    - Слои в Figma, которые не маппятся ни на один из паттернов `stateLayer/material/focusedFrame` — требуют ручного решения.
    - Опечатки в variant-именах Figma — в API используем корректное имя, в `constants.ts` приписываем комментарий `// Figma variant: <axis>=<typo> (typo, корректное — <fixed>)`.
    - Visual regression flakiness, отсутствие Figma токена в Keychain (→ CSS-in режим CLI вместо `--url`).
12. **Success criteria** — чеклист `[ ]`:
    - `typecheck` / `lint` / `stylelint` / `build:pkg <pkg>` зелёные.
    - `test:stories`, `test:e2e:chrome packages/<pkg>` зелёные, visual baselines ручно-отсмотрены.
    - `gen:props` и `gen:readme` прогнаны, `props.json` непустой.
    - **Все значения spacing/color/typography/radius в `*.module.scss` — через `base.$sn-*` или `base.composite-var(...)`.** Захардкоженных `px`/`rem`/`#hex`/`rgba()` нет (кроме явно обоснованных в комментарии).
    - Каждый Figma-слой `stateLayer/...` / `material/...` реализован через миксин `@ds/materials`, не через raw CSS.
    - Оси React API ↔ Figma variant metadata взаимно-однозначны (кроме осей из [figma-integration](../../figma-inspection/references/figma-integration.md) §«Оси Figma без пропса») (или расхождения зафиксированы в «Зафиксированных решениях»).
    - Ключ пакета добавлен в `FIGMA_NODES` (`apps/docs/src/lib/figma.ts`), `<FigmaEmbed node={figmaNode('<pkg>')} />` в `docs/index.mdx` работает.
    - В `package.json` нет `react`/`react-dom`/`@types/react*`, версии по `.agents/skills/new-component-package/references/packages-deps.md` (consumer-facing — `^`, dev — пин).
13. **Связанные правила** — обязательно сошлись на: `component-api-surface.md`, `package-src-structure.md`, `figma-integration.md`, `figma-to-code.md`, `.agents/skills/figma-inspection/references/layer-scss.md`, `packages/materials/docs/index.mdx`, `complexity-tiers.md`, `stories-standard.md`, `e2e-testing-standard.md`, `docs-structure.md`.

## Конвенции

- Версии зависимостей — по `.agents/skills/new-component-package/references/packages-deps.md` (consumer-facing — `^`, dev — пин). Никаких `react`/`react-dom` в `packages/<pkg>/package.json`.
- Figma-переменные — через `@ds/figma-variables`. Значения берём через CLI `@ds/figma-selected-block`, не на глаз.
- Material / state-layer / acrylic — через миксины `@ds/materials` (см. `packages/materials/docs/index.mdx`).
- Naming: `SCREAMING_SNAKE_CASE` имя `as const` объекта, `PascalCase` ключи, `lowercase` значения (совпадают с DOM `data-*` и Figma variant values).
- Не используй TypeScript `enum` и `React.*`-типы. См. `react-types.md`, `imports-exports.md`.
- Полиморфизм — через `as` + `innerRef`, не `forwardRef` (см. `component-api-surface.md`).
- Если в Figma — опечатки в variant-именах: корректное имя в React API + комментарий-сноска в `constants.ts`.
