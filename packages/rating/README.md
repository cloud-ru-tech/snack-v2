# Rating

`@ds/rating` — Звёздный рейтинг — интерактивный ввод и отображение оценки. Поддерживает половинные звёзды, цветовые схемы и readonly-режим.

Компонент звёздного рейтинга. Поддерживает интерактивный ввод оценки, режим «только для чтения», половинные звёзды (`allowHalf`) и сброс значения по повторному клику (`allowClear`). Поведение по умолчанию — неконтролируемое с `defaultValue`; для контролируемого использования передайте `value` + `onChange`.

## Когда использовать

- Оценка сущности пользователем: отзыв о товаре, качестве услуги, контента.
- Отображение агрегированного рейтинга в readonly-режиме (карточка товара, профиль исполнителя).

Когда **не** нужен: многокритериальная оценка (несколько факторов) — стройте форму с несколькими `Rating` или отдельным UI. NPS-шкала 0–10 — используйте другой компонент.

### Size

| Size | Применение |
|------|------------|
| `xs` | В плотных списках, в таблице |
| `s` | Значение по умолчанию — форма отзыва, карточка товара |

### Appearance

Восемь цветовых схем: `primary`, `red`, `orange`, `yellow` (по умолчанию), `green`, `blue`, `violet`, `pink`. `yellow` — классические жёлтые звёзды; остальные — для визуального брендинга или семантики (например, `green` для положительного фидбэка).

### Half stars

`allowHalf` включает половинные звёзды. Клик в левую половину — `0.5`, в правую — `1.0`. Удобно для отображения агрегированных оценок (3.5/5) и для более точного пользовательского ввода.

### Do / Don't

- ✅ Readonly-режим для отображения агрегированной оценки — пользователь не ждёт, что сможет кликнуть.
- ❌ Показывать интерактивный рейтинг там, где пользователь не может оценивать.
- ✅ 5 звёзд — устоявшийся стандарт, не меняйте без веской причины.
- ❌ 10 звёзд — воспринимается хуже, чем слайдер или числовой ввод.
- ✅ `allowClear` на форме отзыва — пользователь может передумать.
- ❌ `allowClear` на агрегированной оценке readonly.

### Установка

```bash
pnpm add @ds/rating
```

```ts
import { Rating } from '@ds/rating'
import '@ds/rating/style.css'
```

### Примеры использования

<Example title='Базовый рейтинг' description='5 звёзд, дефолтное значение 3.' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='Readonly' description='Для отображения агрегированной оценки.' code={ReadonlySrc}>
  <Readonly client:load />
</Example>

<Example title='Половинные звёзды' description='allowHalf=true — поддержка значений 0.5 / 1.0 / 1.5 и т.д.' code={HalfStarsSrc}>
  <HalfStars client:load />
</Example>

### Контролируемое использование

```tsx
function RatingForm() {
  const [value, setValue] = useState(0)
  return (
    <Rating
      count={5}
      value={value}
      onChange={setValue}
      allowHalf
      allowClear
      readonly={false}
    />
  )
}
```

### Props

<PropsTable data={ratingDoc.Rating} />

### Storybook

<StorybookEmbed storyId='components-rating--playground' height={240} client:load />

## Доступность

- Каждая звезда — интерактивная зона с поддержкой клавиатуры: Enter/Space меняют значение.
- Для контролируемого использования пробрасывайте `aria-label` через обёртку (например, «Оцените товар от 1 до 5»).
- В readonly-режиме клики и клавиатурные события не обрабатываются — компонент ведёт себя как декоративное представление значения.
- Цвет звезды (`yellow` и др.) не является единственным носителем смысла — число заполненных звёзд передаёт оценку.

## Rating

```tsx
import { Rating } from '@ds/rating'

export function Example() {
  return <Rating appearance="yellow" count="5" defaultValue="0">Click me</Rating>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `size` | `"xs"` \| `"s"` | `s` | Размер |
| `appearance` | `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `yellow` | Внешний вид (цветовая схема) |
| `count` | `number` | `5` | Общее количество звезд |
| `value` | `number` | — | Значение количества звезд в случае необходимости управления |
| `defaultValue` | `number` | `0` | Количество звезд, заполненных по умолчанию |
| `allowHalf` | `boolean` | `false` | Показывать или нет рейтинг в виде половины звезды |
| `allowClear` | `boolean` | `false` | Разрещает сброс рейтинга при повторном нажатии на звезду |
| `readonly` | `boolean` | `false` | Является ли поле доступным на изменение |
| `onChange` | `((value: number) => void)` | — | Колбек, вызываемый на смену состояния |
| `className` | `string` | — | CSS-класс |

## RatingStar

```tsx
import { RatingStar } from '@ds/rating'

export function Example() {
  return <RatingStar value="0%" appearance="yellow">Click me</RatingStar>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `"0%"` \| `"50%"` \| `"100%"` | `0%` | Значение |
| `size` | `"xs"` \| `"s"` | `s` | Размер |
| `appearance` | `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `yellow` | Внешний вид (цветовая схема) |
| `readonly` | `boolean` | `false` | Является ли поле доступным на изменение |
| `className` | `string` | — | CSS-класс |
| `handleMouseEnter` | `((value: Value) => void)` | — | Действие при наведении мыши |
| `handleMouseLeave` | `(() => void)` | — | Действие при уведении мыши |
| `handleKeyDown` | `KeyboardEventHandler<HTMLDivElement>` | — | Действие при нажатии на клавишу клавиатуры |
| `handleClick` | `((value: Value) => void)` | — | Действие при клике части звезды мышью |
