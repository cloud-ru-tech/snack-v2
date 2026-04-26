# Loader

`@ds/loader` — Индикаторы загрузки — Spinner (круговой прогресс) и Sun (лучевой индикатор).

Пакет `@ds/loader` предоставляет два лёгких SVG-индикатора загрузки: `Spinner` — универсальный круговой спиннер и `Sun` — лучевой индикатор, использующийся внутри других компонентов (например, в состоянии `loading` у `Button`).

## Демо
<SpinnerDemo client:visible />

<SunDemo client:visible />

## Когда использовать
- **Spinner** — когда нужно показать неопределённый прогресс (загрузка данных, фоновая операция). Отдельный индикатор в центре области контента, inline рядом с текстом или внутри кнопки/контрола.
- **Sun** — когда индикатор встраивается в интерактивный элемент: `loading`-состояние кнопки, переключателя, input'а. Имеет фиксированную иконку-подобную форму без «вращения края», что читается спокойнее внутри плотных контролов.

Когда **не** нужен `Loader`: для детерминированного прогресса (скачивание файла, заполнение формы) используйте прогресс-бар. Для skeleton-состояний списка или карточки — скелетоны.

### Spinner size
Пять размеров: `2xs` и `xs` — внутри текста и плотных контролов; `s` — дефолт для кнопок и input'ов; `m` — центр блока/карточки; `l` — центр страницы.

### Sun size
Четыре размера для встраивания в интерактивные элементы: `xs` — инлайн/compact кнопки, `s` — дефолт кнопки/контрола, `m` — крупные контролы, `l` — outsize-сценарии.

## Установка
```bash
pnpm add @ds/loader
```

```ts
import { Spinner, Sun, LOADER_SIZE, SUN_SIZE } from '@ds/loader'
```

## Примеры использования
<Example title='Spinner по умолчанию' code={SpinnerDefaultSrc}>
  <SpinnerDefault client:visible />
</Example>

<Example title='Spinner крупного размера' code={SpinnerLargeSrc}>
  <SpinnerLarge client:visible />
</Example>

<Example title='Sun в размере M' code={SunMediumSrc}>
  <SunMedium client:visible />
</Example>

#### Spinner

<PropsTable data={loaderDoc.Spinner} />

#### Sun

<PropsTable data={loaderDoc.Sun} />

## Storybook
<StorybookEmbed storyId='components-loader-spinner--playground' height={360} />

<StorybookEmbed storyId='components-loader-sun--playground' height={360} />

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
