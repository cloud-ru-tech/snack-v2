# Carousel

`@ds/carousel` — Компонент горизонтальной прокрутки слайдов — стрелки, пагинация, свайп, автопрокрутка, infinite scroll и multi-item отображение.

Горизонтальная прокрутка слайдов. Принимает `children` как массив React-элементов и управляет переключением через стрелки, пагинацию и свайп. Поддерживает `infiniteScroll`, `autoSwipe`, несколько элементов в viewport (`showItems`) и управляемый режим (`state`).

## Когда использовать

- Галереи изображений и медиа.
- Онбординг с несколькими шагами.
- Секции «Похожие товары», «Недавние проекты» — несколько карточек в viewport (`showItems > 1`).

Когда **не** нужен: для табличных данных (используйте `@ds/tabs`), для форм (обычная вертикальная прокрутка), для длинных списков (виртуализация).

### Состав

- **Стрелки** — по умолчанию показаны при hover (`controlsVisibility='hover'`). Установите `always`, чтобы оставить их видимыми всегда — нужно для touch-устройств и accessibility.
- **Пагинация** — слайдер-индикатор внизу. Скрывается через `pagination={false}`, когда прокрутка очевидна по контексту.
- **Свайп** — работает из коробки, `swipeActivateLength` задаёт минимальную длину жеста в px.

### Multi-item

`showItems` задаёт количество слайдов в viewport. `scrollBy` — шаг прокрутки (по умолчанию `showItems`). Для «ленты» задайте `scrollBy={1}` — прокрутка по одному элементу.

### Do / Don't

- ✅ `controlsVisibility='always'` на touch-устройствах и в accessibility-чувствительных приложениях.
- ❌ Скрывать и стрелки, и пагинацию — пользователь не поймёт, что блок прокручивается.
- ✅ `autoSwipe` только с `infiniteScroll` — иначе в конце карусель «упрётся» молча.
- ❌ `autoSwipe` с длинным контентом — пользователь не успевает прочитать.
- ✅ Одинаковая высота слайдов — иначе layout «прыгает» при переключении.
- ❌ Карусель в вложенных скроллах — конфликт жестов свайпа и прокрутки.

### Установка

```bash
pnpm add @ds/carousel
```

```ts
import { Carousel } from '@ds/carousel'
import '@ds/carousel/style.css'
```

### Примеры использования

<Example title='1. Базовая карусель' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example
  title='2. Три элемента в viewport'
  description='showItems=3, кастомный gap'
  code={ThreePerViewSrc}
>
  <ThreePerView client:load />
</Example>

<Example
  title='3. Бесконечная с автопрокруткой'
  description='infiniteScroll + autoSwipe=3 секунды на слайд'
  code={InfiniteSrc}
>
  <Infinite client:load />
</Example>

### Управляемый режим

Для синхронизации со state'ом снаружи передайте `state={{ page, onChange }}`:

```tsx
const [page, setPage] = useState(0)

<Carousel state={{ page, onChange: setPage }}>
  {slides}
</Carousel>
```

### Внутренние компоненты

Пакет содержит внутренние helper-компоненты `Control` (стрелка) и `ItemProvider` (контейнер со свайпом), которые не входят в публичный API. Если нужна кастомная стрелка — оборачивайте сам `Carousel` в свой layout, но не переопределяйте внутренние компоненты.

### Props

<PropsTable data={carouselDoc.Carousel} />

### Storybook

<StorybookEmbed storyId='components-carousel--playground' height={400} client:load />

## Доступность

- Стрелки — нативные `<button>`, работают с клавиатурой (Enter / Space).
- Пагинация использует `PaginationSlider` из `@ds/pagination` — полная клавиатурная доступность.
- При `controlsVisibility='hover'` стрелки остаются достижимыми через Tab (они в DOM, но визуально скрыты до hover) — предпочтительно использовать `always` на touch-устройствах.
- Свайп не заменяет клавиатурную навигацию — всегда оставляйте либо стрелки, либо пагинацию.
- `autoSwipe` автоматически останавливается при hover или focus на карусели (наследуется из реализации), чтобы не прерывать чтение.

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
