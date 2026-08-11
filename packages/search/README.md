# Search

`@ds/search` — Компонент поискового поля — три размера, фон, рамка состояния, состояния loading и disabled, слот для действия внутри поля.

Поисковое поле дизайн-системы: `<input type='search'>` с иконкой, опциональной кнопкой очистки, состоянием `loading` и слотом `afterContent` внутри поля — под дополнительное действие («Найти», «Фильтр»).

## Когда использовать
- Основной поиск по списку / каталогу / таблице.
- Header-поиск с моментальной отдачей (live search).
- Форма поиска с явной кнопкой «Найти» (`afterContent`).

Когда **не** подходит: для выбора из фиксированного списка используйте `Combobox`, для фильтра с префиксом — `Input` + `Chip`.

## Анатомия

### Size (default `m`)
Высота поля:

- `s` — компактный (списки, тулбары).
- `m` — дефолт.
- `l` — для крупных форм и посадочных страниц.

### AfterContent
Слот внутри поля, справа от строки ввода и кнопки очистки. Пустой по умолчанию: слот появляется тогда, когда в него передана нода.

Типовое наполнение — иконочная кнопка того же размера, что поле:

```tsx
<Search size='m' afterContent={<Button size='m' view='function' appearance='neutral' icon={<SearchSVG />} onClick={submit} />} />
```

Размер содержимого слот не навязывает — задавайте его тем же значением, что и `size` поля.

### Outline (default `true`)
Рамка состояния вокруг поля. `false` — поле без рамки (например, поиск внутри выпадающего списка, где рамку даёт контейнер).

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

### Действие в слоте afterContent

```tsx
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search } from '@ds/search';
import { useState } from 'react';

export function WithAfterContent() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Search
        size='m'
        placeholder='Поиск'
        value={value}
        onChange={setValue}
        onSubmit={setSubmitted}
        afterContent={
          <Button
            size='m'
            view={VIEW.Function}
            appearance={APPEARANCE.Neutral}
            icon={<PlaceholderSVG />}
            minWidth={false}
            onClick={() => setSubmitted(value)}
          />
        }
      />
      <span>Запрос: {submitted || '—'}</span>
    </div>
  );
}
```

## Props
**SearchProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `ReactNode` | — | Слот справа от строки ввода — после кнопки очистки, внутри поля. <br/> Типовое наполнение — иконочная кнопка того же размера, что поле: <br/> `<Button size={size} view='function' appearance='neutral' icon={…} />`. |
| `background` | `boolean` | `true` | Наличие фона |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим работы экранной клавиатуры |
| `loading` | `boolean` | — | Состояние загрузки |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string, e?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onSubmit` | `((value: string) => void)` | — | Колбек на подтверждение поиска по строке |
| `outline` | `boolean` | `true` | Наличие рамки состояния вокруг поля |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `showClearButton` | `boolean` | `true` | Отображение кнопки Очистки поля |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `tabIndex` | `number` | — |  |
| `value` | `string` | — | Значение input |

#### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`
