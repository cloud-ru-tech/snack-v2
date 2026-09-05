# AiShimmer

`@ds/ai-shimmer` — Анимированный shimmer-блок для AI-сценариев с типографикой как в `@ds/typography`.

`AiShimmer` — декоративный shimmer-лоадер из набора AI Components. Брендовая волна обрезается по форме текста через `background-clip: text`; ширина контейнера и размер шрифта задают layout автоматически.

## Когда использовать

- При загрузке AI-ответа, где нужен акцентный движущийся shimmer по тексту.
- В placeholder-сценариях, когда обычного `Skeleton` визуально недостаточно.

### Когда не нужен

- Для нейтральной индикации загрузки без текста — используйте `@ds/skeleton`.
- Для спиннера поверх модального окна — используйте `@ds/loader`.

## Анатомия

### Animation

Волна повторяет спецификацию из Figma: сине-зелёная полоса шириной в две ширины строки идёт слева направо за 3 секунды, затем держит паузу 2 секунды. Цикл — 5 секунд, движение линейное и бесконечное.

Технически это градиентный слой поверх приглушённой базы, обрезанный по контуру текста через `background-clip: text`. Путь волны задан в пикселях строки через общую переменную `--ai-shimmer-x`, а не в процентах: процент считался бы от собственного бокса каждого слоя, и волна на иконке разошлась бы с волной на тексте. Ширина строки замеряется через `ResizeObserver` и `document.fonts.ready`.

При `prefers-reduced-motion: reduce` движение снимается и остаётся ровная заливка базовым цветом.

### Text

Текст shimmer задаётся через проп `text`. Переносы строк поддерживаются символом `\n`. Многострочный текст автоматически переносится по ширине контейнера.

### Icon

Ведущая иконка перед текстом заливается той же волной, что и текст, поэтому полоса проходит сплошняком от иконки до конца строки. Размер задаётся пропом `iconSize`, по умолчанию 16 пикселей. Иконку можно передать двумя способами:

- `icon` — узел любого компонента, который рендерит `<svg>`: иконка из `@ds/icons`, `AiIconGiga`, `Sun` из `@ds/loader`. Узел становится маской волны, как слои `iconMask` и `icon (color)` в Figma; его собственные цвета не важны, а анимация внутри иконки сохраняется. Размер узла должен совпадать с `iconSize`.
- `iconMask` — готовый силуэт как CSS `mask-image`, обычно `url("data:image/svg+xml,…")`. Силуэт логотипа GigaChat экспортирует `@ds/ai-icon-giga` под именем `GIGA_MASK_IMAGE`. Используется, когда `icon` не передан.

### Slot after

Проп `slotAfter` добавляет хвостовой узел справа от текста — например счётчик или длительность. Волна проходит по нему той же полосой, что по тексту: координата волны общая для всей строки. База слота на тон светлее текста, как второстепенная информация в дизайн-системе. Собственный цвет слоту задавать не нужно: он должен остаться прозрачным, иначе перекроет и базу, и волну.

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
| `icon` | `ReactNode` | — | Ведущая иконка узлом — любой компонент, рендерящий `<svg>`: иконка из `@ds/icons`, <br/> `AiIconGiga`, `Sun` из `@ds/loader`. Узел становится маской и заливается той же волной, <br/> что текст; его собственные цвета не важны, анимация внутри иконки сохраняется. Размер <br/> узла должен совпадать с `iconSize`. Имеет приоритет над `iconMask`. |
| `iconMask` | `string` | — | Силуэт ведущей иконки как CSS `mask-image` (обычно `url("data:image/svg+xml,…")`). <br/> Заливается той же волной, что текст. Используется, когда `icon` не передан. |
| `iconSize` | `number` | `16` | Размер ведущей иконки в px (квадрат). Действует с `icon` или `iconMask`. По умолчанию `16`. |
| `size` | `"l"` \| `"m"` \| `"s"` | `SIZE.m` | Размер типографики (`s`, `m`, `l`), как в `@ds/typography`. <br/> Задаёт `data-size` и шкалу шрифта для текста shimmer. |
| `slotAfter` | `ReactNode` | — | Хвостовой слот справа от текста — например счётчик или длительность. Волна идёт <br/> по нему той же полосой; база слота на тон светлее текста. Свой цвет слоту не задавать. |
| `text` | `string` | — | Текст, по которому рендерится shimmer. Поддерживает переносы строк через `\n`. |
| `variant` | `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"` | `VARIANT.body` | Вариант типографики, как в `@ds/typography`. Задаёт `data-variant` и шкалу шрифта. |
| `weight` | `"mono"` \| `"regular"` \| `"thin"` | `WEIGHT.regular` | Начертание шрифта, как в `@ds/typography`. Задаёт `data-weight`. |

#### Related types

- `AiShimmerSize` = `"l"` \| `"m"` \| `"s"`

- `AiShimmerVariant` = `"body"` \| `"display"` \| `"headline"` \| `"label"` \| `"title"`

- `AiShimmerWeight` = `"mono"` \| `"regular"` \| `"thin"`
