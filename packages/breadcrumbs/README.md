# Breadcrumbs

`@ds/breadcrumbs` — Хлебные крошки — навигационная цепочка пути до текущей страницы с адаптивным поведением при нехватке места.

Навигационная цепочка, показывающая путь от корня до текущей страницы. При нехватке ширины автоматически сворачивает средние элементы в коллапс-группу, сокращает лейблы до `shortLabel` или заменяет на многоточие.

## Демо
{/* client:only — Droplist рендерит контент в портал, который не резолвится при SSR */}

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
**BreadcrumbsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `firstItemIconOnly` | `boolean` | `false` | Использовать иконку без лейбла в первом айтеме |
| `inactiveLastItem` | `boolean` | `false` | Делает некликабельным последний элемент, даже если для него переданы `href` или `onClick` |
| `items` | `Item` | — | Массив айтемов |
| `separator` | `string` | `›` | Разделитель между пунктами |
| `size` | `"s"` \| `"xs"` | `s` | Размер |

#### Related types

**Item**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — |  |
| `icon` | `JSXElementConstructor<{ size: number; }> \| undefined` | — |  |
| `id` | `string` | — |  |
| `label` | `string` | — |  |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLAnchorElement> \| undefined` | — |  |
| `shortLabel` | `string \| undefined` | — |  |

- `Size` = `"s"` \| `"xs"`
