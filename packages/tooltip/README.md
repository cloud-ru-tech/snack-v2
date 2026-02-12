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

<QuestionTooltip content="Подсказка при наведении на иконку" client:load />
```tsx
import { QuestionTooltip } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip content="Подсказка при наведении на иконку" />
);
}
```
```

### Placement и triggerLabel

```tsx
import { QuestionTooltip } from '@design-system/tooltip';

<QuestionTooltip
content="Тултип снизу"
placement="bottom"
triggerLabel="Подсказка о поле"
client:load
/>
```tsx
import { QuestionTooltip } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip
content="Тултип снизу"
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
content="Открывается по клику"
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
content="Откроется через 500 мс"
hoverDelayOpen={500}
hoverDelayClose={200}
client:load
/>
```tsx
import { QuestionTooltip } from '@design-system/tooltip';
export function Example() {
return (
<QuestionTooltip
content="Откроется через 500 мс"
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

<Tooltip content='Подсказка при наведении' placement='right' client:load>
<button type='button' client:load>Наведи курсор</button>
</Tooltip>
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
```

### Разные положения (placement)

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Наведи курсор на кнопки — тултип показывается сверху, снизу, слева или справа от триггера.
<StorybookIframe storyId="components-tooltip--placements" showControls={false} height="400px" />
```

### Длинный текст

```tsx
import { StorybookIframe } from '@design-system/tooltip';

Тултип ограничивает максимальную ширину и переносит строки — длинный текст остаётся читаемым.
<StorybookIframe storyId="components-tooltip--with-long-content" showControls={false} height="300px" />
```

### Trigger по клику

```tsx
import { StorybookIframe, Tooltip } from '@design-system/tooltip';

Для мобильных или явного показа подсказки можно открывать тултип по клику: `trigger="click"`.
<StorybookIframe storyId="components-tooltip--with-click-trigger" showControls={false} height="300px" />
```tsx
import { Tooltip } from '@design-system/tooltip';
export function Example() {
return (
<Tooltip
content="Тултип по клику"
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
content="Откроется через 500 мс"
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
content="Откроется через 500 мс"
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
| content* | `ReactNode` | - | Содержимое тултипа (текст или разметка) |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру (мс) |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру (мс) |
| triggerLabel | `string` | Подсказка | Доступное имя для иконки-триггера |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | PLACEMENT.Top | Положение поповера относительно своего триггера (children). |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.HoverAndFocusVisible | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| offset | `number` | 4 | Отступ поповера от его триггер-элемента (в пикселях). |

### TooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Содержимое тултипа (текст или разметка) |
| children* | `ReactNode` | - | Элемент, при наведении на который показывается тултип |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру (мс) |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру (мс) |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | PLACEMENT.Top | Положение поповера относительно своего триггера (children). |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.HoverAndFocusVisible | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| triggerClassName | `string` | - | CSS-класс триггера |

## Best Practices

1. **Краткий текст** — используйте для коротких пояснений к полям, меткам или настройкам.
2. **Осмысленный triggerLabel** — задайте `triggerLabel` под контекст (например, «Подсказка о сумме»), чтобы скринридеры озвучивали назначение кнопки.
3. **Триггер по контексту** — на десктопе удобен hover; для тач-устройств можно использовать `trigger={TRIGGER.Click}`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
