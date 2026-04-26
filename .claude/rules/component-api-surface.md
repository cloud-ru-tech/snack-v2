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

- JSDoc на каждом поле (`/** Текст кнопки */`) — именно эти строки попадают в `docs/props.json` через `react-docgen-typescript` и в автогенерируемый README.
- Булевы пропсы называются утверждающе: `disabled`, `loading`, `fullWidth`. Избегай отрицательных `notDisabled`.
- Коллбэки — `onClick`, `onChange`, `onOpen`. Не `handleClick`.

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

## Связь API ↔ VisualMatrix

Каждая ось из `constants.ts` должна быть покрыта:

1. **В Playground** — как `argTypes.<axis>` с `control: 'radio'|'select'` и `options: Object.values(AXIS_CONST)`.
2. **В VisualMatrix** — как минимум один `StoryTable` с этой осью в строках или колонках.
3. **В E2E** — как минимум один тест, проверяющий, что `data-<axis>="<value>"` применяется (через URL args или на статичной стори).
4. **В docs/index.mdx** — таблица «когда использовать» с описанием ролей значений.

Пропуск в одной из точек — **bug**, а не feature.

## Запреты

- Не используй `any`. Для незнакомого — `unknown` + narrowing.
- Не пиши `React.*` — импортируй из `'react'` (см. [react-types.md](./react-types.md)).
- Не пиши `React.FC` / `React.FunctionComponent`.
- Не создавай DOM-атрибуты `data-*` без эквивалентной TypeScript-оси (в CSS только то, что компонент обещает через API).

## Связанное

- [constants/types/utils split — stories-standard.md](./stories-standard.md) (структура stories под эти API).
- [imports-exports.md](./imports-exports.md) — форма импорта/экспорта.
- [react-types.md](./react-types.md) — типы из `'react'`.
- [package-src-structure.md](./package-src-structure.md) — раскладка `src/`.
