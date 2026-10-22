# AiButtonControls

`@ds/ai-button-controls` — Кнопка-стрелка для прокрутки и листания в AI-компонентах.

`AiButtonControls` — кнопка-стрелка 24×24 из набора AI Components. Сообщает о нажатии через `onClick`; что и на сколько прокрутить, решает потребитель.

## Когда использовать

- Кнопка прокрутки ленты сообщений к последнему ответу — направление `down`.
- Листание ряда вложений в поле ввода на desktop — направления `left` и `right`.

### Когда не нужен

- Закрытие блока или удаление вложения:
  - используйте `@ds/ai-button-close`.
- Раскрытие и сворачивание блока:
  - используйте `@ds/ai-button-chevron`.

## Анатомия

Кнопка состоит из подложки с тенью и иконки стрелки. Обводки и текста нет.

### Direction

- `left` — стрелка влево.
- `right` — стрелка вправо.
- `down` — стрелка вниз.

На устройствах с наведением стрелка в покое окрашена вторичным цветом текста, при наведении — основным; подложка не меняется. На сенсорных экранах состояния наведения нет. Фокус с клавиатуры показывается акцентной обводкой.

Доступное имя по умолчанию берётся из локали по направлению: «Прокрутить влево», «Прокрутить вправо», «Прокрутить вниз». Если кнопка ведёт к конкретному месту, передайте свой `aria-label`.

## Установка

```bash
pnpm add @ds/ai-button-controls
```

```ts
import { AiButtonControls } from '@ds/ai-button-controls'
```

## Примеры использования

### Направления

Left, Right и Down

```tsx
import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';

export function Directions() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonControls direction={DIRECTION.Left} />
      <AiButtonControls direction={DIRECTION.Right} />
      <AiButtonControls direction={DIRECTION.Down} />
    </div>
  );
}
```

### Листание

Стрелки листают ряд; на краях стрелка выключена

```tsx
import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { useState } from 'react';

const SLIDES = ['Первый', 'Второй', 'Третий', 'Четвёртый'];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonControls direction={DIRECTION.Left} disabled={isFirst} onClick={() => setIndex(prev => prev - 1)} />
      <span>{SLIDES[index]}</span>
      <AiButtonControls direction={DIRECTION.Right} disabled={isLast} onClick={() => setIndex(prev => prev + 1)} />
    </div>
  );
}
```

### Доступное имя

aria-label для кнопки прокрутки к последнему сообщению

```tsx
import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { useState } from 'react';

export function CustomLabel() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonControls
        direction={DIRECTION.Down}
        aria-label='К последнему сообщению'
        onClick={() => setClicks(prev => prev + 1)}
      />
      <span>Нажатий: {clicks}</span>
    </div>
  );
}
```

## Props

**AiButtonControlsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-button-controls` |  |
| `direction` | `"down"` \| `"left"` \| `"right"` | — | Направление стрелки (ось Way в Figma). |
| `disabled` | `boolean` | `false` | Блокирует нажатие. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие на стрелку. Содержимое двигает потребитель. |

#### Related types

- `Direction` = `"down"` \| `"left"` \| `"right"`
