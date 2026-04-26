# Counter

`@ds/counter` — Компактный счётчик для отображения числовых меток, бейджей и состояний.

Счётчик — компактный компонент для отображения числовых значений внутри другой UI-поверхности: кнопок, тегов, пунктов меню, навигации.

## Демо
<CounterDemo client:visible />

## Когда использовать
- Количество непрочитанных уведомлений у иконки колокольчика.
- Количество элементов в корзине или списке.
- Бейдж на табе / пункте меню.

Когда **не** нужен `Counter`: для крупных числовых метрик используйте `Typography`, для статусов — `Tag`.

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
<Example title='Обычное число' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='С порогом 10+' code={PlusThresholdSrc}>
  <PlusThreshold client:visible />
</Example>

<Example title='Тысячи как K' code={ThousandsKSrc}>
  <ThousandsK client:visible />
</Example>

<Example title='Critical состояние' code={CriticalSrc}>
  <Critical client:visible />
</Example>

## Props
<PropsTable data={counterDoc.Counter} />

## Storybook
<StorybookEmbed storyId='components-counter--playground' height={360} />

## Counter

```tsx
import { Counter } from '@ds/counter'

export function Example() {
  return <Counter appearance="primary" variant="count" plusLimit="10" color="accent">Click me</Counter>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `value` | `number` | — | Значение |
| `appearance` | `"primary"` \| `"neutral"` \| `"critical"` | `primary` | Внешний вид |
| `variant` | `"count"` \| `"count-plus"` \| `"count-k"` | `count` | Вариант форматирования |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |
| `plusLimit` | `number` | `10` | Порог сокращения значения для варианта `count-plus` |
| `className` | `string` | — | Дополнительный CSS-класс |
| `color` | `"accent"` \| `"decor"` | `accent` | Семантический цвет |

## formatValue

```tsx
import { formatValue } from '@ds/counter'

export function Example() {
  return <formatValue>Click me</formatValue>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — |  |
| `variant` | `"count"` \| `"count-plus"` \| `"count-k"` | — |  |
| `plusLimit` | `number` | — |  |
