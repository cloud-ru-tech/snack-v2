# Rating

`@ds/rating` — Звёздный рейтинг — интерактивный ввод и отображение оценки. Поддерживает половинные звёзды, цветовые схемы и readonly-режим.

Компонент звёздного рейтинга. Поддерживает интерактивный ввод оценки, режим «только для чтения», половинные звёзды (`allowHalf`) и сброс значения по повторному клику (`allowClear`). Поведение по умолчанию — неконтролируемое с `defaultValue`; для контролируемого использования передайте `value` + `onChange`.

## Когда использовать
- Оценка сущности пользователем: отзыв о товаре, качестве услуги, контента.
- Отображение агрегированного рейтинга в readonly-режиме (карточка товара, профиль исполнителя).

Когда **не** нужен: многокритериальная оценка (несколько факторов) — стройте форму с несколькими `Rating` или отдельным UI. NPS-шкала 0–10 — используйте другой компонент.

## Анатомия

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
### Базовый рейтинг

5 звёзд, дефолтное значение 3.

```tsx
import { Rating } from '@ds/rating';

export function Basic() {
  return <Rating count={5} defaultValue={3} allowHalf={false} allowClear={false} readonly={false} />;
}
```

### Readonly

Для отображения агрегированной оценки.

```tsx
import { Rating } from '@ds/rating';

export function Readonly() {
  return <Rating count={5} defaultValue={4} readonly allowHalf={false} allowClear={false} />;
}
```

### Половинные звёзды

allowHalf=true — поддержка значений 0.5 / 1.0 / 1.5 и т.д.

```tsx
import { Rating } from '@ds/rating';

export function HalfStars() {
  return <Rating count={5} defaultValue={3.5} allowHalf allowClear={false} readonly={false} />;
}
```

## Props
**RatingProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowClear` | `boolean` | `false` | Разрещает сброс рейтинга при повторном нажатии на звезду |
| `allowHalf` | `boolean` | `false` | Показывать или нет рейтинг в виде половины звезды |
| `appearance` | `"blue"` \| `"green"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `yellow` | Внешний вид (цветовая схема) |
| `className` | `string` | — | CSS-класс |
| `count` | `number` | `5` | Общее количество звезд |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `number` | `0` | Количество звезд, заполненных по умолчанию |
| `onChange` | `((value: number) => void)` | — | Колбек, вызываемый на смену состояния |
| `readonly` | `boolean` | `false` | Является ли поле доступным на изменение |
| `size` | `"s"` \| `"xs"` | `s` | Размер |
| `value` | `number` | — | Значение количества звезд в случае необходимости управления |

#### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `Size` = `"s"` \| `"xs"`
