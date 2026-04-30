# Loader

`@ds/loader` — Индикаторы загрузки — Spinner (круговой прогресс) и Sun (лучевой индикатор).

Пакет `@ds/loader` предоставляет два лёгких SVG-индикатора загрузки: `Spinner` — универсальный круговой спиннер и `Sun` — лучевой индикатор, использующийся внутри других компонентов (например, в состоянии `loading` у `Button`).

## Когда использовать
- **Spinner** — когда нужно показать неопределённый прогресс (загрузка данных, фоновая операция). Отдельный индикатор в центре области контента, inline рядом с текстом или внутри кнопки/контрола.
- **Sun** — когда индикатор встраивается в интерактивный элемент: `loading`-состояние кнопки, переключателя, input'а. Имеет фиксированную иконку-подобную форму без «вращения края», что читается спокойнее внутри плотных контролов.

Когда **не** нужен `Loader`: для детерминированного прогресса (скачивание файла, заполнение формы) используйте прогресс-бар. Для skeleton-состояний списка или карточки — скелетоны.

## Анатомия

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
### Spinner по умолчанию

```tsx
import { Spinner } from '@ds/loader';

export function SpinnerDefault() {
  return <Spinner />;
}
```

### Spinner крупного размера

```tsx
import { Spinner } from '@ds/loader';

export function SpinnerLarge() {
  return <Spinner size='l' />;
}
```

### Sun в размере M

```tsx
import { Sun } from '@ds/loader';

export function SunMedium() {
  return <Sun size='m' />;
}
```

## Props
#### Spinner

**SpinnerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `size` | `"2xs"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер |

#### Related types

- `LoaderSize` = `"2xs"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"`

#### Sun

**SunProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер |

#### Related types

- `SunSize` = `"l"` \| `"m"` \| `"s"` \| `"xs"`
