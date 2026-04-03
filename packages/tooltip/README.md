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
  type Placement,
  SIZE,
  type Size
} from '@design-system/tooltip';
```

## Live examples

### Basic

```tsx
import { QuestionTooltip } from '@design-system/tooltip';

export function Example() {
  return (
    <QuestionTooltip tip="Подсказка при наведении на иконку" />
  );
}
```

### Размер иконки (`size`)

```tsx
import { QuestionTooltip, SIZE } from '@design-system/tooltip';

export function Example() {
  return (
    <>
      <QuestionTooltip tip="Компактная иконка" size={SIZE.XS} />
      <QuestionTooltip tip="Крупная иконка" size={SIZE.S} />
    </>
  );
}
```

### Placement и triggerLabel

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

### Задержки по hover

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

### Basic usage

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

### Задержки по hover

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


## Usage



## Props

### QuestionTooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|
| tip* | `ReactNode` | - | Содержимое тултипа (текст или разметка) |
| disableMaxWidth | `boolean` | false | Отключение ограничения ширины тултипа |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| triggerRef | `ForwardedRef<ReferenceType \| HTMLElement>` | - | Ref ссылка на триггер |
| disableSpanWrapper | `boolean` | - | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| fallbackPlacements | `Placement[]` | - | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.Hover | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Положение поповера относительно своего триггера (children). |
| children | `ReactNode \| ChildrenFunction` | - | Триггер поповера (подробнее читайте ниже) |
| tooltipClassname | `string` | - | CSS-класс контейнера подсказки |
| triggerLabel | `string` | Подсказка | Доступное имя для иконки-триггера |
| tabIndex | `number` | - | Tab index для кнопки-триггера |
| size | enum Size: `"xs"`, `"s"` | xs | Размер |

### TooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|
| tip* | `ReactNode` | - | Содержимое тултипа (текст или разметка) |
| disableMaxWidth | `boolean` | - | Отключение ограничения ширины тултипа |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| triggerRef | `ForwardedRef<ReferenceType \| HTMLElement>` | - | Ref ссылка на триггер |
| disableSpanWrapper | `boolean` | - | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| fallbackPlacements | `Placement[]` | - | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.HoverAndFocusVisible | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | PLACEMENT.Top | Положение поповера относительно своего триггера (children). |
| children | `ReactNode \| ChildrenFunction` | - | Триггер поповера (подробнее читайте ниже) |

## Best Practices

1. **Краткий текст** — используйте для коротких пояснений к полям, меткам или настройкам.
2. **Осмысленный triggerLabel** — задайте `triggerLabel` под контекст (например, «Подсказка о сумме»), чтобы скринридеры озвучивали назначение кнопки.
3. **Триггер по контексту** — на десктопе удобен hover; для тач-устройств можно использовать `trigger={TRIGGER.Click}`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
