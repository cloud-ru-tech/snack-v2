# Typography

`@ds/typography` — Универсальный текстовый компонент с едиными токенами стиля — variant / size / weight — и автовыбором семантического тега.

`Typography` — единая точка входа для любого текстового стиля. Комбинация `variant` × `size` × `weight` покрывает всю типографическую шкалу дизайн-системы; тег (`h1`/`h2`/`p`/`label`) выбирается автоматически и переопределяется через `as`.

## Демо
<TypographyDemo client:visible />

## Когда использовать
- Любой текст в интерфейсе — заголовки, параграфы, подписи, метки.
- Вместо точечных CSS-классов на `font-size`/`font-weight`.

Когда **не** нужен `Typography`: для чистых UI-примитивов, где текст входит в состав компонента (например, `Button` label), — используйте встроенные пропсы компонента.

## Установка
```bash
pnpm add @ds/typography
```

```ts
import { Typography, VARIANT, SIZE, WEIGHT } from '@ds/typography'
```

## Примеры использования
<Example title='Базовое использование' code={TypographyBasicSrc}>
  <TypographyBasic client:visible />
</Example>

<Example title='Заголовок раздела' code={TypographyHeadlineSrc}>
  <TypographyHeadline client:visible />
</Example>

<Example title='Моноширинный' code={TypographyMonoSrc}>
  <TypographyMono client:visible />
</Example>

<Example title='Кастомный тег (полиморфизм)' code={TypographyPolymorphicSrc}>
  <TypographyPolymorphic client:visible />
</Example>

## Props
<PropsTable data={typographyDoc.Typography} />

## Storybook
<StorybookEmbed storyId='components-typography--playground' height={300} />

### Variant
Типографическая роль: `display` — крупные промо-заголовки, `headline` — заголовки секций, `title` — заголовки подсекций и карточек, `label` — подписи и бэйджи, `body` — основной текст.

### Size
Ступень размера внутри варианта: `s`, `m`, `l`. Конкретные px задаются токенами `@sbercloud/figma-variables`.

### Weight
Начертание: `regular` — дефолт, `thin` — облегчённое (display/headline), `mono` — моноширинное (коды, значения, ID).

## Typography

```tsx
import { Typography } from '@ds/typography'

export function Example() {
  return <Typography variant="VARIANT.body" weight="WEIGHT.regular">Click me</Typography>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Дочерние элементы |
| `variant` | `"title"` \| `"display"` \| `"headline"` \| `"label"` \| `"body"` | `VARIANT.body` | Вариант типографики |
| `size` | `"s"` \| `"m"` \| `"l"` | `SIZE.m` | Размер типографики |
| `weight` | `"regular"` \| `"thin"` \| `"mono"` | `WEIGHT.regular` | Начертание шрифта |
| `as` | `ElementType` | — | HTML тег для рендеринга |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
