# PromoTag

`@ds/promo-tag` — Промо-тег — цветной лейбл для маркетинговых акцентов, выделения категорий и статусных ярлыков. Опционально кликабельный.

Компактный цветной тег для маркетинговых подписей (`NEW`, `SALE`, `BETA`), категорий и акцентных меток. Рендерится как `<div>` — или как `<button>`, если передан `onClick`.

## Когда использовать

- Пометка карточки товара/услуги — новинка, скидка, хит.
- Цветовая категоризация в списках (темы, теги статей).
- Статусная метка, которая **не** несёт функциональной семантики (для статусов берите `Status`).

Когда **не** нужен: интерактивные chip'ы с удалением — берите `Chip`/`Tag`; функциональные статусы — берите `Status`.

### Appearance

Девять цветовых схем: `primary`, `neutral`, `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink`. Выбор — по смыслу, а не по «красиво».

### Role

| Role | Когда использовать |
|------|---------------------|
| `accent` | Сильный акцент — плотная заливка, заметен на карточке |
| `decor` | Деликатная метка, сливается с фоном — для фоновой классификации |

### Size

| Size | Применение |
|------|------------|
| `xs` | В плотных списках и таблицах |
| `s` | Значение по умолчанию — карточки, header'ы |
| `m` | Хедеры секций, промо-блоки |

### Do / Don't

- ✅ Один-два тега на карточку — акцент сохраняется.
- ❌ Пять цветных тегов подряд — превращаются в шум.
- ✅ Короткий текст: 1–2 слова, uppercase допустим.
- ❌ Предложение внутри тега.
- ✅ Цвет согласован с семантикой (red → риск, green → успех).
- ❌ Random-цвет без смысловой связи.

### Установка

```bash
pnpm add @ds/promo-tag
```

```ts
import { PromoTag } from '@ds/promo-tag'
import '@ds/promo-tag/style.css'
```

### Примеры использования

<Example title='Базовый тег' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='Палитра' description='Основные цветовые appearance.' code={ColorsSrc}>
  <Colors client:load />
</Example>

<Example
  title='Кликабельный тег'
  description='Передайте onClick — компонент отрендерится как <button>.'
  code={ClickableSrc}
>
  <Clickable client:load />
</Example>

### Props

<PropsTable data={promoTagDoc.PromoTag} />

### Storybook

<StorybookEmbed storyId='components-promotag--playground' height={240} client:load />

## Доступность

- Без `onClick` — `<div>`, не интерактивен: скринридер объявит текст как обычный контент.
- С `onClick` — `<button type="button">` с встроенным state-layer (hover/active), фокус и Enter/Space работают из коробки.
- Цвет не единственный носитель смысла: дублируйте текстом (`NEW`, `SALE`), а не только цветом.
- Для декоративных иконок в `beforeContent`/`afterContent` используйте `aria-hidden`.

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
