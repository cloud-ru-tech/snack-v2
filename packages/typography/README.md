# Typography

`@ds/typography` — Универсальный текстовый компонент с едиными токенами стиля — variant / size / weight — и автовыбором семантического тега.

`Typography` — единая точка входа для любого текстового стиля. Комбинация `variant` × `size` × `weight` покрывает всю типографическую шкалу дизайн-системы; тег (`h1`/`h2`/`p`/`label`) выбирается автоматически и переопределяется через `as`.

## Когда использовать
- Любой текст в интерфейсе — заголовки, параграфы, подписи, метки.
- Вместо точечных CSS-классов на `font-size`/`font-weight`.

Когда **не** нужен `Typography`: для чистых UI-примитивов, где текст входит в состав компонента (например, `Button` label), — используйте встроенные пропсы компонента.

## Анатомия

### Variant
Типографическая роль: `display` — крупные промо-заголовки, `headline` — заголовки секций, `title` — заголовки подсекций и карточек, `label` — подписи и бэйджи, `body` — основной текст.

### Size
Ступень размера внутри варианта: `s`, `m`, `l`. Конкретные px задаются токенами `@sbercloud/figma-variables`.

### Weight
Начертание: `regular` — дефолт, `thin` — облегчённое (display/headline), `mono` — моноширинное (коды, значения, ID).

## Установка
```bash
pnpm add @ds/typography
```

```ts
import { Typography, VARIANT, SIZE, WEIGHT } from '@ds/typography'
```

## Примеры использования
### Базовое использование

```tsx
import { Typography } from '@ds/typography';

export function TypographyBasic() {
  return <Typography>Обычный body-текст по умолчанию</Typography>;
}
```

### Заголовок раздела

```tsx
import { Typography } from '@ds/typography';

export function TypographyHeadline() {
  return (
    <Typography variant='headline' size='l'>
      Заголовок страницы
    </Typography>
  );
}
```

### Моноширинный

```tsx
import { Typography } from '@ds/typography';

export function TypographyMono() {
  return (
    <Typography variant='body' weight='mono'>
      const answer = 42
    </Typography>
  );
}
```

### Кастомный тег (полиморфизм)

```tsx
import { Typography } from '@ds/typography';

export function TypographyPolymorphic() {
  return (
    <Typography as='span' variant='body'>
      Body внутри inline-потока
    </Typography>
  );
}
```

## Props
**TypographyProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | — | HTML тег для рендеринга |
| `children` | `ReactNode` | — | Дочерние элементы |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
| `size` | `"l"` \| `"m"` \| `"s"` | `SIZE.m` | Размер типографики |
| `variant` | `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"` | `VARIANT.body` | Вариант типографики |
| `weight` | `"mono"` \| `"regular"` \| `"thin"` | `WEIGHT.regular` | Начертание шрифта |

#### Related types

- `TypographySize` = `"l"` \| `"m"` \| `"s"`

- `TypographyVariant` = `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"`

- `TypographyWeight` = `"mono"` \| `"regular"` \| `"thin"`
