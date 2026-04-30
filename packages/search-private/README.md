# search-private

`@ds/search-private` — 

## SearchPrivate

### Props `SearchPrivateProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | `search` | Режим работы экранной клавиатуры |
| `loading` | `boolean` | — | Состояние загрузки |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string, e?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onSubmit` | `((value: string) => void)` | — | Колбек на подтверждение поиска по строке |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `showClearButton` | `boolean` | `true` | Отображение кнопки Очистки поля |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — |  |
| `value` | `string` | `` | Значение input |

#### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`
