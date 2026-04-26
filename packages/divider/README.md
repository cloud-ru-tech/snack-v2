# Divider

`@ds/divider` — Разделитель контента с горизонтальной и вертикальной ориентацией и вариантами толщины линии.

Компонент для визуального разделения контента. Поддерживает две ориентации (горизонтальная по умолчанию и вертикальная) и два варианта толщины линии (`regular` — 1px, `thin` — 0.5px). Объявляет ARIA-семантику `role='separator'` + `aria-orientation`.

## Демо
<DividerDemo client:visible />

## Когда использовать
- Между секциями страницы или блоками контента — горизонтальный `regular`.
- Внутри тулбаров или рядов элементов — вертикальный `regular` (контейнер должен задать высоту).
- Вложенные блоки и плотные списки — `thin`, чтобы визуально ослабить границу.

Не ставьте Divider между каждым элементом списка — группируйте логические блоки.

### Variant
Толщина линии: `regular` — стандартная разделительная линия между секциями, `thin` — ослабленная (вложенные блоки, плотные списки).

### Orientation
Ориентация: `horizontal` — между строками/секциями (по умолчанию занимает всю ширину), `vertical` — между элементами в ряд (родитель должен задавать высоту).

## Установка
```bash
pnpm add @ds/divider
```

```ts
import { Divider, ORIENTATION, VARIANT } from '@ds/divider'
```

## Примеры использования
<Example title='Горизонтальный (по умолчанию)' code={HorizontalSrc}>
  <Horizontal client:visible />
</Example>

<Example title='Тонкая линия' code={ThinSrc}>
  <Thin client:visible />
</Example>

<Example
  title='Вертикальный разделитель'
  description='Контейнер задаёт высоту, иначе Divider схлопнется'
  code={VerticalInRowSrc}
>
  <VerticalInRow client:visible />
</Example>

## Props
<PropsTable data={dividerDoc.Divider} />

Принимает вспомогательные атрибуты `data-test-id` и ARIA через тип `WithSupportProps` из `@ds/utils`.

## Storybook
<StorybookEmbed storyId='components-divider--playground' height={300} />

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
