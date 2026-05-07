# Timeline

`@ds/timeline` — Пакет таймлайна — вертикальная цепочка событий с маркерами, соединительными линиями и опциональным контентом в противоположной колонке.

Пакет `@ds/timeline` предоставляет компоненты для построения вертикальной ленты событий: хронологии заявки, этапов процесса, истории изменений.

- ****Timeline**** — контейнер ленты, задаёт общий layout и направление.
- ****TrackItem**** — отдельное событие с маркером, соединительной линией и контентом.

## Timeline

Вертикальная лента событий. Принимает массив items и сама расставляет роли маркеров (start / center / end), линии и opposite-контент.

Высокоуровневая обёртка над `TrackItem`. Принимает массив `items`, автоматически проставляет роль первому/последнему (start / end) и промежуточным (center), рендерит соединительные линии и опциональный `opposite`-контент.

### Когда использовать
- История заявки / запроса: события + timestamp.
- Этапы процесса (онбординг, оформление заказа).
- Changelog на странице документа.

Когда **не** нужен: горизонтальный stepper с нумерацией — берите `Stepper`. Список без хронологии — обычный `<ul>` или компонент-список.

### Анатомия

#### Width
`auto` — ширина по содержимому, `full` — растягивается по контейнеру (для дашбордов и полноэкранных лент).

### Примеры использования
#### Базовый таймлайн

Массив items, контент справа.

```tsx
import { Timeline } from '@ds/timeline';

const items = [
  { content: 'Заявка создана' },
  { content: 'Передана в работу' },
  { content: 'В обработке' },
  { content: 'Выполнено' },
];

export function Basic() {
  return <Timeline items={items} />;
}
```

#### С opposite-колонкой

Timestamp в opposite, описание в content.

```tsx
import { Timeline } from '@ds/timeline';

const items = [
  { content: 'Заявка создана', opposite: '10:00' },
  { content: 'Обработка', opposite: '10:15' },
  { content: 'Выполнено', opposite: '10:40', dotAppearance: 'green' as const },
];

export function WithOpposite() {
  return <Timeline items={items} />;
}
```

#### Alternate

Zig-zag раскладка — контент попеременно слева и справа.

```tsx
import { Timeline } from '@ds/timeline';

const items = [
  { content: 'Создано', opposite: '10:00' },
  { content: 'Назначено', opposite: '10:10' },
  { content: 'Завершено', opposite: '10:30', dotAppearance: 'green' as const },
];

export function Alternate() {
  return <Timeline items={items} alternate fullWidth />;
}
```

### Props
**TimelineProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alternate` | `boolean` | — | Перемешать положение контента |
| `className` | `string` | — | CSS-класс для элемента с контентом |
| `contentPosition` | `"left"` \| `"right"` | `right` | Положение контента |
| `data-test-id` | `string` | — |  |
| `fullWidth` | `boolean` | — | Сделать таймлайн во всю ширину |
| `items` | `TimelineItem` | — | Пункты таймлайна |

##### Related types

- `Position` = `"left"` \| `"right"`

**TimelineItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alternateMode` | `boolean \| undefined` | — | Перемешать положение контента |
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Контент |
| `contentPosition` | `"left"` \| `"right"` | — | Положение контента |
| `data-test-id` | `string \| undefined` | — | Стабильный идентификатор для e2e/tests |
| `dotAppearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Семантический цвет маркера |
| `dotVariant` | `"default"` \| `"subEvent"` | — | Вид маркера |
| `key` | `string \| undefined` | — | Уникальный ключ |
| `lineStyle` | `"dashed"` \| `"solid"` | — | Стиль нижней линии |
| `opposite` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Контент в противоположной колонке |
| `showLines` | `boolean \| undefined` | — | Показывать вертикальные сегменты |

**TrackItemProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alternateMode` | `boolean \| undefined` | — | Перемешать положение контента |
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Контент |
| `contentPosition` | `"left"` \| `"right"` | — | Положение контента |
| `data-test-id` | `string \| undefined` | — | Стабильный идентификатор для e2e/tests |
| `dotAppearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Семантический цвет маркера |
| `dotVariant` | `"default"` \| `"subEvent"` | — | Вид маркера |
| `key` | `string \| undefined` | — | Уникальный ключ |
| `lineStyle` | `"dashed"` \| `"solid"` | — | Стиль нижней линии |
| `opposite` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Контент в противоположной колонке |
| `role` | `"center"` \| `"end"` \| `"start"` | — | Роль |
| `showLines` | `boolean \| undefined` | — | Показывать вертикальные сегменты |

**TrackProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dotAppearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Семантический цвет маркера |
| `dotVariant` | `"default"` \| `"subEvent"` | — | Вид маркера |
| `lineStyle` | `"dashed"` \| `"solid"` | — | Стиль нижней линии |
| `role` | `"center"` \| `"end"` \| `"start"` | — | Роль |
| `showLines` | `boolean \| undefined` | — | Показывать вертикальные сегменты |

## TrackItem

Одна строка ленты — маркер, соединительные линии, контент и опциональная противоположная колонка. Публичный субкомпонент для кастомной раскладки.

Одна строка ленты событий. Используйте напрямую, если нужна кастомная раскладка — например, встраивание событий в таблицу или сетку с собственной логикой группировки. Для типового сценария «массив → вертикальная лента» возьмите `Timeline`.

### Когда использовать

- Своя раскладка, где `Timeline` не подходит (встраивание в таблицу, grid, виртуализированный список).
- Нужен контроль над отдельным элементом: состояние маркера, положение контента, пропуск соединительной линии.

### Анатомия

#### Position
Сторона, с которой рендерится контент относительно трека: `left` — слева, `right` — справа. Используется в двухколоночных таймлайнах.

### Примеры использования

Смотрите примеры в **Timeline** — `TrackItem` используется как внутренний строительный блок.

### Props

**TrackItemProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alternateMode` | `boolean` | — | Перемешать положение контента |
| `content` | `ReactNode` | — | Контент |
| `contentPosition` | `"left"` \| `"right"` | `right` | Положение контента |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
| `dotAppearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Семантический цвет маркера |
| `dotVariant` | `"default"` \| `"subEvent"` | — | Вид маркера |
| `key` | `string` | — | Уникальный ключ |
| `lineStyle` | `"dashed"` \| `"solid"` | — | Стиль нижней линии |
| `opposite` | `ReactNode` | — | Контент в противоположной колонке |
| `role` | `"center"` \| `"end"` \| `"start"` | — | Роль |
| `showLines` | `boolean` | — | Показывать вертикальные сегменты |

##### Related types

- `Position` = `"left"` \| `"right"`

- `Role` = `"center"` \| `"end"` \| `"start"`

**TrackDotProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Семантический цвет маркера |
| `variant` | `"default"` \| `"subEvent"` | — | Вид маркера |

**TrackLineProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `"dashed"` \| `"solid"` | — |  |

**TrackProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dotAppearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Семантический цвет маркера |
| `dotVariant` | `"default"` \| `"subEvent"` | — | Вид маркера |
| `lineStyle` | `"dashed"` \| `"solid"` | — | Стиль нижней линии |
| `role` | `"center"` \| `"end"` \| `"start"` | — | Роль |
| `showLines` | `boolean \| undefined` | — | Показывать вертикальные сегменты |
