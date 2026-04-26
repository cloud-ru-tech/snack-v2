# Loader

`@ds/loader` — Индикаторы загрузки — Spinner (круговой прогресс) и Sun (лучевой индикатор).

Пакет `@ds/loader` предоставляет два лёгких SVG-индикатора загрузки: `Spinner` — универсальный круговой спиннер и `Sun` — лучевой индикатор, использующийся внутри других компонентов (например, в состоянии `loading` у `Button`).

## Когда использовать

- **Spinner** — когда нужно показать неопределённый прогресс (загрузка данных, фоновая операция). Отдельный индикатор в центре области контента, inline рядом с текстом или внутри кнопки/контрола.
- **Sun** — когда индикатор встраивается в интерактивный элемент: `loading`-состояние кнопки, переключателя, input'а. Имеет фиксированную иконку-подобную форму без «вращения края», что читается спокойнее внутри плотных контролов.

Когда **не** нужен `Loader`: для детерминированного прогресса (скачивание файла, заполнение формы) используйте прогресс-бар. Для skeleton-состояний списка или карточки — скелетоны.

### Size — размеры

`Spinner` имеет дополнительный размер `2xs` для плотных плашек и микро-контролов.

<Example title='Spinner — все размеры'>
  <Spinner size='2xs' />
  <Spinner size='xs' />
  <Spinner size='s' />
  <Spinner size='m' />
  <Spinner size='l' />
</Example>

<Example title='Sun — все размеры'>
  <Sun size='xs' />
  <Sun size='s' />
  <Sun size='m' />
  <Sun size='l' />
</Example>

### Do / Don't

- ✅ Используйте `Spinner` для неопределённых длительных операций.
- ❌ Не используйте `Spinner` там, где прогресс известен — берите прогресс-бар.
- ✅ Внутри кнопки/контрола используйте `Sun`, а не `Spinner`.
- ❌ Не меняйте цвет индикатора произвольно — он наследует `currentColor` от родителя.
- ✅ Подбирайте размер индикатора под шрифт/контрол, в который он встраивается.
- ❌ Не ставьте `l` в плотный toolbar — используйте `s`/`xs`.

### Установка

```bash
pnpm add @ds/loader
```

```ts
import { Spinner, Sun, LOADER_SIZE, SUN_SIZE } from '@ds/loader'
import '@ds/loader/style.css'
```

### Примеры использования

<Example title='Spinner по умолчанию'>
  <Spinner />
</Example>

<Example title='Spinner крупного размера'>
  <Spinner size='l' />
</Example>

<Example title='Sun в размере M'>
  <Sun size='m' />
</Example>

### Props

#### Spinner

<PropsTable data={loaderDoc.Spinner} />

#### Sun

<PropsTable data={loaderDoc.Sun} />

### Storybook

<StorybookEmbed storyId='components-loader-spinner--playground' height={360} client:load />

<StorybookEmbed storyId='components-loader-sun--playground' height={360} client:load />

## Доступность

- Индикаторы рендерятся как декоративные `<svg>` без `role` — скринридер их пропускает. Поясняющий текст статуса предоставляйте рядом (например, `<div role='status' aria-live='polite'>Загрузка…</div>`).
- Цвет наследуется через `currentColor` — контраст обеспечивается родительским контекстом.
- Анимация вращения отключается системной настройкой `prefers-reduced-motion`: в этом случае индикатор замирает в статичном состоянии, что остаётся читаемым визуальным маркером активности.

## Spinner

```tsx
import { Spinner } from '@ds/loader'

export function Example() {
  return <Spinner>Click me</Spinner>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `size` | `"2xs"` \| `"xs"` \| `"s"` \| `"m"` \| `"l"` | `s` | Размер |
| `className` | `string` | — | CSS-класс |

## Sun

```tsx
import { Sun } from '@ds/loader'

export function Example() {
  return <Sun>Click me</Sun>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `size` | `"xs"` \| `"s"` \| `"m"` \| `"l"` | `s` | Размер |
| `className` | `string` | — | CSS-класс |
