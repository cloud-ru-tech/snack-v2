# Block

`@ds/block` — Слот-поверхность с акриловым фоном (матовое/полупрозрачное стекло) для композиции содержимого на разных подложках.

`Block` — универсальный контейнер-слот с акриловой подложкой (backdrop-blur). Подходит для плавающих панелей, карточек над изображением, оверлеев и всплывающих блоков, где нужно сохранить читаемость контента на любом фоне.

## Демо
<BlockDemo client:visible />

## Когда использовать
- Плавающие карточки или панели поверх фоновых изображений.
- Модальные и всплывающие поверхности, где важна глубина.
- Любой контент, который нужно визуально отделить от сложного фона без использования сплошного цвета.

Когда **не** нужен `Block`: для обычных блоков на плоском фоне используйте свёрстанную карточку без акрилового эффекта — Block заметно дороже по отрисовке.

### Variant
Способ визуального отделения поверхности: `simple` — сплошная заливка, `outline` — с контурной рамкой, `shadow` — с тенью для подъёма над фоном, `transparent` — только акриловый эффект без заливки.

### Size
Плотность внутренних отступов и радиуса скругления: `s` — компактный (нестед-карточки, попсайды), `m` — дефолт, `l` — крупные карточки и модальные поверхности.

## Установка
```bash
pnpm add @ds/block
```

```ts
import { Block, SIZE, VARIANT } from '@ds/block'
```

## Примеры использования
<Example title='Базовое использование' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='С обводкой и большим размером' code={OutlineLargeSrc}>
  <OutlineLarge client:visible />
</Example>

<Example title='Прозрачное матовое стекло' code={TransparentSrc}>
  <Transparent client:visible />
</Example>

## Props
<PropsTable data={blockDoc.Block} />

## Storybook
<StorybookEmbed storyId='components-block--playground' height={420} />

## Block

```tsx
import { Block } from '@ds/block'

export function Example() {
  return <Block variant="simple">Click me</Block>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Содержимое |
| `variant` | `"simple"` \| `"outline"` \| `"shadow"` \| `"transparent"` | `simple` | Вариант |
| `size` | `"s"` \| `"m"` \| `"l"` | `l` | Размер |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
