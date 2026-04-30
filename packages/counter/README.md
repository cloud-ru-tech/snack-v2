# Counter

`@ds/counter` — Компактный счётчик для отображения числовых меток, бейджей и состояний.

Счётчик — компактный компонент для отображения числовых значений внутри другой UI-поверхности: кнопок, тегов, пунктов меню, навигации.

## Когда использовать
- Количество непрочитанных уведомлений у иконки колокольчика.
- Количество элементов в корзине или списке.
- Бейдж на табе / пункте меню.

Когда **не** нужен `Counter`: для крупных числовых метрик используйте `Typography`, для статусов — `Tag`.

## Анатомия

### Appearance
Семантическая роль счётчика: `primary` — акцентный (непрочитанные, новые), `neutral` — нейтральный, `critical` — для подсветки ошибок или срочных элементов.

### Variant
Формат отображения числа: `count` — число как есть, `count-plus` — сокращение с плюсом после лимита (`10+`, `99+`), `count-k` — сокращение в тысячах (`1K`, `12K`).

### Size
Размер бейджа: `xs` — на иконках/мелких элементах, `s` — дефолт в табах и пунктах меню.

### Color
Цветовая роль: `accent` — основной токен appearance, `decor` — декоративный вариант для визуально более мягкого бейджа.

## Установка
```bash
pnpm add @ds/counter
```

```ts
import { Counter, APPEARANCE, VARIANT, SIZE } from '@ds/counter'
```

## Примеры использования
### Обычное число

```tsx
import { Counter } from '@ds/counter';

export function Basic() {
  return <Counter value={9} />;
}
```

### С порогом 10+

```tsx
import { Counter } from '@ds/counter';

export function PlusThreshold() {
  return <Counter value={42} variant='count-plus' plusLimit={10} />;
}
```

### Тысячи как K

```tsx
import { Counter } from '@ds/counter';

export function ThousandsK() {
  return <Counter value={2500} variant='count-k' />;
}
```

### Critical состояние

```tsx
import { Counter } from '@ds/counter';

export function Critical() {
  return <Counter value={3} appearance='critical' />;
}
```

## Props
**CounterProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | `primary` | Внешний вид |
| `className` | `string` | — | Дополнительный CSS-класс |
| `color` | `"accent"` \| `"decor"` | `accent` | Семантический цвет |
| `data-test-id` | `string` | — |  |
| `plusLimit` | `number` | `10` | Порог сокращения значения для варианта `count-plus` |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `value` | `number` | — | Значение |
| `variant` | `"count"` \| `"count-k"` \| `"count-plus"` | `count` | Вариант форматирования |

#### Related types

- `Appearance` = `"critical"` \| `"neutral"` \| `"primary"`

- `Color` = `"accent"` \| `"decor"`

- `Size` = `"s"` \| `"xs"`

- `Variant` = `"count"` \| `"count-k"` \| `"count-plus"`
