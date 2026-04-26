# Skeleton

`@ds/skeleton` — Пакет скелетонов дизайн-системы — компоненты Skeleton, SkeletonText и WithSkeleton для индикации состояния загрузки.

Пакет `@ds/skeleton` предоставляет примитивы для индикации загрузки: блочный `Skeleton`, многострочный `SkeletonText` и контейнер-переключатель `WithSkeleton`, который сам выбирает, что показывать — скелетон или реальный контент.

## Когда использовать

- Когда данные подгружаются асинхронно и отображение контента задерживается более 200 мс.
- Чтобы зарезервировать место под контент и избежать layout shift при появлении данных.
- Для списков, карточек и текстовых блоков — как визуальная подсказка «идёт загрузка».

Когда **не** нужен скелетон: для мгновенных переходов (< 200 мс), для обычных спиннеров поверх модальных окон (используйте `Loader`), для пустых состояний (используйте `EmptyState`).

## Для дизайнеров

Секция описывает семантику и поведение скелетонов в макетах.

### Состав пакета

### Do / Don't

- ✅ Форма скелетона повторяет форму реального контента: круглая аватарка → круглый скелетон.
- ❌ Один универсальный прямоугольник вместо набора форм — пользователь теряет ориентир.
- ✅ `SkeletonText` с тем же `variant`/`size`, что и реальный текст — высота строк совпадёт.
- ❌ Фиксированная высота в пикселях — при смене typography скелетон поедет.
- ✅ Скелетоны только на первой загрузке данных экрана/секции.
- ❌ Скелетоны при каждом фоновом обновлении — используйте `stale-while-revalidate`.

### Установка

```bash
pnpm add @ds/skeleton
```

```ts
import { Skeleton, SkeletonText, WithSkeleton } from '@ds/skeleton'
import '@ds/skeleton/style.css'
```

### Примеры использования

<Example
  title='1. Блок фиксированного размера'
  description='Прямоугольник под аватарку/картинку'
  code={BlockSrc}
>
  <Block client:load />
</Example>

<Example
  title='2. Круглый блок'
  description='borderRadius=50% — под аватар'
  code={CircleSrc}
>
  <Circle client:load />
</Example>

<Example
  title='3. Текстовые строки'
  description='lines контролирует количество строк; variant × size задают типографику'
  code={TextLinesSrc}
>
  <TextLines client:load />
</Example>

<Example
  title='4. Переключение loading → content'
  description='WithSkeleton рендерит skeleton при loading=true, иначе — children'
  code={WithToggleSrc}
>
  <WithToggle client:load />
</Example>

### Props

#### Skeleton

<PropsTable data={skeletonDoc.Skeleton} />

#### SkeletonText

<PropsTable data={skeletonDoc.SkeletonText} />

#### WithSkeleton

<PropsTable data={skeletonDoc.WithSkeleton} />

### Storybook

<StorybookEmbed storyId='components-skeleton--playground' height={360} client:load />

## Доступность

- Блоки скелетона не несут смысловой нагрузки для скринридеров: это визуальная пауза, а не контент.
- Для секций, содержащих скелетоны, рекомендуется проставить `aria-busy="true"` на контейнере — скринридер корректно сообщит о загрузке.
- Анимация скелетона уважает `prefers-reduced-motion: reduce` — при соответствующей системной настройке мерцание отключается.
- Контраст фонового оттенка скелетона соответствует токенам `@cloud-ru/figma-variables` и проходит требования WCAG AA для нетекстового контента.

## Skeleton

```tsx
import { Skeleton } from '@ds/skeleton'

export function Example() {
  return <Skeleton>Click me</Skeleton>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| `width` | `Width<string | number>` | — | Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) |
| `height` | `Height<string | number>` | — | Высота блока. Можно указать значение допустимое для CSSProperty.height (пример `'60%'`, `'400px'` и т.д) |
| `borderRadius` | `BorderRadius<string | number>` | — | Радиус скругления. Можно указать значение допустимое для CSSProperty.borderRadius (пример `'10px'`, `'50%'` и т.д) |
| `className` | `string` | — |  |

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

## SkeletonText

```tsx
import { SkeletonText } from '@ds/skeleton'

export function Example() {
  return <SkeletonText lines="3" variant="body" align="left">Click me</SkeletonText>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| `width` | `Width<string | number>` | — | Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) |
| `className` | `string` | — |  |
| `lines` | `number` | `3` | Количество строк. |
| `rowClassName` | `string` | — | CSS-класс строки |
| `lineClassName` | `string` | — | CSS-класс линии |
| `variant` | `"display"` \| `"headline"` \| `"title"` \| `"label"` \| `"body"` | `body` | Роль типографики (размер по anatomy) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Масштаб: s, m, l |
| `align` | `"left"` \| `"right"` | `left` | Выравнивание: left, right |

## WithSkeleton

```tsx
import { WithSkeleton } from '@ds/skeleton'

export function Example() {
  return <WithSkeleton>Click me</WithSkeleton>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `skeleton` | `ReactNode` | — | JSX скелетон |
| `loading` | `boolean` | — | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
