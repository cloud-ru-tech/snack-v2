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

### Содержимое

- `content` — обязательный слот для TitleClickable.SimpleTitle, TitleClickable.UserTitle или произвольной React-ноды.
- `TitleClickable.SimpleTitle` — обязательный `title`, необязательные `icon` и `titleTag`. Иконка занимает 24×24, текст использует `title/m` и усекается до одной строки.
- `TitleClickable.UserTitle` — пропы Avatar на верхнем уровне и необязательный `subtitle`. Имя берётся из `name`, размер аватара по умолчанию `m` (32 px). Имя и подпись усекаются до одной строки.
- Оба компонента можно использовать самостоятельно. `className`, `data-test-id` и `aria-*` относятся к их корневому контейнеру.
- `showArrow` — видимость стрелки справа. При `target='_blank'` отображается иконка внешней ссылки.

#### Иконка справа (auto)

- `chevron` (default) — внутренний переход.
- `external link` — выставляется автоматически, когда `target='_blank'`.

### Width (default `auto`)

- `auto` — компонент занимает место по контенту, шеврон прижат к заголовку.
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

Минимальный набор: href + content

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function Basic() {
  return <TitleClickable href='#' content={<TitleClickable.SimpleTitle title='Production environment' />} />;
}
```

### С иконкой

Иконка слева от заголовка через проп icon у TitleClickable.SimpleTitle

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return (
    <TitleClickable
      href='#'
      content={<TitleClickable.SimpleTitle title='Production environment' icon={<PlaceholderSVG />} />}
    />
  );
}
```

### Произвольный контент в `content`

Слот content принимает произвольную React-ноду.

```tsx
import { Typography } from '@ds/typography';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithCustomNode() {
  return (
    <TitleClickable
      href='#'
      content={
        <Typography variant='label' size='s' as='span'>
          Custom content
        </Typography>
      }
    />
  );
}
```

### Full-width

fullWidth: шеврон уезжает в правый край контейнера

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function FullWidth() {
  return (
    <TitleClickable
      href='#'
      content={<TitleClickable.SimpleTitle title='Раздел занимает всю ширину контейнера' icon={<PlaceholderSVG />} />}
      fullWidth
    />
  );
}
```

### Внешняя ссылка

target='_blank' → rel='noopener noreferrer' автоматически

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function External() {
  return (
    <TitleClickable
      href='https://example.com'
      target='_blank'
      content={<TitleClickable.SimpleTitle title='Внешняя ссылка' />}
    />
  );
}
```

### Без шеврона

showArrow={false}: компактный режим без визуального аффорданса

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function HiddenArrow() {
  return (
    <TitleClickable
      href='#'
      content={<TitleClickable.SimpleTitle title='Без шеврона' icon={<PlaceholderSVG />} />}
      showArrow={false}
    />
  );
}
```

### С аватаром

TitleClickable.UserTitle в слоте content: аватар, имя и подпись.

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithAvatar() {
  return (
    <TitleClickable
      href='#'
      fullWidth
      content={<TitleClickable.UserTitle name='John Doe' subtitle='jdoe@example.com' />}
    />
  );
}
```

## Props
**TitleClickableProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | — | Полиморфный тег корня — `'a'` по умолчанию, либо компонент-роутер (`Link` из react-router-dom). |
| `className` | `string` | — | CSS-класс |
| `content` | `ReactNode` | — | Содержимое: TitleClickable.SimpleTitle, TitleClickable.UserTitle или произвольная React-нода. |
| `data-test-id` | `string` | — |  |
| `fullWidth` | `boolean` | — | Занимает ли всю ширину |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `showArrow` | `boolean` | `true` | Показывать иконку-стрелку справа. Иконка автоматически меняется на `external link` при `target='_blank'`. |

#### Related types

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

## SimpleTitle

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function Basic() {
  return <TitleClickable href='#' content={<TitleClickable.SimpleTitle title='Production environment' />} />;
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корневого контейнера. |
| `data-test-id` | `string` | — |  |
| `icon` | `ReactNode` | — | Иконка слева, 24×24. |
| `title` | `string` | — | Текст заголовка. |
| `titleTag` | `ElementType` | — | Семантический тег заголовка. |

## UserTitle

```tsx
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithAvatar() {
  return (
    <TitleClickable
      href='#'
      fullWidth
      content={<TitleClickable.UserTitle name='John Doe' subtitle='jdoe@example.com' />}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Внешний вид (цвет) |
| `badge` | `ReactNode` | — | Произвольный нод в слот значка (правый-нижний угол). Перекрывает `status`. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `name` | `string` | — | Имя пользователя для генерации аббревиатуры |
| `shape` | `"rounded"` \| `"squared"` | — | Форма: круглая или квадратная |
| `showTwoSymbols` | `boolean` | — | Отображение двух заглавных символов имени вместо одного |
| `size` | `"3xl"` \| `"6xl"` \| `"9xl"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"` | `m` | Размер |
| `src` | `string` | — | URL изображения аватара |
| `status` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Appearance дефолтного `StatusIndicator` в правом-нижнем углу. Размер <br/> индикатора подбирается из `size` аватара автоматически. Полностью <br/> настроить значок можно через слот `badge`, который перекрывает `status`. |
| `subtitle` | `string` | — | Подпись под именем пользователя. |
