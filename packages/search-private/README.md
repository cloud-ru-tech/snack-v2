# Search Private

Компонент поля поиска с иконкой лупы, кнопкой очистки при непустом значении и опциональным состоянием загрузки. Поддерживает controlled и uncontrolled режимы, подтверждение поиска по Enter.

## Installation

```bash
npm install @design-system/search-private
# or
yarn add @design-system/search-private
# or
pnpm add @design-system/search-private
```

## Exports

```typescript
import {
  SearchPrivate,
  type SearchPrivateProps
} from '@design-system/search-private';
```

## Live examples

### Basic usage

```tsx
import { SearchPrivate } from '@design-system/search-private';

<SearchPrivate />
```

### С подтверждением поиска (onSubmit)

```tsx
import { SearchPrivate } from '@design-system/search-private';

<SearchPrivate
  onSubmit={(value) => {
    alert(`Поиск: ${value}`);
  }}
/>
```

### Со состоянием загрузки

```tsx
import { SearchPrivate } from '@design-system/search-private';

<SearchPrivate loading placeholder="Загрузка..." />
```

### Разные размеры

```tsx
import { SearchPrivate } from '@design-system/search-private';

<SearchPrivate size="s" placeholder="Размер s" />
<SearchPrivate size="m" placeholder="Размер m" />
<SearchPrivate size="l" placeholder="Размер l" />
```


## Usage

### Basic example

```tsx
import { SearchPrivate } from '@design-system/search-private';

export function Example() {
  return <SearchPrivate />;
}
```

### Controlled с onSubmit

```tsx
import { SearchPrivate } from '@design-system/search-private';

export function Example() {
  const handleSearch = (value: string) => {
    console.log('Поиск:', value);
  };

  return <SearchPrivate onSubmit={handleSearch} />;
}
```

### С состоянием загрузки и кастомным placeholder

```tsx
import { SearchPrivate } from '@design-system/search-private';

export function Example() {
  return (
    <SearchPrivate
      loading
      placeholder="Ищем..."
      size="m"
    />
  );
}
```

## Props

### SearchPrivateProps
| name | type | default value | description |
|------|------|---------------|-------------|
| size | enum Size: `"s"`, `"m"`, `"l"` | s | Размер |
| loading | `boolean` | - | Состояние загрузки |
| onSubmit | `(value: string) => void` | - | Колбек на подтверждение поиска по строке |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - |  |
| value | `string` | - | Значение input |
| onChange | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| placeholder | `string` | - | Значение плейсхолдера |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| onKeyDown | `KeyboardEventHandler<HTMLInputElement>` | - | Колбек обработки начала нажатия клавиши клавиатуры |
| inputMode | enum InputMode: `"text"`, `"decimal"`, `"numeric"`, `"tel"`, `"search"`, `"email"`, `"url"`, `"none"` | search | Режим работы экранной клавиатуры |

## Best Practices

1. **Используйте onSubmit для отправки поиска** — обрабатывайте подтверждение по Enter в `onSubmit`, не дублируйте логику в `onChange`.
2. **Показывайте loading при запросе** — передавайте `loading={true}` во время загрузки результатов, чтобы пользователь видел индикатор.
3. **Контролируйте значение при фильтрации** — для живого поиска используйте `value` и `onChange`; для поиска «по кнопке/Enter» достаточно `onSubmit`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
