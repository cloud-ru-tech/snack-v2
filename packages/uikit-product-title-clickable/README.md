# TitleClickable

`@ds/uikit-product-title-clickable` — Кликабельный заголовок-ссылка раздела с иконкой, шевроном и опциональным аватар-блоком — для шапок продуктовых разделов.

Кликабельный заголовок раздела — нативный `<a>` с заголовком, опциональной иконкой слева и шевроном справа. Используется в шапках продуктовых блоков, где сам заголовок одновременно является ссылкой на раздел. Длинный текст автоматически усекается через `TruncateString`.

## Когда использовать
- Заголовок продуктового раздела ведёт на отдельную страницу/детальный вид.
- В шапке карточки/секции, где навигация по клику на заголовок ожидаема пользователем.
- Когда нужен визуальный аффорданс перехода (шеврон) поверх обычной ссылки.

Когда **не** нужен:

- Inline-ссылка в тексте:
  - используйте **`@ds/link`**.
- Action-кнопка:
  - используйте **`@ds/button`**.
- Строка списка с действием:
  - используйте **`@ds/uikit-product-info-row`**.

## Анатомия

### Slots

- `icon` — иконка 24×24 слева от заголовка (Figma `simpleTitle`).
- `title` — строка заголовка. Рендерится через `Typography variant='title' size='m'` с однострочным усечением.
- `titleTag` — семантический тег заголовка (`'h2'`, `'h3'`, `'span'` и т.п.) для корректной структуры документа.
- `children` — произвольная нода после заголовка. Имеет приоритет над `avatar`.
- `avatar` — `Avatar` + двухстрочный label/subtitle (Figma `userTitle`). Рендерится после заголовка, если `children` не передан.
- `showArrow` — управляет видимостью шеврона справа. Иконка справа автоматически меняется на `external link` при `target='_blank'`.

#### Иконка справа (auto)

- `chevron` (default) — внутренний переход.
- `external link` — выставляется автоматически, когда `target='_blank'`.

### Width (default `auto`)

- `auto` — компонент занимает по контенту, шеврон прижат к заголовку.
- `fullWidth` — растягивается на ширину контейнера, шеврон уезжает в правый край.

### Target (default `_self`)

HTML-атрибут `target` нативной ссылки:

- `_self` — открыть в текущей вкладке.
- `_blank` — открыть в новой вкладке; `rel='noopener noreferrer'` проставляется автоматически.
- `_parent` — открыть в родительском frame.
- `_top` — открыть в верхнем frame.

## Установка
```bash
pnpm add @ds/uikit-product-title-clickable
```

```ts
import { TitleClickable } from '@ds/uikit-product-title-clickable'
```

## Примеры использования
### Простой заголовок

Минимальный набор: href + title

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function Basic() {
  return <TitleClickable href='#' title='Production environment' />;
}
```

### С иконкой

Иконка слева от заголовка через проп `icon`

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return <TitleClickable href='#' title='Production environment' icon={<PlaceholderSVG />} />;
}
```

### Произвольный контент в `children`

Слот `children` принимает любую React-ноду после заголовка — версия, бейдж, статус и т.п.

```tsx
import { Typography } from '@ds/typography';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithCustomNode() {
  return (
    <TitleClickable href='#' title='Section title'>
      <Typography variant='label' size='s' as='span'>
        Custom children
      </Typography>
    </TitleClickable>
  );
}
```

### Full-width

fullWidth: шеврон уезжает в правый край контейнера

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function FullWidth() {
  return <TitleClickable href='#' title='Раздел занимает всю ширину контейнера' icon={<PlaceholderSVG />} fullWidth />;
}
```

### Внешняя ссылка

target='_blank' → rel='noopener noreferrer' автоматически

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function External() {
  return <TitleClickable href='https://example.com' target='_blank' title='Внешняя ссылка' />;
}
```

### Без шеврона

showArrow={false}: компактный режим без визуального аффорданса

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function HiddenArrow() {
  return <TitleClickable href='#' title='Без шеврона' icon={<PlaceholderSVG />} showArrow={false} />;
}
```

### С аватаром

Проп `avatar` — Figma `userTitle`. Блок рендерится после заголовка

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithAvatar() {
  return <TitleClickable href='#' fullWidth avatar={{ name: 'John Doe', subtitle: 'jdoe@example.com' }} />;
}
```

## Props
**TitleClickableProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | — | Полиморфный тег корня — `'a'` по умолчанию, либо компонент-роутер (`Link` из react-router-dom). |
| `avatar` | `AvatarProps` | — | Аватар с subtitle (Figma `userTitle`). Рендерится после заголовка, если `children` не передан. |
| `children` | `ReactNode` | — | Произвольная нода после заголовка. Имеет приоритет над `avatar`. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `fullWidth` | `boolean` | — | Занимает ли всю ширину |
| `icon` | `ReactNode` | — | Иконка слева от заголовка. |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `showArrow` | `boolean` | `true` | Показывать иконку-стрелку справа. Иконка автоматически меняется на `external link` при `target='_blank'`. |
| `title` | `string` | — | Заголовок |
| `titleTag` | `ElementType` | — | Тег заголовка для семантики (например `'h2'`, `'h3'`, `'span'`) |

#### Related types

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`
