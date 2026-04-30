# Carousel

`@ds/carousel` — Компонент горизонтальной прокрутки слайдов — стрелки, пагинация, свайп, автопрокрутка, infinite scroll и multi-item отображение.

Горизонтальная прокрутка слайдов. Принимает `children` как массив React-элементов и управляет переключением через стрелки, пагинацию и свайп. Поддерживает `infiniteScroll`, `autoSwipe`, несколько элементов в viewport (`showItems`) и управляемый режим (`state`).

## Когда использовать
- Галереи изображений и медиа.
- Онбординг с несколькими шагами.
- Секции «Похожие товары», «Недавние проекты» — несколько карточек в viewport (`showItems > 1`).

Когда **не** нужен: для табличных данных (используйте `@ds/tabs`), для форм (обычная вертикальная прокрутка), для длинных списков (виртуализация).

## Анатомия

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
### 1. Базовая карусель

```tsx
import { Carousel } from '@ds/carousel';

export function Basic() {
  return (
    <div style={{ width: 480 }}>
      <Carousel>
        <div style={{ height: 180, background: '#4f46e5', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 1
        </div>
        <div style={{ height: 180, background: '#0ea5e9', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 2
        </div>
      </Carousel>
    </div>
  );
}
```

### 2. Три элемента в viewport

showItems=3, кастомный gap

```tsx
import { Carousel } from '@ds/carousel';

export function ThreePerView() {
  return (
    <div style={{ width: 600 }}>
      <Carousel showItems={3} gap='12px'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{ height: 120, background: '#f3f4f6', display: 'grid', placeItems: 'center', borderRadius: 8 }}
          >
            Card {i + 1}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
```

### 3. Бесконечная с автопрокруткой

infiniteScroll + autoSwipe=3 секунды на слайд

```tsx
import { Carousel } from '@ds/carousel';

export function Infinite() {
  return (
    <div style={{ width: 480 }}>
      <Carousel infiniteScroll autoSwipe={3}>
        <div style={{ height: 180, background: '#10b981', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 1
        </div>
        <div style={{ height: 180, background: '#f59e0b', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 2
        </div>
        <div style={{ height: 180, background: '#ec4899', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 3
        </div>
      </Carousel>
    </div>
  );
}
```

## Props
**CarouselProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `arrows` | `boolean` | `true` | Использовать стрелки для переключения страниц |
| `autoSwipe` | `number` | — | Автоматическое переключение слайдов в секундах |
| `children` | `ReactElement<any, string \| JSXElementConstructor<any>>[]` | — | Массив айтемов |
| `className` | `string` | — | CSS - класснейм |
| `controlsVisibility` | `"always"` \| `"hover"` | `hover` | Управление видимостью стрелок: 'hover' — по ховеру, 'always' — всегда |
| `data-test-id` | `string` | — |  |
| `gap` | `string` | `var(--dimension-2m)` | Расстояние между айтемами |
| `infiniteScroll` | `boolean` | `false` | Цикличная прокрутка |
| `pagination` | `boolean` | `true` | Использовать пагинацию для переключения страниц |
| `scrollBy` | `number` | `Math.trunc(show)` | Сдвиг айтемов при смене 1 страницы |
| `showItems` | `number` | `1` | Кол-во отображаемых единовременно айтемов |
| `state` | `{ page: number; onChange(page: number): void; }` | — | Управление состоянием извне |
| `swipe` | `boolean` | `true` | Переключение страниц свайпом |
| `swipeActivateLength` | `number` | `48` | Минимальная длина в px для активации свайпа |
| `transition` | `number` | `0.4` | Время переключения 1 страницы (в s) |

#### Related types

- `ControlsVisibility` = `"always"` \| `"hover"`
