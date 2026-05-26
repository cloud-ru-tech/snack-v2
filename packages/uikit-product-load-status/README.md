# LoadStatus

`@ds/uikit-product-load-status` — Строка статуса загрузки с линейным progress bar, заголовком и подсказкой — по макету Figma loadStatus.

Строка загрузки: опциональный заголовок (метка, значение, процент), линейный **`ProgressBar`** и подсказка снизу. Цвет полосы — через `appearanceByProgress`; ошибка — `showError` (полоса `red`).

## Когда использовать

- В карточках и формах, где нужно показать прогресс операции с поясняющим текстом.
- Когда нужны пороги заполнения или фиксированный цвет полосы (`appearanceByProgress`).
- Когда операция завершилась с ошибкой (`showError`).

Когда **не** нужен `LoadStatus`:

- Только индикатор без подписей — используйте **`ProgressBar`**.
- Неопределённая загрузка страницы — **`ProgressBarPage`**.

## Анатомия

### Size (default `s`)

Ось Figma `size`, прокидывается в `@ds/progress-bar`:

- `s` — основной размер в формах и карточках.
- `xs` — компактные списки и плотные layout'ы.

### appearanceByProgress (default `DEFAULT_APPEARANCE_BY_PROGRESS`)

Цвет полосы: список правил `{ condition, limit, appearance }` (`eq` / `gt` / `gte` / `lt` / `lte`). Первое сработавшее правило задаёт цвет. Значения `appearance` — из `@ds/progress-bar`: `primary`, `neutral`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink`, `red`.

Дефолт — зелёный / жёлтый / красный по порогам 70 / 90 / 100. Фиксированный цвет из макета (ось Figma `appearance`) — одно правило, например `lte: 100` с нужным `appearance`.

### showError (default `false`)

Ось Figma `showError`:

- `false` — цвет полосы из `appearanceByProgress`.
- `true` — полоса всегда `red`, перекрывает `appearanceByProgress`. В hint обычно показывают иконку (`showErrorIcon`).

### Контент

Видимость блоков — по truthiness props (boolean-оси `showLabel` / `showValue` / `showHint` / `showPercent` в Figma только для Dev Mode):

- `label` — основной текст слева в заголовке.
- `value` — дополнение рядом с `label`.
- `valueType` — `none` или `percent`; при `percent` справа выводится `{progress}%` (два текстовых слоя в макете: число и `%`).
- `hint` — подпись под полосой; при `showErrorIcon` слева — `NotifierCriticalFilled` 16px.
- `progress` — значение 0–100 для полосы и процента в заголовке.

## Установка

```bash
pnpm add @ds/uikit-product-load-status
```

```ts
import { LoadStatus } from '@ds/uikit-product-load-status'
```

## Примеры использования

### Процент в заголовке

```tsx
import { LoadStatus } from '@ds/uikit-product-load-status';

export function WithPercent() {
  return <LoadStatus label='Загрузка' progress={72} valueType='percent' />;
}
```

### Фиксированный цвет полосы

Одно правило в `appearanceByProgress` — цвет не зависит от `progress` (0–100).

```tsx
import { APPEARANCE } from '@ds/progress-bar';
import { LoadStatus, PROGRESS_LIMIT_CONDITION } from '@ds/uikit-product-load-status';

export function WithAppearance() {
  return (
    <LoadStatus
      label='Загрузка'
      progress={65}
      valueType='percent'
      hint='Статичный цвет полосы'
      appearanceByProgress={[
        { condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100, appearance: APPEARANCE.Green },
      ]}
    />
  );
}
```

### Ошибка (showError)

Красная полоса и иконка в hint — нужны `showError`, `showErrorIcon` и непустой `hint`.

```tsx
import { LoadStatus } from '@ds/uikit-product-load-status';

export function WithHintError() {
  return (
    <LoadStatus
      label='Загрузка'
      value='Ошибка'
      progress={35}
      valueType='percent'
      hint='Не удалось завершить операцию'
      showError
      showErrorIcon
    />
  );
}
```

### Пороги progress

Цвет полосы по умолчанию меняется через `appearanceByProgress`.

```tsx
import { LoadStatus } from '@ds/uikit-product-load-status';

export function Thresholds() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <LoadStatus label='Низкий' progress={40} valueType='percent' />
      <LoadStatus label='Средний' progress={75} valueType='percent' />
      <LoadStatus label='Высокий' progress={95} valueType='percent' />
    </div>
  );
}
```

## Props

**LoadStatusProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearanceByProgress` | `ProgressLimitList` | `[   { appearance: 'green', condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 70 },   { appearance: 'yellow', condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 90 },   { appearance: 'red', condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100 }, ] satisfies ProgressLimitList` | Правила смены цвета полосы в зависимости от `progress`; при `showError` игнорируются |
| `className` | `string` | — | CSS-класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `hint` | `string` | — | Подсказка под полосой прогресса |
| `label` | `string` | — | Заголовок строки загрузки |
| `progress` | `number` | — | Процент загрузки от 0 до 100 |
| `showError` | `boolean` | — | Ошибка: полоса `red` (ось Figma `showError`) |
| `showErrorIcon` | `boolean` | — | Иконка в hint; показывается при `hint` и вместе с `showError` по макету |
| `size` | `"s"` \| `"xs"` | `s` | Размер |
| `value` | `string` | — | Дополнительный текст в заголовке (рядом с label) |
| `valueType` | `"none"` \| `"percent"` | `none` | Формат значения в заголовке: без процента (`none`) или с процентом (`percent`) |

#### Related types

- `LoadValueType` = `"none"` \| `"percent"`

- `ProgressLimitList` = `ProgressLimit[]`
