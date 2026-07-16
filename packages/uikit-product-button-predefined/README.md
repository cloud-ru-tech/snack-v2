# ButtonDropdown

`@ds/uikit-product-button-predefined` — Function-кнопка с выпадающим списком (desktop) или modal (mobile).

Кнопка `view='function'` с `AdaptiveDroplist`: на **desktop** — `Droplist` из `@ds/list`, на **mobile** — `@ds/modal` со списком. Раскладка определяется контекстом `AdaptiveProvider` (см. `@ds/adaptive`), а не пропом. Используется, в частности, в **`PriceSummary`** для выбора периода биллинга.

## Когда использовать

- Нужен выбор одного значения из короткого списка (период, валюта, режим) без отдельного поля формы.
- На desktop достаточно выпадающего списка у триггера; на mobile — полноэкранный modal со списком.

Когда **не** нужен `ButtonDropdown`:

- Произвольный контент в overlay без списка — **`Dropdown`**.
- Одиночное действие без меню — **`Button`** `view='function'`.

## Анатомия

### Trigger

`Button` `view='function'` `appearance='neutral'` (как `buttonFunctionNeutral` в Figma) с `label` и chevron up/down. При `open={true}` на триггер вешается `data-pressed` — в макете это `stateLayer/text/opacity` (прозрачность label/icon через `@ds/materials`).

### Droplist

`ButtonDropdown` рендерит `Droplist` из `@ds/list` — он сам адаптивен (раскладку берёт из `AdaptiveProvider`, отдельного пропа нет):

- **desktop** (по умолчанию) — список у триггера через popover.
- **mobile** — список уходит в bottom-sheet (адаптивность `@ds/list`).

### items

Массив пунктов `Droplist` (`content.label`, `onClick`, `id`). При `closeDroplistOnItemClick` список закрывается после выбора.

### Size (default `s`)

- `xs` — кнопка и droplist рендерятся в размере `s` (алиас).
- `s` — компактный размер.
- `m` — средний размер.
- `l` — крупный размер.

### Appearance (default `neutral`)

Тон триггерной кнопки — те же значения, что у `Button` `view='function'`:

- `neutral` — нейтральный, основной вариант.
- `primary` — акцентный.
- `critical` — критическое действие.

### open / onOpenChange

Controlled API через `useValueControl` (как у `@ds/utils`).

## Установка

```bash
pnpm add @ds/uikit-product-button-predefined
```

```ts
import { ButtonDropdown } from '@ds/uikit-product-button-predefined'
```

### Базовый пример

```tsx
<ButtonDropdown
  label='Period'
  size='s'
  closeDroplistOnItemClick
  items={[
    { id: 'month', content: { label: 'Month' }, onClick: () => setPeriod('month') },
    { id: 'year', content: { label: 'Year' }, onClick: () => setPeriod('year') },
  ]}
/>
```

## Примеры использования

{/* client:only — Droplist рендерит контент в портал, который не резолвится при SSR */}

### Desktop basic

Базовый dropdown для выбора одного значения.

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useState } from 'react';

const periods = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export function DesktopBasic() {
  const [period, setPeriod] = useState(periods[0]);

  const items = periods.map(option => ({
    id: option.id,
    content: { label: option.label },
    onClick: () => setPeriod(option),
  }));

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
      <ButtonDropdown label={period.label} size='s' items={items} closeDroplistOnItemClick />
    </AdaptiveProvider>
  );
}
```

### Desktop open state

Открытое состояние dropdown (portal).

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useState } from 'react';

const periods = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export function DesktopOpen() {
  const [period, setPeriod] = useState(periods[0]);

  const items = periods.map(option => ({
    id: option.id,
    content: { label: option.label },
    onClick: () => setPeriod(option),
  }));

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
      <ButtonDropdown label={period.label} size='m' open items={items} />
    </AdaptiveProvider>
  );
}
```

### Mobile layout

AdaptiveProvider layoutType=mobile открывает modal со списком.

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useState } from 'react';

const periods = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export function MobileLayout() {
  const [period, setPeriod] = useState(periods[0]);

  const items = periods.map(option => ({
    id: option.id,
    content: { label: option.label },
    onClick: () => setPeriod(option),
  }));

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <ButtonDropdown label={period.label} size='s' closeDroplistOnItemClick items={items} />
    </AdaptiveProvider>
  );
}
```

## Props

**ButtonDropdownProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | `neutral` | Вариант оформления |
| `as` | `"button"` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс <br/> Класс триггерной кнопки. |
| `closeDroplistOnItemClick` | `boolean` | `false` | Закрывать выпадающий список после клика на базовый айтем. <br/> Работает в режимах selection: 'none' \| 'single' |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `counter` | `CounterProps` | — | Пропсы для counter |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Отключена |
| `fullWidth` | `boolean` | — | На всю ширину |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `items` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `Item` \| `ScrollProps` | — | Основные элементы списка |
| `label` | `string` | — | Текст кнопки |
| `loading` | `boolean` | — | Состояние загрузки |
| `onOpenChange` | `((open: boolean) => void)` | — | Колбэк изменения раскрытия. |
| `open` | `boolean` | — | Контролируемое состояние раскрытия. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер триггера; для `xs` применяется кнопка `s`. |
| `triggerClassName` | `string` | — | CSS-класс триггера |

#### Related types

- `ButtonDropdownSize` = `"l"` \| `"m"` \| `"s"` \| `"xs"`
