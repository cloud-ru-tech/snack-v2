# Slider

`@ds/slider` — Ползунок для выбора числового значения или диапазона — с метками, tooltip на ручке и опциональным равномерным распределением нелинейных значений.

Ползунок для выбора одного значения или диапазона `[min, max]`. Поверх `rc-slider` — те же клавиатурные шорткаты и семантика, но с токенами дизайн-системы и расширениями: `handleTip` с форматированием и `marksEqualSpacing` для нелинейных наборов значений.

## Демо
<SliderDemo client:only="react" />

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
<Example title='Базовый слайдер' description='Одно значение, без меток' code={BasicSrc}>
  <Basic client:only="react" />
</Example>

<Example title='Диапазон' description="range + handleTip — видно оба значения" code={RangeSrc}>
  <Range client:only="react" />
</Example>

<Example title='С метками' code={MarksSrc}>
  <Marks client:only="react" />
</Example>

<Example title='Disabled' code={DisabledSrc}>
  <Disabled client:only="react" />
</Example>

## Props
<PropsTable data={sliderDoc.Slider} />

## Storybook
<StorybookEmbed storyId='components-slider--playground' height={360} />

## getSortedMarkValues

```tsx
import { getSortedMarkValues } from '@ds/slider'

export function Example() {
  return <getSortedMarkValues>Click me</getSortedMarkValues>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## Slider

```tsx
import { Slider } from '@ds/slider'

export function Example() {
  return <Slider>Click me</Slider>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `handleTip` | `boolean` | — | Показывать значение в тултипе на ручке |
| `tipFormatter` | `((value: string | number) => ReactNode)` | — | Форматирование подсказки; по умолчанию — сырое значение |
| `marksEqualSpacing` | `boolean` | — | Включение равномерного распределения при нелинейных значениях меток. |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
