# Status

Пакет содержит компоненты для отображения статуса: **Status** (индикатор с подписью) и **StatusIndicator** (только точка).

## Installation

```bash
npm install @design-system/status
# or
yarn add @design-system/status
# or
pnpm add @design-system/status
```

## Exports

```typescript
import {
  Status,
  type StatusProps,
  StatusIndicator,
  type StatusIndicatorProps,
  APPEARANCE,
  STATUS_SIZE,
  STATUS_INDICATOR_SIZE,
  type Appearance,
  type StatusSize,
  type StatusIndicatorSize
} from '@design-system/status';
```

## Live examples

### Sizes

```tsx
import { Status } from '@design-system/status';

<Status label="Активен" size="xs" appearance="primary" />
<Status label="Активен" size="s" appearance="primary" />
```

### Appearance

```tsx
import { APPEARANCE, Status } from '@design-system/status';

{Object.values(APPEARANCE).map(appearance => (
      <Status label="Label" size="s" appearance={appearance} />
))}
```

### With background

```tsx
import { Status } from '@design-system/status';

<Status label="Активен" size="s" appearance="primary" />
<Status label="Активен" size="s" appearance="primary" hasBackground />
```

### Sizes

```tsx
import { StatusIndicator } from '@design-system/status';

{Object.values(STATUS_INDICATOR_SIZE).map(size => (
    <StatusIndicator size={size} appearance="primary" />
))}
```

### Appearance

```tsx
import { APPEARANCE, StatusIndicator } from '@design-system/status';

{Object.values(APPEARANCE).map(appearance => (
    <StatusIndicator size="s" appearance={appearance} />
))}
```


## Usage

### Basic

```tsx
import { Status } from '@design-system/status';

export function Example() {
  return <Status label="Активен" size="s" appearance="primary" />;
}
```

### With loading

```tsx
import { Status } from '@design-system/status';

export function Example() {
  return <Status label="Загрузка..." size="s" appearance="primary" loading />;
}
```

### With progress

```tsx
import { Status } from '@design-system/status';

export function Example() {
  return (
    <Status
      label="Выполнено 60%"
      size="s"
      appearance="green"
      progress={60}
    />
  );
}
```

## Props

### StatusProps
| name | type | default value | description |
|------|------|---------------|-------------|
| label* | `string` | - | Подпись к индикатору (точка с текстом). Если не передано — только точка |
| size | enum StatusSize: `"xs"`, `"s"` | xs | Размер индикатора и подписи |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | - | Внешний вид (цветовая схема) |
| className | `string` | - | CSS-класс |
| hasBackground | `boolean` | - | Наличие фона |
| loading | `boolean` | - | Состояние загрузки |
| progress | `number` | - | Прогресс загрузки (от 0 до 100) |

### StatusIndicatorProps
| name | type | default value | description |
|------|------|---------------|-------------|
| size | enum StatusIndicatorSize: `"xs"`, `"s"`, `"4xs"`, `"3xs"`, `"2xs"` | s | Размер |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Внешний вид |
| className | `string` | - | CSS-класс |

## Best Practices

1. **Краткая подпись** — Используйте короткий текст в `label` (например, «Активен», «В работе»)
2. **Подбирайте appearance** — primary/neutral для общего контекста; цветные варианты — для семантики (успех, предупреждение, ошибка)
3. **Размер по контексту** — XS для компактных мест (таблицы, карточки), S для основных экранов

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
