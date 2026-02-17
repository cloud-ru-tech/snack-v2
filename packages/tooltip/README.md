# Tooltip

Пакет компонентов для всплывающих подсказок: **Tooltip** (с произвольным триггером) и **QuestionTooltip** (с иконкой «вопрос»). Стили и анатомия — из design tokens (Figma variables).

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
  type Placement
} from '@design-system/tooltip';
```

## Live examples

### Basic

```tsx
import { QuestionTooltip } from '@design-system/tooltip';

<QuestionTooltip tip="Подсказка при наведении на иконку" client:load />
```tsx
import { QuestionTooltip } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip tip="Подсказка при наведении на иконку" />
);
}
```
```

### Placement и triggerLabel

```tsx
import { QuestionTooltip } from '@design-system/tooltip';

<QuestionTooltip
tip="Тултип снизу"
placement="bottom"
triggerLabel="Подсказка о поле"
client:load
/>
```tsx
import { QuestionTooltip } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip
tip="Тултип снизу"
placement="bottom"
triggerLabel="Подсказка о поле"
/>
);
}
```
```

### Разные положения (placement)

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Наведи курсор на иконки — тултип показывается сверху, снизу, слева или справа от триггера.
<StorybookIframe storyId="components-tooltip-questiontooltip--placements" showControls={false} height="400px" />
```

### Длинный текст

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Тултип ограничивает максимальную ширину и переносит строки — длинный текст остаётся читаемым.
<StorybookIframe storyId="components-tooltip-questiontooltip--with-long-content" showControls={false} height="300px" />
```

### По клику (trigger)

```tsx
import { QuestionTooltip, StorybookIframe } from '@design-system/tooltip';

Для мобильных или явного открытия подсказки можно открывать тултип по клику: `trigger={TRIGGER.Click}`.
<StorybookIframe storyId="components-tooltip-questiontooltip--with-click-trigger" showControls={false} height="300px" />
```tsx
import { QuestionTooltip, TRIGGER } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip
tip="Открывается по клику"
trigger={TRIGGER.Click}
/>
);
}
```
```

### Задержки по hover

```tsx
import { QuestionTooltip } from '@design-system/tooltip';

<QuestionTooltip
tip="Откроется через 500 мс"
hoverDelayOpen={500}
hoverDelayClose={200}
client:load
/>
```tsx
import { QuestionTooltip } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip
tip="Откроется через 500 мс"
hoverDelayOpen={500}
hoverDelayClose={200}
/>
);
}
```
```

### Basic usage

```tsx
import { Tooltip } from '@design-system/tooltip';

<Tooltip tip='Подсказка при наведении' placement='right' client:load>
<button type='button' client:load>Наведи курсор</button>
</Tooltip>
```tsx
import { Tooltip } from '@design-system/tooltip';
export function Example() {
return (
<Tooltip tip="Подсказка">
<button type="button">Наведи курсор</button>
</Tooltip>
);
}
```
```

### Разные положения (placement)

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Наведи курсор на кнопки — тултип показывается сверху, снизу, слева или справа от триггера.
<StorybookIframe storyId="components-tooltip-tooltip--placements" showControls={false} height="400px" />
```

### Длинный текст

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Тултип ограничивает максимальную ширину и переносит строки — длинный текст остаётся читаемым.
<StorybookIframe storyId="components-tooltip-tooltip--with-long-content" showControls={false} height="300px" />
```

### Trigger по клику

```tsx
import { StorybookIframe, Tooltip } from '@design-system/tooltip';

Для мобильных или явного показа подсказки можно открывать тултип по клику: `trigger="click"`.
<StorybookIframe storyId="components-tooltip-tooltip--with-click-trigger" showControls={false} height="300px" />
```tsx
import { Tooltip } from '@design-system/tooltip';
export function Example() {
return (
<Tooltip
tip="Тултип по клику"
trigger="click"
>
<button type="button">Нажми, чтобы показать</button>
</Tooltip>
);
}
```
```

### Задержки по hover

```tsx
import { Tooltip } from '@design-system/tooltip';

<Tooltip
tip="Откроется через 500 мс"
placement="right"
hoverDelayOpen={500}
hoverDelayClose={200}
client:load
>
<span client:load>Наведи курсор</span>
</Tooltip>
```tsx
import { Tooltip } from '@design-system/tooltip';
export function Example() {
return (
<Tooltip
tip="Откроется через 500 мс"
hoverDelayOpen={500}
hoverDelayClose={200}
>
<span>Наведи курсор</span>
</Tooltip>
);
}
```
```


## Usage



## Props

### QuestionTooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|

### TooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|

## Best Practices

1. **Краткий текст** — используйте для коротких пояснений к полям, меткам или настройкам.
2. **Осмысленный triggerLabel** — задайте `triggerLabel` под контекст (например, «Подсказка о сумме»), чтобы скринридеры озвучивали назначение кнопки.
3. **Триггер по контексту** — на десктопе удобен hover; для тач-устройств можно использовать `trigger={TRIGGER.Click}`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
