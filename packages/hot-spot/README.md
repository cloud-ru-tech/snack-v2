# Hot Spot

Компонент для привлечения внимания к элементу — цветная точка с опциональной анимацией пульсации. Может отображаться отдельно или поверх контента (children) с настраиваемым позиционированием.

## Installation

```bash
npm install @design-system/hot-spot
# or
yarn add @design-system/hot-spot
# or
pnpm add @design-system/hot-spot
```

## Exports

```typescript
import {
  HotSpot,
  type HotSpotProps,
  APPEARANCE,
  PLACEMENT,
  type Appearance,
  type Placement
} from '@design-system/hot-spot';
```

## Live examples

### Basic usage

```tsx
import { APPEARANCE, HotSpot } from '@design-system/hot-spot';

<HotSpot />
<HotSpot pulse={false} />
<HotSpot appearance={APPEARANCE.Red} />
```

### Appearances

```tsx
import { APPEARANCE, HotSpot } from '@design-system/hot-spot';

<HotSpot appearance={APPEARANCE.Primary} />
<HotSpot appearance={APPEARANCE.Red} />
<HotSpot appearance={APPEARANCE.Orange} />
<HotSpot appearance={APPEARANCE.Yellow} />
<HotSpot appearance={APPEARANCE.Green} />
<HotSpot appearance={APPEARANCE.Blue} />
<HotSpot appearance={APPEARANCE.Violet} />
<HotSpot appearance={APPEARANCE.Pink} />
<HotSpot appearance={APPEARANCE.Neutral} />
```

### With children

```tsx
import { APPEARANCE, HotSpot } from '@design-system/hot-spot';

<HotSpot placement={PLACEMENT.RightTop} offsetX={16}>
  <button type="button">Кнопка с индикатором</button>
</HotSpot>
<HotSpot placement={PLACEMENT.Right} appearance={APPEARANCE.Red} offsetX={16}>
  <span>Уведомление</span>
</HotSpot>
```


## Usage

### Basic example

```tsx
import { HotSpot } from '@design-system/hot-spot';

export function Example() {
  return <HotSpot />;
}
```

### With appearance and pulse

```tsx
import { HotSpot, APPEARANCE } from '@design-system/hot-spot';

export function Example() {
  return (
    <>
      <HotSpot appearance={APPEARANCE.Red} />
      <HotSpot appearance={APPEARANCE.Green} pulse={false} />
    </>
  );
}
```

### With children and placement

```tsx
import { HotSpot, PLACEMENT } from '@design-system/hot-spot';

export function Example() {
  return (
    <HotSpot placement={PLACEMENT.RightTop}>
      <button type="button">Кнопка с индикатором</button>
    </HotSpot>
  );
}
```

## Props

### HotSpotProps
| name | type | default value | description |
|------|------|---------------|-------------|
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Внешний вид |
| pulse | `boolean` | true | Анимация пульсации |
| duration | `string` | 2s | Время анимации пульсации |
| placement | enum Placement: `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`, `"right-bottom"`, `"center"`, `"center-top"`, `"center-bottom"` | right-top | Положение относительно children. |
| dotRender | `(dot: ReactNode) => ReactNode` | - | Рендер функция для dot |
| children | `ReactNode` | - | Вложенный контент |
| offsetX | `string \| number` | - | Смещение dot по оси X (ось направлена вправо) |
| offsetY | `string \| number` | - | Смещение dot по оси Y (ось направлена вниз) |
| enabled | `boolean` | true | Управление состоянием отрисовки |
| className | `string` | - | CSS-класс |
| wrapperClassName | `string` | - |  |

## Best Practices

1. **Appearance** — подбирайте цвет под контекст (primary для основного, red для критичных уведомлений).
2. **Pulse** — анимация привлекает внимание; отключайте `pulse={false}` при избыточном количестве индикаторов.
3. **Placement** — используйте `right-top` для кнопок и иконок; `center` для центрирования.
4. **enabled** — скрывайте dot при отсутствии уведомлений (`enabled={hasUpdates}`).
5. **dotRender** — для кастомной обёртки (Tooltip, Popover) передавайте функцию, возвращающую обёрнутый dot.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
