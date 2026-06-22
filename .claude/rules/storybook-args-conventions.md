# Storybook `args` / `argTypes` — конвенции

**Область действия:** `packages/*/stories/**/*.stories.@(ts|tsx)`, поля `args` / `argTypes` в meta и в отдельных stories. Дополняет [stories-standard.md](./stories-standard.md) (там общий каркас Playground'а), здесь — детали по конкретным полям.

## Главное

`args` и `argTypes` — это публичный API компонента, спроецированный на Storybook-контролы. То, как они выглядят в панели Controls, диктует пользовательский опыт: какой контрол показывается, какие значения подсвечены, как обозначено «не задано». Любая опечатка/недогаданное значение здесь — это лишний клик/недоумение у разработчика, который пришёл смотреть, как компонент себя ведёт.

## Источник argTypes — TS-типы + JSDoc, а не явные описания

Storybook автоматически выводит `argTypes` из типов компонента через `react-docgen-typescript` (см. `apps/storybook/.storybook/main.ts → typescript.reactDocgen`). Из коробки получаются:

- **Контрол** — из TS-типа пропа: `boolean` → boolean-toggle, union `'s' | 'm' | 'l'` (включая `Size = ValueOf<typeof SIZE>`) → radio/select из значений, `number` → number-input, `ReactNode` → object-input, и т.д.
- **Описание** — из JSDoc-комментария на пропе (`/** Размер */`). Видно в колонке Description в Controls (включена `controls.expanded: true` в `preview.tsx`).
- **Дефолт** — из default-значения в деструктуре пропса компонента (`size = SIZE.S`).

Это значит: **по дефолту `argTypes` в meta не нужны вообще**. Достаточно правильно типизированных пропсов с JSDoc'ами в `src/types.ts` / `src/**/<Component>.tsx`.

Прописывай `argTypes.<prop>` **только** в этих случаях:

- **`mapping`** для slot/ReactNode-пропов с пресетами (`icon`, `before`, `avatar`) — docgen не знает, какие именно ReactNode подставлять.
- **`table.disable: true`** — скрыть проп из Controls (когда он не имеет визуального эффекта в этой story, как `outline` без `buttonField`).
- **`if: { arg, eq | neq }`** — условная видимость зависимых пропсов.
- **Принудительное переопределение контрола** — например, заставить `radio` вместо `select` (3 значения, но docgen может выбрать `select`).
- **`options` для нерасширяемых типов** — крайне редкий случай, когда docgen не разрезолвил union (обычно это сигнал поправить тип, а не задать options вручную).

**Не пиши `description` в `argTypes` руками** — описания должны жить в JSDoc на пропе, docgen их подтянет. Дублирование = два места правды → расхождение через спринт. См. [component-api-surface.md](./component-api-surface.md) и [writing-style.md](./writing-style.md).

## Не указывать `undefined` / `null` среди `options`

Если контрол enum-like (`select` / `radio`) и у пропа есть состояние «не задано» (`undefined`) — **не добавлять `undefined` в `options`**. Storybook сам поднимет пустую опцию («Choose Option» / «—»), когда `args.<prop>` не выставлено или сброшено.

То же касается **искусственных ключей-сентинелов**: не вводи в `options` (и в константы для story-контролов) значение `none` / `empty` / `off`, означающее «не задано». «Не задано» — это `undefined`: опцию не добавляем, в `args` проп либо не указываем, либо явно ставим `undefined`, а render-логика story проверяет `prop === undefined`, не `prop === 'none'`. Исключение — `mapping` slot-пресетов, где ключ `none: undefined` допустим (см. «mapping»).

```ts
// ❌ Плохо — `undefined` среди options
theme: {
  control: 'select',
  options: [undefined, 'snack', 'snackDark'],
}

// ✅ Хорошо — только реальные значения
theme: {
  control: 'select',
  options: ['snack', 'snackDark'],
}
```

То же для `radio`. Если визуально нужно явно показать «не задано» — использовать `mapping` со специальным ключом-пресетом (см. ниже).

## Дефолт — в `args`, а не в `options`

Дефолтное значение пропа задаётся в `args` мета. Не дублировать его в `options` и не «выставлять» через первый элемент списка — Storybook рендерит `args[prop]` как preselected:

```ts
// ✅ Хорошо
args: {
  size: 'm',
},
argTypes: {
  size: { control: 'radio', options: ['s', 'm', 'l'] },
}
```

Если у пропа в API нет дефолта (компонент сам подставит) — оставлять `args[prop]` без указания, не писать `args.prop: undefined` явно.

## `select` vs `radio`

- `radio` — 2–4 фиксированных значения, без `undefined` в API. Если есть «не задано» — переходить на `select`.
- `select` — 5+ значений, или когда «не задано» допустимо.

```ts
// ✅ радио оправдан
appearance: { control: 'radio', options: ['primary', 'neutral', 'critical'] }

// ✅ select — много значений
language: { control: 'select', options: KNOWN_LANGUAGES }
```

## `options: Object.values(CONST)` — для enum-констант

Если docgen по какой-то причине не разрезолвил union (нетипичная цепочка дженериков, утечка `string`), задаём `options` через `Object.values` от той же const'ы, на которую ссылается тип:

```ts
import { SIZE, APPEARANCE } from '@ds/<pkg>'

argTypes: {
  size: { control: 'radio', options: Object.values(SIZE) },
  appearance: { control: 'radio', options: Object.values(APPEARANCE) },
}
```

Так Playground автоматически отслеживает добавление/удаление значений в API без правки story. **В норме это не нужно** — docgen вытащит values сам. Если такая ручная подкрутка стала регулярной для пакета, скорее всего тип где-то теряется через утилитки `Pick`/`Omit` — лучше поправить тип.

## `mapping` — только для нерасшаренных значений

`argTypes.mapping` используется только когда в `options` лежат **ключи**, а значения нельзя сериализовать в URL/контрол (ReactNode-слоты, инстансы классов, функции-пресеты):

```ts
// ✅ Хорошо — иконки как пресеты по ключу
icon: {
  control: 'select',
  options: ['none', 'settings', 'download', 'plus'],
  mapping: {
    none: undefined,
    settings: <SettingsSVG />,
    download: <DownloadSVG />,
    plus: <PlusSVG />,
  },
  description: 'Иконка (none | settings | download | plus)',
}
```

Контрол отображает осмысленные имена-ключи, в `args.<prop>` прилетает `ReactNode | undefined`.

`mapping` не используется ради переименования enum-значений (`'compact' → 'desktop'`). Это ломает дефолт (`args` хранит mapped value, контрол не подсветит) и плодит два словаря на одну ось. Если оси `constants.ts` называются «не так как хочется» — переименовать в `constants.ts`, `mapping` не для этого.

## Описание пропа — только JSDoc, никаких `description` в argTypes

JSDoc-комментарий на пропе — единственное место для описания. Он подтягивается:

- в **IDE hover/autocomplete** потребителя пакета,
- в **`packages/<pkg>/docs/props.json`** (через `pnpm gen:props` → react-docgen-typescript),
- в **Storybook Controls** «Description» (через docgen + `controls.expanded: true` в preview.tsx),
- в **README.md** пакета (через `pnpm gen:readme`).

Все четыре точки берут один и тот же текст. **Не дублируй его в `argTypes.<prop>.description`** — это сразу создаёт второй источник, который разойдётся с JSDoc через первую же правку.

```ts
type CodeEditorProps = {
  /**
   * Имя зарегистрированной monaco-темы из глобального реестра
   * (`monaco.editor.defineTheme(name, …)`). По умолчанию подбирается
   * автоматически по DS-теме провайдера: `'snack'` для светлой,
   * `'snackDark'` для тёмной.
   */
  theme?: string
}
```

```ts
// ❌ Плохо — два места правды
argTypes: {
  theme: { description: 'Имя зарегистрированной monaco-темы…' }
}

// ✅ Хорошо — argType только для того, чего docgen не знает (mapping/if/disable)
argTypes: {
  icon: { mapping: { none: undefined, settings: <SettingsSVG /> } }
}
```

Если JSDoc плохо читается в Storybook (длинно, разметка ломается) — правь сам JSDoc, чтобы он был хорош и в IDE, и в Storybook. Storybook отображает первый параграф JSDoc, поэтому начинай с короткого summary, дополнительные детали — следующими параграфами.

## Условные контролы — `if: { arg, eq | neq }`

Когда значение одного пропа определяет, имеет ли смысл другой (например, `iconPosition` имеет смысл только при наличии `icon`), Storybook поддерживает условное отображение через `if`:

```ts
icon: {
  control: 'select',
  options: ['none', 'settings', 'plus'],
  mapping: { none: undefined, settings: <SettingsSVG />, plus: <PlusSVG /> },
},
iconPosition: {
  control: 'radio',
  options: Object.values(ICON_POSITION),
  if: { arg: 'icon', neq: 'none' },
},
```

`iconPosition` исчезает из Controls, пока `icon === 'none'`. Это лучше, чем оставлять «мёртвый» контрол, который ничего не меняет. Использовать всегда, когда между пропами есть смысловая зависимость.

## Скрытие пропсов из панели

Для пропсов, которые не имеют смысла в Playground (внутренние коллбэки, ref-pass-through, technical-only трекеры) — выносить из контролов через `table.disable`:

```ts
argTypes: {
  themeName: { table: { disable: true } },
  jsonSchema: { table: { disable: true } },
  onMount: { table: { disable: true } },
  onChange: { table: { disable: true } },
}
```

Не использовать `control: false` — это оставит проп строкой в таблице документации без контрола (выглядит сломанным). `table.disable` убирает целиком.

## Controlled/uncontrolled пары

Если у пропа есть пара `value`/`defaultValue` (или `checked`/`defaultChecked`), Playground работает в uncontrolled-режиме: в `args` остаётся только `defaultValue`/`defaultChecked`, сам `value`/`checked` прячется через `table.disable`:

```ts
args: {
  defaultChecked: false,
},
argTypes: {
  checked: { table: { disable: true } },
}
```

Иначе пользователь увидит «контрол, который ничего не делает» — без parent'а с `useState` controlled-режим не двигается.

## Парные/смежные пропсы — оба в `args`

Если у компонента есть смысловая пара (`content` + `valueToCopy`, `label` + `secondaryLabel`, `title` + `description`, `value` + `formattedValue`) — обоим даётся **разный осмысленный** дефолт в `args`. Иначе фича второго пропа невидима из Playground'а.

```ts
// ❌ Плохо — secondaryLabel пустой, читатель не поймёт зачем он
args: { label: 'Главное', secondaryLabel: '' }

// ✅ Хорошо — оба заполнены, видно разницу
args: { label: 'Главное', secondaryLabel: 'Доп. описание' }
```

## Чек-лист перед коммитом story

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.

## Связанное

- [stories-standard.md](./stories-standard.md) — общий формат Playground/VisualMatrix.
- [component-api-surface.md](./component-api-surface.md) — `constants.ts`, `types.ts`, JSDoc на пропсах.
- [react-types.md](./react-types.md) — типы React без `React.*` префикса.
