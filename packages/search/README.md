# Search

`@ds/search` — Компонент поискового поля — три размера, фон, разделитель, состояния loading и disabled, опциональный слот для действия.

Поисковое поле дизайн-системы: `<input type='search'>` с иконкой, опциональной кнопкой очистки, состоянием `loading` и слотом `buttonField` справа для дополнительной кнопки-действия («Найти», «Фильтр»).

## Демо
<SearchDemo client:visible />

## Когда использовать
- Основной поиск по списку / каталогу / таблице.
- Header-поиск с моментальной отдачей (live search).
- Форма поиска с явной кнопкой «Найти» (`buttonField`).

Когда **не** подходит: для выбора из фиксированного списка используйте `Combobox`, для фильтра с префиксом — `Input` + `Chip`.

## Установка
```bash
pnpm add @ds/search
```

```ts
import { Search } from '@ds/search'
```

## Примеры использования
<Example title='Базовое поле' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Размер l для hero' code={SizeLSrc}>
  <SizeL client:visible />
</Example>

<Example title='Loading' code={LoadingSrc}>
  <Loading client:visible />
</Example>

<Example title='Disabled' code={DisabledSrc}>
  <Disabled client:visible />
</Example>

<Example title='Без фона' code={TransparentBackgroundSrc}>
  <TransparentBackground client:visible />
</Example>

## Props
<PropsTable data={searchDoc.Search} />

## Storybook
<StorybookEmbed storyId='components-search--playground' height={240} />

### Size
Высота поля: `s` — компактный (списки, тулбары), `m` — дефолт, `l` — для крупных форм и посадочных страниц.

## ButtonField

```tsx
import { ButtonField } from '@ds/search'

export function Example() {
  return <ButtonField variant="after">Click me</ButtonField>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"before"` \| `"after"` | `after` | Вариант (положение) кнопки |
| `size` | `"s"` \| `"m"` \| `"l"` | `s` | Размер кнопки |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `disabled` | `boolean` | `false` | Деактивирован ли компонент |
| `action` | `ReactNode` | — | Слот для кнопки/иконки/аватара |
| `withDropdownList` | `boolean` | — | Отображение шеврона |
| `onClick` | `() => void` | — | Действие при клике |

## Search

```tsx
import { Search } from '@ds/search'

export function Example() {
  return <Search showClearButton background outline>Click me</Search>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Значение input |
| `onChange` | `((value: string, e?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `inputMode` | `"text"` \| `"decimal"` \| `"numeric"` \| `"tel"` \| `"search"` \| `"email"` \| `"url"` \| `"none"` | — | Режим работы экранной клавиатуры |
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS-класс |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `tabIndex` | `number` | — |  |
| `size` | `"s"` \| `"m"` \| `"l"` | `s` | Размер |
| `loading` | `boolean` | — | Состояние загрузки |
| `onSubmit` | `((value: string) => void)` | — | Колбек на подтверждение поиска по строке |
| `showClearButton` | `boolean` | `true` | Отображение кнопки Очистки поля |
| `background` | `boolean` | `true` | Наличие фона |
| `buttonField` | `Omit<ButtonFieldProps, "variant">` | — | Дополнительный слот справа от поля |
| `outline` | `boolean` | `true` | Наличие разделителя между input и buttonField |
