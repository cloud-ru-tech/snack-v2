# TabsSegmented

`@ds/site-tabs-segmented` — Сегментированные вкладки для сайта — ряд подписей в общей обводке, выбранная вкладка залита.

Горизонтальные вкладки сайта: подписи стоят вплотную в общей обводке, выбранная вкладка залита. Используются в секциях сайта (`@ds/site-section`) и отдельно.

## Когда использовать

- Переключение 2–7 разделов контента на странице сайта.
- Переключение периода или режима над списком или графиком.

Когда **не** нужен:

- Навигация внутри приложения консоли:
  - используйте `Tabs` из `@ds/tabs`.
- Выбор значения в форме:
  - используйте `SegmentControl` из `@ds/segment-control`.

## Анатомия

Каждая вкладка — кнопка с подписью. Обводка общая: на стыке соседних вкладок и рядов линия одна. Выбранная вкладка залита, её обводка — цвета заливки.

### Size (default `m`)

- `s` — отступы 6 / 12, текст `thin/body/m`.
- `m` — отступы 8 / 16, текст `thin/body/l`.
- `l` — отступы 12 / 20, текст `thin/body/l`.

### Размеры

s, m, l

```tsx
import { TabsSegmented } from '@ds/site-tabs-segmented';

const ITEMS = [
  { value: 'infrastructure', label: 'Инфраструктура' },
  { value: 'data', label: 'Данные' },
  { value: 'ai', label: 'AI' },
];

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <TabsSegmented items={ITEMS} size='s' />
      <TabsSegmented items={ITEMS} size='m' />
      <TabsSegmented items={ITEMS} size='l' />
    </div>
  );
}
```

### Appearance (default `default`)

- `default` — по теме страницы: на светлом фоне выбранная вкладка тёмная, на тёмном — светлая.
- `onAccent` — для тёмного акцентного фона: ряд всегда в тёмной теме, выбранная вкладка залита акцентным цветом бренда.

### Wrap (default `false`)

- `false` — ряд в одну строку, при нехватке ширины прокручивается по горизонтали.
- `true` — вкладки переносятся на новые строки.

### Клавиатура

- `Tab` — фокус на выбранную вкладку; в порядке Tab весь ряд — одна остановка.
- `←` / `→` — фокус на соседнюю вкладку по кругу, недоступные пропускаются.
- `Home` / `End` — фокус на первую / последнюю доступную вкладку.
- `Enter` / `Space` — выбрать вкладку в фокусе.

Имя ряда для экранных дикторов задаётся атрибутом `aria-label` или `aria-labelledby` — он передаётся на элемент `tablist`.

## Установка

```bash
pnpm add @ds/site-tabs-segmented
```

```ts
import { TabsSegmented } from '@ds/site-tabs-segmented'
```

## Примеры использования

### Controlled

value и onChange, недоступная вкладка

```tsx
import { TabsSegmented } from '@ds/site-tabs-segmented';
import { useState } from 'react';

const ITEMS = [
  { value: 'month', label: 'Месяц' },
  { value: 'quarter', label: 'Квартал' },
  { value: 'year', label: 'Год' },
  { value: 'archive', label: 'Архив', disabled: true },
];

export function Controlled() {
  const [period, setPeriod] = useState('quarter');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <TabsSegmented items={ITEMS} value={period} onChange={setPeriod} />
      <span>Период: {period}</span>
    </div>
  );
}
```

### Перенос на новые строки

wrap

```tsx
import { TabsSegmented } from '@ds/site-tabs-segmented';

const ITEMS = [
  'Инфраструктура',
  'Данные',
  'Искусственный интеллект',
  'Безопасность',
  'Сеть',
  'Хранилища',
  'Аналитика',
  'Разработка',
  'Мониторинг',
  'Поддержка',
].map(label => ({ value: label, label }));

export function Wrap() {
  return <TabsSegmented items={ITEMS} wrap />;
}
```

Без `value` компонент хранит выбор сам, изначально выбрана вкладка из `defaultValue` или первая.

## Props

**TabsSegmentedProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"default"` \| `"onAccent"` | `default` | Оформление. |
| `className` | `string` | — | CSS-класс корня. |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Значение вкладки, выбранной изначально (uncontrolled). По умолчанию — первая вкладка. |
| `items` | `TabsSegmentedItem` | — | Вкладки. |
| `onChange` | `((value: string) => void)` | — | Колбэк выбора вкладки. |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер. |
| `value` | `string` | — | Значение выбранной вкладки (controlled). |
| `wrap` | `boolean` | `false` | Переносить вкладки на новую строку. Без переноса ряд прокручивается по горизонтали. |

#### Related types

- `Appearance` = `"default"` \| `"onAccent"`

- `Size` = `"l"` \| `"m"` \| `"s"`

**TabsSegmentedItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — | CSS-класс вкладки. |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Вкладка недоступна для выбора. |
| `label` | `string` | — | Текст вкладки. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement>) => void) \| undefined` | — | Колбэк клика по вкладке. |
| `value` | `string` | — | Значение вкладки. |
