# Tooltip

Всплывающая подсказка при наведении на элемент-триггер (или по фокусу/клику). Стили и анатомия — из design tokens (Figma variables).

## Installation

```bash
npm install @design-system/tooltip
# or
yarn add @design-system/tooltip
# or
pnpm add @design-system/tooltip
```

## Exports

```typescript
import {
  TRIGGER,
  PLACEMENT,
  Tooltip,
  type TooltipProps,
  type Placement
} from '@design-system/tooltip';
```

## Live examples

### Basic usage

```tsx
import { TooltipBasicExample } from '@design-system/tooltip';

<TooltipBasicExample client:load />
```

### Разные положения (placement)

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Наведи курсор на кнопки — тултип показывается сверху, снизу, слева или справа от триггера.
<StorybookIframe storyId="components-tooltip--placements" showControls={false} height="400px" />
```

### По клику (trigger)

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Для мобильных или явного показа подсказки можно открывать тултип по клику: `trigger="click"`.
<StorybookIframe storyId="components-tooltip--with-click-trigger" showControls={false} height="300px" />
```

### Длинный текст

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Тултип ограничивает максимальную ширину и переносит строки — длинный текст остаётся читаемым.
<StorybookIframe storyId="components-tooltip--with-long-content" showControls={false} height="300px" />
```


## Usage

### Basic example

```tsx
import { Tooltip } from '@design-system/tooltip';

export function Example() {
  return (
    <Tooltip content="Подсказка">
      <button type="button">Наведи курсор</button>
    </Tooltip>
  );
}
```

### Placement и trigger

```tsx
import { Tooltip } from '@design-system/tooltip';

export function Example() {
  return (
    <Tooltip
      content="Тултип по клику"
      placement="bottom"
      trigger="click"
    >
      <button type="button">Нажми</button>
    </Tooltip>
  );
}
```

### Задержки по hover

```tsx
import { Tooltip } from '@design-system/tooltip';

export function Example() {
  return (
    <Tooltip
      content="Откроется через 500 мс"
      hoverDelayOpen={500}
      hoverDelayClose={200}
    >
      <span>Наведи курсор</span>
    </Tooltip>
  );
}
```

## Props

### TooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Содержимое тултипа (текст или разметка) |
| children* | `ReactNode` | - | Элемент, при наведении на который показывается тултип |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру (мс) |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру (мс) |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | PLACEMENT.Top | Положение поповера относительно своего триггера (children). |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.HoverAndFocusVisible | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| offset | `number` | 4 | Отступ поповера от его триггер-элемента (в пикселях). |

## Best Practices

1. **Краткий текст** — используйте тултип для коротких подсказок; длинный текст лучше выносить в отдельный блок или Popover.
2. **Не дублируйте видимый текст** — не показывайте в тултипе то, что уже написано на триггере.
3. **Триггер по контексту** — на десктопе удобен hover; для тач-устройств рассмотрите `trigger="click"` или `trigger="hoverAndFocusVisible"`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
