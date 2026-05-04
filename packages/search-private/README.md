# SearchPrivate

`@ds/search-private` — Базовый input для поиска без иконок и плейсхолдеров — фундамент для публичного `@ds/search` и доменных search-компонентов.

`@ds/search-private` — нижний слой поиска: контролируемый `<input type='search'>` с состояниями (focus, disabled, loading, error), кнопкой очистки и debounce. На нём собран публичный `@ds/search` — там добавляются иконка-лупа, плейсхолдер из локали, layout. В продуктовом коде используйте `@ds/search`.

## Когда использовать

- Реализация кастомного поиска с иной разметкой (например, без иконки или со встроенным фильтром), который нельзя выразить пропсами `@ds/search`.

В большинстве случаев — берите публичный `@ds/search`.

## Установка

```bash
pnpm add @ds/search-private
```

```ts
import { SearchPrivate } from '@ds/search-private'
```

## Примеры использования

### Базовый поиск

Controlled value + `onSubmit`.

```tsx
import { SearchPrivate } from '@ds/search-private';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <SearchPrivate value={value} onChange={setValue} onSubmit={setSubmitted} />
      <span>
        Значение: {value || '—'} · Отправлено: {submitted || '—'}
      </span>
    </div>
  );
}
```

## Props

**SearchPrivateProps**

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

## Смотри также

- **Search** — публичный поиск, который большинству продуктов и нужен.
- **InputPrivate** — общая обвязка полей ввода.
