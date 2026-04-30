# InputPrivate

`@ds/input-private` — Базовая обёртка `<input>` с состояниями, иконками, кнопкой очистки и счётчиком — фундамент для публичных полей ввода (Search, FieldText и пр.).

`@ds/input-private` — внутренний строительный блок для полей ввода. Реализует общую визуальную обвязку: рамка по состоянию (focus / disabled / readonly / error), слоты под иконку, prefix/suffix, кнопку очистки и счётчик символов. Прямого применения в продуктовом коде не имеет — используйте публичные пакеты (`@ds/search`, доменные поля), которые композируются поверх него.

## Когда использовать

- Создаёте новый публичный input-компонент и хотите получить готовое поведение состояний и слотов.
- Реализуете кастомный фильтр / автокомплит и нужна та же обвязка, что у `Search`.

В продуктовом коде **не** импортируйте напрямую — берите публичный компонент.

## Установка

```bash
pnpm add @ds/input-private
```

```ts
import { InputPrivate, useClearButton, useButtonNavigation } from '@ds/input-private'
```

## Props

### InputPrivate

**InputPrivateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Является ли поле деактивированным |
| `id` | `string` | — | Значение html-атрибута id |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | `text` | Режим работы экранной клавиатуры |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string, e?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `readonly` | `boolean` | `false` | Является ли поле доступным только для чтения |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `type` | `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"` | `text` | Тип инпута |
| `value` | `string` | `` | Значение input |

#### Related types

- `InputMode` = `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

- `Type` = `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"`

### useButtonNavigation

**UseButtonNavigationProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputRef` | `T` | — |  |
| `onButtonKeyDown` | `KeyboardEventHandler<HTMLButtonElement>` | `() => {}` |  |
| `postfixButtons` | `ActiveItem` \| `ButtonProps` \| `InactiveItem` | — |  |
| `prefixButtons` | `ActiveItem` \| `ButtonProps` \| `InactiveItem` | `[]` |  |
| `readonly` | `boolean` | — |  |
| `setInputFocus` | `(() => void)` | `() => inputRef.current?.focus()` |  |
| `submitKeys` | `string[]` | — |  |

#### Related types

**ActiveItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `true` | — |  |
| `id` | `string` | — |  |
| `ref` | `ButtonRef` | — |  |
| `render` | `(props: RenderActiveButtonProps) => ReactElement` | — |  |
| `show` | `boolean` | — |  |

- `ButtonProps` = `InactiveItem | ActiveItem`

- `ButtonRef` = `RefObject<HTMLButtonElement | null>`

**InactiveItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `false` | — |  |
| `id` | `string` | — |  |
| `render` | `(props: RenderInactiveButtonProps) => ReactElement` | — |  |
| `show` | `boolean` | — |  |

### useClearButton

**UseClearButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `clearButtonRef` | `RefObject<HTMLButtonElement \| null>` | — |  |
| `disabled` | `boolean` | — |  |
| `onClear` | `MouseEventHandler<HTMLButtonElement>` | — |  |
| `onDown` | `MouseEventHandler<HTMLButtonElement>` | — |  |
| `showClearButton` | `boolean` | — |  |
| `size` | `"l"` \| `"m"` \| `"s"` | — |  |

#### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

## Смотри также

- **Search**, **SearchPrivate** — публичные потребители.
