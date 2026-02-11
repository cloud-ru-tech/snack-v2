# Progress Bar

Пакет содержит компоненты для отображения прогресса операции: линейный индикатор **ProgressBar**, круговой **ProgressBarCircle** и индикатор загрузки страницы **ProgressBarPage**.

## Installation

```bash
npm install @design-system/progress-bar
# or
yarn add @design-system/progress-bar
# or
pnpm add @design-system/progress-bar
```

## Exports

```typescript
import {
  ProgressBar,
  type ProgressBarProps,
  ProgressBarCircle,
  type ProgressBarCircleProps,
  ProgressBarPage,
  type ProgressBarPageProps,
  APPEARANCE,
  PROGRESS_BAR_SIZE,
  type Appearance,
  type ProgressBarSize,
  type ProgressBarCircleSize
} from '@design-system/progress-bar';
```

## Live examples

### Sizes

```tsx
import { ProgressBar } from '@design-system/progress-bar';

<div style={{ width: "200px" }}>
  <ProgressBar progress={60} size="xs" appearance="primary" />
</div>
<div style={{ width: "200px" }}>
  <ProgressBar progress={60} size="s" appearance="primary" />
</div>
```

### Appearance

```tsx
import { APPEARANCE, ProgressBar } from '@design-system/progress-bar';

{Object.values(APPEARANCE).map(appearance => {
  return (
        <div style={{ width: "200px" }}>
          <ProgressBar progress={60} size="s" appearance={appearance} />
        </div>
  );
})}
```

### Sizes

```tsx
import { ProgressBarCircle } from '@design-system/progress-bar';

<ProgressBarCircle progress={60} size="xs" appearance="primary" />
<ProgressBarCircle progress={60} size="s" appearance="primary" />
```

### Appearance

```tsx
import { APPEARANCE, ProgressBarCircle } from '@design-system/progress-bar';

{Object.values(APPEARANCE).map(appearance => {
  return (
      <ProgressBarCircle progress={60} size="s" appearance={appearance} />
  );
})}
```


## Usage

### Basic

```tsx
import { ProgressBar } from '@design-system/progress-bar';

export function Example() {
  return <ProgressBar progress={50} size="s" appearance="primary" />;
}
```

### With custom progress

```tsx
import { ProgressBar } from '@design-system/progress-bar';

export function Example() {
  return (
    <ProgressBar
      progress={75}
      size="s"
      appearance="green"
    />
  );
}
```

### Basic

```tsx
import { ProgressBarCircle } from '@design-system/progress-bar';

export function Example() {
  return <ProgressBarCircle progress={50} size="s" appearance="primary" />;
}
```

## Props

### ProgressBarProps
| name | type | default value | description |
|------|------|---------------|-------------|
| progress* | `number` | - | Процент загрузки от 0 до 100 |
| size | enum ProgressBarSize: `"s"`, `"xs"` | xs | Размер |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | - | Внешний вид |
| className | `string` | - | CSS-класс |

### ProgressBarCircleProps
| name | type | default value | description |
|------|------|---------------|-------------|
| progress* | `number` | - | Процент загрузки от 0 до 100 |
| size | enum ProgressBarCircleSize: `"s"`, `"xs"` | xs | Размер |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Внешний вид |
| className | `string` | - | CSS-класс |

### ProgressBarPageProps
| name | type | default value | description |
|------|------|---------------|-------------|
| inProgress* | `boolean` | - | Включен/выключен |
| animationDuration | `number` | 200 | Скорость анимации |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | - | Внешний вид |
| className | `string` | - | CSS-класс |
| incrementDuration | `number` | 800 | Время между прогрессом |
| minimum | `number` | - | Минимальное значение прогресс бара от 0 до 1 |

## Best Practices

1. **Указывайте прогресс явно** — Всегда передавайте `progress` в диапазоне 0–100
2. **Подбирайте appearance** — Используйте primary/neutral для общего контекста; цветные варианты — для статуса (успех, предупреждение и т.д.)
3. **Размер по контексту** — XS для компактных мест (таблицы, карточки), S для основных экранов

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
