# HotSpot

`@ds/hot-spot` — Пульсирующая точка-индикатор, привязанная к целевому элементу — подсказка внимания и обучающий акцент.

Пульсирующая точка-индикатор, которая привязывается к целевому UI-элементу. Используется для привлечения внимания к новой функции, непрочитанному статусу или обучающему шагу онбординга.

## Когда использовать
- Подсветка новой функции в меню или тулбаре.
- Индикатор непрочитанного статуса рядом с пунктом навигации.
- Шаг обучающего онбординга — точка указывает на следующее действие.

Когда **не** нужен `HotSpot`: для количественных бейджей используйте `Counter`; для постоянных статусов — `Tag`.

## Анатомия

### Appearance
Цветовая семантика точки: `primary` — нейтральный акцент бренда; `red` — ошибка/важное уведомление; `orange`, `yellow` — предупреждение; `green` — успех/онлайн; `blue`, `violet`, `pink` — декоративные категории.

### Placement
Позиция точки относительно родителя: `left|center|right` × `top|bottom` плюс чистый `left`/`right`/`center` (по вертикали центрируются).

## Установка
```bash
pnpm add @ds/hot-spot
```

```ts
import { HotSpot, APPEARANCE, PLACEMENT } from '@ds/hot-spot'
```

## Примеры использования
### HotSpot на кнопке

```tsx
import { Button } from '@ds/button';
import { HotSpot } from '@ds/hot-spot';

export function OnButton() {
  return (
    <HotSpot placement='right-top'>
      <Button label='Уведомления' view='outline' />
    </HotSpot>
  );
}
```

### Без анимации пульсации

```tsx
import { Button } from '@ds/button';
import { HotSpot } from '@ds/hot-spot';

export function NoPulse() {
  return (
    <HotSpot placement='right' pulse={false}>
      <Button label='Settings' view='outline' />
    </HotSpot>
  );
}
```

### Красный акцент

```tsx
import { Button } from '@ds/button';
import { HotSpot } from '@ds/hot-spot';

export function RedAccent() {
  return (
    <HotSpot appearance='red' placement='right-top'>
      <Button label='Ошибки' view='outline' />
    </HotSpot>
  );
}
```

### Standalone dot (без children)

```tsx
import { HotSpot } from '@ds/hot-spot';

export function Standalone() {
  return <HotSpot appearance='green' />;
}
```

## Props
**HotSpotProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Внешний вид |
| `children` | `ReactNode` | — | Вложенный контент |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `dotRender` | `((dot: ReactNode) => ReactNode)` | — | Рендер функция для dot |
| `duration` | `string` | `2s` | Время анимации пульсации |
| `enabled` | `boolean` | `true` | Управление состоянием отрисовки |
| `offsetX` | `string \| number` | `0` | Смещение dot по оси X (ось направлена вправо) |
| `offsetY` | `string \| number` | `0` | Смещение dot по оси Y (ось направлена вниз) |
| `placement` | `"center"` \| `"center-bottom"` \| `"center-top"` \| `"left"` \| `"left-bottom"` \| `"left-top"` \| `"right"` \| `"right-bottom"` \| `"right-top"` | `right-top` | Положение относительно children. |
| `pulse` | `boolean` | `true` | Анимация пульсации |
| `wrapperClassName` | `string` | — |  |

#### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `Placement` = `"center"` \| `"center-bottom"` \| `"center-top"` \| `"left"` \| `"left-bottom"` \| `"left-top"` \| `"right"` \| `"right-bottom"` \| `"right-top"`
