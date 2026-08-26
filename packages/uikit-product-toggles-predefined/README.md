# TogglesPredefined

`@ds/uikit-product-toggles-predefined` — Кликабельные карточки выбора (ToggleCard) и группа выбора (ToggleGroup) — предзаготовленный паттерн single/multiple-выбора на базе @ds/card.

Предзаготовленный паттерн выбора: `ToggleCard` — кликабельная карточка с иконкой, заголовком и описанием, `ToggleGroup` — провайдер выбора и grid-раскладка карточек. Визуальный chrome (фон, state-layer выбора, outline, focus-ring) приходит из **`@ds/card`**; выбор управляется контекстом `@ds/toggles`.

## Когда использовать

- Выбор тарифа, конфигурации, плана — когда варианты крупные и им нужны иконка + заголовок + описание.
- Single-выбор (один вариант из набора) или multiple-выбор (несколько опций-аддонов).
- Когда нужна увеличенная hit-area: вся карточка кликабельна и операбельна с клавиатуры.

Когда **не** нужен `TogglesPredefined`:

- Компактный список бинарных опций со Switch:
  - используйте **`SwitchRow`**.
- Один inline-чекбокс или радио без описания:
  - используйте **`Checkbox` / `Radio`**.

## Анатомия

### Size (default `m`)

Ось `size` масштабирует анатомию карточки целиком (как в продуктовом ките) — padding, gap, типографику заголовка/описания и радиус контейнера `@ds/card`:

- `s` — padding 8, gap 4, заголовок `title/s`, описание `body/m`.
- `m` — padding 16, gap 8, заголовок `title/m`, описание `body/m`.
- `l` — padding 24, gap 16, заголовок `title/l`, описание `body/l`.

Эмблема масштабируется вместе с карточкой автоматически: `size` встроенного `IconPredefined` выводится из `size` карточки (`s → m`, `m → l`, `l → 5xl`).

### Orientation (default `vertical`)

Ось раскладки `ToggleGroup`:

- `vertical` — карточки в колонку.
- `horizontal` — карточки в авто-колонки `repeat(auto-fit, minmax(breakpoint, 1fr))`.

### Gap (default `s`)

Расстояние между карточками — density spacing interval:

- `s` — 8px.
- `m` — 16px.
- `l` — 24px.

### SelectionMode (default `single`)

Режим выбора `ToggleGroup` (из `@ds/toggles`):

- `single` — выбран один вариант; карточки получают `role='radio'`.
- `multiple` — выбрано несколько; карточки получают `role='checkbox'`.

### Слоты ToggleCard

- `title` — обязательный заголовок карточки.
- `description` — опциональное описание под заголовком.
- `emblem` — ведущая эмблема. **`IconPredefined`** встроен в компонент — передаются только его параметры (`icon`, `appearance`, `decor`, `shape`) либо картинка (`src` / `alt`).
- `promoBadge` — промо-бейдж в правом верхнем углу (`string` или `{ text, appearance? }` для **`PromoTag`**).
- `truncate` — максимум строк `title` и/или `description` (по умолчанию `title: 1`, `description: 2`).

## Установка

```bash
pnpm add @ds/uikit-product-toggles-predefined
```

```ts
import { ToggleCard, ToggleGroup, useToggleGroup } from '@ds/uikit-product-toggles-predefined'
```

## Примеры использования

### Базовый single-выбор

```tsx
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function Basic() {
  return (
    <ToggleGroup defaultValue='pro'>
      <ToggleCard value='start' title='Тариф Start' description='10 ГБ хранилища' />
      <ToggleCard value='pro' title='Тариф Pro' description='100 ГБ хранилища, приоритетная поддержка' />
      <ToggleCard value='enterprise' title='Тариф Enterprise' description='Безлимит и выделенный менеджер' />
    </ToggleGroup>
  );
}
```

### С иконками

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function WithIcon() {
  return (
    <ToggleGroup defaultValue='cpu'>
      <ToggleCard value='cpu' emblem={{ icon: PlaceholderSVG }} title='CPU' description='4 vCPU, 8 ГБ RAM' />
      <ToggleCard value='gpu' emblem={{ icon: PlaceholderSVG }} title='GPU' description='1× A100, 80 ГБ' />
    </ToggleGroup>
  );
}
```

### С промо-тегами

promoBadge — строка или объект для PromoTag в правом верхнем углу карточки.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function WithPromoBadge() {
  return (
    <ToggleGroup defaultValue='pro'>
      <ToggleCard value='basic' emblem={{ icon: PlaceholderSVG }} title='Basic' description='Для старта' />
      <ToggleCard
        value='pro'
        emblem={{ icon: PlaceholderSVG }}
        title='Pro'
        description='Популярный тариф'
        promoBadge='−20%'
      />
      <ToggleCard
        value='enterprise'
        emblem={{ icon: PlaceholderSVG }}
        title='Enterprise'
        description='Для команд'
        promoBadge={{ label: 'New', appearance: 'blue' }}
      />
    </ToggleGroup>
  );
}
```

### Multiple (controlled)

Несколько аддонов, состояние в useState.

```tsx
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { useState } from 'react';

export function Multiple() {
  const [value, setValue] = useState<string[]>(['backup']);

  return (
    <ToggleGroup selectionMode='multiple' value={value} onChange={next => setValue(next ?? [])} gap='m'>
      <ToggleCard value='backup' title='Резервное копирование' description='Ежедневные снапшоты' />
      <ToggleCard value='monitoring' title='Мониторинг' description='Алерты и метрики 24/7' />
      <ToggleCard value='cdn' title='CDN' description='Раздача статики по миру' />
    </ToggleGroup>
  );
}
```

### Горизонтальная раскладка

orientation=horizontal + breakpoint.

```tsx
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function Horizontal() {
  return (
    <ToggleGroup orientation='horizontal' gap='m' breakpoint={200} defaultValue='month'>
      <ToggleCard value='month' title='Помесячно' description='Гибкая оплата' />
      <ToggleCard value='year' title='Годовая' description='Скидка 20%' />
    </ToggleGroup>
  );
}
```

### Controlled single

Описание реагирует на выбранный вариант.

```tsx
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { useState } from 'react';

export function Controlled() {
  const [plan, setPlan] = useState<string | undefined>('pro');

  return (
    <ToggleGroup value={plan} onChange={(next: string | undefined) => setPlan(next)}>
      <ToggleCard value='start' title='Тариф Start' description={plan === 'start' ? 'Выбран' : '10 ГБ хранилища'} />
      <ToggleCard value='pro' title='Тариф Pro' description={plan === 'pro' ? 'Выбран' : '100 ГБ хранилища'} />
    </ToggleGroup>
  );
}
```

## Props

### ToggleCard

**ToggleCardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `description` | `string` | — | Основной текст под заголовком |
| `disabled` | `boolean` | `false` | Заблокированное состояние: интерактив отключён |
| `emblem` | `Emblem` \| `EmblemIcon` \| `EmblemPicture` | — | Ведущая эмблема. Передаются только параметры — сам `IconPredefined` <br/> встроен в компонент; `size` эмблемы выводится из `size` карточки. |
| `promoBadge` | `PromoTagOwnProps` \| `PromoTagProps` | — | Промо-бейдж в правом верхнем углу карточки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер карточки — масштабирует padding, gap, типографику и `radius` контейнера `@ds/card` |
| `title` | `string` | — | Заголовок карточки |
| `truncate` | `{ title?: number; description?: number; } \| undefined` | `'{ title: 1; description: 2; }'` | Максимальное число строк до обрезки. |
| `value` | `string` | — | Значение карточки в контексте `ToggleGroup` |

#### Related types

- `Emblem` = `EmblemPicture | EmblemIcon`

**EmblemIcon**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Внешний вид |
| `background` | `boolean \| undefined` | — | Наличие цветной подложки |
| `icon` | `((props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => ReactNode) \| (new (props: { size?: number; className?: string; }, deprecatedLegacyContext?: any) => Component<any, any>)` | — | JSX иконки |
| `shape` | `"rounded"` \| `"squared"` | — | Форма: круглая или квадратная |

**EmblemPicture**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alt` | `string` | — | Альтернативный текст картинки |
| `src` | `string` | — | URL картинки-эмблемы |

- `Size` = `"l"` \| `"m"` \| `"s"`

### ToggleGroup

**ToggleGroupProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breakpoint` | `number` | — | Минимальная ширина карточки для горизонтальной раскладки (px) |
| `children` | `ReactNode` | — | Дочерние карточки `ToggleCard` |
| `className` | `string` | — | CSS-класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string \| string[]` | — | Начальное состояние |
| `gap` | `"l"` \| `"m"` \| `"s"` | — | Расстояние между карточками |
| `onChange` | `((value: string) => void) \| ((value: string[]) => void) \| undefined` | — | Controlled обработчик измения состояния |
| `orientation` | `"horizontal"` \| `"vertical"` | — | Направление раскладки |
| `selectionMode` | `"multiple"` \| `"single"` | — | Режим выбора |
| `value` | `string \| string[]` | — | Controlled состояние |

#### Related types

- `Gap` = `"l"` \| `"m"` \| `"s"`

- `Orientation` = `"horizontal"` \| `"vertical"`
