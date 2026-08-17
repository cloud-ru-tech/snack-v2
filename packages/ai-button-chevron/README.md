# AiButtonChevron

`@ds/ai-button-chevron` — Кнопка-шеврон 16×16 для раскрытия и сворачивания в составных AI-компонентах стриминга.

`AiButtonChevron` — кнопка-шеврон 16×16 из набора AI Components. Презентационный toggle: видимое направление задаётся пропом `open`, переключение — на стороне родителя через `onClick`. Используется как управляющий элемент раскрытия / сворачивания в составных компонентах стриминга.

Компонент рендерится как `<button>`. Шеврон смотрит вниз при `open={false}` и поворачивается вверх при `open={true}`.

## Когда использовать

- Раскрытие / сворачивание блока в AI-сценариях (превью генерации, цепочка рассуждений, вложенные подсказки).
- Управляющий шеврон в заголовке секции, где состояние хранит родитель.

### Когда не нужен

- Полноценная кнопка с текстом или иконкой действия:
  - используйте `@ds/button`.
- Самостоятельный переключатель с собственным состоянием выбора:
  - используйте `@ds/ai-card` либо `SegmentControl`.

## Анатомия

### Open (default `false`)

Единственная визуальная ось. `open={false}` — шеврон вниз (свёрнуто), `open={true}` — шеврон вверх (раскрыто). Поворот анимируется через `transform`.

### Disabled (default `false`)

`disabled` снижает прозрачность и нативно блокирует клик и клавиатуру.

Цвет глифа — вторичный текстовый токен (`textTertiary`), на `:hover` усиливается, `:focus-visible` накладывает акцентный outline.

## Установка

```bash
pnpm add @ds/ai-button-chevron
```

```ts
import { AiButtonChevron } from '@ds/ai-button-chevron'
```

## Примеры использования

### Default

Клик переключает направление шеврона

```tsx
import { AiButtonChevron } from '@ds/ai-button-chevron';
import { useState } from 'react';

export function Default() {
  const [open, setOpen] = useState(false);
  return <AiButtonChevron open={open} onClick={() => setOpen(prev => !prev)} />;
}
```

### Expandable

Шеврон управляет раскрытием блока

```tsx
import { AiButtonChevron } from '@ds/ai-button-chevron';
import { useState } from 'react';

export function Expandable() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonChevron open={open} onClick={() => setOpen(prev => !prev)} />
      {open && <span>Раскрытый контент</span>}
    </div>
  );
}
```

### Disabled

Disabled-состояние блокирует клик и клавиатуру

```tsx
import { AiButtonChevron } from '@ds/ai-button-chevron';

export function Disabled() {
  return <AiButtonChevron disabled />;
}
```

## Props

**AiButtonChevronProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Disabled-состояние: opacity, нативная блокировка кликов и клавиатуры. |
| `interactive` | `boolean` | `true` | Интерактивный режим: `true` — рендерится как `button`, `false` — как декоративный `span`. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нативный обработчик клика. Не вызывается для disabled-кнопки. |
| `open` | `boolean` | `false` | Раскрытое состояние: `true` — шеврон смотрит вверх, `false` — вниз. По умолчанию `false`. |
