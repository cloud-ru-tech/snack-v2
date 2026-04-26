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
import '@ds/pagination/style.css'
```

## Когда какой использовать

| Задача 

## Общие принципы

- **Текущая страница помечается `aria-current='page'`** — скринридер проговаривает «current page».
- **Навигация — `<nav>` c `aria-label`** — для быстрой навигации landmark'ами.
- **Размер связан с контекстом.** `Pagination` `size='s'` — в таблицах и компактных списках, `size='m'` — в лендингах. `PaginationSlider` `size='xs'` — внутри карточек, `size='s'` — в hero.

## Pagination

Постраничная навигация с нумерацией, кнопками «назад / вперёд» и свёрткой длинных диапазонов.

Классическая постраничная навигация. Рендерит `<nav aria-label="Pagination">` с кнопками «предыдущая», нумерацией страниц и «следующая». Длинные диапазоны сворачиваются через `...`-элементы, клик по которым прыгает в середину скрытого отрезка.

## Демо

## Когда использовать

- Списки, таблицы, ленты с количеством страниц 5+.
- Результаты поиска, архивы, блоги.
- Когда пользователю нужен прямой переход на конкретную страницу.

Когда **не** нужен `Pagination`: для 2–3 элементов используйте `PaginationSlider` — он плотнее и понятнее визуально.

## Для дизайнеров

### Size

| Size | Высота кнопки | Применение |
|------|---------------|------------|
| `s` | 24px | Таблицы, компактные списки — по умолчанию |
| `m` | 32px | Лендинги, широкие hero-блоки |

### Variant

| Variant | Рендер | Когда |
|---------|--------|-------|
| `button` | `<button>` | SPA-навигация с `onChange` |
| `link` | `<a href>` | SEO-friendly страницы + `hrefFormatter` |

### Truncation

`maxLength` задаёт максимальное количество элементов (кнопок страниц + break'ов) между стрелками. При превышении сохраняется первая, последняя и окно вокруг текущей страницы — пропуски рисуются кликабельными `...`-элементами.

### Do / Don't

- ✅ Один `<nav>` пагинации на список. Не дублируйте сверху и снизу, если список короткий.
- ❌ Пагинация на 3–4 страницы — лучше покажите все в одном ряду без свёртки.
- ✅ `variant='link'` + `hrefFormatter` для результатов поиска, архивов — чтобы работал «Открыть в новой вкладке» и индексация.
- ❌ `variant='link'` без `hrefFormatter` — ссылки будут без `href`.
- ✅ `size='s'` в плотных таблицах — не занимает лишнюю высоту строки.
- ❌ Смешивать `s` и `m` внутри одной страницы.

## Для разработчиков

### Установка

```bash
pnpm add @ds/pagination
```

```ts
import { Pagination } from '@ds/pagination'
import '@ds/pagination/style.css'
```

### Примеры использования

<Example title='Базовый сценарий'>
  <Pagination total={10} page={3} onChange={(page) => console.log(page)} />
</Example>

<Example title='Размер m'>
  <Pagination total={10} page={3} size='m' onChange={(page) => console.log(page)} />
</Example>

<Example title='Длинный диапазон — свёртка в середине'>
  <Pagination total={42} page={12} maxLength={7} onChange={(page) => console.log(page)} />
</Example>

<Example
  title='Как ссылки'
  description="variant='link' + hrefFormatter — каждая страница получает href"
>
  <Pagination
    total={8}
    page={2}
    variant='link'
    hrefFormatter={(page) => `?page=${page}`}
    onChange={(page) => console.log(page)}
  />
</Example>

### States

- **Первая страница** — стрелка «назад» получает `disabled`.
- **Последняя страница** — стрелка «вперёд» получает `disabled`.
- **Текущая страница** — `aria-current='page'` + визуально выделенная кнопка.
- **Break (`...`)** — кликабельная, переходит в середину скрытого диапазона и передаёт фокус на новую страницу.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `total` | `number` | — | Общее количество страниц |
| `page` | `number` | — | Текущая страница |
| `variant` | `"link"` \| `"button"` | `button` | Варианты тега кнопок: <a/> или <button/> |
| `maxLength` | `number` | `7` | Максимальное количество страниц/элементов, помещающихся до транкейта |
| `onChange` | `(page: number, event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent> | undefined) => void` | — | Колбэк смены значения |
| `hrefFormatter` | `((page: number) => string)` | — | Колбэк форматирования ссылки |
| `className` | `string` | — | CSS класснейм |
| `size` | `"s"` \| `"m"` | `s` | Размер |

### Storybook

<StorybookEmbed storyId='components-pagination-pagination--playground' height={360} client:load />

## Доступность

- Корневой контейнер — `<nav aria-label='Pagination'>` (landmark для быстрого перехода).
- Текущая страница — `aria-current='page'`.
- Нативные `<button>` и `<a>` — Enter / Space и ссылочное поведение из коробки.
- После клика по break (`...`) фокус переводится на страницу, в которую пользователя прыгнули, чтобы не терять контекст клавиатурной навигации.
- Иконки стрелок снабжены `aria-label='Previous page'` / `'Next page'`.

## PaginationSlider

Компактная точечная навигация для коротких наборов — шаги onboarding, карусели, переключение карточек.

Компактный индикатор страницы в виде ряда точек/полосок. Подходит для 3–8 однотипных элементов: шаги onboarding, карусели изображений, переключение табличных представлений.

## Демо

## Когда использовать

- Onboarding / wizard с 3–5 шагами.
- Карусель изображений.
- Навигация между карточками одного уровня.

Когда **не** подходит: если страниц больше 8 или пользователь должен прыгать на конкретную страницу — используйте `Pagination`.

## Для дизайнеров

### Size

| Size | Применение |
|------|------------|
| `xs` | Внутри карточек, плотных блоков — по умолчанию |
| `s` | Hero, full-width onboarding |

### Do / Don't

- ✅ 3–8 элементов — оптимальный диапазон.
- ❌ 15+ элементов — визуальный шум, перейдите на `Pagination`.
- ✅ Сопровождайте изменение страницы анимацией связанного контента — слайдер без контекста бесполезен.
- ❌ Использовать без `aria-label` на контейнере содержимого — скринридер не поймёт, на что именно он переключает.

## Для разработчиков

### Установка

```bash
pnpm add @ds/pagination
```

```ts
import { PaginationSlider } from '@ds/pagination'
import '@ds/pagination/style.css'
```

### Примеры использования

<Example title='Базовый сценарий'>
  <PaginationSlider total={5} page={2} onChange={(page) => console.log(page)} />
</Example>

<Example title='Размер s'>
  <PaginationSlider total={5} page={2} size='s' onChange={(page) => console.log(page)} />
</Example>

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `total` | `number` | — | Общее количество страниц |
| `page` | `number` | — | Текущая страница |
| `onChange` | `(page: number) => void` | — | Колбек смены значения |
| `className` | `string` | — | CSS класснейм |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |

### Storybook

<StorybookEmbed storyId='components-pagination-paginationslider--playground' height={240} client:load />

## Доступность

- Корневой контейнер — `<nav aria-label='Pagination slider'>`.
- Каждая точка — нативный `<button>`, Enter / Space активируют переключение.
- Активный элемент визуально выделен; для полного a11y сопровождайте его сменой `aria-current` на связанной секции контента.

## PaginationNumberItem

```tsx
import { PaginationNumberItem } from '@ds/pagination'

export function Example() {
  return <PaginationNumberItem>Click me</PaginationNumberItem>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `label` | `string | number` | — |  |
| `activated` | `boolean` | — |  |
| `onClick` | `(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void` | — |  |
| `href` | `string` | — |  |
| `setButtonRef` | `Ref<HTMLButtonElement | HTMLAnchorElement>` | — |  |

## PaginationSliderItem

```tsx
import { PaginationSliderItem } from '@ds/pagination'

export function Example() {
  return <PaginationSliderItem>Click me</PaginationSliderItem>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `activated` | `boolean` | — |  |
| `onClick` | `() => void` | — |  |
| `size` | `"xs"` \| `"s"` | — |  |
| `setButtonRef` | `Ref<HTMLButtonElement>` | — |  |
