# Card

`@ds/card` — Корневая карточка с осями radius, view и слоем backgroundPredefined + acrylic.

`Card` — контейнер с акриловой подложкой по токену `backgroundPredefined`, state layer и контекстом `radius` для вложенного контента. Реэкспорт **`setNonce`** — из `@ds/tag`. Корневой фокус (`tabIndex={0}`) задан для согласованности с легаси; сценарии клика и навигации дорабатываются на стороне продукта.

## Когда использовать

- Плитки и превью сущностей в сетках и списках.
- Выбираемые карточки (`checked`, `multiSelect`) в режиме множественного выбора.
- Любой блок, где нужны скругления `radius`, режим `view` и согласованный акрил из `@ds/materials`.

Когда **не** нужен:

- Достаточно плоской поверхности без предустановленной заливки и state layer — рассмотрите более лёгкие обёртки.
- Нужно «стекло» без карточной рамки и модели выбора — см. **`Block`**.

## Анатомия

### Radius (default `m`)

Скругление внешнего контура:

- `s` — плотные сетки.
- `m` — базовое значение.
- `l` — крупные карточки.

| Значение | Токен  |
| -------- | ------ |
| `s`      | `RADIUS.S` |
| `m`      | `RADIUS.M` |
| `l`      | `RADIUS.L` |

### View (default `simple`)

Визуальный режим обводки и тени:

- `simple` — базовая заливка без контура и тени.
- `outline` — контур по бордеру.
- `shadow` — приподнятая тень.

| Значение  | Токен        |
| --------- | ------------ |
| `simple`  | `VIEW.Simple`  |
| `outline` | `VIEW.Outline` |
| `shadow`  | `VIEW.Shadow`  |

### Background predefined (default `neutralBackground1Level`)

Слой `backgroundPredefined` мапится на пару `data-acrylic-appearance` / `data-acrylic-level` (см. `BACKGROUND_PREDEFINED_FILL` и `_acrylic.scss` в `@ds/materials`). Меняет цвет акцента подложки, не разметку контента.

## Установка

```bash
pnpm add @ds/card
```

```ts
import { Card, RADIUS, VIEW } from '@ds/card'
```

## Примеры использования

### Радиусы

```tsx
import { Card, RADIUS, VIEW } from '@ds/card';

export function RadiusValues() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card view={VIEW.Outline} radius={RADIUS.S}>
        radius S
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.M}>
        radius M
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.L}>
        radius L
      </Card>
    </div>
  );
}
```

### Режимы view

```tsx
import { Card, VIEW } from '@ds/card';

export function ViewValues() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card view={VIEW.Simple}>simple</Card>
      <Card view={VIEW.Outline}>outline</Card>
      <Card view={VIEW.Shadow}>shadow</Card>
    </div>
  );
}
```

### Заливки backgroundPredefined

```tsx
import { Card } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

export function BackgroundFills() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}>neutralBackground1Level</Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.PrimaryBackground}>primaryBackground</Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.VioletBackground}>violetBackground</Card>
    </div>
  );
}
```

### Выбор и multiSelect

Состояние checked задаётся снаружи — типичный controlled-сценарий списка.

```tsx
import { Card } from '@ds/card';
import { useState } from 'react';

export function SelectionToggle() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card checked={checked} multiSelect>
        Множественный выбор (иконка при checked)
      </Card>
      <button type='button' onClick={() => setChecked(v => !v)}>
        {checked ? 'Снять выбор' : 'Выбрать'}
      </button>
    </div>
  );
}
```

### Недоступная карточка

```tsx
import { Card } from '@ds/card';

export function DisabledCard() {
  return <Card disabled>Состояние disabled — без hover/focus визуала интеракции</Card>;
}
```

## Props

**CardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | `neutralBackground1Level` | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> По умолчанию `material/neutralBackground1Level`. |
| `checked` | `boolean` | — |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` |  |
| `multiSelect` | `boolean` | `false` | Показ чекбокса для режима множественного выбора |
| `radius` | `"l"` \| `"m"` \| `"s"` | `m` | Радиус контейнера |
| `view` | `"outline"` \| `"shadow"` \| `"simple"` | `simple` | Визуальный режим карточки |

#### Related types

- `Radius` = `"l"` \| `"m"` \| `"s"`

- `View` = `"outline"` \| `"shadow"` \| `"simple"`

## Смотри также

- **`Block`** — акриловая поверхность без карточной модели выбора.
