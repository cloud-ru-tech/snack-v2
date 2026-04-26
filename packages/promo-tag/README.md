# PromoTag

`@ds/promo-tag` — Промо-тег — цветной лейбл для маркетинговых акцентов, выделения категорий и статусных ярлыков. Опционально кликабельный.

Компактный цветной тег для маркетинговых подписей (`NEW`, `SALE`, `BETA`), категорий и акцентных меток. Рендерится как `<div>` — или как `<button>`, если передан `onClick`.

## Демо
<PromoTagDemo client:visible />

## Когда использовать
- Пометка карточки товара/услуги — новинка, скидка, хит.
- Цветовая категоризация в списках (темы, теги статей).
- Статусная метка, которая **не** несёт функциональной семантики (для статусов берите `Status`).

Когда **не** нужен: интерактивные chip'ы с удалением — берите `Chip`/`Tag`; функциональные статусы — берите `Status`.

### Appearance
Цветовая палитра: `primary` — брендовый акцент, `neutral` — без окраски; `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink` — декоративные категории.

### Size
`xs` — плотные ленты/карточки; `s` — дефолт; `m` — для крупных промо-блоков.

### Role appearance
`accent` — насыщенная заливка (главные метки: новинка, sale); `decor` — мягкая декоративная подложка для категоризации и тегов.

## Установка
```bash
pnpm add @ds/promo-tag
```

```ts
import { PromoTag } from '@ds/promo-tag'
```

## Примеры использования
<Example title='Базовый тег' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Палитра' description='Основные цветовые appearance.' code={ColorsSrc}>
  <Colors client:visible />
</Example>

<Example
  title='Кликабельный тег'
  description='Передайте onClick — компонент отрендерится как <button>.'
  code={ClickableSrc}
>
  <Clickable client:visible />
</Example>

## Props
<PropsTable data={promoTagDoc.PromoTag} />

## Storybook
<StorybookEmbed storyId='components-promotag--playground' height={240} />

## PromoTag

```tsx
import { PromoTag } from '@ds/promo-tag'

export function Example() {
  return <PromoTag appearance="primary" role="accent" beforeContent="null" afterContent="null">Click me</PromoTag>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `text` | `string` | — | Текст компонента |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `primary` | Внешний вид |
| `role` | `"accent"` \| `"decor"` | `accent` | Роль промо-тега |
| `className` | `string` | — | CSS-класс |
| `onClick` | `((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбэк для обработки клика на тег |
| `beforeContent` | `ReactNode` | `null` | Контент перед текстом |
| `afterContent` | `ReactNode` | `null` | Контент после текста |
| `size` | `"xs"` \| `"s"` \| `"m"` | `xs` | Размер |
