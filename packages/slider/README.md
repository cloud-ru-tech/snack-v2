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

### Одиночное значение или диапазон

| Режим | Props | Когда |
|-------|-------|-------|
| Одиночный | `value` / `defaultValue` — число | Параметр «сколько» |
| Диапазон | `range`, `value` / `defaultValue` — `[number, number]` | Фильтр «от…до» |

### Метки (marks)

`marks` — объект `{ value: label }`. Ручка автоматически прилипает к значениям. Когда значения нелинейны (1, 2, 5, 10, 20, 50), включите `marksEqualSpacing`, чтобы метки распределились равномерно, а ручка всё равно отдавала реальное значение через `onChange`.

### Tooltip на ручке

`handleTip` показывает текущее значение внутри ручки — полезно для фильтров, где видна активная цифра без подписи снизу. Форматирование — `tipFormatter`.

### Do / Don't

- ✅ Короткий логичный диапазон — 5–20 шагов, чтобы пользователь мог попасть нужным движением.
- ❌ Слайдер с 1000 шагами для «точной» настройки — лучше input с числом.
- ✅ `range` для фильтров «цена от…до» — одна сущность вместо двух полей.
- ❌ Смешивать `range` и отдельные слайдеры в одной форме для того же параметра.
- ✅ `handleTip` + `tipFormatter` для денег, процентов, единиц измерения.
- ❌ Подписывать слайдер только цветом — всегда `aria-label` или связанный `<label>`.

### Установка

```bash
pnpm add @ds/slider
```

```ts
import { Slider } from '@ds/slider'
import '@ds/slider/style.css'
```

### Примеры использования

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

### States

- **`disabled`** — ручка недоступна для клавиатуры и мыши, цвет приглушён.
- **Диапазон с равными значениями** — визуально совпадает (`[40, 40]`); рекомендуется валидировать на уровне формы.

### Props

<PropsTable data={sliderDoc.Slider} />

### Storybook

<StorybookEmbed storyId='components-slider--playground' height={360} client:only="react" />

## Доступность

- Роль `slider` (от `rc-slider`), клавиатурные шорткаты: стрелки влево/вправо — шаг, Home/End — min/max.
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` проставляются автоматически.
- Для подписи используйте `aria-label` или оберните слайдер в `<label>`.
- Метки (`marks`) рендерятся как текстовые узлы под треком — читаются скринридером последовательно.
- `disabled` скрывает ручку из tab order.

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
