# Card

`@ds/card` — Корневая карточка с осями radius, view и слоем backgroundPredefined + acrylic.

`Card` — контейнер с акриловой подложкой по токену `backgroundPredefined`, accent-state-layer для `checked` и контекстом `radius` для вложенного контента. По умолчанию интерактивный (`cursor: pointer`, focus-ring, hover-elevation для `view='simple'`/`'elevated'`, hovered-border для `view='outline'`); для презентационных карточек без отклика на курсор передайте `interactive={false}`. Внутренний padding не задаётся — отступы расставляет потребитель.

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

- `simple` — плоская карточка без контура и тени; на hover поднимается через `elevation-level3`.
- `outline` — контур по бордеру `regular/default/borderColor`; на hover темнеет до `regular/hovered/borderColor`, тень не добавляется.
- `elevated` — приподнятая тень `elevation-level2`; на hover повышается до `elevation-level3`.

| Значение  | Токен        |
| --------- | ------------ |
| `simple`  | `VIEW.Simple`  |
| `outline` | `VIEW.Outline` |
| `elevated` | `VIEW.Elevated` |

### Background predefined (default `neutralBackground1Level`)

Слой `backgroundPredefined` мапится на пару `data-acrylic-appearance` / `data-acrylic-level` (см. `BACKGROUND_PREDEFINED_FILL` и `_acrylic.scss` в `@ds/materials`). Меняет цвет акцента подложки, не разметку контента.

### Checked (default `false`)

Активирует accent-state-layer (`material/stateLayer/activated/default/filled`) поверх фона, меняет цвет бордера на `primary/accent` и — при `multiSelect={true}` — рисует check-badge в верхнем левом углу. На hover state-layer переключается на `activated/hovered/filled` (35% opacity).

Без `checked` state-layer не рендерится — hover в unchecked-состоянии показывается только через изменение elevation/border (см. `View`).

### Interactive (default `true`)

Управляет реакцией карточки на курсор и клавиатуру:

- `true` — `cursor: pointer`, `tabIndex={0}`, активен focus-ring (`outline complementary 2px`), hover-эффекты для view (elevation / border-color).
- `false` — `cursor: default`, `tabIndex={-1}`, без focus-ring и hover-эффектов. Для презентационных карточек, которые показывают данные, но не реагируют на курсор.

### Padding

Внутренний padding не зашит в стили — расставляйте отступы сами на дочернем контейнере. Это даёт свободу: разные части карточки (image edge-to-edge, текстовая зона с отступом) спокойно сосуществуют без переопределений.

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
        <div style={{ padding: 8 }}>radius S</div>
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.M}>
        <div style={{ padding: 8 }}>radius M</div>
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.L}>
        <div style={{ padding: 8 }}>radius L</div>
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
      <Card view={VIEW.Simple}>
        <div style={{ padding: 8 }}>simple</div>
      </Card>
      <Card view={VIEW.Outline}>
        <div style={{ padding: 8 }}>outline</div>
      </Card>
      <Card view={VIEW.Elevated}>
        <div style={{ padding: 8 }}>elevated</div>
      </Card>
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
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}>
        <div style={{ padding: 8 }}>neutralBackground1Level</div>
      </Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.PrimaryBackground}>
        <div style={{ padding: 8 }}>primaryBackground</div>
      </Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.VioletBackground}>
        <div style={{ padding: 8 }}>violetBackground</div>
      </Card>
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
        <div style={{ padding: 8 }}>Множественный выбор (иконка при checked)</div>
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
  return (
    <Card disabled>
      <div style={{ padding: 8 }}>Состояние disabled — без hover/focus визуала интеракции</div>
    </Card>
  );
}
```

## Props

**CardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — |  |
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | `neutralBackground1Level` | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> По умолчанию `material/neutralBackground1Level`. |
| `checked` | `boolean` | — | Выбран (для multiSelect — показывает чек-бэйдж в углу). |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `disabled` | `boolean` | `false` | Заблокированный режим: интерактив отключён, opacity снижен. |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `interactive` | `boolean` | `true` | Включает интерактивные эффекты (hover/press state layer, cursor: pointer, focus-ring). <br/> Установи `false` для презентационной карточки без отклика на курсор. |
| `multiSelect` | `boolean` | `false` | Режим множественного выбора — добавляет чек-бэйдж в углу при `checked`. |
| `radius` | `"l"` \| `"m"` \| `"s"` | `m` | Радиус контейнера. |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | `simple` | Визуальный режим карточки. |

#### Related types

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `Radius` = `"l"` \| `"m"` \| `"s"`

- `View` = `"elevated"` \| `"outline"` \| `"simple"`

## Смотри также

- **`Block`** — акриловая поверхность без карточной модели выбора.
