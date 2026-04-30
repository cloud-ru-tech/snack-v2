# Breadcrumbs

`@ds/breadcrumbs` — Хлебные крошки — навигационная цепочка пути до текущей страницы с адаптивным поведением при нехватке места.

Навигационная цепочка, показывающая путь от корня до текущей страницы. При нехватке ширины автоматически сворачивает средние элементы в коллапс-группу, сокращает лейблы до `shortLabel` или заменяет на многоточие.

## Когда использовать
- Когда пользователь может находиться глубоко в иерархии разделов и ему нужно быстро вернуться на уровень выше.
- В админках, каталогах, файловых менеджерах — там, где есть естественная вложенность.
- Как дополнение к заголовку страницы, **не** как замена основной навигации.

Когда **не** нужен: плоский сайт из 2–3 страниц, одностраничные приложения без иерархии, поисковые результаты.

## Анатомия

### Size
Плотность крошек: `xs` — для тесных поверхностей и сайдбаров, `s` — дефолт над заголовком страницы.

### Item render mode
Способ отображения отдельного элемента цепочки: `full` — полный лейбл, `shortLabel` — укороченный (обычно первые буквы/aббревиатура), `ellipsis` — обрезан многоточием до ширины, `collapsed` — скрыт под троеточием-свёрткой. Режим применяется к элементам, когда цепочка не помещается в доступную ширину.

## Установка
```bash
pnpm add @ds/breadcrumbs
```

```ts
import { Breadcrumbs } from '@ds/breadcrumbs'
```

## Примеры использования
### Короткая цепочка

Базовый сценарий — главная → раздел → текущая страница.

```tsx
import { Breadcrumbs } from '@ds/breadcrumbs';

const items = [
  { id: '1', label: 'Главная', href: '#' },
  { id: '2', label: 'Документы', href: '#' },
  { id: '3', label: 'Текущая страница' },
];

export function BasicTrail() {
  return <Breadcrumbs items={items} />;
}
```

### Длинная цепочка с shortLabel

Передайте shortLabel для элементов, которые стоит укоротить при нехватке места.

```tsx
import { Breadcrumbs } from '@ds/breadcrumbs';

const items = [
  { id: '1', label: 'Литература', href: '#' },
  { id: '2', label: 'Стихи', href: '#' },
  { id: '3', label: 'Золотой век русской поэзии', shortLabel: 'Золотой век', href: '#' },
  { id: '4', label: 'Михаил Лермонтов', shortLabel: 'Лермонтов', href: '#' },
  { id: '5', label: 'Тема "Одиночество"', shortLabel: 'Одиночество', href: '#' },
  { id: '6', label: 'Парус' },
];

export function LongTrail() {
  return <Breadcrumbs items={items} />;
}
```

### Кастомный разделитель

Разделитель можно заменить любым коротким символом.

```tsx
import { Breadcrumbs } from '@ds/breadcrumbs';

const items = [
  { id: '1', label: 'Dashboard', href: '#' },
  { id: '2', label: 'Projects', href: '#' },
  { id: '3', label: 'Astro' },
];

export function CustomSeparator() {
  return <Breadcrumbs items={items} separator='/' />;
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `firstItemIconOnly` | `boolean` | `false` | Использовать иконку без лейбла в первом айтеме |
| `inactiveLastItem` | `boolean` | `false` | Делает некликабельным последний элемент, даже если для него переданы `href` или `onClick` |
| `items` | `Item[]` | — | Массив айтемов |
| `separator` | `string` | `›` | Разделитель между пунктами |
| `size` | `"s"` \| `"xs"` | `s` | Размер |

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
| `className` | `string` | — |  |
| `current` | `boolean` | — |  |
| `data-test-id` | `string` | — |  |
| `item` | `Item` | — |  |
| `minWidth` | `number` | — |  |
| `renderMode` | `"collapsed"` \| `"ellipsis"` \| `"full"` \| `"shortLabel"` | — |  |
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
| `className` | `string` | — |  |
| `size` | `"s"` \| `"xs"` | — |  |

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
| `firstItemIconOnly` | `boolean` | — |  |
| `items` | `Item[]` | — |  |
| `onConfigsBuilt` | `(config: BreadcrumbsConfig[]) => void` | — |  |
| `separator` | `string` | — |  |
| `size` | `"s"` \| `"xs"` | — |  |

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
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `hidden` | `boolean` | — |  |
| `separator` | `string` | — |  |
| `size` | `"s"` \| `"xs"` | — |  |
