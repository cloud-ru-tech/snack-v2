# Timeline

`@ds/timeline` — Пакет таймлайна — вертикальная цепочка событий с маркерами, соединительными линиями и опциональным контентом в противоположной колонке.

Пакет `@ds/timeline` предоставляет компоненты для построения вертикальной ленты событий: хронологии заявки, этапов процесса, истории изменений.

## Состав пакета

- ****Timeline**** — высокоуровневая обёртка: получает массив `items` и сама строит цепочку `TrackItem`'ов с корректными ролями (start / center / end).
- **TrackItem** — одна строка ленты: маркер, соединительные линии, контент и опциональная противоположная колонка. Доступен как публичный компонент для кастомной раскладки.
- **Track** — только маркер + линии (без контента). Для случаев, когда контент строится полностью вручную.

## Установка

```bash
pnpm add @ds/timeline
```

```ts
import { Timeline } from '@ds/timeline'
import '@ds/timeline/style.css'
```

## Когда какой использовать

| Задача 

## Общие принципы

- **Порядок от старого к новому сверху вниз.** Последний элемент — текущее / завершённое событие.
- **Цвет маркера — семантика события.** `green` — успех, `red` — ошибка, `neutral` — нейтральные шаги.
- **`opposite` — для временных меток.** Даты/время кладите в `opposite`, а не в `content`.
- **`alternate` — для «zig-zag» раскладки.** Уместно при достаточной ширине.

## Timeline

Вертикальная лента событий. Принимает массив items и сама расставляет роли маркеров (start / center / end), линии и opposite-контент.

Высокоуровневая обёртка над `TrackItem`. Принимает массив `items`, автоматически проставляет роль первому/последнему (start / end) и промежуточным (center), рендерит соединительные линии и опциональный `opposite`-контент.

## Демо

## Когда использовать

- История заявки / запроса: события + timestamp.
- Этапы процесса (онбординг, оформление заказа).
- Changelog на странице документа.

Когда **не** нужен: горизонтальный stepper с нумерацией — берите `Stepper`. Список без хронологии — обычный `<ul>` или компонент-список.

## Для дизайнеров

### contentPosition

| Position | Эффект |
|----------|--------|
| `right` | Маркеры слева, контент справа (по умолчанию) |
| `left` | Маркеры справа, контент слева — для RTL или зеркальных макетов |

### alternate

При `alternate=true` контент элементов по очереди располагается слева и справа от центральной линии маркеров. Требует `fullWidth=true` или достаточной ширины родителя, иначе элементы не влезают.

### opposite

Противоположная колонка для timestamp, автора события или другой метаданных. Не дублируйте сюда информацию из `content`.

### Маркер (dot)

- `dotVariant='default'` — полноценный маркер события.
- `dotVariant='subEvent'` — уменьшенный маркер для подсобытий (например, промежуточный автокомментарий).
- `dotAppearance` — цветовая семантика: `green` / `red` / `yellow` / `neutral` / и т.д.

### Do / Don't

- ✅ Упорядочивать события от старого (сверху) к новому (снизу).
- ❌ Обратный порядок без явной пометки — путает пользователя.
- ✅ `opposite` для timestamp, `content` для описания.
- ❌ Мешанина: timestamp внутри `content`.
- ✅ `alternate` — только при `fullWidth` и комфортной ширине.
- ❌ `alternate` в узком сайдбаре — контент ломается.

## Для разработчиков

### Установка

```bash
pnpm add @ds/timeline
```

```ts
import { Timeline } from '@ds/timeline'
import '@ds/timeline/style.css'
```

### Примеры использования

<Example title='Базовый таймлайн' description='Массив items, контент справа.' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='С opposite-колонкой' description='Timestamp в opposite, описание в content.' code={WithOppositeSrc}>
  <WithOpposite client:load />
</Example>

<Example title='Alternate' description='Zig-zag раскладка — контент попеременно слева и справа.' code={AlternateSrc}>
  <Alternate client:load />
</Example>

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `items` | `TimelineItem[]` | — | Пункты таймлайна |
| `contentPosition` | `"right"` \| `"left"` | `right` | Положение контента |
| `alternate` | `boolean` | — | Перемешать положение контента |
| `fullWidth` | `boolean` | — | Сделать таймлайн во всю ширину |
| `className` | `string` | — | CSS-класс для элемента с контентом |

### Storybook

<StorybookEmbed storyId='components-timeline-timeline--playground' height={480} client:load />

## Доступность

- Компонент использует семантические `<div>` — при необходимости оберните во внешний `<ol>` / `<ul>` с `aria-label`, чтобы screen reader озвучил «Список из N событий».
- Порядок событий в DOM соответствует визуальному — screen reader прочитает их в том же порядке.
- Цвет маркера (`dotAppearance`) не является единственным носителем смысла — дублируйте семантику текстом в `content` («Ошибка», «Успешно»).
- Интерактивные элементы внутри `content` (ссылки, кнопки) доступны с клавиатуры как обычно.

## TrackItem

Одна строка ленты — маркер, соединительные линии, контент и опциональная противоположная колонка. Публичный субкомпонент для кастомной раскладки.

Одна строка ленты событий. Используйте напрямую, если нужна кастомная раскладка — например, встраивание событий в таблицу или сетку с собственной логикой группировки. Для типового сценария «массив → вертикальная лента» возьмите `Timeline`.

## Props — `role`

Обязательный проп, определяет, какие линии рисуются вокруг маркера:

| Role | Линии |
|------|-------|
| `start` | Только линия вниз — первый элемент ленты |
| `center` | Линии сверху и снизу — промежуточный элемент |
| `end` | Только линия сверху — последний элемент |

При использовании через `Timeline` роль вычисляется автоматически по индексу.

## Пример кастомной ленты

```tsx
import { TrackItem } from '@ds/timeline'

function CustomTimeline({ events }) {
  return (
    <div>
      {events.map((event, i) => (
        <TrackItem
          key={event.id}
          role={i === 0 ? 'start' : i === events.length - 1 ? 'end' : 'center'}
          content={<EventCard event={event} />}
          opposite={event.timestamp}
          dotAppearance={event.type === 'error' ? 'red' : 'neutral'}
        />
      ))}
    </div>
  )
}
```

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

## Storybook

<StorybookEmbed storyId='components-timeline-track--playground' height={360} client:load />

## Доступность

- Те же принципы, что у `Timeline`: оборачивайте список во внешний `<ol>`/`<ul>` с `aria-label` для скринридеров.
- `opposite`-колонка читается после `content` в DOM-порядке — учитывайте это при чтении с клавиатуры.
- Цвет маркера дублируйте текстом внутри `content`.

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
