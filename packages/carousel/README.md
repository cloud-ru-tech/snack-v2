# Carousel

`@ds/carousel` — Компонент горизонтальной прокрутки слайдов — стрелки, пагинация, свайп, автопрокрутка, infinite scroll и multi-item отображение.

Горизонтальная прокрутка слайдов. Принимает `children` как массив React-элементов и управляет переключением через стрелки, пагинацию и свайп. Поддерживает `infiniteScroll`, `autoSwipe`, несколько элементов в viewport (`showItems`) и управляемый режим (`state`).

## Демо
<CarouselDemo client:visible />

## Когда использовать
- Галереи изображений и медиа.
- Онбординг с несколькими шагами.
- Секции «Похожие товары», «Недавние проекты» — несколько карточек в viewport (`showItems > 1`).

Когда **не** нужен: для табличных данных (используйте `@ds/tabs`), для форм (обычная вертикальная прокрутка), для длинных списков (виртуализация).

### Controls visibility
Режим отображения стрелок и пагинации: `hover` — элементы управления проявляются по наведению (чище в галереях), `always` — видны всегда (рекомендуется для touch и для onboarding).

## Установка
```bash
pnpm add @ds/carousel
```

```ts
import { Carousel } from '@ds/carousel'
```

## Примеры использования
<Example title='1. Базовая карусель' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example
  title='2. Три элемента в viewport'
  description='showItems=3, кастомный gap'
  code={ThreePerViewSrc}
>
  <ThreePerView client:visible />
</Example>

<Example
  title='3. Бесконечная с автопрокруткой'
  description='infiniteScroll + autoSwipe=3 секунды на слайд'
  code={InfiniteSrc}
>
  <Infinite client:visible />
</Example>

## Props
<PropsTable data={carouselDoc.Carousel} />

## Storybook
<StorybookEmbed storyId='components-carousel--playground' height={400} />

## Carousel

```tsx
import { Carousel } from '@ds/carousel'

export function Example() {
  return <Carousel showItems="1" scrollBy="Math.trunc(show)" transition="0.4" swipe swipeActivateLength="48" arrows pagination gap="var(--dimension-2m)" controlsVisibility="hover">Click me</Carousel>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS - класснейм |
| `children` | `ReactElement<any, string | JSXElementConstructor<any>>[]` | — | Массив айтемов |
| `showItems` | `number` | `1` | Кол-во отображаемых единовременно айтемов |
| `scrollBy` | `number` | `Math.trunc(show)` | Сдвиг айтемов при смене 1 страницы |
| `transition` | `number` | `0.4` | Время переключения 1 страницы (в s) |
| `swipe` | `boolean` | `true` | Переключение страниц свайпом |
| `autoSwipe` | `number` | — | Автоматическое переключение слайдов в секундах |
| `swipeActivateLength` | `number` | `48` | Минимальная длина в px для активации свайпа |
| `arrows` | `boolean` | `true` | Использовать стрелки для переключения страниц |
| `pagination` | `boolean` | `true` | Использовать пагинацию для переключения страниц |
| `gap` | `string` | `var(--dimension-2m)` | Расстояние между айтемами |
| `state` | `{ page: number; onChange(page: number): void; }` | — | Управление состоянием извне |
| `infiniteScroll` | `boolean` | `false` | Цикличная прокрутка |
| `controlsVisibility` | `"hover"` \| `"always"` | `hover` | Управление видимостью стрелок: 'hover' — по ховеру, 'always' — всегда |

## Control

```tsx
import { Control } from '@ds/carousel'

export function Example() {
  return <Control>Click me</Control>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onClick` | `(() => void)` | — |  |
| `direction` | `"prev"` \| `"next"` | — |  |
| `className` | `string` | — |  |

## ItemProvider

```tsx
import { ItemProvider } from '@ds/carousel'

export function Example() {
  return <ItemProvider>Click me</ItemProvider>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showItems` | `number` | — |  |
| `scrollBy` | `number` | — |  |
| `slideCallback` | `(direction: number) => void` | — |  |
| `transition` | `number` | — |  |
| `swipe` | `boolean` | — |  |
| `swipeActivateLength` | `number` | — |  |
| `page` | `number` | — |  |
| `gap` | `string` | — |  |
