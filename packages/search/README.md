# Search

Публичный компонент поля поиска для интерфейсов design system. Содержит **SearchPrivate** (иконка, ввод, очистка, загрузка, `onSubmit` по Enter) внутри оболочки с **акриловым фоном**, границей и слоем фокуса. Опционально справа от поля можно вывести **ButtonField** (действие + шеврон списка) с вертикальным разделителем.

## Installation

```bash
npm install @design-system/search
# or
yarn add @design-system/search
# or
pnpm add @design-system/search
```

## Exports

```typescript
import {
  SIZE,
  type Size
} from '@design-system/search';
```

## Live examples

### Базовое использование

```tsx
import { Search } from '@design-system/search';

<Search placeholder="Поиск" />
```

### Без подложки (background)

```tsx
import { Search } from '@design-system/search';

<Search placeholder="Без фона" background={false} />
```

### Состояния загрузки и отключения

```tsx
import { Search } from '@design-system/search';

<Search placeholder="Загрузка…" loading />
<Search placeholder="Недоступно" disabled />
```

### Размеры

```tsx
import { SIZE, Search } from '@design-system/search';

<Search size={SIZE.S} placeholder="Размер s" />
<Search size={SIZE.M} placeholder="Размер m" />
<Search size={SIZE.L} placeholder="Размер l" />
```

### Со слотом справа (buttonField)

```tsx
import { SearchButtonFieldExample } from '@design-system/search';

<SearchButtonFieldExample client:load />
```


## Usage

### Базовый пример (uncontrolled)

```tsx
import { Search } from '@design-system/search';

export function Example() {
  return <Search placeholder="Поиск" />;
}
```

### Управляемое значение

```tsx
import { Search } from '@design-system/search';
import { useState } from 'react';

export function Example() {
  const [value, setValue] = useState('');
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="Введите запрос"
    />
  );
}
```

### Подтверждение поиска и слот справа

```tsx
import { PlaceholderSVG } from '@design-system/icons';
import { Search, SIZE } from '@design-system/search';

export function Example() {
  return (
    <Search
      size={SIZE.M}
      placeholder="Поиск"
      onSubmit={(query) => {
        // интеграция с поиском или навигацией (query)
      }}
      buttonField={{
        size: SIZE.M,
        action: <PlaceholderSVG size={24} />,
        onClick: () => {},
        withDropdownList: true,
      }}
    />
  );
}
```

## Props

### SearchProps
| name | type | default value | description |
|------|------|---------------|-------------|
| value | `string` | - | Значение input |
| onChange | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| placeholder | `string` | - | Значение плейсхолдера |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| inputMode | enum InputMode: `"text"`, `"decimal"`, `"numeric"`, `"tel"`, `"search"`, `"email"`, `"url"`, `"none"` | - | Режим работы экранной клавиатуры |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Деактивирован ли компонент |
| tabIndex | `number` | - |  |
| size | enum Size: `"s"`, `"m"`, `"l"` | s | Размер |
| loading | `boolean` | - | Состояние загрузки |
| onSubmit | `(value: string) => void` | - | Колбек на подтверждение поиска по строке |
| showClearButton | `boolean` | true | Отображение кнопки Очистки поля |
| background | `boolean` | true | Наличие фона |
| buttonField | `Omit<ButtonFieldProps, "variant">` | - | Дополнительный слот справа от поля |
| outline | `boolean` | true | Наличие разделителя между input и buttonField |

## Best Practices

1. **Семантика поиска** — для мобильных клавиатур оставляйте `inputMode` в режиме поиска (значение по умолчанию в SearchPrivate), если сценарий именно строка запроса.
2. **Слот справа** — передавайте в `buttonField.action` готовый узел (иконку фильтра, аватар и т.д.); `onClick` обязателен, даже если список открывается снаружи — свяжите его с вашим меню или стором.
3. **Загрузка** — при `loading={true}` иконка поиска заменяется индикатором; не смешивайте с активным вводом без необходимости: лучше блокировать поле через `disabled`, если ввод недопустим.
4. **Низкоуровневые сценарии** — если не нужны акрил, Divider и ButtonField, рассмотрите использование только **SearchPrivate** для более лёгкой вёрстки.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
