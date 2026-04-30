# Slider

`@ds/slider` — Ползунок для выбора числового значения или диапазона — с метками, tooltip на ручке и опциональным равномерным распределением нелинейных значений.

Ползунок для выбора одного значения или диапазона `[min, max]`. Поверх `rc-slider` — те же клавиатурные шорткаты и семантика, но с токенами дизайн-системы и расширениями: `handleTip` с форматированием и `marksEqualSpacing` для нелинейных наборов значений.

## Когда использовать
- Выбор числового параметра в известном диапазоне: цена, громкость, приоритет.
- Фильтры «от…до» (`range`).
- Управление параметрами, где ценно видеть относительное положение (например, прозрачность).

Когда **не** стоит: точный ввод числа (лучше `InputNumber`), бинарные переключения (`Switch`), выбор из дискретных вариантов без порядка (`RadioGroup`).

## Установка
```bash
pnpm add @ds/slider
```

```ts
import { Slider } from '@ds/slider'
```

## Примеры использования
### Базовый слайдер

Одно значение, без меток

```tsx
import { Slider } from '@ds/slider';

export function Basic() {
  return <Slider min={0} max={100} defaultValue={40} />;
}
```

### Диапазон

range + handleTip — видно оба значения

```tsx
import { Slider } from '@ds/slider';

export function Range() {
  return <Slider range min={0} max={100} defaultValue={[20, 70]} handleTip />;
}
```

### С метками

```tsx
import { Slider } from '@ds/slider';

export function Marks() {
  return (
    <Slider
      min={0}
      max={100}
      step={25}
      marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }}
      defaultValue={50}
      handleTip
    />
  );
}
```

### Disabled

```tsx
import { Slider } from '@ds/slider';

export function Disabled() {
  return <Slider min={0} max={100} defaultValue={40} disabled />;
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeHandleRender` | `((origin: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>, props: RenderProps) => React.ReactElement) | undefined` | — |  |
| `allowCross` | `boolean | undefined` | — |  |
| `ariaLabelForHandle` | `string | string[] | undefined` | — |  |
| `ariaLabelledByForHandle` | `string | string[] | undefined` | — |  |
| `ariaRequired` | `boolean | undefined` | — |  |
| `ariaValueTextFormatterForHandle` | `AriaValueFormat | AriaValueFormat[] | undefined` | — |  |
| `autoFocus` | `boolean | undefined` | — |  |
| `className` | `string | undefined` | — |  |
| `count` | `number | undefined` | — |  |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
| `defaultValue` | `number | number[] | undefined` | — |  |
| `disabled` | `boolean | undefined` | — |  |
| `dots` | `boolean | undefined` | — |  |
| `handleTip` | `boolean` | — | Показывать значение в тултипе на ручке |
| `id` | `string | undefined` | — |  |
| `included` | `boolean | undefined` | — |  |
| `keyboard` | `boolean | undefined` | — |  |
| `marks` | `Record<string | number, React.ReactNode | MarkObj> | undefined` | — |  |
| `marksEqualSpacing` | `boolean` | — | Включение равномерного распределения при нелинейных значениях меток. |
| `max` | `number | undefined` | — |  |
| `min` | `number | undefined` | — |  |
| `onAfterChange` | `((value: number | number[]) => void) | undefined` | — |  |
| `onBeforeChange` | `((value: number | number[]) => void) | undefined` | — |  |
| `onBlur` | `((e: React.FocusEvent<HTMLDivElement>) => void) | undefined` | — |  |
| `onChange` | `((value: number | number[]) => void) | undefined` | — |  |
| `onChangeComplete` | `((value: number | number[]) => void) | undefined` | — |  |
| `onFocus` | `((e: React.FocusEvent<HTMLDivElement>) => void) | undefined` | — |  |
| `pushable` | `number | boolean | undefined` | — |  |
| `range` | `boolean | RangeConfig | undefined` | — |  |
| `reverse` | `boolean | undefined` | — |  |
| `startPoint` | `number | undefined` | — |  |
| `step` | `number | null | undefined` | — |  |
| `tabIndex` | `number | number[] | undefined` | — |  |
| `tipFormatter` | `((value: string | number) => ReactNode)` | — | Форматирование подсказки; по умолчанию — сырое значение |
| `track` | `boolean | undefined` | — |  |
| `value` | `number | number[] | undefined` | — |  |
