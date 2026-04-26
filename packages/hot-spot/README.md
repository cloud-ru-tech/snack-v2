# HotSpot

`@ds/hot-spot` — Пульсирующая точка-индикатор, привязанная к целевому элементу — подсказка внимания и обучающий акцент.

Пульсирующая точка-индикатор, которая привязывается к целевому UI-элементу. Используется для привлечения внимания к новой функции, непрочитанному статусу или обучающему шагу онбординга.

## Демо
<HotSpotDemo client:visible />

## Когда использовать
- Подсветка новой функции в меню или тулбаре.
- Индикатор непрочитанного статуса рядом с пунктом навигации.
- Шаг обучающего онбординга — точка указывает на следующее действие.

Когда **не** нужен `HotSpot`: для количественных бейджей используйте `Counter`; для постоянных статусов — `Tag`.

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
<Example title='HotSpot на кнопке' code={OnButtonSrc}>
  <OnButton client:visible />
</Example>

<Example title='Без анимации пульсации' code={NoPulseSrc}>
  <NoPulse client:visible />
</Example>

<Example title='Красный акцент' code={RedAccentSrc}>
  <RedAccent client:visible />
</Example>

<Example title='Standalone dot (без children)' code={StandaloneSrc}>
  <Standalone client:visible />
</Example>

## Props
<PropsTable data={hotSpotDoc.HotSpot} />

## Storybook
<StorybookEmbed storyId='components-hotspot--playground' height={360} />

## HotSpot

```tsx
import { HotSpot } from '@ds/hot-spot'

export function Example() {
  return <HotSpot appearance="primary" pulse duration="2s" placement="right-top" offsetX="0" offsetY="0" enabled>Click me</HotSpot>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `appearance` | `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `primary` | Внешний вид |
| `pulse` | `boolean` | `true` | Анимация пульсации |
| `duration` | `string` | `2s` | Время анимации пульсации |
| `placement` | `"left"` \| `"left-top"` \| `"left-bottom"` \| `"right"` \| `"right-top"` \| `"right-bottom"` \| `"center"` \| `"center-top"` \| `"center-bottom"` | `right-top` | Положение относительно children. |
| `dotRender` | `((dot: ReactNode) => ReactNode)` | — | Рендер функция для dot |
| `children` | `ReactNode` | — | Вложенный контент |
| `offsetX` | `string | number` | `0` | Смещение dot по оси X (ось направлена вправо) |
| `offsetY` | `string | number` | `0` | Смещение dot по оси Y (ось направлена вниз) |
| `enabled` | `boolean` | `true` | Управление состоянием отрисовки |
| `className` | `string` | — |  |
| `wrapperClassName` | `string` | — |  |
