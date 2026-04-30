# Pagination

`@ds/pagination` — Пакет пагинации — компоненты Pagination с нумерованными страницами и PaginationSlider для плотной мини-навигации.

Пакет `@ds/pagination` предоставляет два компонента для постраничной навигации по длинным спискам:

- ****Pagination**** — классическая постраничная навигация с нумерацией и свёрткой середины диапазона.
- ****PaginationSlider**** — компактный «слайдер-индикатор» страницы для коротких наборов, карточек и onboarding.

## Установка

```bash
pnpm add @ds/pagination
```

```ts
import { Pagination, PaginationSlider } from '@ds/pagination'
```

## Pagination

Постраничная навигация с нумерацией, кнопками «назад / вперёд» и свёрткой длинных диапазонов.

Классическая постраничная навигация. Рендерит `<nav aria-label="Pagination">` с кнопками «предыдущая», нумерацией страниц и «следующая». Длинные диапазоны сворачиваются через `...`-элементы, клик по которым прыгает в середину скрытого отрезка.

### Когда использовать
- Списки, таблицы, ленты с количеством страниц 5+.
- Результаты поиска, архивы, блоги.
- Когда пользователю нужен прямой переход на конкретную страницу.

Когда **не** нужен `Pagination`: для 2–3 элементов используйте `PaginationSlider` — он плотнее и понятнее визуально.

### Анатомия

#### Size
Два размера: `s` — дефолт для таблиц и списков, `m` — для более воздушных страниц.

#### Variant
`button` — элементы-кнопки (статус текущей страницы по фону, side-effect navigation), `link` — элементы-ссылки (работают с роутером, поддерживают middle-click/open-in-new-tab).

### Примеры использования
#### Базовый сценарий

```tsx
import { Pagination } from '@ds/pagination';
import { useState } from 'react';

export function Basic() {
  const [page, setPage] = useState(3);
  return <Pagination total={10} page={page} onChange={setPage} />;
}
```

#### Размер m

```tsx
import { Pagination } from '@ds/pagination';

export function SizeM() {
  return <Pagination total={10} page={3} size='m' onChange={() => {}} />;
}
```

#### Длинный диапазон — свёртка в середине

```tsx
import { Pagination } from '@ds/pagination';

export function LongRange() {
  return <Pagination total={42} page={12} maxLength={7} onChange={() => {}} />;
}
```

#### Как ссылки

variant='link' + hrefFormatter — каждая страница получает href

```tsx
import { Pagination } from '@ds/pagination';

export function AsLinks() {
  return <Pagination total={8} page={2} variant='link' hrefFormatter={page => `?page=${page}`} onChange={() => {}} />;
}
```

### Props
**PaginationProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS класснейм |
| `data-test-id` | `string` | — |  |
| `hrefFormatter` | `((page: number) => string)` | — | Колбэк форматирования ссылки |
| `maxLength` | `number` | `7` | Максимальное количество страниц/элементов, помещающихся до транкейта |
| `onChange` | `(page: number, event?: MouseEvent<HTMLButtonElement \| HTMLAnchorElement, MouseEvent> \| undefined) => void` | — | Колбэк смены значения |
| `page` | `number` | — | Текущая страница |
| `size` | `"m"` \| `"s"` | `s` | Размер |
| `total` | `number` | — | Общее количество страниц |
| `variant` | `"button"` \| `"link"` | `button` | Варианты тега кнопок: <a/> или <button/> |

##### Related types

- `PaginationSize` = `"m"` \| `"s"`

- `Variant` = `"button"` \| `"link"`

## PaginationSlider

Компактная точечная навигация для коротких наборов — шаги onboarding, карусели, переключение карточек.

Компактный индикатор страницы в виде ряда точек/полосок. Подходит для 3–8 однотипных элементов: шаги onboarding, карусели изображений, переключение табличных представлений.

### Когда использовать
- Onboarding / wizard с 3–5 шагами.
- Карусель изображений.
- Навигация между карточками одного уровня.

Когда **не** подходит: если страниц больше 8 или пользователь должен прыгать на конкретную страницу — используйте `Pagination`.

### Анатомия

#### Size
`xs` — компактные карусели и плотные onboarding-шаги; `s` — дефолт для карточек и больших слайдеров.

### Примеры использования
#### Базовый сценарий

```tsx
import { PaginationSlider } from '@ds/pagination';
import { useState } from 'react';

export function SliderBasic() {
  const [page, setPage] = useState(2);
  return <PaginationSlider total={5} page={page} onChange={setPage} />;
}
```

#### Размер s

```tsx
import { PaginationSlider } from '@ds/pagination';

export function SliderSizeS() {
  return <PaginationSlider total={5} page={2} size='s' onChange={() => {}} />;
}
```

### Props
**PaginationSliderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS класснейм |
| `data-test-id` | `string` | — |  |
| `onChange` | `(page: number) => void` | — | Колбек смены значения |
| `page` | `number` | — | Текущая страница |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `total` | `number` | — | Общее количество страниц |

##### Related types

- `PaginationSliderSize` = `"s"` \| `"xs"`
