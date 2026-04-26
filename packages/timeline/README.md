# Timeline

`@ds/timeline` — Пакет таймлайна — вертикальная цепочка событий с маркерами, соединительными линиями и опциональным контентом в противоположной колонке.

Пакет `@ds/timeline` предоставляет компоненты для построения вертикальной ленты событий: хронологии заявки, этапов процесса, истории изменений.

- ****Timeline**** — контейнер ленты, задаёт общий layout и направление.
- ****TrackItem**** — отдельное событие с маркером, соединительной линией и контентом.

## Timeline

Вертикальная лента событий. Принимает массив items и сама расставляет роли маркеров (start / center / end), линии и opposite-контент.

Высокоуровневая обёртка над `TrackItem`. Принимает массив `items`, автоматически проставляет роль первому/последнему (start / end) и промежуточным (center), рендерит соединительные линии и опциональный `opposite`-контент.

## Демо
<TimelineDemo client:visible />

## Когда использовать
- История заявки / запроса: события + timestamp.
- Этапы процесса (онбординг, оформление заказа).
- Changelog на странице документа.

Когда **не** нужен: горизонтальный stepper с нумерацией — берите `Stepper`. Список без хронологии — обычный `<ul>` или компонент-список.

## Установка
```bash
pnpm add @ds/timeline
```

```ts
import { Timeline } from '@ds/timeline'
```

## Примеры использования
<Example title='Базовый таймлайн' description='Массив items, контент справа.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='С opposite-колонкой' description='Timestamp в opposite, описание в content.' code={WithOppositeSrc}>
  <WithOpposite client:visible />
</Example>

<Example title='Alternate' description='Zig-zag раскладка — контент попеременно слева и справа.' code={AlternateSrc}>
  <Alternate client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `items` | `TimelineItem[]` | — | Пункты таймлайна |
| `contentPosition` | `"right"` \| `"left"` | `right` | Положение контента |
| `alternate` | `boolean` | — | Перемешать положение контента |
| `fullWidth` | `boolean` | — | Сделать таймлайн во всю ширину |
| `className` | `string` | — | CSS-класс для элемента с контентом |

## Storybook
<StorybookEmbed storyId='components-timeline-timeline--playground' height={480} />

## Анатомия

### Width
`auto` — ширина по содержимому, `full` — растягивается по контейнеру (для дашбордов и полноэкранных лент).

## TrackItem

Одна строка ленты — маркер, соединительные линии, контент и опциональная противоположная колонка. Публичный субкомпонент для кастомной раскладки.

Одна строка ленты событий. Используйте напрямую, если нужна кастомная раскладка — например, встраивание событий в таблицу или сетку с собственной логикой группировки. Для типового сценария «массив → вертикальная лента» возьмите `Timeline`.

## Когда использовать

- Своя раскладка, где `Timeline` не подходит (встраивание в таблицу, grid, виртуализированный список).
- Нужен контроль над отдельным элементом: состояние маркера, положение контента, пропуск соединительной линии.

## Установка

```bash
pnpm add @ds/timeline
```

```ts
import { TrackItem } from '@ds/timeline'
```

## Примеры использования

Смотрите примеры в [Timeline](/components/timeline/timeline) — `TrackItem` используется как внутренний строительный блок.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | — | Уникальный ключ |
| `content` | `ReactNode` | — | Контент |
| `contentPosition` | `"right"` \| `"left"` | `right` | Положение контента |
| `role` | `"start"` \| `"center"` \| `"end"` | — | Роль |
| `opposite` | `ReactNode` | — | Контент в противоположной колонке |
| `lineStyle` | `"solid"` \| `"dashed"` | — | Стиль нижней линии |
| `dotVariant` | `"default"` \| `"subEvent"` | — | Вид маркера |
| `dotAppearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — | Семантический цвет маркера |
| `showLines` | `boolean` | — | Показывать вертикальные сегменты |
| `alternateMode` | `boolean` | — | Перемешать положение контента |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |

## Storybook

<StorybookEmbed storyId='components-timeline-track--playground' height={360} />

## Анатомия

### Position
Сторона, с которой рендерится контент относительно трека: `left` — слева, `right` — справа. Используется в двухколоночных таймлайнах.

## Track

```tsx
import { Track } from '@ds/timeline'

export function Example() {
  return <Track dotVariant="default" showLines>Click me</Track>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `role` | `"start"` \| `"center"` \| `"end"` | — | Роль |
| `lineStyle` | `"solid"` \| `"dashed"` | — | Стиль нижней линии |
| `dotVariant` | `"default"` \| `"subEvent"` | `default` | Вид маркера |
| `dotAppearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — | Семантический цвет маркера |
| `showLines` | `boolean` | `true` | Показывать вертикальные сегменты |

## TrackDot

```tsx
import { TrackDot } from '@ds/timeline'

export function Example() {
  return <TrackDot variant="default" appearance="neutral">Click me</TrackDot>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default"` \| `"subEvent"` | `default` | Вид маркера |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `neutral` | Семантический цвет маркера |

## TrackLine

```tsx
import { TrackLine } from '@ds/timeline'

export function Example() {
  return <TrackLine style="solid">Click me</TrackLine>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `"solid"` \| `"dashed"` | `solid` |  |
