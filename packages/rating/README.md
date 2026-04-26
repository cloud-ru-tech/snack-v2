# Rating

`@ds/rating` — Звёздный рейтинг — интерактивный ввод и отображение оценки. Поддерживает половинные звёзды, цветовые схемы и readonly-режим.

Компонент звёздного рейтинга. Поддерживает интерактивный ввод оценки, режим «только для чтения», половинные звёзды (`allowHalf`) и сброс значения по повторному клику (`allowClear`). Поведение по умолчанию — неконтролируемое с `defaultValue`; для контролируемого использования передайте `value` + `onChange`.

## Когда использовать
- Оценка сущности пользователем: отзыв о товаре, качестве услуги, контента.
- Отображение агрегированного рейтинга в readonly-режиме (карточка товара, профиль исполнителя).

Когда **не** нужен: многокритериальная оценка (несколько факторов) — стройте форму с несколькими `Rating` или отдельным UI. NPS-шкала 0–10 — используйте другой компонент.

### Appearance
Цвет заполненных звёзд: `primary` — брендовый акцент (дефолт); `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink` — семантические/декоративные варианты под контекст.

### Size
`xs` — плотные карточки и строки списков; `s` — дефолт для форм отзывов и профилей.

## Установка
```bash
pnpm add @ds/rating
```

```ts
import { Rating } from '@ds/rating'
```

## Примеры использования
<Example title='Базовый рейтинг' description='5 звёзд, дефолтное значение 3.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Readonly' description='Для отображения агрегированной оценки.' code={ReadonlySrc}>
  <Readonly client:visible />
</Example>

<Example title='Половинные звёзды' description='allowHalf=true — поддержка значений 0.5 / 1.0 / 1.5 и т.д.' code={HalfStarsSrc}>
  <HalfStars client:visible />
</Example>

## Props
<PropsTable data={ratingDoc.Rating} />

## Storybook
<StorybookEmbed storyId='components-rating--playground' height={240} />

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
