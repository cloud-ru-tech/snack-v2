# HotSpot

`@ds/hot-spot` — Пульсирующая точка-индикатор, привязанная к целевому элементу — подсказка внимания и обучающий акцент.

Пульсирующая точка-индикатор, которая привязывается к целевому UI-элементу. Используется для привлечения внимания к новой функции, непрочитанному статусу или обучающему шагу онбординга.

## Когда использовать

- Подсветка новой функции в меню или тулбаре.
- Индикатор непрочитанного статуса рядом с пунктом навигации.
- Шаг обучающего онбординга — точка указывает на следующее действие.

Когда **не** нужен `HotSpot`: для количественных бейджей используйте `Counter`; для постоянных статусов — `Tag`.

### Appearance — цвет точки

Восемь вариантов: `primary`, `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink`. `primary` — по умолчанию. Остальные — для семантических статусов или цветового кодирования по категориям.

### Placement — позиция относительно target

Девять позиций: `left`, `left-top`, `left-bottom`, `right`, `right-top`, `right-bottom`, `center`, `center-top`, `center-bottom`. Смещения по осям (`offsetX`, `offsetY`) позволяют тонкую подстройку.

### Pulse — анимация

Анимация пульсации по умолчанию включена. `duration` задаёт период (CSS-значение — `'2s'`, `'500ms'`). Для пользователей с `prefers-reduced-motion` отключайте `pulse` вручную.

### Do / Don't

- ✅ Один HotSpot на экран — внимание не должно дробиться.
- ❌ HotSpot на каждом элементе — превращает экран в рябь.
- ✅ Убирайте HotSpot после взаимодействия с целевым элементом.
- ❌ Постоянный HotSpot на давно известной функции.

### Установка

```bash
pnpm add @ds/hot-spot
```

```ts
import { HotSpot, APPEARANCE, PLACEMENT } from '@ds/hot-spot'
import '@ds/hot-spot/style.css'
```

### Примеры использования

<Example title='HotSpot на кнопке'>
  <HotSpot placement='right-top'>
    <Button label='Уведомления' view='outline' />
  </HotSpot>
</Example>

<Example title='Без анимации пульсации'>
  <HotSpot placement='right' pulse={false}>
    <Button label='Settings' view='outline' />
  </HotSpot>
</Example>

<Example title='Красный акцент'>
  <HotSpot appearance='red' placement='right-top'>
    <Button label='Ошибки' view='outline' />
  </HotSpot>
</Example>

<Example title='Standalone dot (без children)'>
  <HotSpot appearance='green' />
</Example>

### Props

<PropsTable data={hotSpotDoc.HotSpot} />

### Storybook

<StorybookEmbed storyId='components-hotspot--playground' height={360} client:load />

## Доступность

- HotSpot — чисто визуальный индикатор, не несёт ARIA-семантики.
- Не используйте его как единственный носитель информации — дублируйте статус текстом рядом (например, «Новое»).
- Для `prefers-reduced-motion` отключайте `pulse` программно.

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
