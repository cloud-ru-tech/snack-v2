# Popover

Публичный компонент поповера со стилями по макету Figma. Строится на PopoverPrivate (Floating UI). Предназначен для выпадающих блоков с произвольным контентом: меню, формы, подсказки с действиями и т.п. В отличие от Tooltip, контент передаётся через проп `content`, триггер — через `children`; по умолчанию открывается по клику.

## Installation

```bash
npm install @design-system/popover
# or
yarn add @design-system/popover
# or
pnpm add @design-system/popover
```

## Exports

```typescript
import {
  Popover,
  type PopoverProps
} from '@design-system/popover';
```

## Live examples

### Basic usage

```tsx
import { PopoverBasicExample } from '@design-system/popover';

Поповер с триггером по клику и контентом справа от кнопки:
<PopoverBasicExample client:load />
```


## Usage

### Basic example

```tsx
import { Popover } from '@design-system/popover';

export function Example() {
  return (
    <Popover content={<span>Текст или разметка</span>}>
      <button type="button">Открыть</button>
    </Popover>
  );
}
```

### С указанием placement и trigger

```tsx
import { Popover, PLACEMENT, TRIGGER } from '@design-system/popover';

export function Example() {
  return (
    <Popover
      content={<div>Произвольный контент</div>}
      placement={PLACEMENT.Right}
      trigger={TRIGGER.Click}
      hasArrow
    >
      <button type="button">Меню</button>
    </Popover>
  );
}
```

### По hover с задержкой

```tsx
import { Popover, TRIGGER } from '@design-system/popover';

export function Example() {
  return (
    <Popover
      content={<div>Дополнительная информация</div>}
      trigger={TRIGGER.Hover}
      hoverDelayOpen={200}
      hoverDelayClose={100}
    >
      <button type="button">Наведи</button>
    </Popover>
  );
}
```

## Props

### PopoverProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Контент поповера (отображается внутри контейнера по макету) |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| outsideClick | `boolean \| OutsideClickHandler` | - | Закрывать ли при клике вне поповера |
| placement | enum Placement: `"left"`, `"right"`, `"top"`, `"bottom"`, `"left-start"`, `"left-end"`, `"right-start"`, `"right-end"`, `"top-start"`, `"top-end"`, `"bottom-start"`, `"bottom-end"` | PLACEMENT.Top | Положение поповера относительно своего триггера (children). |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.Click | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"eq"`, `"gte"` | auto | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |
| heightStrategy | enum PopoverHeightStrategy: `"auto"`, `"lte"`, `"eq"` | auto | Стратегия управления высотой контейнера поповера <br/> - `auto` - соответствует высоте контента, <br/> - `lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше, <br/> - `eq` - Equal, строго равен высоте таргета. |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| fallbackPlacements | `Placement[]` | - | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| disableSpanWrapper | `boolean` | - | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| triggerRef | `ForwardedRef<ReferenceType \| HTMLElement>` | - | Ref ссылка на триггер |
| children | `ReactNode \| ChildrenFunction` | - | Триггер поповера (подробнее читайте ниже) |

## Best Practices

1. **Выбор триггера** — используйте `click` для выпадающих меню и действий с выбором; `hover` или `hoverAndFocusVisible` для дополнительной информации без обязательного клика.
2. **Закрытие и границы экрана** — включайте `outsideClick: true` для закрытия по клику вне поповера. Задавайте `fallbackPlacements`, чтобы при нехватке места поповер переворачивался в подходящую сторону.
3. **Контент** — передавайте в `content` любой ReactNode (текст, списки, формы). Стили контейнера (фон, отступы, тень) заданы по макету; типографику и внутренние отступы при необходимости задавайте внутри переданного контента.
4. **Отличие от Tooltip** — для коротких подсказок при наведении используйте **Tooltip**; для блоков с действиями, меню или развёрнутым контентом — **Popover**.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
