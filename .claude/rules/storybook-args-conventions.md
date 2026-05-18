# Storybook `args` / `argTypes` — конвенции

**Область действия:** `packages/*/stories/**/*.stories.@(ts|tsx)`, поля `args` / `argTypes` в meta и в отдельных stories. Правило действует всегда. Дополняет [stories-standard.md](./stories-standard.md) (там общий каркас Playground'а), здесь — детали по конкретным полям.

## Главное

`args` и `argTypes` — это публичный API компонента, спроецированный на Storybook-контролы. То, как они выглядят в панели Controls, диктует пользовательский опыт: какой контрол показывается, какие значения подсвечены, как обозначено «не задано». Любая опечатка/недогаданное значение здесь — это лишний клик/недоумение у разработчика, который пришёл смотреть, как компонент себя ведёт.

## Не указывать `undefined` / `null` среди `options`

Если контрол enum-like (`select` / `radio`) и у пропа есть состояние «не задано» (`undefined`) — **не добавлять `undefined` в `options`**. Storybook сам поднимет пустую опцию («Choose Option» / «—»), когда `args.<prop>` не выставлено или сброшено.

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

Если ось живёт в `constants.ts` пакета через `as const`-объект, `options` подключается через `Object.values`:

```ts
import { SIZE, APPEARANCE } from '@ds/<pkg>'

argTypes: {
  size: { control: 'radio', options: Object.values(SIZE) },
  appearance: { control: 'radio', options: Object.values(APPEARANCE) },
}
```

Так Playground автоматически отслеживает добавление/удаление значений в API без правки story.

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

## Описание в `description`

`description` контрола — короткое предложение, объясняющее **что делает** проп и какие значения валидны. Не нужно дублировать JSDoc один-в-один, но смысл должен совпадать. Для slot-пресета — перечислить ключи:

```ts
size: {
  control: 'radio',
  options: ['s', 'm', 'l'],
  description: 'Размер контейнера и типографики',
}

icon: {
  control: 'select',
  options: ['none', 'settings', 'plus'],
  mapping: { ... },
  description: 'Иконка (none | settings | plus)',
}
```

При расхождении JSDoc и `description` потребитель видит два разных объяснения — хуже, чем одно.

## JSDoc на пропсе — обязателен

Любое описание Storybook-контрола дублируется в JSDoc на самом пропсе компонента. JSDoc виден в IDE при hover/autocomplete потребителя, `description` — только в Storybook. Без JSDoc'а пользователь, не открывший Storybook, не узнает, что делает проп.

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

В Storybook `description` повторяет ту же мысль кратко. Один источник истины — JSDoc; `description` в story — производное.

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
  description: 'Позиция иконки относительно лейбла',
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

- [ ] Все публичные пропсы — в `argTypes` с явным `control` (нет фолбэка в `text` для enum/boolean).
- [ ] Нет `undefined` / `null` в `options` — Storybook сам показывает «не задано».
- [ ] `radio` для ≤ 4 значений без `undefined`, иначе `select`.
- [ ] enum-оси подключены через `Object.values(CONST)` из публичной константы пакета.
- [ ] `mapping` — только для slot/ReactNode-пресетов с осмысленными ключами; не для переименования.
- [ ] Зависимые пропсы используют `if: { arg, eq | neq }`, а не оставлены «мёртвыми» контролами.
- [ ] JSDoc на самом пропсе совпадает по смыслу с `description` в `argTypes`.
- [ ] Внутренние пропсы (refs, callbacks, technical-only) спрятаны через `table.disable`, не через `control: false`.
- [ ] Controlled-партнёры (`value`/`checked`) спрятаны, в `args` — только `defaultValue`/`defaultChecked`.
- [ ] Парные пропсы заполнены **обоими** разными дефолтами.

## Связанное

- [stories-standard.md](./stories-standard.md) — общий формат Playground/VisualMatrix.
- [component-api-surface.md](./component-api-surface.md) — `constants.ts`, `types.ts`, JSDoc на пропсах.
- [react-types.md](./react-types.md) — типы React без `React.*` префикса.
