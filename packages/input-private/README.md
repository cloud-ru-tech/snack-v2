# input-private

`@ds/input-private` — 

## InputPrivate

### Props `InputPrivateProps`

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

## useButtonNavigation

### Props `UseButtonNavigationProps`

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

## useClearButton

### Props `UseClearButtonProps`

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
