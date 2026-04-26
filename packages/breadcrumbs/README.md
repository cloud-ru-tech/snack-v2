# Breadcrumbs

`@ds/breadcrumbs` — Хлебные крошки — навигационная цепочка пути до текущей страницы с адаптивным поведением при нехватке места.

Навигационная цепочка, показывающая путь от корня до текущей страницы. При нехватке ширины автоматически сворачивает средние элементы в коллапс-группу, сокращает лейблы до `shortLabel` или заменяет на многоточие.

## Демо

<BreadcrumbsDemo client:only="react" />

## Когда использовать

- Когда пользователь может находиться глубоко в иерархии разделов и ему нужно быстро вернуться на уровень выше.
- В админках, каталогах, файловых менеджерах — там, где есть естественная вложенность.
- Как дополнение к заголовку страницы, **не** как замена основной навигации.

Когда **не** нужен: плоский сайт из 2–3 страниц, одностраничные приложения без иерархии, поисковые результаты.

### Size

| Size | Применение |
|------|------------|
| `xs` | Плотные макеты, таблицы, узкие панели |
| `s` | Значение по умолчанию — страницы, карточки |

### Поведение при сжатии

При нехватке ширины компонент последовательно применяет стратегии:

1. Использует `shortLabel` вместо `label` для промежуточных айтемов.
2. Схлопывает средние айтемы в кнопку `…` с выпадающим меню.
3. Урезает длинные лейблы многоточием.

Текущая страница (последний айтем) всегда сохраняет полный лейбл.

### Do / Don't

- ✅ Последний айтем — текущая страница, без `href`.
- ❌ Делать последний айтем ссылкой на самого себя.
- ✅ Первый айтем — корень раздела или главная (можно с иконкой).
- ❌ Начинать цепочку со второго уровня, пропуская главную.
- ✅ Передавать `shortLabel` для длинных названий — улучшает поведение в узких контейнерах.
- ❌ Использовать кастомный `separator` длиннее 1–2 символов.

### Установка

```bash
pnpm add @ds/breadcrumbs
```

```ts
import { Breadcrumbs } from '@ds/breadcrumbs'
import '@ds/breadcrumbs/style.css'
```

### Примеры использования

<Example
  title='Короткая цепочка'
  description='Базовый сценарий — главная → раздел → текущая страница.'
  code={BasicTrailSrc}
>
  <BasicTrail client:only="react" />
</Example>

<Example
  title='Длинная цепочка с shortLabel'
  description='Передайте shortLabel для элементов, которые стоит укоротить при нехватке места.'
  code={LongTrailSrc}
>
  <LongTrail client:only="react" />
</Example>

<Example
  title='Кастомный разделитель'
  description='Разделитель можно заменить любым коротким символом.'
  code={CustomSeparatorSrc}
>
  <CustomSeparator client:only="react" />
</Example>

### Props

<PropsTable data={breadcrumbsDoc.Breadcrumbs} />

### Storybook

<StorybookEmbed storyId='components-breadcrumbs--playground' height={360} client:only="react" />

## Доступность

- Корневой контейнер рендерится как `<ul>` (список), каждый айтем — `<li>`, что корректно считывается скринридерами.
- Текущая страница помечается `aria-current="page"`.
- Ссылки и кнопки получают focus-ring при навигации с клавиатуры.
- Разделитель `›` помечен `aria-hidden` — его не озвучивает screen reader.

## Breadcrumbs

```tsx
import { Breadcrumbs } from '@ds/breadcrumbs'

export function Example() {
  return <Breadcrumbs separator="›">Click me</Breadcrumbs>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `items` | `Item[]` | — | Массив айтемов |
| `className` | `string` | — | CSS-класс |
| `separator` | `string` | `›` | Разделитель между пунктами |
| `size` | `"xs"` \| `"s"` | `s` | Размер |
| `firstItemIconOnly` | `boolean` | `false` | Использовать иконку без лейбла в первом айтеме |
| `inactiveLastItem` | `boolean` | `false` | Делает некликабельным последний элемент, даже если для него переданы `href` или `onClick` |

## Collapse

```tsx
import { Collapse } from '@ds/breadcrumbs'

export function Example() {
  return <Collapse>Click me</Collapse>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `currentConfig` | `BreadcrumbsConfigChain` | — |  |

## Crumb

```tsx
import { Crumb } from '@ds/breadcrumbs'

export function Example() {
  return <Crumb>Click me</Crumb>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `renderMode` | `"full"` \| `"shortLabel"` \| `"ellipsis"` \| `"collapsed"` | — |  |
| `className` | `string` | — |  |
| `minWidth` | `number` | — |  |
| `current` | `boolean` | — |  |
| `item` | `Item` | — |  |
| `useIconOnly` | `boolean` | — |  |

## CrumbsTypography

```tsx
import { CrumbsTypography } from '@ds/breadcrumbs'

export function Example() {
  return <CrumbsTypography>Click me</CrumbsTypography>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs"` \| `"s"` | — |  |
| `className` | `string` | — |  |

## HiddenChain

```tsx
import { HiddenChain } from '@ds/breadcrumbs'

export function Example() {
  return <HiddenChain>Click me</HiddenChain>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `separator` | `string` | — |  |
| `items` | `Item[]` | — |  |
| `size` | `"xs"` \| `"s"` | — |  |
| `onConfigsBuilt` | `(config: BreadcrumbsConfig[]) => void` | — |  |
| `firstItemIconOnly` | `boolean` | — |  |

## useBreadcrumbsLayout

```tsx
import { useBreadcrumbsLayout } from '@ds/breadcrumbs'

// Используйте хук внутри React-компонента (см. разделы выше в этом README).
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## useItemModesRender

```tsx
import { useItemModesRender } from '@ds/breadcrumbs'

// Используйте хук внутри React-компонента (см. разделы выше в этом README).
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `firstItemIconOnly` | `boolean` | — |  |

## Wrapper

```tsx
import { Wrapper } from '@ds/breadcrumbs'

export function Example() {
  return <Wrapper>Click me</Wrapper>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `hidden` | `boolean` | — |  |
| `className` | `string` | — |  |
| `size` | `"xs"` \| `"s"` | — |  |
| `separator` | `string` | — |  |
