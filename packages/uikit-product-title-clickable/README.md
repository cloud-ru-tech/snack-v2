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

- `before` — `ReactNode` слева от заголовка (Figma `+ slotTitle`). Принимает произвольную ноду либо один из готовых пресетов:
  - `<TitleClickableIcon icon={...} />` — иконка 24×24 (Figma `simpleTitle`).
  - `<TitleClickableAvatar name=... subtitle=... />` — `Avatar` + двухстрочный label/subtitle (Figma `userTitle`).
- `title` — строка заголовка. Рендерится через `Typography variant='title' size='m'` с однострочным усечением.
- `titleTag` — семантический тег заголовка (`'h2'`, `'h3'`, `'span'` и т.п.) для корректной структуры документа.
- `children` — кастомное содержимое вместо стандартной пары `before + title`.
- `showArrow` — управляет видимостью шеврона справа. Иконка справа автоматически меняется на `external link` при `target='_blank'`.

#### Иконка справа (auto)

- `chevron` (default) — внутренний переход.
- `external link` — выставляется автоматически, когда `target='_blank'`.

#### Deprecated

- `icon?: ReactNode` — заменён на `before={<TitleClickableIcon icon={...} />}`. Сохранён для совместимости.
- `avatar?: AvatarProps & { subtitle }` — заменён на `before={<TitleClickableAvatar {...} />}`. Сохранён для совместимости.

Если `before` передан — `icon`/`avatar` игнорируются.

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

### Произвольный контент в `before`

Слот `before` принимает любую React-ноду — версия, бейдж, статус и т.п.

```tsx
import { Typography } from '@ds/typography';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

export function WithCustomBefore() {
  return (
    <TitleClickable
      href='#'
      before={
        <Typography variant='label' size='s' as='span'>
          Custom before
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

## Props
**TitleClickableProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Полиморфный тег корня — `'a'` по умолчанию, либо компонент-роутер (`Link` из react-router-dom). |
| `avatar` | `AvatarProps` | — | @deprecated Используй `before={<TitleClickableAvatar {...} subtitle={...} />}`. <br/> Аватар с subtitle (Figma `userTitle`). |
| `before` | `ReactNode` | — | Слот слева от заголовка. Произвольная нода либо предзаготовленные пресеты <br/> `<TitleClickableIcon icon={...} />` / `<TitleClickableAvatar {...} />`. <br/> Соответствует Figma-слоту `+ slotTitle` (`simpleTitle` / `userTitle`). |
| `children` | `ReactNode` | — | Кастомное содержимое вместо title/before |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `fullWidth` | `boolean` | — | Занимает ли всю ширину |
| `icon` | `ReactNode` | — | @deprecated Используй `before={<TitleClickableIcon icon={...} />}`. <br/> Иконка слева от заголовка. |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на корневой элемент. |
| `showArrow` | `boolean` | `true` | Показывать иконку-стрелку справа. Иконка автоматически меняется на `external link` при `target='_blank'`. |
| `title` | `string` | — | Заголовок |
| `titleTag` | `ElementType` | — | Тег заголовка для семантики (например `'h2'`, `'h3'`, `'span'`) |

#### Related types

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

## TitleClickableAvatar

```tsx
import { TitleClickable, TitleClickableAvatar } from '@ds/uikit-product-title-clickable';

export function WithAvatar() {
  return (
    <TitleClickable href='#' fullWidth before={<TitleClickableAvatar name='John Doe' subtitle='jdoe@example.com' />} />
  );
}
```

### Props `TitleClickableAvatarProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Внешний вид (цвет) |
| `badge` | `ReactNode` | — | Произвольный нод в слот значка (правый-нижний угол). Перекрывает `status`. |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `name` | `string` | — | Имя пользователя для генерации аббревиатуры |
| `shape` | `"rounded"` \| `"squared"` | — | Форма: круглая или квадратная |
| `showTwoSymbols` | `boolean` | — | Отображение двух заглавных символов имени вместо одного |
| `size` | `"3xl"` \| `"6xl"` \| `"9xl"` \| `"l"` \| `"m"` \| `"s"` \| `"xs"` | — | Размер |
| `src` | `string` | — | URL изображения аватара |
| `status` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Appearance дефолтного `StatusIndicator` в правом-нижнем углу. Размер <br/> индикатора подбирается из `size` аватара автоматически. Полностью <br/> настроить значок можно через слот `badge`, который перекрывает `status`. |
| `subtitle` | `string` | — | Подпись под именем (e-mail, роль и т.п.). |

## TitleClickableIcon

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable, TitleClickableIcon } from '@ds/uikit-product-title-clickable';

export function WithIcon() {
  return (
    <TitleClickable href='#' title='Production environment' before={<TitleClickableIcon icon={<PlaceholderSVG />} />} />
  );
}
```

### Props `TitleClickableIconProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `icon` | `ReactNode` | — | Иконка (24×24). |
