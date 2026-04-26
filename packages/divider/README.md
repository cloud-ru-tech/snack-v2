# Divider

`@ds/divider` — Разделитель контента с горизонтальной и вертикальной ориентацией и вариантами толщины линии.

Компонент для визуального разделения контента. Поддерживает две ориентации (горизонтальная по умолчанию и вертикальная) и два варианта толщины линии (`regular` — 1px, `thin` — 0.5px). Объявляет ARIA-семантику `role='separator'` + `aria-orientation`.

## Когда использовать

- Между секциями страницы или блоками контента — горизонтальный `regular`.
- Внутри тулбаров или рядов элементов — вертикальный `regular` (контейнер должен задать высоту).
- Вложенные блоки и плотные списки — `thin`, чтобы визуально ослабить границу.

Не ставьте Divider между каждым элементом списка — группируйте логические блоки.

### Variant — толщина линии

| Variant | Когда использовать |
|---------|--------------------|
| `regular` | Основное разделение — 1px, читается на любой подложке |
| `thin` | Плотные списки, вложенные блоки — 0.5px |

### Orientation — ориентация

| Orientation | Контейнер должен задать |
|-------------|-------------------------|
| `horizontal` | Ширину (по умолчанию — 100% от родителя) |
| `vertical` | Высоту — иначе Divider схлопнется |

### Do / Don't

- ✅ Один Divider между логическими блоками.
- ❌ Divider между каждым пунктом списка — используйте внутренние отступы.
- ✅ `thin` внутри плотных UI — таблицы, сайдбары.
- ❌ `thin` на крупных секциях — линия потеряется.

### Установка

```bash
pnpm add @ds/divider
```

```ts
import { Divider, ORIENTATION, VARIANT } from '@ds/divider'
import '@ds/divider/style.css'
```

### Примеры использования

<Example title='Горизонтальный (по умолчанию)'>
  <Divider />
</Example>

<Example title='Тонкая линия'>
  <Divider variant='thin' />
</Example>

<Example
  title='Вертикальный разделитель'
  description='Контейнер задаёт высоту, иначе Divider схлопнется'
  code={VerticalInRowSrc}
>
  <VerticalInRow client:load />
</Example>

### Props

<PropsTable data={dividerDoc.Divider} />

Принимает вспомогательные атрибуты `data-test-id` и ARIA через тип `WithSupportProps` из `@ds/utils`.

### Storybook

<StorybookEmbed storyId='components-divider--playground' height={300} client:load />

## Доступность

- `role='separator'` — корректное объявление разделителя для скринридеров.
- `aria-orientation` — горизонтальный/вертикальный контекст.
- Не несёт текстовой нагрузки и не должен использоваться как единственный признак разделения.

## Divider

```tsx
import { Divider } from '@ds/divider'

export function Example() {
  return <Divider variant="regular" orientation="horizontal">Click me</Divider>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `variant` | `"regular"` \| `"thin"` | `regular` | Вариант толщины линии (regular: 1px, thin: 0.5px). По умолчанию: regular |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация: горизонтальная или вертикальная. По умолчанию: horizontal |
| `className` | `string` | — | CSS-класс |
