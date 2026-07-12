# Search

`@ds/search` — Компонент поискового поля — три размера, фон, разделитель, состояния loading и disabled, опциональный слот для действия.

Поисковое поле дизайн-системы: `<input type='search'>` с иконкой, опциональной кнопкой очистки, состоянием `loading` и слотом `buttonField` справа для дополнительной кнопки-действия («Найти», «Фильтр»).

## Когда использовать
- Основной поиск по списку / каталогу / таблице.
- Header-поиск с моментальной отдачей (live search).
- Форма поиска с явной кнопкой «Найти» (`buttonField`).

Когда **не** подходит: для выбора из фиксированного списка используйте `Combobox`, для фильтра с префиксом — `Input` + `Chip`.

## Анатомия

### Size
Высота поля: `s` — компактный (списки, тулбары), `m` — дефолт, `l` — для крупных форм и посадочных страниц.

## Установка
```bash
pnpm add @ds/search
```

```ts
import { Search } from '@ds/search'
```

## Примеры использования
### Базовое поле

```tsx
import { Search } from '@ds/search';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState('');
  return <Search placeholder='Поиск' value={value} onChange={setValue} />;
}
```

### Размер l для hero

```tsx
import { Search } from '@ds/search';

export function SizeL() {
  return <Search size='l' placeholder='Поиск по каталогу' />;
}
```

### Loading

```tsx
import { Search } from '@ds/search';

export function Loading() {
  return <Search placeholder='Поиск' loading />;
}
```

### Disabled

```tsx
import { Search } from '@ds/search';

export function Disabled() {
  return <Search placeholder='Поиск' disabled />;
}
```

### Без фона

```tsx
import { Search } from '@ds/search';

export function TransparentBackground() {
  return <Search placeholder='Прозрачный фон' background={false} />;
}
```

## Props
**SearchProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `boolean` | `true` | Наличие фона |
| `buttonField` | `ButtonFieldProps` | — | Дополнительный слот справа от поля |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим работы экранной клавиатуры |
| `loading` | `boolean` | — | Состояние загрузки |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string, e?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onSubmit` | `((value: string) => void)` | — | Колбек на подтверждение поиска по строке |
| `outline` | `boolean` | `true` | Наличие разделителя между input и buttonField |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `showClearButton` | `boolean` | `true` | Отображение кнопки Очистки поля |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `tabIndex` | `number` | — |  |
| `value` | `string` | — | Значение input |

#### Related types

**ButtonFieldProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Слот для кнопки/иконки/аватара |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Деактивирован ли компонент |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `onClick` | `() => void` | — | Действие при клике |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер кнопки |
| `variant` | `"after"` \| `"before"` | — | Вариант (положение) кнопки |
| `withDropdownList` | `boolean \| undefined` | — | Отображение шеврона |

- `Size` = `"l"` \| `"m"` \| `"s"`

- `Variant` = `"after"` \| `"before"`
