# Counter

`@ds/counter` — Компактный счётчик для отображения числовых меток, бейджей и состояний.

Счётчик — компактный компонент для отображения числовых значений внутри другой UI-поверхности: кнопок, тегов, пунктов меню, навигации.

## Когда использовать
- Количество непрочитанных уведомлений у иконки колокольчика.
- Количество элементов в корзине или списке.
- Бейдж на табе / пункте меню.

Когда **не** нужен `Counter`: для крупных числовых метрик используйте `Typography`, для статусов — `Tag`.

## Анатомия

### Appearance (default `primary`)
Цветовая схема счётчика. Значение совпадает с именем семантической палитры темы:

- `primary` — акцентный (непрочитанные, новые).
- `neutral` — нейтральный.
- `red` — ошибки, срочные элементы.
- `orange` — предупреждения.
- `yellow` — внимание.
- `green` — успех, положительный статус.
- `blue` — информационный.
- `violet` — дополнительный акцент.
- `pink` — дополнительный акцент.

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

### Red — ошибки и срочные элементы

```tsx
import { Counter } from '@ds/counter';

export function Red() {
  return <Counter value={3} appearance='red' />;
}
```

## Props
**CounterProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Внешний вид |
| `className` | `string` | — | Дополнительный CSS-класс |
| `color` | `"accent"` \| `"decor"` | `accent` | Семантический цвет |
| `data-test-id` | `string` | — |  |
| `plusLimit` | `number` | `10` | Порог сокращения значения для варианта `count-plus` |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `value` | `number` | — | Значение |
| `variant` | `"count"` \| `"count-k"` \| `"count-plus"` | `count` | Вариант форматирования |

#### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `Color` = `"accent"` \| `"decor"`

- `Size` = `"s"` \| `"xs"`

- `Variant` = `"count"` \| `"count-k"` \| `"count-plus"`
