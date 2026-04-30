# Skeleton

`@ds/skeleton` — Пакет скелетонов дизайн-системы — компоненты Skeleton, SkeletonText и WithSkeleton для индикации состояния загрузки.

Пакет `@ds/skeleton` предоставляет примитивы для индикации загрузки: блочный `Skeleton`, многострочный `SkeletonText` и контейнер-переключатель `WithSkeleton`, который сам выбирает, что показывать — скелетон или реальный контент.

## Когда использовать
- Когда данные подгружаются асинхронно и отображение контента задерживается более 200 мс.
- Чтобы зарезервировать место под контент и избежать layout shift при появлении данных.
- Для списков, карточек и текстовых блоков — как визуальная подсказка «идёт загрузка».

Когда **не** нужен скелетон: для мгновенных переходов (< 200 мс), для обычных спиннеров поверх модальных окон (используйте `Loader`), для пустых состояний (используйте `EmptyState`).

Секция описывает семантику и поведение скелетонов в макетах.

## Установка
```bash
pnpm add @ds/skeleton
```

```ts
import { Skeleton, SkeletonText, WithSkeleton } from '@ds/skeleton'
```

## Примеры использования
### 1. Блок фиксированного размера

Прямоугольник под аватарку/картинку

```tsx
import { Skeleton } from '@ds/skeleton';

export function Block() {
  return <Skeleton loading width={240} height={24} borderRadius={4} />;
}
```

### 2. Круглый блок

borderRadius=50% — под аватар

```tsx
import { Skeleton } from '@ds/skeleton';

export function Circle() {
  return <Skeleton loading width={48} height={48} borderRadius='50%' />;
}
```

### 3. Текстовые строки

lines контролирует количество строк; variant × size задают типографику

```tsx
import { SkeletonText } from '@ds/skeleton';

export function TextLines() {
  return <SkeletonText loading lines={3} variant='body' size='m' />;
}
```

### 4. Переключение loading → content

WithSkeleton рендерит skeleton при loading=true, иначе — children

```tsx
import { SkeletonText, WithSkeleton } from '@ds/skeleton';

export function WithToggle() {
  const loading = true;
  return (
    <WithSkeleton loading={loading} skeleton={<SkeletonText loading lines={2} variant='body' size='m' />}>
      <p>Реальный контент после загрузки.</p>
    </WithSkeleton>
  );
}
```

## Props
#### Skeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | `BorderRadius<string | number>` | — | Радиус скругления. Можно указать значение допустимое для CSSProperty.borderRadius (пример `'10px'`, `'50%'` и т.д) |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `height` | `Height<string | number>` | — | Высота блока. Можно указать значение допустимое для CSSProperty.height (пример `'60%'`, `'400px'` и т.д) |
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| `width` | `Width<string | number>` | — | Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) |

#### SkeletonText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"left"` \| `"right"` | `left` | Выравнивание: left, right |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `lineClassName` | `string` | — | CSS-класс линии |
| `lines` | `number` | `3` | Количество строк. |
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| `rowClassName` | `string` | — | CSS-класс строки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Масштаб: s, m, l |
| `variant` | `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"` | `body` | Роль типографики (размер по anatomy) |
| `width` | `Width<string | number>` | — | Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) |

#### WithSkeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| `skeleton` | `ReactNode` | — | JSX скелетон |

## Анатомия

### Variant
Типографическая роль строки для `SkeletonText`: `display`, `headline`, `title`, `label`, `body` — совпадают с осями `Typography` и задают высоту/межстрочник плейсхолдера.

### Size
Размер текста: `s`, `m`, `l` — подбирается под размер реального контента, который заменяет скелетон.

### Align
Выравнивание хвостовой (неполной) строки в `SkeletonText`: `left` — хвост слева, `right` — справа.

## SkeletonContextProvider

```tsx
import { SkeletonContextProvider } from '@ds/skeleton'

export function Example() {
  return <SkeletonContextProvider>Click me</SkeletonContextProvider>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будут отрисованы блоки скелетона. |
