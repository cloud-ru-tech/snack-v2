# Carousel

Горизонтальная карусель дизайн-системы: в окне просмотра показывается одно или несколько слайдов, перелистывание — стрелками, свайпом и полоской пагинации (`PaginationSlider` из `@design-system/pagination`). Поддерживаются дробный `showItems` («peek»), контролируемое состояние страницы, зацикливание и автопрокрутка при `infiniteScroll`. Верстка и отступы завязаны на токены (в том числе `gap` по умолчанию из переменных размерности).

## Installation

```bash
npm install @design-system/carousel
# or
yarn add @design-system/carousel
# or
pnpm add @design-system/carousel
```

## Exports

```typescript
import {
  Carousel,
  type CarouselProps,
  CONTROLS_VISIBILITY,
  type ControlsVisibility
} from '@design-system/carousel';
```

## Live examples

### Basic usage

```tsx
import { CarouselExample } from '@design-system/carousel';

<CarouselExample client:load />
```


## Usage

### Basic example

```tsx
import { Carousel } from '@design-system/carousel';

export function Example() {
  return <Carousel />;
}
```

### Несколько карточек и шаг прокрутки

```tsx
import { Carousel } from '@design-system/carousel';

export function Example() {
  return (
    <Carousel showItems={2} scrollBy={2}>
      <StoryCard title="Слайд 1" />
      <StoryCard title="Слайд 2" />
      <StoryCard title="Слайд 3" />
      <StoryCard title="Слайд 4" />
    </Carousel>
  );
}
```

## Props

### CarouselProps
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactElement<unknown, string \| JSXElementConstructor<any>>[]` | - | Массив айтемов |
| className | `string` | - | CSS - класснейм |
| showItems | `number` | 1 | Кол-во отображаемых единовременно айтемов |
| scrollBy | `number` | Math.trunc(show) | Сдвиг айтемов при смене 1 страницы |
| transition | `number` | 0.4 | Время переключения 1 страницы (в s) |
| swipe | `boolean` | true | Переключение страниц свайпом |
| autoSwipe | `number` | - | Автоматическое переключение слайдов в секундах |
| swipeActivateLength | `number` | 48 | Минимальная длина в px для активации свайпа |
| arrows | `boolean` | true | Использовать стрелки для переключения страниц |
| pagination | `boolean` | true | Использовать пагинацию для переключения страниц |
| gap | `string` | var(--dimension-2m) | Расстояние между айтемами |
| state | `{ page: number; onChange(page: number): void; }` | - | Управление состоянием извне |
| infiniteScroll | `boolean` | - | Цикличная прокрутка |
| controlsVisibility | enum ControlsVisibility: `"hover"`, `"always"` | hover | Управление видимостью стрелок: 'hover' — по ховеру, 'always' — всегда |

## Best Practices

1. **Один корневой элемент на слайд** — каждый child лучше оборачивать в предсказуемый контейнер (`article`, `div`, карточку), чтобы разметка и поведение фокуса были стабильными.
2. **Синхронизация с внешним состоянием** — для URL, табов или аналитики используйте `state` с `page` и `onChange`; при отображении страниц в UI помните о расхождении 0-based API и 1-based пагинации внутри реализации.
3. **Пара `showItems` и `scrollBy`** — подбирайте так, чтобы на последнем шаге не оставалось пустого «хвоста»; при дробном `showItems` ширина элемента считается от полного значения, видимость по фокусу — с учётом `Math.trunc(showItems)`.
4. **Автоплей** — включайте `autoSwipe` осознанно и в связке с `infiniteScroll`, как задумано в компоненте; оценивайте влияние на доступность и отвлекаемость.
5. **Тесты** — используйте `data-test-id` из поддерживаемых пропсов для устойчивых селекторов в e2e.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
