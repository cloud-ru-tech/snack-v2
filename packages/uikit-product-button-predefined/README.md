# ButtonDropdown

`@ds/uikit-product-button-predefined` — Function-кнопка с выпадающим списком (desktop) или modal (mobile).

Кнопка `view='function'` с `AdaptiveDroplist`: на **desktop** — `Droplist` из `@ds/list`, на **`layoutType='mobile'`** — `@ds/modal` со списком. Используется, в частности, в **`PriceSummary`** для выбора периода биллинга.

## Когда использовать

- Нужен выбор одного значения из короткого списка (период, валюта, режим) без отдельного поля формы.
- На desktop достаточно выпадающего списка у триггера; на mobile — полноэкранный modal со списком.

Когда **не** нужен `ButtonDropdown`:

- Произвольный контент в overlay без списка — **`Dropdown`**.
- Одиночное действие без меню — **`Button`** `view='function'`.

## Анатомия

### Trigger

`Button` `view='function'` `appearance='neutral'` (как `buttonFunctionNeutral` в Figma) с `label` и chevron up/down. При `open={true}` на триггер вешается `data-pressed` — в макете это `stateLayer/text/opacity` (прозрачность label/icon через `@ds/materials`).

### AdaptiveDroplist

- **`layoutType='desktop'`** (по умолчанию) — `Droplist` из `@ds/list`, позиционирование через popover.
- **`layoutType='mobile'`** — `ModalCustom` + `List`; пункты из `items`.

### items

Массив пунктов `Droplist` (`content.option`, `onClick`, `id`). При `closeDroplistOnItemClick` список закрывается после выбора.

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
  layoutType='desktop'
  closeDroplistOnItemClick
  items={[
    { id: 'month', content: { option: 'Month' }, onClick: () => setPeriod('month') },
    { id: 'year', content: { option: 'Year' }, onClick: () => setPeriod('year') },
  ]}
/>
```

## Примеры использования

{/* client:only — Droplist рендерит контент в портал, который не резолвится при SSR */}

### Desktop basic

Базовый dropdown для выбора одного значения.

```tsx
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
    content: { option: option.label },
    onClick: () => setPeriod(option),
  }));

  return <ButtonDropdown label={period.label} size='s' layoutType='desktop' items={items} closeDroplistOnItemClick />;
}
```

### Desktop open state

Открытое состояние dropdown (portal).

```tsx
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
    content: { option: option.label },
    onClick: () => setPeriod(option),
  }));

  return <ButtonDropdown label={period.label} size='m' layoutType='desktop' open items={items} />;
}
```

### Mobile layout

layoutType=mobile открывает modal со списком.

```tsx
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
    content: { option: option.label },
    onClick: () => setPeriod(option),
  }));

  return <ButtonDropdown label={period.label} size='s' layoutType='mobile' closeDroplistOnItemClick items={items} />;
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
| `layoutType` | `"desktop"` \| `"mobile"` | — |  |
| `loading` | `boolean` | — | Состояние загрузки |
| `onOpenChange` | `((open: boolean) => void)` | — | Колбэк изменения раскрытия. |
| `open` | `boolean` | — | Контролируемое состояние раскрытия. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер триггера; для `xs` применяется кнопка `s`. |
| `triggerClassName` | `string` | — | CSS-класс триггера |

#### Related types

- `ButtonDropdownSize` = `"l"` \| `"m"` \| `"s"` \| `"xs"`
