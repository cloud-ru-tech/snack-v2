# Slider

Горизонтальный слайдер значения или диапазона с опциональной шкалой.

## Installation

```bash
npm install @design-system/slider
# or
yarn add @design-system/slider
# or
pnpm add @design-system/slider
```

## Exports



## Live examples

### Со шкалой (single)

```tsx
import { SliderLiveExampleShell, SliderSingleWithMarksExample } from '@design-system/slider';

<SliderLiveExampleShell>
<SliderSingleWithMarksExample client:only='react' />
</SliderLiveExampleShell>
```

### Диапазон (range)

```tsx
import { SliderLiveExampleShell, SliderRangeWithMarksExample } from '@design-system/slider';

<SliderLiveExampleShell>
<SliderRangeWithMarksExample client:only='react' />
</SliderLiveExampleShell>
```

### Подсказка на ручке

```tsx
import { SliderHandleTipExample, SliderLiveExampleShell } from '@design-system/slider';

<SliderLiveExampleShell>
<SliderHandleTipExample client:only='react' />
</SliderLiveExampleShell>
```

### Равные интервалы шкалы (`marksEqualSpacing`)

```tsx
import { SliderLiveExampleShell, SliderMarksEqualSpacingComparisonExample } from '@design-system/slider';

Для нелинейных значений меток (например 1, 2, 4, 8…) можно визуально распределить подписи **равномерно** по ширине трека. В `value` / `onChange` по-прежнему приходят те же числа, что в ключах `marks`. Сравнение с обычной линейной осью:
<SliderLiveExampleShell>
<SliderMarksEqualSpacingComparisonExample client:only='react' />
</SliderLiveExampleShell>
```


## Usage

### Со шкалой (single)

```tsx
import { Slider } from '@design-system/slider';

const marks = { 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' };

export function Example() {
  return <Slider min={10} max={50} step={10} defaultValue={30} marks={marks} />;
}
```

### Range

```tsx
import { Slider } from '@design-system/slider';

const marks = { 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' };

export function RangeExample() {
  return <Slider range min={10} max={50} step={10} defaultValue={[20, 40]} marks={marks} />;
}
```

### Подсказка на ручке

```tsx
<Slider handleTip tipFormatter={v => `${v} мин`} min={0} max={100} defaultValue={50} />
```

## Props

### SliderProps
| name | type | default value | description |
|------|------|---------------|-------------|
| handleTip | `boolean` | - | Показывать значение в тултипе на ручке |
| tipFormatter | `(value: string \| number) => ReactNode` | - | Форматирование подсказки; по умолчанию — сырое значение |
| marksEqualSpacing | `boolean` | - | Включение равномерного распределения при нелинейных значениях меток. |

## Best Practices

1. **Шкала** — передавайте `marks`, когда нужны подписи шагов; `min`/`max`/`step` должны быть согласованы с ключами `marks` (кроме режима `marksEqualSpacing`, где ось внутри индексная).
2. **Контролируемый режим** — используйте `value` и `onChange` для синхронизации с состоянием формы.
3. **`marksEqualSpacing`** — включайте, когда нужны равные визуальные интервалы при нелинейных значениях меток; наружу по-прежнему отдавайте доменные числа из `marks`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
