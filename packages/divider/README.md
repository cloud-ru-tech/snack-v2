# Divider

`@ds/divider` — Разделитель контента с горизонтальной и вертикальной ориентацией и вариантами толщины линии.

Компонент для визуального разделения контента. Поддерживает две ориентации (горизонтальная по умолчанию и вертикальная) и два варианта толщины линии (`regular` — 1px, `thin` — 0.5px). Объявляет ARIA-семантику `role='separator'` + `aria-orientation`.

## Когда использовать
- Между секциями страницы или блоками контента — горизонтальный `regular`.
- Внутри тулбаров или рядов элементов — вертикальный `regular` (контейнер должен задать высоту).
- Вложенные блоки и плотные списки — `thin`, чтобы визуально ослабить границу.

Не ставьте Divider между каждым элементом списка — группируйте логические блоки.

## Анатомия

### Variant
Толщина линии: `regular` — стандартная разделительная линия между секциями, `thin` — ослабленная (вложенные блоки, плотные списки).

### Orientation
Ориентация:

- `horizontal` — между строками и секциями, по умолчанию занимает всю ширину.
- `vertical` — между элементами в ряд, высоту задаёт место использования.

Вертикальный разделитель тянется по высоте родителя, поэтому в контейнере с авто-высотой, при `align-items: center` и внутри `inline-flex` он получает нулевую высоту и не виден. Растянутую высоту задавайте на месте использования: `align-self: stretch` на самом разделителе либо `align-items: stretch` и фиксированная высота у ряда — как в примере ниже.

## Установка
```bash
pnpm add @ds/divider
```

```ts
import { APPEARANCE, Divider, ORIENTATION, VARIANT } from '@ds/divider'
```

## Примеры использования
### Горизонтальный (по умолчанию)

```tsx
import { Divider } from '@ds/divider';

export function Horizontal() {
  return <Divider />;
}
```

### Тонкая линия

```tsx
import { Divider } from '@ds/divider';

export function Thin() {
  return <Divider variant='thin' />;
}
```

### Вертикальный разделитель

Ряд задаёт высоту и align-items: stretch — без растянутой высоты разделитель получит нулевую высоту и пропадёт

```tsx
import { Divider } from '@ds/divider';

import styles from './VerticalInRow.module.scss';

export function VerticalInRow() {
  return (
    <div className={styles.row}>
      <span className={styles.label}>Left</span>
      <div className={styles.dividerCell}>
        <Divider orientation='vertical' />
      </div>
      <span className={styles.label}>Right</span>
    </div>
  );
}
```

## Props
**DividerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"invertNeutral"` \| `"neutral"` | `neutral` | Цвет линии: neutral — на обычном фоне, invertNeutral — на инвертированном. По умолчанию: neutral |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация: горизонтальная или вертикальная. По умолчанию: horizontal |
| `variant` | `"regular"` \| `"thin"` | `regular` | Вариант толщины линии (regular: 1px, thin: 0.5px). По умолчанию: regular |

#### Related types

- `DividerAppearance` = `"invertNeutral"` \| `"neutral"`

- `DividerOrientation` = `"horizontal"` \| `"vertical"`

- `DividerVariant` = `"regular"` \| `"thin"`

Принимает вспомогательные атрибуты `data-test-id` и ARIA через тип `WithSupportProps` из `@ds/utils`.
