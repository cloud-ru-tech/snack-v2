# PromoTag

`@ds/promo-tag` — Промо-тег — цветной лейбл для маркетинговых акцентов, выделения категорий и статусных ярлыков. Опционально кликабельный.

Компактный цветной тег для маркетинговых подписей (`NEW`, `SALE`, `BETA`), категорий и акцентных меток. Рендерится как `<div>` — или как `<button>`, если передан `onClick`.

## Когда использовать
- Пометка карточки товара/услуги — новинка, скидка, хит.
- Цветовая категоризация в списках (темы, теги статей).
- Статусная метка, которая **не** несёт функциональной семантики (для статусов берите `Status`).

Когда **не** нужен: интерактивные chip'ы с удалением — берите `Chip`/`Tag`; функциональные статусы — берите `Status`.

## Анатомия

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
### Базовый тег

```tsx
import { PromoTag } from '@ds/promo-tag';

export function Basic() {
  // eslint-disable-next-line jsx-a11y/aria-role -- `role` здесь — пропс компонента PromoTag, не ARIA-атрибут
  return <PromoTag text='NEW' appearance='primary' role='accent' />;
}
```

### Палитра

Основные цветовые appearance.

```tsx
import { PromoTag } from '@ds/promo-tag';

export function Colors() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PromoTag text='Primary' appearance='primary' />
      <PromoTag text='Green' appearance='green' />
      <PromoTag text='Red' appearance='red' />
      <PromoTag text='Violet' appearance='violet' />
    </div>
  );
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `ReactNode` | `null` | Контент после текста |
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Внешний вид |
| `beforeContent` | `ReactNode` | `null` | Контент перед текстом |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `onClick` | `((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбэк для обработки клика на тег |
| `role` | `"accent"` \| `"decor"` | `accent` | Роль промо-тега |
| `size` | `"m"` \| `"s"` \| `"xs"` | `xs` | Размер |
| `text` | `string` | — | Текст компонента |
