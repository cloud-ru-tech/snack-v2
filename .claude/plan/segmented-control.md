# Миграция `@ds/segmented-control` из `@snack-uikit/segmented-control`

**Summary:** Порт компонента выбора одного значения из списка сегментов (radiogroup + sliding selection), стили и токены — из Figma Snack UI Kit (`fileKey` **aNPU3MHwRJiEwbk5F82zux**). Legacy: npm `@snack-uikit/segmented-control@0.6.20`, исходники распакованы в `/tmp/snack-segmented-pack/package/src/`. Поставка **четырьмя фазами:** компонент + Playground → остальные stories → тесты → документация.

## Зафиксированные решения

| # | Вопрос | Решение |
|---|--------|---------|
| 1 | Scope пакета | Только `SegmentedControl` в публичном API; внутренний `Segment` остаётся в `helperComponents/` (как в legacy), без экспорта из корневого бареля, если нет явного запроса на публичный `Segment`. Типы `Segment`, `IdType`, `Size`, `Width`, `SelectionPosition` — **экспортировать** из `src/types.ts` / `src/constants.ts` для типизации `items` (аналогично тому, как потребители используют структуру сегментов). |
| 2 | Tier | **M** (много осей визуала и `items`, controlled/uncontrolled, иконка/счётчик, focus/keyboard по стрелкам). Полный чеклист **L** (Home/End, отдельный `docs/*.mdx` на субкомпонент) **не** требуется: один корневой компонент без публичных субкомпонентов; при расширении ARIA до Home/End — добавить блок в `keyboard.spec.ts` и поднять tier в аудите. |
| 3 | API-совместимость | **Drop-in** по пропам `SegmentedControl` и форме `items` (discriminated union icon vs counter), `SIZE`/`WIDTH`, `useFocusControl` **не** экспортировать (остаётся приватным в `hooks.ts`), если в legacy он не был публичным — в `package@0.6.20` публичный экспорт только `components` → `SegmentedControl`. |
| 4 | Стили токенов | Заменить `@snack-uikit/figma-tokens/.../styles-tokens-segmentedControl` и `styles-tokens-element` на **`@cloud-ru/figma-variables`** (и при необходимости общие токены уровня neutral/text/focus), по паттерну соседних пакетов (`button`, `toggles`). |
| 5 | Референс реализации | Поведение и структура файлов — **legacy** `@snack-uikit/segmented-control`. Паттерны пакета `@ds/*` — **`toggles`** (Radio/Switch: Playground, VisualMatrix, KeyboardTest, ClickTest, `uncontrollable`), **`tabs`** (nested `components/`, `@ds/counter`), **`button`** (эталон E2E/visual). |
| 6 | Расхождение Figma vs legacy по размерам | В макете набора `segmentControl` (node `6150:257592`) оси **size = s \| m \| l**; в legacy **есть `xs`**. Зафиксировать в реализации: **сохранить `xs` в API**, если переменные/композит для xs ещё есть в токенах; иначе — **breaking**: убрать `xs` с мажорной версией и записать в changelog (решение принять при импорте по факту наличия токенов). |
| 7 | Расхождение Figma `combine` | Figma: **iconAfter**; legacy: только `icon-before` \| `icon-only` \| `label-only`. Решение: **паритет с Figma** — добавить ветку `icon-after` в `getLayout` / `data-layout` и стили сегмента; для обратной совместимости старые истории без изменений. |
| 8 | **State-layer (hover / press / focus)** | Верстка и токены сегмента должны повторять **слойность макета**, а не «один фон на кнопке»: отдельные уровни **`background`** и инстанс **`state`** (см. ноды ниже); фокус — отдельный слой **`focusedFrame/regular/inside`**. В коде допустимы `::before`/`::after` или вложенный span **при 1:1 с токенами** (opacity/blend из переменных). `:focus-visible` только на клавиатурном фокусе; не дублировать outline при клике мышью. |
| 9 | **Порядок поставки** | Четыре фазы подряд: **(1)** полный `src/` + wire для Storybook + **только** `Playground` story; **(2)** все остальные stories; **(3)** Playwright + visual baselines; **(4)** MDX, demos, `figma.ts`, навигация docs, `gen:props` / `gen:readme`. Следующая фаза не начинается до закрытия критериев предыдущей (см. «Фазы миграции» и «Success criteria»). |

## Research

### Figma nodes

| Узел (URL `node-id`) | `nodeId` | Назначение |
|----------------------|----------|------------|
| Snack-Ui-Kit-variables | `6150:257592` | Компонентный сет **`segmentControl`**: варианты оси **`size`** — значения **s, m, l** (символы `6150:257593`, `6150:257597`, `6150:257601`). |
| Snack-Ui-Kit-variables | `5870:2870` | Секция **`segmentControlElements`**: сетка вариантов **`segment`** — оси **`size`** (s, m, l), **`combine`** (labelOnly, iconBefore, iconAfter, iconOnly), **`checked`** (true/false), **`disabled`** (true/false). |

### State-layer (обязательная сверка при импорте)

Внутри вариантов **`segment`** в Figma заложена типовая схема **фон + состояние + (опционально) фокус**. Имплементатору **сначала** разобрать эти ноды и привязать к ним токены / z-index / `pointer-events`, затем уже подгонять размеры из общей сетки.

| URL | `nodeId` | Структура (по `get_metadata`) | Что воспроизвести в React/SCSS |
|-----|----------|-------------------------------|--------------------------------|
| [segment state-layer — background](https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5870-2874&m=dev) | `5870:2874` | Frame **`background`** → child instance **`state`** (`5870:2875`), те же габариты что у сегмента (пример 85×24 для size=s). | Нижний слой заливки сегмента + **оверлей состояния** (hover/active/disabled из переменных `state` / neutral), без смещения контента (label/icon). |
| [segment — focusedFrame inside](https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5870-2879&m=dev) | `5870:2879` | Instance **`focusedFrame/regular/inside`** (в выборке метаданных — `hidden`, т.е. включается в вариантах с фокусом). | Паритет с legacy **`outline-inside-var`** + цвет available/complementary: кольцо **внутри** границы сегмента, не обрезается `overflow` контейнера группы; проверить совместимость с `overflow: hidden` на `SegmentedControl` и плашкой `.selection`. |

**Чеклист state-layer (не пропускать):**

1. **`get_design_context`** по `5870:2874` и `5870:2879` — точные variable bindings на слоях `background` / `state` / `focusedFrame`.
2. Соответствие **default / hover / disabled / checked** комбинациям из сетки `5870:2870` — оверлей `state` не должен «ломать» контраст текста (сверить с `checked` + `disabled`).
3. **Фокус:** слой `focusedFrame/regular/inside` vs текущий `&:focus-visible` в legacy `Segment` — визуально сравнить в Storybook и в Figma Dev Mode (скилл `.claude/skills/figma-verify-after-stories.md`).
4. Плашка **`.selection`** (контейнер) и **сегмент** — уточнить, на каком уровне лежит `state` в макете (только на segment или также на track); не смешивать z-index фокуса сегмента с обводкой группы `outline`.

Константы для `apps/docs/src/lib/figma.ts` (целевой набор — правки в репозитории **в фазе 4**):

- `FIGMA_SEGMENTED_CONTROL` → `6150:257592`
- `FIGMA_SEGMENTED_CONTROL_SEGMENT` (или `..._ELEMENTS`) → `5870:2870`
- `FIGMA_SEGMENTED_CONTROL_STATE_LAYER` → `5870:2874` (референс state-layer)
- `FIGMA_SEGMENTED_CONTROL_FOCUS_INSIDE` → `5870:2879` (референс focus inside)

`fileKey`: `aNPU3MHwRJiEwbk5F82zux`, `fileName`: `Snack-Ui-Kit-variables`.

### Figma variant → React prop / DOM

| Figma axis | Значения Figma | Куда маппится |
|------------|----------------|---------------|
| size | s, m, l, (xs — только legacy) | `size` на контейнере и кнопке: `data-size` |
| combine | labelOnly, iconBefore, iconAfter, iconOnly | Вычисляемый `data-layout` / класс раскладки сегмента (`getLayout` + расширение под **iconAfter**) |
| checked | true / false | `selected === value` → `data-active`, `aria-checked` |
| disabled | true / false | `disabled` на сегменте → `data-disabled`, `aria-disabled` / skip в фокус-навигации |

Контейнер (как в legacy): `role="radiogroup"`, сегменты `role="radio"`, `tabIndex` 0 на «фокусируемом» сегменте и -1 на остальных; стрелки **Left/Right** переключают фокус между включёнными сегментами (`useFocusControl`).

### Legacy API (кратко)

- **`SegmentedControl`**: `items`, `value` / `defaultValue`, `onChange`, `size`, `outline`, `width` (`auto` \| `full`), `name` (hidden input), `className`, плюс support/data-test через `WithSupportProps` + `extractDataTestProps` / `extractSupportProps`.
- **`Segment`** (внутренний): label, icon, counter (взаимоисключающие ветки типов с `Segment`), `renderWrapSegment`, `disabled`, `value`.
- **`hooks.useFocusControl`**: стрелки влево/вправо, состояние `focusableSegmentValue`, колбэк для программного фокуса.
- **`utils.getLayout`**: раскладка по icon/label/size (добавить **icon-after** по Figma).
- **Позиция «плашки» выбора**: `ResizeObserver` + `MutationObserver` на контейнере, измерение `offsetTop/Left/Width/Height` выбранной кнопки, анимация через абсолютный `div.selection`.

### Маппинг зависимостей legacy → `@ds/*` / экосистема

| Legacy | Новый пакет / модуль |
|--------|----------------------|
| `@snack-uikit/utils` (`ValueOf`, `WithSupportProps`, `extractDataTestProps`, `extractSupportProps`) | `@ds/utils` |
| `@snack-uikit/counter` (`Counter`, типы счётчика для `Segment`) | `@ds/counter` |
| `@snack-uikit/truncate-string` | `@ds/truncate-string` |
| `@snack-uikit/figma-tokens/...` (SCSS) | `@cloud-ru/figma-variables` + выравнивание имён композитов с макетом |
| `classnames` | `classnames` (строгая версия `2.5.1`, как в других пакетах) |
| `uncontrollable` | `uncontrollable` `8.0.4` (как `toggles`, `utils`) |

## Scope и публичное API

**`src/index.ts` (скелет реэкспорта):**

```ts
export * from './components';
export * from './constants';
export * from './types';
```

**Публично:** `SegmentedControl`, `SegmentedControlProps`, константы `SIZE`, `WIDTH`, типы `Segment`, `IdType`, `Size`, `Width`, `SelectionPosition` (если нужен потребителям для кастомных обёрток — иначе оставить `SelectionPosition` внутренним).

## Структура `src/`

Сохранить **nested** раскладку 1:1 с legacy (см. `package-src-structure.md`):

```text
packages/segmented-control/src/
├── components/
│   ├── SegmentedControl.tsx
│   ├── styles.module.scss
│   └── index.ts
├── helperComponents/
│   ├── Segment/
│   │   ├── Segment.tsx
│   │   ├── styles.module.scss
│   │   └── index.ts
│   └── index.ts
├── constants.ts
├── hooks.ts
├── types.ts
├── utils.ts
└── index.ts
```

## Stories (`stories/`)

Ориентир: tier **M**, эталон **`packages/toggles`** (Radio/Switch).  
**Фаза 1:** в дереве stories существует **только** `SegmentedControl.Playground.stories.tsx`.  
**Фаза 2:** добавляется всё остальное из списка ниже.

### Фаза 1 — только Playground

```text
stories/SegmentedControl/
└── SegmentedControl.Playground.stories.tsx   # единственная story: args, минимальный play (toBeVisible)
```

### Фаза 2 — остальные stories

```text
stories/SegmentedControl/
├── SegmentedControl.Playground.stories.tsx     # уже есть; доработать args/док-строки при необходимости
├── SegmentedControl.Sizes.stories.tsx          # все size + при необходимости outline/width
├── SegmentedControl.States.stories.tsx         # disabled сегменты, outline, full width
├── SegmentedControl.WithCounter.stories.tsx
├── SegmentedControl.WithIcons.stories.tsx      # + iconAfter после доработки getLayout
├── SegmentedControl.ClickTest.stories.tsx
├── SegmentedControl.KeyboardTest.stories.tsx   # стрелки, radiogroup
├── SegmentedControl.FocusVisible.stories.tsx   # явный кадр для :focus-visible + state-layer vs Figma 5870:2879
└── SegmentedControl.VisualMatrix.stories.tsx   # StoryTable: size × outline × width × фрагмент items
```

`title`: `Components/SegmentedControl` (или единый стиль с существующими — без лишнего вложения третьего уровня в `title`, см. `CLAUDE.md`).

## Тесты (`__tests__/`, tier **M**)

Добавляются **целиком в фазе 3** (в фазах 1–2 папки `__tests__/` и `__snapshots__/` нет).

| Файл | Содержание |
|------|------------|
| `segmented-control.helpers.ts` | id стор, матрицы URL-args, селекторы root / radio |
| `segmented-control.rendering.spec.ts` | видимость ключевых стор |
| `segmented-control.a11y.spec.ts` | Axe по сторам |
| `segmented-control.url-args.spec.ts` | Playground + args: size, outline, width |
| `segmented-control.states.spec.ts` | disabled, selected, outline |
| `segmented-control.interaction.spec.ts` | click смена value, disabled не меняет |
| `segmented-control.keyboard.spec.ts` | ArrowLeft/ArrowRight, tabIndex |
| `segmented-control.dimensions.spec.ts` | высота ряда vs Figma для s/m/l (и xs, если остаётся) |
| `segmented-control.visual.spec.ts` | статические и ключевые interaction снимки (chrome), см. `visual-regression-standard.md`; **отдельные кадры** hover/focus-visible на сегменте (state-layer + `focusedFrame/inside`) |

## Docs

Делаются **только в фазе 4** (в фазах 1–3 нет `docs/index.mdx`, демо и публичной страницы на docs-site).

- `packages/segmented-control/docs/index.mdx` — обзор, API, Do/Don't, встраивание `FigmaEmbed` / `StorybookEmbed`.
- `demos/` + `demos/examples/` — типовые примеры (controlled, counter, full width).
- В `apps/docs/src/lib/figma.ts` добавить `FIGMA_SEGMENTED_CONTROL`, сетку сегментов `5870:2870`, плюс **`FIGMA_SEGMENTED_CONTROL_STATE_LAYER` (`5870:2874`)** и **`FIGMA_SEGMENTED_CONTROL_FOCUS_INSIDE` (`5870:2879`)** для встраивания в MDX рядом с секцией «Состояния и фокус».

## Wire-точки (чеклист по фазам)

**Фаза 1**

- [ ] `pnpm add-package` / ручной scaffold: `packages/segmented-control/` с `package.json`, `tsconfig*.json` по шаблону.
- [ ] Корневой / workspace `tsconfig.json` — project reference на новый пакет.
- [ ] `apps/storybook` — alias `@ds/segmented-control` (если не тянется автоматически из workspace).
- [ ] `package.json` зависимости: только строгие версии + `workspace:*` для `@ds/*`; **без** `react` / `react-dom`.

**Фаза 2** — без новых wire-точек, кроме появления файлов в `stories/` (Storybook уже подключён в фазе 1).

**Фаза 3** — только файлы в `__tests__/` / `__snapshots__/`; корневой `playwright.config.ts` уже сканирует `packages/*/__tests__/*.spec.ts`.

**Фаза 4**

- [ ] `apps/docs` — alias `@ds/segmented-control` + запись в навигации Starlight.
- [ ] `pnpm gen:props` / `gen:readme` по процессу репо (когда API и сторис стабильны).

## Фазы миграции (рабочий порядок)

Работа идёт **строго по порядку**: следующая фаза не начинается, пока не закрыта выдача предыдущей.

### Фаза 1 — компонент + только Playground

**Цель:** полностью рабочий пакет `packages/segmented-control` с итоговой структурой `src/` (см. выше): `SegmentedControl`, внутренний `Segment`, `hooks`, `utils`, `types`, `constants`, стили на **`@cloud-ru/figma-variables`**, зависимости `@ds/*` по таблице маппинга.

**Research внутри фазы 1:** сверка токенов, решение по `xs` / **iconAfter**, разбор **state-layer** (`5870:2874`, `5870:2879`) и перенос визуала в SCSS — без отдельного «пустого» PR только с research.

**Stories:** ровно **один** файл — `SegmentedControl.Playground.stories.tsx` с интерактивными args и минимальным `play`.

**Запрещено в фазе 1:** любые другие `*.stories.tsx`, папка `__tests__/`, `docs/index.mdx`, `demos/`, правки `apps/docs` (в т.ч. `figma.ts` и навигация), `gen:props` / `gen:readme`.

**Критерий готовности:** `pnpm typecheck`, `pnpm lint`, `pnpm stylelint`, `pnpm build:packages`; в Storybook открывается только Playground и компонент визуально близок к макету (ручная сверка + при необходимости черновой прогон идей из `figma-verify-after-stories` локально).

### Фаза 2 — остальные stories

**Цель:** полный набор сторис по tier **M** (см. дерево «Фаза 2» в секции Stories): use-cases, VisualMatrix, ClickTest / KeyboardTest / FocusVisible и т.д.; у каждой story минимальный `play` по `stories-standard.md`.

**Запрещено:** добавление `__tests__/`, MDX/demos, правок публичного docs-site.

**Критерий готовности:** все заявленные story-файлы собираются в Storybook; при необходимости — проход `figma-verify-after-stories` по ключевым кадрам (state-layer, focus).

### Фаза 3 — тесты

**Цель:** весь набор Playwright spec из секции «Тесты» + baselines в `__snapshots__/` (chrome); `segmented-control.helpers.ts` и параметрика через `gotoStory` + URL args.

**Критерий готовности:** `pnpm test:e2e:chrome` зелёный для пакета; визуальные baselines закоммичены.

### Фаза 4 — документация

**Цель:** `docs/index.mdx`, `demos/` / `demos/examples/`, константы в `apps/docs/src/lib/figma.ts`, навигация docs-site, `pnpm gen:props` и `gen:readme` при готовности API.

**Критерий готовности:** страница компонента открывается на docs dev; FigmaEmbed/StorybookEmbed ведут на корректные ноды; полный чеклист «Success criteria» ниже выполнен.

## Риски

- **State-layer vs `overflow: hidden`:** на контейнере `SegmentedControl` и у плашки выбора стоит `overflow: hidden` — внутренний **focus inside** может обрезаться. Либо ослабить overflow на уровне сегмента для слоя фокуса, либо повторить макет через `outline`/`box-shadow` inset с отступом как в токенах `focusedFrame/regular/inside` — проверить на ноде `5870:2879`.
- **Скрытый слой в Figma:** `5870:2879` в метаданных с `hidden` — не забыть включить сценарий «фокус с клавиатуры» в сторях/скриншотах, иначе визуальная регрессия не покроет кольцо.
- **Токены:** имена композитов в новых переменных могут отличаться от `styles-tokens-segmentedControl` — заложить время на поиск 1:1 в SCSS.
- **Размер `xs`:** отсутствует в Figma component set `6150:257592` — либо deprecated, либо в другом узле; не ломать потребителей без явного semver.
- **`iconAfter`:** новая ветка в типах/верстке; визуальная регрессия, если забыть padding/gap из Figma.
- **Плашка выбора (`selection`):** зависимость от `setTimeout(0)` и observers — возможна редкая flakiness в visual-тестах; стабилизировать через `await expect(...).toBeVisible()` и фиксированные размеры в матрице.
- **Версия `uncontrollable`:** не смешивать с `tooltip` (`9.0.0`); для согласованности с формой-контролами — **8.0.4**.

## Success criteria

**После фазы 1**

- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm stylelint` без ошибок для пакета.
- [ ] `pnpm build:packages` собирает `segmented-control`.
- [ ] В Storybook доступен **только** Playground; компонент соответствует зафиксированным решениям (в т.ч. state-layer по возможности уже в финальном виде).

**После фазы 2**

- [ ] Все сторис из tier **M** набора присутствуют; `stories-standard.md` соблюдён (Playground, VisualMatrix, `play`).

**После фазы 3**

- [ ] `pnpm test:e2e:chrome` проходит для пакета; baselines в `__snapshots__/` закоммичены.
- [ ] `e2e-testing-standard.md` и `visual-regression-standard.md` для tier **M** закрыты.

**После фазы 4**

- [ ] `docs/index.mdx`, демо, записи в `apps/docs/src/lib/figma.ts`, навигация Starlight.
- [ ] `pnpm gen:props` / `gen:readme` выполнены по процессу репо.

## Связанные правила

- `.claude/rules/packages-deps.md`
- `.claude/rules/package-src-structure.md`
- `.claude/rules/react-types.md`, `imports-exports.md`
- `.claude/rules/stories-standard.md`
- `.claude/rules/component-api-surface.md`
- `.claude/rules/e2e-testing-standard.md`, `visual-regression-standard.md`
- `.claude/rules/docs-structure.md`, `figma-integration.md`
- `.claude/rules/reference-package-anatomy.md` (эталон пакета)
- `.claude/skills/new-component-package.md`, `component-story-set.md`, `component-e2e-tests.md`, `component-docs.md`, `figma-component-import.md`, **`figma-verify-after-stories.md`** (обязательный проход после сторис: state-layer, focus inside, disabled+checked)

## Legacy источники

- **NPM:** `@snack-uikit/segmented-control@0.6.20` — tarball распакован; исходники: **`/tmp/snack-segmented-pack/package/src/`** (в CI/другой машине повторить: `npm pack @snack-uikit/segmented-control && tar -xzf ...`).
- **Репозиторий upstream:** https://github.com/cloud-ru-tech/snack-uikit/tree/master/packages/segmented-control
- В текущем монорепо **`packages/segmented-control/` отсутствует** — пакет создаётся с нуля по этому плану.
