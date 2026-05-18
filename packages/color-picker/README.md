# ColorPicker

`@ds/color-picker` — Компонент выбора цвета с палитрой, переключаемыми цветовыми моделями (HEX/RGB/HSV), альфа-каналом и опциональным режимом ручного применения.

Компонент выбора цвета с палитрой, переключаемыми цветовыми моделями (HEX / RGB / HSV), альфа-каналом и опциональным режимом ручного подтверждения изменений. Уведомляет об изменении полным `RawColor`-объектом (`hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`) — пользователь сам решает, в каком формате потреблять.

## Когда использовать

- Когда пользователю нужно выбрать произвольный цвет (брендинг, темы, разметка карт, рисование).
- Когда требуется поддержка нескольких цветовых моделей.
- Когда нужен альфа-канал.

Когда **не** нужен `ColorPicker`:

- Выбор из фиксированной палитры — используйте набор `Tag`/`Chip`.
- Только подтверждение одной заранее заданной коррекции — используйте `Toggle`/`Switch`.

## Анатомия

### Size (default `m`)

Размерный ряд: `s` / `m` / `l`. Меняются размер палитры, handle-указателя, превью и зазоры.

### Alpha (default `true`)

`withAlpha` — управляет наличием альфа-канала в палитре и поля Alpha (0–100%).

### Available modes (default — все)

`availableModes` — массив `ColorMode[]`. Перечисляет модели, доступные переключателю. По умолчанию доступны все (`hex`, `rgb`, `hsv`).

### Apply mode (default `false`)

- `autoApply: true` — `onChange` вызывается на каждое изменение, без footer'а.
- `autoApply: false` — изменения накапливаются локально; `onChange` вызывается только по `Apply`. `Cancel` восстанавливает значение из `value` (или из начального, если используется uncontrolled).

## Установка

```bash
pnpm add @ds/color-picker
```

## Примеры использования

### Базовое использование

Controlled с локальным state

```tsx
import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function Basic() {
  const [color, setColor] = useState<string>('#389f74');

  return <ColorPicker value={color} onChange={raw => setColor(raw.hex)} />;
}
```

### Размеры

s / m / l из Figma-оси size

```tsx
import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function Sizes() {
  const [color, setColor] = useState<string>('#389f74');
  const handleChange = (raw: { hex: string }) => setColor(raw.hex);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ColorPicker size='s' value={color} onChange={handleChange} autoApply />
      <ColorPicker size='m' value={color} onChange={handleChange} autoApply />
      <ColorPicker size='l' value={color} onChange={handleChange} autoApply />
    </div>
  );
}
```

### Авто-применение

autoApply убирает footer

```tsx
import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function AutoApply() {
  const [color, setColor] = useState<string>('#4387e2');

  return <ColorPicker value={color} autoApply onChange={raw => setColor(raw.hex)} />;
}
```

### Без альфа-канала

withAlpha=false

```tsx
import { ColorPicker } from '@ds/color-picker';
import { useState } from 'react';

export function WithoutAlpha() {
  const [color, setColor] = useState<string>('#d52e33');

  return <ColorPicker value={color} withAlpha={false} autoApply onChange={raw => setColor(raw.hex)} />;
}
```

## Props

**ColorPickerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoApply` | `boolean` | `false` | Применять изменения автоматически. Если `false` — появляются кнопки Cancel/Apply. |
| `availableModes` | `ColorMode` | `['hex', 'rgb', 'hsv']` | Какие цветовые модели доступны переключателю. |
| `className` | `string` | — | CSS-класс корневого элемента. |
| `data-test-id` | `string` | — |  |
| `onChange` | `((rawColor: RawColor) => void)` | — | Колбек на изменение значения. Вызывается на каждое изменение если `autoApply`, иначе только по нажатию Apply. |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер компонента. |
| `value` | `Alpha` \| `Color` \| `HslColor` \| `HsvColor` \| `RgbColor` | — | Текущее значение цвета. Если задано — компонент синхронизируется с ним при изменении. |
| `withAlpha` | `boolean` | `true` | Управляет альфа-каналом палитры и наличием поля Alpha. |

#### Related types

**Alpha**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `a` | `number` | — |  |

- `Color` = `string | RgbColor | HslColor | HsvColor | RgbaColor | HslaColor | HsvaColor`

- `ColorMode` = `"hex"` \| `"hsv"` \| `"rgb"`

**HslColor**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `h` | `number` | — |  |
| `l` | `number` | — |  |
| `s` | `number` | — |  |

**HsvColor**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `h` | `number` | — |  |
| `s` | `number` | — |  |
| `v` | `number` | — |  |

**RgbColor**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `b` | `number` | — |  |
| `g` | `number` | — |  |
| `r` | `number` | — |  |

- `Size` = `"l"` \| `"m"` \| `"s"`
