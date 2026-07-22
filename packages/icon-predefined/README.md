# IconPredefined

`@ds/icon-predefined` — SVG-иконка с предустановленным оформлением — цветной подложкой, размером и формой контейнера.

Оборачивает произвольную SVG-иконку в контейнер с предустановленной палитрой, размером и формой. Используется как иконка-«кружок» рядом с заголовками, в empty/info-блоках и в плашках статуса.

## Когда использовать

- Иконка-маркер рядом с заголовком раздела или в карточке.
- Empty-state и info-плашки, где нужен крупный визуальный акцент.
- Иконки в `Status`, `Alert`, `InfoBlock` — там IconPredefined даёт согласованный фон и размер.

Когда **не** нужен: декоративные иконки внутри текста, иконки внутри `Button` (там собственный слот), функциональные иконки в тулбарах (используйте сырой SVG).

## Анатомия

### Appearance
Цвет подложки. `primary`/`neutral` — нейтральные, остальные (`red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink`) — декоративные акценты без семантики.

### Size
Размер контейнера: `m` — дефолт в строках и карточках, `l` — заголовки разделов, `5xl` — крупные empty-state.

### Shape
Форма контейнера: `rounded` — круглый (по умолчанию), `squared` — со скруглёнными углами для технических объектов.

### Background
`background={false}` отключает цветную подложку — иконка рисуется поверх прозрачного фона. Применяется, когда подложка уже есть у родительского контейнера.

## Установка

```bash
pnpm add @ds/icon-predefined
```

```ts
import { IconPredefined, APPEARANCE, SIZE } from '@ds/icon-predefined'
```

## Примеры использования

### Палитра appearance

Декоративные цвета подложки.

```tsx
import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Appearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} appearance='primary' />
      <IconPredefined icon={PlaceholderSVG} appearance='neutral' />
      <IconPredefined icon={PlaceholderSVG} appearance='red' />
      <IconPredefined icon={PlaceholderSVG} appearance='green' />
      <IconPredefined icon={PlaceholderSVG} appearance='blue' />
      <IconPredefined icon={PlaceholderSVG} appearance='violet' />
    </div>
  );
}
```

### Размеры

`m`, `l`, `5xl`.

```tsx
import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} size='m' />
      <IconPredefined icon={PlaceholderSVG} size='l' />
      <IconPredefined icon={PlaceholderSVG} size='5xl' />
    </div>
  );
}
```

### Форма и подложка

`rounded` / `squared`, отключение подложки (`background`).

```tsx
import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Shapes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} shape='rounded' />
      <IconPredefined icon={PlaceholderSVG} shape='squared' />
      <IconPredefined icon={PlaceholderSVG} shape='rounded' background={false} />
    </div>
  );
}
```

## Props

**IconPredefinedProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Внешний вид |
| `background` | `boolean` | `true` | Наличие цветной подложки |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `icon` | `JSXElementConstructor<{ size?: number \| undefined; className?: string \| undefined; }>` | — | JSX иконки |
| `shape` | `"rounded"` \| `"squared"` | `rounded` | Форма: круглая или квадратная |
| `size` | `"5xl"` \| `"l"` \| `"m"` | `m` | Размер |

#### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `Size` = `"5xl"` \| `"l"` \| `"m"`
