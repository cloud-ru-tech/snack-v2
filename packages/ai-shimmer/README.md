# AiShimmer

`@ds/ai-shimmer` — Анимированный shimmer-блок для AI-сценариев с типографикой как в `@ds/typography`.

`AiShimmer` — декоративный shimmer-лоадер из набора AI Components. Shimmer-проход ограничен формой текста через `background-clip: text` на дублирующем текстовом слое; ширина контейнера и размер шрифта задают layout автоматически.

## Когда использовать

- При загрузке AI-ответа, где нужен акцентный движущийся shimmer по тексту.
- В placeholder-сценариях, когда обычного `Skeleton` визуально недостаточно.

### Когда не нужен

- Для нейтральной индикации загрузки без текста — используйте `@ds/skeleton`.
- Для спиннера поверх модального окна — используйте `@ds/loader`.

## Анатомия

### Animation

AiShimmer всегда рендерится в анимированном режиме, повторяя shimmer-проход из Figma. Градиентный слой анимируется горизонтально и обрезается по контуру текста через `background-clip: text`.

### Text

Текст shimmer задаётся через проп `text`. Переносы строк поддерживаются символом `\n`. Многострочный текст автоматически переносится по ширине контейнера. Высота shimmer-слоя синхронизируется с layout через `ResizeObserver` и `document.fonts.ready`.

### Typography

Типографика задаётся пропами `variant`, `size` и `weight` — те же значения, что и в `@ds/typography`. По умолчанию `body` / `m` / `regular`. Константы `VARIANT`, `SIZE`, `WEIGHT` и дефолты экспортируются из пакета.

```ts
import { AiShimmer, DEFAULT_SIZE, DEFAULT_VARIANT, DEFAULT_WEIGHT } from '@ds/ai-shimmer'

<AiShimmer
  text='Generating...'
  variant={DEFAULT_VARIANT}
  size={DEFAULT_SIZE}
  weight={DEFAULT_WEIGHT}
/>
```

## Установка

```bash
pnpm add @ds/ai-shimmer
```

```ts
import { AiShimmer, DEFAULT_SIZE } from '@ds/ai-shimmer'
```

## Примеры использования

### Базовый

Однострочный shimmer с текстом по умолчанию

```tsx
import { AiShimmer } from '@ds/ai-shimmer';

export function Basic() {
  return <AiShimmer text='Generating AI response...' />;
}
```

### Многострочный текст

Переносы через `\n` и автоматический wrap по ширине контейнера

```tsx
import { AiShimmer } from '@ds/ai-shimmer';

export function Multiline() {
  return <AiShimmer text={'Generating AI response for your request...\nPlease wait a few seconds.'} />;
}
```

### Размер шрифта

Проп `size` принимает `s`, `m` или `l` — те же размеры, что и в `@ds/typography`

```tsx
import { AiShimmer, SIZE } from '@ds/ai-shimmer';

export function CustomSize() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AiShimmer text='Size S (body regular)' size={SIZE.s} />
      <AiShimmer text='Size M (body regular)' size={SIZE.m} />
      <AiShimmer text='Size L (body regular)' size={SIZE.l} />
    </div>
  );
}
```

## Props

**AiShimmerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс корневого контейнера. |
| `data-test-id` | `string` | `ai-shimmer` |  |
| `iconMask` | `string` | — | Силуэт ведущей иконки как CSS `mask-image` (обычно `url("data:image/svg+xml,…")`). <br/> Если задан — перед текстом рисуется иконка, залитая тем же бегущим градиентом, <br/> что и текст: блеск проходит сплошной полосой «иконка → конец строки», как будто <br/> иконка — часть текста. Иконка не несёт собственного цвета, она наследует <br/> shimmer-покрытие (приглушённая база + блик). |
| `iconSize` | `number` | `16` | Размер ведущей иконки в px (квадрат). Действует только с `iconMask`. По умолчанию `16`. |
| `size` | `"l"` \| `"m"` \| `"s"` | `SIZE.m` | Размер типографики (`s`, `m`, `l`), как в `@ds/typography`. <br/> Задаёт `data-size` и шкалу шрифта для текста shimmer. |
| `text` | `string` | — | Текст, по которому рендерится shimmer. Поддерживает переносы строк через `\n`. |
| `variant` | `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"` | `VARIANT.body` | Вариант типографики, как в `@ds/typography`. Задаёт `data-variant` и шкалу шрифта. |
| `weight` | `"mono"` \| `"regular"` \| `"thin"` | `WEIGHT.regular` | Начертание шрифта, как в `@ds/typography`. Задаёт `data-weight`. |

#### Related types

- `AiShimmerSize` = `"l"` \| `"m"` \| `"s"`

- `AiShimmerVariant` = `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"`

- `AiShimmerWeight` = `"mono"` \| `"regular"` \| `"thin"`
