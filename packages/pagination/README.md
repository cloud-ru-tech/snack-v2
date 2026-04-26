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

## Демо
<PaginationDemo client:visible />

## Когда использовать
- Списки, таблицы, ленты с количеством страниц 5+.
- Результаты поиска, архивы, блоги.
- Когда пользователю нужен прямой переход на конкретную страницу.

Когда **не** нужен `Pagination`: для 2–3 элементов используйте `PaginationSlider` — он плотнее и понятнее визуально.

## Анатомия

### Size
Два размера: `s` — дефолт для таблиц и списков, `m` — для более воздушных страниц.

### Variant
`button` — элементы-кнопки (статус текущей страницы по фону, side-effect navigation), `link` — элементы-ссылки (работают с роутером, поддерживают middle-click/open-in-new-tab).

## Установка
```bash
pnpm add @ds/pagination
```

```ts
import { Pagination } from '@ds/pagination'
```

## Примеры использования
<Example title='Базовый сценарий' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Размер m' code={SizeMSrc}>
  <SizeM client:visible />
</Example>

<Example title='Длинный диапазон — свёртка в середине' code={LongRangeSrc}>
  <LongRange client:visible />
</Example>

<Example
  title='Как ссылки'
  description="variant='link' + hrefFormatter — каждая страница получает href"
  code={AsLinksSrc}
>
  <AsLinks client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-pagination-pagination--playground' height={360} />

## PaginationSlider

Компактная точечная навигация для коротких наборов — шаги onboarding, карусели, переключение карточек.

Компактный индикатор страницы в виде ряда точек/полосок. Подходит для 3–8 однотипных элементов: шаги onboarding, карусели изображений, переключение табличных представлений.

## Демо
<PaginationSliderDemo client:visible />

## Когда использовать
- Onboarding / wizard с 3–5 шагами.
- Карусель изображений.
- Навигация между карточками одного уровня.

Когда **не** подходит: если страниц больше 8 или пользователь должен прыгать на конкретную страницу — используйте `Pagination`.

## Анатомия

### Size
`xs` — компактные карусели и плотные onboarding-шаги; `s` — дефолт для карточек и больших слайдеров.

## Установка
```bash
pnpm add @ds/pagination
```

```ts
import { PaginationSlider } from '@ds/pagination'
```

## Примеры использования
<Example title='Базовый сценарий' code={SliderBasicSrc}>
  <SliderBasic client:visible />
</Example>

<Example title='Размер s' code={SliderSizeSSrc}>
  <SliderSizeS client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `total` | `number` | — | Общее количество страниц |
| `page` | `number` | — | Текущая страница |
| `onChange` | `(page: number) => void` | — | Колбек смены значения |
| `className` | `string` | — | CSS класснейм |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |

## Storybook
<StorybookEmbed storyId='components-pagination-paginationslider--playground' height={240} />

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
