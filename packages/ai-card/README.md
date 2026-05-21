# AiCard

`@ds/ai-card` — Selectable AI-карточка с независимым boolean toggle, single-line заголовком и опциональным контентом.

`AiCard` — выбираемая карточка из набора AI Components. Поведение — независимый boolean-переключатель: клик / Enter / Space меняют `checked`. Подходит для выбора AI-предложений, карточек настроек, любых сценариев, где каждая карточка переключается отдельно.

Компонент рендерится как `<button>`. Полиморфизм (`as`) не поддерживается: для навигационной карточки используйте `@ds/card`.

## Когда использовать

- Карточки выбора в AI-сценариях (карточки-пресеты, генеративные варианты).
- Настройки, где каждая опция — самостоятельный переключатель.
- Выделенные блоки с состоянием «выделено / не выделено».

### Когда не нужен

- Один из группы (radio-семантика):
  - используйте `SegmentControl` либо обёртку с собственным состоянием.
- Статичный контейнер без выбора:
  - используйте `@ds/card`.
- Действие-кнопка:
  - используйте `@ds/button`.

## Анатомия

### Title

Заголовок в одну строку, semibold 14/20 с обрезкой по `text-overflow: ellipsis`. Слот скрыт, если `title` не задан.

### Content

Контент `children` под заголовком. Regular 14/20, вторичный цвет текста. Слот скрыт, если `children` не задан.

### Checked state (default `false`)

`checked` добавляет акцентный зелёный border и полупрозрачную заливку. `:hover` усиливает контраст, `:focus-visible` накладывает outline толщиной 2px акцентного цвета.

`checked` работает и как controlled-проп (если задан `onChange`), и как стартовое значение для uncontrolled-режима (если `onChange` не передан — компонент сам ведёт состояние).

## Установка

```bash
pnpm add @ds/ai-card
```

```ts
import { AiCard } from '@ds/ai-card'
```

## Примеры использования

### Default

Uncontrolled — клик переключает выбор

```tsx
import { AiCard } from '@ds/ai-card';
import { useState } from 'react';

export function Default() {
  const [checked, setChecked] = useState(false);
  return (
    <AiCard title='Card title' checked={checked} onChange={setChecked}>
      Default content
    </AiCard>
  );
}
```

### Selected

Стартовое selected-состояние через `defaultChecked`

```tsx
import { AiCard } from '@ds/ai-card';
import { useState } from 'react';

export function Selected() {
  const [checked, setChecked] = useState(true);
  return (
    <AiCard title='Selected card' checked={checked} onChange={setChecked}>
      Card content in selected state
    </AiCard>
  );
}
```

### Controlled

Состояние в родителе через `checked` + `onChange`

```tsx
import { AiCard } from '@ds/ai-card';
import { useState } from 'react';

export function Controlled() {
  const [checked, setChecked] = useState(false);
  return (
    <AiCard title={`Controlled (${checked ? 'on' : 'off'})`} checked={checked} onChange={setChecked}>
      Состояние хранится в родителе.
    </AiCard>
  );
}
```

### Disabled

Disabled-состояние блокирует клик и клавиатуру

```tsx
import { AiCard } from '@ds/ai-card';

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiCard title='Disabled' disabled>
        Не реагирует на клики
      </AiCard>
      <AiCard title='Disabled + selected' disabled checked>
        Заблокирован в selected-состоянии
      </AiCard>
    </div>
  );
}
```

## Props

**AiCardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Selected-состояние карточки. Controlled — источник истины в родителе. По умолчанию `false`. |
| `children` | `ReactNode` | — | Контент карточки. Не рендерится, если не задан. |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-card` |  |
| `disabled` | `boolean` | `false` | Disabled-состояние: opacity 0.4, нативная блокировка кликов и клавиатуры. |
| `onChange` | `((checked: boolean) => void)` | — | Срабатывает при toggle (клик / Enter / Space). Получает новое значение `checked`. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нативный обработчик клика. Срабатывает после `onChange` (toggle первичен). <br/> Не вызывается для disabled-карточки — браузер сам не дёргает onClick на disabled button. |
| `title` | `string` | — | Заголовок карточки. Semibold, single-line с ellipsis. Не рендерится, если не задан. |
