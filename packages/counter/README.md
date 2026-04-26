# Counter

`@ds/counter` — Компактный счётчик для отображения числовых меток, бейджей и состояний.

Счётчик — компактный компонент для отображения числовых значений внутри другой UI-поверхности: кнопок, тегов, пунктов меню, навигации.

## Когда использовать

- Количество непрочитанных уведомлений у иконки колокольчика.
- Количество элементов в корзине или списке.
- Бейдж на табе / пункте меню.

Когда **не** нужен `Counter`: для крупных числовых метрик используйте `Typography`, для статусов — `Tag`.

### Variant — формат значения

| Variant | Поведение |
|---------|-----------|
| `count` | Обычное число без форматирования |
| `count-plus` | При превышении `plusLimit` показывает `N+` (например, `10+`) |
| `count-k` | Свыше 1000 — сокращённая форма `NK` (например, `2K`) |

### Appearance — семантическая роль

| Appearance | Когда использовать |
|------------|--------------------|
| `primary` | Основной акцент — непрочитанное, новое |
| `neutral` | Нейтральный счётчик без срочности |
| `critical` | Требует внимания: ошибки, просроченное |

### Size и Color

`size`: `xs` / `s` — согласуется с размером родительского контейнера. `color`: `accent` / `decor` — акцентный или декоративный токен темы.

### Do / Don't

- ✅ `count-plus` для потенциально больших значений — не допускайте `9999` на бейдже.
- ❌ `count` на неограниченном диапазоне — поломает раскладку.
- ✅ `critical` только для действительно срочных состояний.
- ❌ `critical` как декоративный акцент.

### Установка

```bash
pnpm add @ds/counter
```

```ts
import { Counter, APPEARANCE, VARIANT, SIZE } from '@ds/counter'
import '@ds/counter/style.css'
```

### Примеры использования

<Example title='Обычное число'>
  <Counter value={9} />
</Example>

<Example title='С порогом 10+'>
  <Counter value={42} variant='count-plus' plusLimit={10} />
</Example>

<Example title='Тысячи как K'>
  <Counter value={2500} variant='count-k' />
</Example>

<Example title='Critical состояние'>
  <Counter value={3} appearance='critical' />
</Example>

### Props

<PropsTable data={counterDoc.Counter} />

### Storybook

<StorybookEmbed storyId='components-counter--playground' height={360} client:load />

## Доступность

- Counter — визуальный счётчик, семантики роли не несёт. Рендерится как `<div>`.
- Для скринридеров предоставляйте дублирующий текст в контейнере («3 непрочитанных уведомления»).
- Не полагайтесь на один цвет как носитель смысла — пара appearance × variant должна оставаться читаемой в монохромном режиме.

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
