# Tag

`@ds/tag` — Пакет компактных меток — компонент Tag (опционально удаляемый или ссылочный) и контейнер TagRow для групп меток с обрезанием по строкам.

Пакет `@ds/tag` содержит компоненты для отображения коротких меток, категорий и статусов:

- ****Tag**** — одиночная метка. Рендерится как `<span>` по умолчанию, как `<a>` при передаче `href`, и опционально отображает кнопку удаления через `onDelete`.
- ****TagRow**** — контейнер группы меток. Поддерживает ограничение по количеству видимых строк с кнопкой «+N ещё».

## Установка

```bash
pnpm add @ds/tag
```

```ts
import { Tag, TagRow } from '@ds/tag'
```

## Tag

Одиночная метка — девять семантических appearance, три размера, опциональная кнопка удаления и ссылочный режим через href.

Компактная метка. По умолчанию `<span>`; становится `<a>` при `href`; показывает кнопку удаления при `onDelete`.

## Демо
<TagDemo client:visible />

## Когда использовать
- Для категорий и тегов записи (Frontend, Backend, Design).
- Для статусов (Активный, Ошибка, Ожидание).
- Для выбранных фильтров в search/filter UI — со свойством `onDelete`.

Когда **не** нужен: для interactive chip с чекбокс-семантикой — используйте отдельный компонент ChipGroup, если он есть в вашем наборе.

## Установка
```bash
pnpm add @ds/tag
```

```ts
import { Tag } from '@ds/tag'
```

## Примеры использования
<Example
  title='1. Базовый тег'
  description='Простая метка с appearance'
  code={BasicSrc}
>
  <Basic client:visible />
</Example>

<Example
  title='2. Удаляемый тег'
  description='onDelete показывает кнопку ✕'
  code={RemovableSrc}
>
  <Removable client:visible />
</Example>

<Example
  title='3. Тег-ссылка'
  description="href превращает <span> в <a>; target='_blank' → rel='noopener noreferrer' автоматически"
  code={AsLinkSrc}
>
  <AsLink client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — | Обработчик удаления тега. Если задан — отображается крестик-remove |
| `label` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` | — |  |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"orange"` \| `"yellow"` \| `"green"` \| `"blue"` \| `"violet"` \| `"pink"` | — |  |
| `className` | `string` | — |  |
| `tabIndex` | `number` | — |  |
| `as` | `"a"` | — | Элемент или компонент для рендера: 'a' | ComponentType (например Link из react-router-dom) |

## Storybook
<StorybookEmbed storyId='components-tag-tag--playground' height={320} />

## Анатомия

### Size
`xs` — для плотных списков и инлайн-меток, `s` — дефолт, `m` — для заголовков и акцентных блоков.

### Appearance
Семантический/декоративный цвет: `neutral` — нейтральный, `primary` — акцент, `red` — ошибка/критично, `orange`/`yellow` — предупреждение, `green` — успех, `blue` — инфо, `violet`/`pink` — декоративные.

## TagRow

Контейнер группы меток с ограничением по строкам и кнопкой «+N ещё» для скрытых тегов.

Обёртка для нескольких `Tag` подряд. Принимает массив `items` и опционально ограничивает видимые метки по количеству строк с кнопкой «+N ещё» для раскрытия.

## Демо

<TagRowDemo client:visible />

## Когда использовать

- Для группы тегов записи в карточке списка (обычно 3–8 штук).
- Для выбранных фильтров, которые занимают больше одной строки.
- Везде, где количество меток может превышать доступную ширину.

## Установка

```bash
pnpm add @ds/tag
```

```ts
import { TagRow } from '@ds/tag'
```

## Примеры использования

<Example
  title='Ограничение по строкам'
  description='rowLimit=1 прячет метки в кнопку +N ещё'
  code={RowTruncatedSrc}
>
  <RowTruncated client:visible />
</Example>

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

## Storybook

<StorybookEmbed storyId='components-tag-tagrow--playground' height={320} />

## Анатомия

### Size
Применяется ко всем тегам в ряду: `xs`, `s`, `m`. Наследуется вложенными `Tag`.

### Appearance
Цветовая тема всех тегов в ряду: `neutral`, `primary`, `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink`.

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
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — | Обработчик удаления тега. Если задан — отображается крестик-remove |
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
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — | Обработчик удаления тега. Если задан — отображается крестик-remove |
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
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — | Обработчик удаления тега. Если задан — отображается крестик-remove |
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
