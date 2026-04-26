# Tag

`@ds/tag` — Пакет компактных меток — компонент Tag (опционально удаляемый или ссылочный) и контейнер TagRow для групп меток с обрезанием по строкам.

Пакет `@ds/tag` содержит компоненты для отображения коротких меток, категорий и статусов:

- ****Tag**** — одиночная метка. Рендерится как `<span>` по умолчанию, как `<a>` при передаче `href`, и опционально отображает кнопку удаления через `onDelete`.
- ****TagRow**** — контейнер группы меток. Поддерживает ограничение по количеству видимых строк с кнопкой «+N ещё».

## Состав пакета

## Установка

```bash
pnpm add @ds/tag
```

```ts
import { Tag, TagRow } from '@ds/tag'
import '@ds/tag/style.css'
```

## Общие принципы

- **Appearance — семантика, не декор.** `red` для ошибок, `green` для успеха, `blue` для информации. Не раскрашивайте метки ради разнообразия.
- **Размер — от контекста.** `xs` — в таблицах и плотных списках, `s` — в карточках, `m` — когда метка сама по себе элемент UI.
- **Удаляемые метки — только там, где есть состояние.** `onDelete` применяется в форме с выбранными фильтрами, не в read-only списках.
- **Ссылочные метки — навигация по категории.** `href` превращает `<Tag>` в ссылку, которая ведёт на страницу фильтра.

## Tag

Одиночная метка — девять семантических appearance, три размера, опциональная кнопка удаления и ссылочный режим через href.

Компактная метка. По умолчанию `<span>`; становится `<a>` при `href`; показывает кнопку удаления при `onDelete`.

## Демо

## Когда использовать

- Для категорий и тегов записи (Frontend, Backend, Design).
- Для статусов (Активный, Ошибка, Ожидание).
- Для выбранных фильтров в search/filter UI — со свойством `onDelete`.

Когда **не** нужен: для interactive chip с чекбокс-семантикой — используйте отдельный компонент ChipGroup, если он есть в вашем наборе.

## Для дизайнеров

### Appearance — семантическая роль

| Appearance | Когда использовать |
|-----------|---------------------|
| `neutral` | Нейтральные метки — таблицы, плотные списки |
| `primary` | Акцентные — выделить категорию |
| `red` | Ошибка, блокировка |
| `orange` | Предупреждение, в процессе |
| `yellow` | Требует внимания |
| `green` | Успех, активный |
| `blue` | Информация |
| `violet` / `pink` | Дополнительные домены |

<Example title='Базовая метка' code={BasicSrc}>
  <Basic client:load />
</Example>

### Size — три размера

| Size | Применение |
|------|------------|
| `xs` | Таблицы, плотные списки |
| `s` | Карточки, sidebar-фильтры |
| `m` | Самостоятельные блоки, hero-секции |

### Do / Don't

- ✅ Один `appearance` на класс явлений — например, все критические ошибки `red`.
- ❌ Раскрашивать метки ради разнообразия — пользователь ищет семантику.
- ✅ `onDelete` в выбранных фильтрах — понятный паттерн dismissible-chips.
- ❌ `onDelete` в read-only списке категорий — удалять нечего.
- ✅ `href` для ссылок на страницу фильтра или тега.
- ❌ `href` в форме выбора — пользователь ждёт toggle, а не переход.

## Для разработчиков

### Установка

```bash
pnpm add @ds/tag
```

```ts
import { Tag } from '@ds/tag'
import '@ds/tag/style.css'
```

### Примеры использования

<Example
  title='1. Базовый тег'
  description='Простая метка с appearance'
  code={BasicSrc}
>
  <Basic client:load />
</Example>

<Example
  title='2. Удаляемый тег'
  description='onDelete показывает кнопку ✕'
  code={RemovableSrc}
>
  <Removable client:load />
</Example>

<Example
  title='3. Тег-ссылка'
  description="href превращает <span> в <a>; target='_blank' → rel='noopener noreferrer' автоматически"
  code={AsLinkSrc}
>
  <AsLink client:load />
</Example>

### Полиморфизм

- Без `href` / `as` — рендер `<span>`.
- С `href` — рендер `<a href>`. `target='_blank'` автоматически ставит `rel='noopener noreferrer'`.
- С `as={Component}` — рендер произвольного компонента-роутера.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — |  |
| `label` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | — |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — |  |
| `className` | `string` | — |  |
| `tabIndex` | `number` | — |  |
| `as` | `"a"` | — | Элемент или компонент для рендера: 'a' | ComponentType (например Link из react-router-dom) |

### Storybook

<StorybookEmbed storyId='components-tag--playground' height={320} client:load />

## Доступность

- При `onDelete` рендерится нативный `<button type='button'>` — Enter / Space работают с клавиатуры.
- При `href` рендерится нативный `<a>` — Enter активирует переход.
- Цвет не единственный носитель семантики — дублируйте смысл текстом метки.
- Для удаляемых меток добавляйте визуально распознаваемую иконку ✕ — она встроена в компонент.

## TagRow

Контейнер группы меток с ограничением по строкам и кнопкой «+N ещё» для скрытых тегов.

Обёртка для нескольких `Tag` подряд. Принимает массив `items` и опционально ограничивает видимые метки по количеству строк с кнопкой «+N ещё» для раскрытия.

## Демо

## Когда использовать

- Для группы тегов записи в карточке списка (обычно 3–8 штук).
- Для выбранных фильтров, которые занимают больше одной строки.
- Везде, где количество меток может превышать доступную ширину.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `items` | `TagRowItem[]` | — |  |
| `rowLimit` | `number` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | — |  |
| `moreButtonLabel` | `string` | — |  |
| `className` | `string` | — |  |
| `onItemRemove` | `((item: string) => void)` | — |  |

## Пример

<Example
  title='Ограничение по строкам'
  description='rowLimit=1 прячет метки в кнопку +N ещё'
  code={RowTruncatedSrc}
>
  <RowTruncated client:load />
</Example>

## Storybook

<StorybookEmbed storyId='components-tag--tagrow' height={320} client:load />

## Доступность

- Кнопка «+N ещё» — нативный `<button>`, работает с клавиатурой.
- При раскрытии скрытые метки появляются в документе и становятся доступны screen-reader'у.
- Порядок меток в DOM соответствует порядку массива `items` — переходы по Tab предсказуемы.

## isTagLinkProps

```tsx
import { isTagLinkProps } from '@ds/tag'

export function Example() {
  return <isTagLinkProps>Click me</isTagLinkProps>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — |  |
| `label` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | — |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — |  |
| `className` | `string` | — |  |
| `tabIndex` | `number` | — |  |
| `as` | `"a"` | — | Элемент или компонент для рендера: 'a' | ComponentType (например Link из react-router-dom) |

## TagBase

```tsx
import { TagBase } from '@ds/tag'

export function Example() {
  return <TagBase appearance="neutral">Click me</TagBase>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — |  |
| `label` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | `xs` |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `neutral` |  |
| `className` | `string` | — |  |
| `tabIndex` | `number` | — |  |

## TagLink

```tsx
import { TagLink } from '@ds/tag'

export function Example() {
  return <TagLink appearance="neutral">Click me</TagLink>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `label` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | `xs` |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | `neutral` |  |
| `className` | `string` | — |  |
| `tabIndex` | `number` | — |  |
| `as` | `ElementType` | — | Элемент или компонент для рендера: 'a' | ComponentType (например Link из react-router-dom) |

## TagList

```tsx
import { TagList } from '@ds/tag'

export function Example() {
  return <TagList>Click me</TagList>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TagRowItemInner[]` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | `xs` |  |
| `onItemRemove` | `((item: string) => void)` | — |  |
| `setTagRef` | `SetTagRef` | — |  |

## TagMore

```tsx
import { TagMore } from '@ds/tag'

export function Example() {
  return <TagMore text="">Click me</TagMore>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TagRowItemInner[]` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | `xs` |  |
| `text` | `string` | `` |  |
| `buttonRef` | `Ref<HTMLButtonElement>` | — |  |
| `onItemRemove` | `((item: string) => void)` | — |  |

## TagRowSimple

```tsx
import { TagRowSimple } from '@ds/tag'

export function Example() {
  return <TagRowSimple>Click me</TagRowSimple>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TagRowItemInner[]` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | — |  |
| `onItemRemove` | `((item: string) => void)` | — |  |
| `setTagRef` | `((item: TagRowItemInner, index: number) => Ref<HTMLDivElement>)` | — |  |
| `className` | `string` | — |  |

## TagRowTruncated

```tsx
import { TagRowTruncated } from '@ds/tag'

export function Example() {
  return <TagRowTruncated>Click me</TagRowTruncated>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TagRowItemInner[]` | — |  |
| `rowLimit` | `number` | — |  |
| `moreButtonLabel` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | — |  |
| `className` | `string` | — |  |
| `onItemRemove` | `((item: string) => void)` | — |  |
