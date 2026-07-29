# Публичное API компонента

**Область действия:** `packages/*/src/**/*.ts`, `**/*.tsx`. Правило определяет форму публичного API.

## Константы — `constants.ts`

Все enum-подобные оси публикуются через `as const` объекты **и** выводимый из них тип:

```ts
// constants.ts
export const APPEARANCE = {
  Primary: 'primary',
  Neutral: 'neutral',
  Critical: 'critical',
} as const

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const
```

```ts
// types.ts
import { ValueOf } from '@ds/utils'
import { APPEARANCE, SIZE } from './constants'

export type Appearance = ValueOf<typeof APPEARANCE>
export type Size = ValueOf<typeof SIZE>
```

- Константа — `SCREAMING_SNAKE_CASE` имя объекта, `PascalCase` ключи, `lowercase` значения (совпадают со значениями в DOM-атрибутах `data-*` и в Figma variant values).
- Тип — `PascalCase`, без `Enum`-суффикса.
- **Не** используй TypeScript `enum` — см. [dont-do-that.md](./dont-do-that.md) и [react-types.md](./react-types.md).

## `TEST_IDS` — публичные data-test-id внутренних слотов

Если компонент сам ставит `data-test-id` на какие-либо вложенные слоты (ненативные, которых потребитель не может адресовать через spread `...rest`) — эти строки **обязаны** публиковаться через константу `TEST_IDS` в `constants.ts`:

```ts
export const TEST_IDS = {
  root: 'switch-row',
  switch: 'switch-row__switch',
  title: 'switch-row__title',
  titleTooltip: 'switch-row__title-tooltip',
  description: 'switch-row__description',
  toggleTooltip: 'switch-row__toggle-tooltip',
} as const
```

- Ключ — `camelCase` имени слота. Значение — kebab-case, схема `<component>[__<slot>]`.
- Компонент использует эти константы внутри реализации (`data-test-id={TEST_IDS.switch}`), инлайн-строк быть не должно.
- Реэкспортируется из `src/index.ts` через `export * from './constants'` — попадает в публичный API пакета.
- Stories и `__test__/<Component>/helpers.ts` берут id из этой же константы, не пересоздают строки. Подробности — в [stories-standard.md](./stories-standard.md) раздел «data-test-id — обязательный атрибут…».
- **`data-test-id` и handler-интеракции (`onClick`, `onKeyDown`, ...) — на одном DOM-узле.** Тесты адресуют элемент по test-id и дispatch'ат события через `userEvent.click(byTestId)`. Если handler висит на дочернем узле (например, `<svg>` внутри обёрточного `<div data-test-id>`), синтетический click из тест-среды не всегда долетает до inner-узла (тонкости `pointer-events`, layered transforms). Держи их на одном узле — это контракт «адресуемый = интерактивный».
- **Components без собственного DOM-узла** (Context.Provider only — `Accordion`, `ToggleGroup`) не имеют куда вешать `data-test-id` из `rest`. Либо добавляй wrapper-div в компонент с `data-test-id` из props, либо страховочно оборачивай в story-рендере. Документируй выбранный вариант в комментарии у `AccordionProps` — иначе потребитель ждёт нативное поведение, а его нет.

## Пропсы

Через `type` (не `interface`, если нет реальной необходимости в extension):

```ts
export type BaseButtonProps = {
  label?: string
  icon?: ReactNode
  iconPosition?: IconPosition
  appearance?: Appearance
  size?: Size
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
}
```

- JSDoc на каждом поле (`/** Текст кнопки */`) — единственный источник описания пропа. Эти строки попадают одновременно в: (1) IDE на hover/autocomplete, (2) `docs/props.json` через `pnpm gen:props`, (3) Storybook Controls «Description» через `react-docgen-typescript` плагин, (4) автогенерируемый `README.md`. **Не дублируй JSDoc в `argTypes.<prop>.description`** — это создаёт второй источник правды. Подробности в [storybook-args-conventions.md](./storybook-args-conventions.md).
- Булевы пропсы называются утверждающе: `disabled`, `loading`, `fullWidth`. Избегай отрицательных `notDisabled`.
- Коллбэки — `onClick`, `onChange`, `onOpen`. Не `handleClick`.
- **Колбэк-пропы типизируй method-signature, а не arrow-property**: `onOpenChanged?(open: boolean): void`, не `onOpenChanged?: (open: boolean) => void`. Единственное исключение — готовый тип-алиас (`onClick?: MouseEventHandler<HTMLDivElement>`): алиас оставляем как есть, в стрелку его не разворачиваем.

```ts
// ❌ Плохо — arrow-property
onOpenChanged?: (open: boolean) => void;
onChange?: (checked: boolean) => void;

// ✅ Хорошо — method-signature
onOpenChanged?(open: boolean): void;
onChange?(checked: boolean): void;
onClick?: MouseEventHandler<HTMLDivElement>; // алиас — исключение, не разворачиваем
```

## Полиморфизм (`as` + `innerRef`)

Для компонентов tier M+ с `as`:

```ts
export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

export type ButtonProps<T extends ElementType = 'button'> = BaseButtonProps & {
  as?: T
  innerRef?: PolymorphicRef<T>
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseButtonProps | 'as' | 'ref'>
```

- Ref идёт через `innerRef`, **не** через стандартный `ref` и **не** через `forwardRef`. Это позволяет сохранить полный дженерик без type-assertions.
- `Omit` уравнивает intrinsic-props с base-props, чтобы `as="a"` дал только настоящие `<a>`-атрибуты плюс наши поля.

Неполиморфные компоненты отдают корневую ноду тем же пропом, только тип проще: `innerRef?: Ref<HTMLDivElement>`. Имя слота — канон, см. [prop-naming](../skills/prop-naming.md) §2.

### Маркер `withInnerRefSupport` — обязателен

Компонент, принимающий `innerRef` на **корневой** узел, помечается `withInnerRefSupport` из `@ds/utils` — вызовом рядом с объявлением:

```tsx
export function Button<T extends ElementType = 'button'>({ innerRef, ...rest }: ButtonProps<T>) { … }

withInnerRefSupport(Button);
```

Зачем: `Popover` / `Tooltip` / `Dropdown` получают триггер как `ReactElement` и должны выбрать канал для reference-ноды — `ref` для нативных элементов и `forwardRef`-компонентов, `innerRef` для обычных функций. Интроспекция пропсов функции в рантайме невозможна, поэтому поддержка объявляется маркером. Непомеченный триггер заворачивается в `<span>` (даже при `disableSpanWrapper`) и печатает предупреждение в dev.

- Форма «объявление + вызов рядом», а не `export const X = withInnerRefSupport(function X(…))`: обёртку `react-docgen-typescript` разбирает без дефолтов пропсов, и `docs/props.json`, README-таблицы и Storybook Controls теряют колонку «по умолчанию».
- Помечаем **только** корневой `innerRef`. Если проп ведёт на внутренний слот (скрытый `<input type="file">` у dropzone) или проставляется условно — маркер не ставим, а eslint глушим точечно с причиной.
- Проверяется правилом `ds/require-inner-ref-support` (`eslint-rules/require-inner-ref-support.mjs`) на `packages/*/src/**/*.tsx`.

## Экспорты — `src/index.ts`

Пакет экспортирует через `export *` по секциям:

```ts
// src/<Name>/index.ts
export * from './<Name>'
export * from './constants'
export * from './types'

// src/index.ts
export * from './<Name>'
```

- **Не** используй `import type` / `export type` — см. [imports-exports.md](./imports-exports.md).
- **Не** раздувай публичный API. Если `export *` тянет приватное — пиши явный список.

## Связь API ↔ VisualMatrix ↔ E2E

Каждая ось из `constants.ts` должна быть покрыта:

1. **В Playground** — как `argTypes.<axis>` с `control: 'radio'|'select'` и `options: Object.values(AXIS_CONST)`.
2. **В VisualMatrix** — как минимум один `StoryTable` с этой осью в строках или колонках.
3. **В `rendering.spec.ts` → describe `props propagation`** — один параметризованный тест через `gotoStory(playground, { <axis>: value })` с assertion `toHaveAttribute('data-<axis>', value)`. Отдельного `<pkg>.url-args.spec.ts` заводить не нужно — этот describe-блок и есть его роль.
4. **В docs/index.mdx** — таблица «когда использовать» с описанием ролей значений.

Пропуск в одной из точек — **bug**, а не feature. Фиксированные физические размеры (высота/ширина) из Figma проверяются **визуально** (VisualMatrix baseline), а не отдельным `dimensions.spec.ts`.

## Запреты

- Не используй `any`. Для незнакомого — `unknown` + narrowing.
- Не пиши `React.*` — импортируй из `'react'` (см. [react-types.md](./react-types.md)).
- Не пиши `React.FC` / `React.FunctionComponent`.
- Не создавай DOM-атрибуты `data-*` без эквивалентной TypeScript-оси (в CSS только то, что компонент обещает через API).

## Связанное

- [prop-naming](../skills/prop-naming.md) — **канон имён пропсов** (какое имя дать семантическому слоту: `label`/`title`/`content`/`caption`/`hint`/`subtitle`, item shape `{ label, value }`, `loading` не `isLoading`). Этот файл — про механику типов, prop-naming — про выбор имени.
- [constants/types/utils split — stories-standard.md](./stories-standard.md) (структура stories под эти API).
- [imports-exports.md](./imports-exports.md) — форма импорта/экспорта.
- [react-types.md](./react-types.md) — типы из `'react'`.
- [package-src-structure.md](./package-src-structure.md) — раскладка `src/`.
