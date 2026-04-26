# Modal

`@ds/modal` — Пакет модальных окон — компоненты Modal и ModalCustom с едиными токенами ширины и режимов закрытия.

Пакет `@ds/modal` предоставляет два компонента для блокирующих диалогов: готовую сборку `Modal` с пресетной шапкой, телом и футером и низкоуровневый `ModalCustom` для ручной композиции.

- ****Modal**** — готовое модальное окно с шапкой, прокручиваемым телом и опциональным футером. Покрывает 90% сценариев.
- ****ModalCustom**** — низкоуровневая версия без предопределённой структуры: собирайте из `ModalCustom.Header`, `.Body`, `.Footer` или собственной разметки.

## Установка

```bash
pnpm add @ds/modal
```

```ts
import { Modal, ModalCustom, MODE, WIDTH } from '@ds/modal'
```

## Смотри также

- **Drawer** — боковая/нижняя панель для форм и фильтров.
- **Popover** — всплывающий слой рядом с триггером.

## Modal

Центрированное модальное окно с пресетной шапкой, телом и футером.

Модальное окно для подтверждений, форм и важных сообщений. `Modal` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Для ручной композиции — [`ModalCustom`](./modal-custom).

## Когда использовать
- Критическое подтверждение, блокирующее остальной интерфейс (удалить, отправить, выйти).
- Короткая форма, которая прерывает основной поток и требует завершения.
- Важное сообщение или онбординг, которое нужно явно закрыть.

Когда **не** нужен: всплывающий поповер рядом с элементом (берите `Popover`), боковая панель или drawer для сложных форм, тост-уведомления (не блокируют UI).

## Анатомия

### Width
Три ширины: `s` — короткие подтверждения, `m` — дефолт для форм и сообщений, `l` — сложные формы и контент-окна.

### Mode
`regular` — обычный диалог, закрывается overlay/Esc/крестиком; `aggressive` — требует явного действия, overlay-click заблокирован; `forced` — полностью блокирующий, без способов закрыть кроме явной кнопки действия (критичные подтверждения).

## Установка
```bash
pnpm add @ds/modal
```

```ts
import { Modal, MODE, WIDTH } from '@ds/modal'
```

## Примеры использования
<Example title='Базовое использование' description='Контролируемое open/onClose, footer из `ButtonGroup`.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='С критичным действием' description='Critical primary, neutral outline secondary.' code={WithFooterSrc}>
  <WithFooter client:visible />
</Example>

<Example title='Состояние загрузки' description='`loading` прячет футер и показывает спиннер в теле.' code={LoadingSrc}>
  <Loading client:visible />
</Example>

<Example title='Forced — без кнопки закрытия' description='Закрытие только через действие в футере.' code={ForcedSrc}>
  <Forced client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `title` | `string` | — | Заголовок |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `truncate` | `{ title?: number; subtitle?: number; } | undefined` | `title: 1; subtitle (string): 2` | Максимальное число строк перед обрезкой (`TruncateString`).
Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |
| `content` | `ReactNode` | — | Основной контент |
| `open` | `boolean` | `false` | Управление состоянием показан/не показан |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `mode` | `"regular"` \| `"aggressive"` \| `"forced"` | `regular` | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc.
blur подложки — только у Aggressive и Forced. |
| `rootClassName` | `string` | — | CSS-класс корневого слоя портала |
| `width` | `"s"` \| `"m"` \| `"l"` | `s` | Размер окна |
| `heightAuto` | `boolean` | `true` | Растягивать по высоте в пределах контейнера |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`.
Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `media` | `ReactNode` | — | Медиа-контент |
| `footer` | `ReactNode` | — | Контент футера |
| `className` | `string` | — | CSS-класс для окна |
| `loading` | `boolean` | `false` | Состояние загрузки: в теле показывается спиннер или `loadingState`, футер скрыт |
| `loadingState` | `ReactNode` | — | Контент тела вместо спиннера при `loading` |

## Storybook
<StorybookEmbed storyId='components-modal-modal--playground' height={480} />

## ModalCustom

Низкоуровневая сборка Modal — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`ModalCustom` — низкоуровневая версия `Modal`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `ModalCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `ModalCustom`, когда стандартной шапки из `Modal` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

## Когда использовать

- Стандартная шапка / футер из `Modal` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одного окна.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Modal` — он дешевле в поддержке и даёт консистентные отступы.

## Установка

```bash
pnpm add @ds/modal
```

```ts
import { ModalCustom } from '@ds/modal'
```

## Примеры использования

<Example title='Ручная композиция' description='Header + Body + Footer собираются вручную.' code={CustomCompositionSrc}>
  <CustomComposition client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `open` | `boolean` | `false` | Управление состоянием показан/не показан |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `mode` | `"regular"` \| `"aggressive"` \| `"forced"` | `regular` | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc.
blur подложки — только у Aggressive и Forced. |
| `children` | `ReactNode` | — | Содержимое окна (композиция Header/Body/Footer) |
| `className` | `string` | — | CSS-класс окна |
| `rootClassName` | `string` | — | CSS-класс корневого слоя портала |
| `width` | `"s"` \| `"m"` \| `"l"` | `s` | Размер окна |
| `heightAuto` | `boolean` | `true` | Растягивать по высоте в пределах контейнера |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`.
Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |

## Storybook

<StorybookEmbed storyId='components-modal-modalcustom--playground' height={480} />

## Body

```tsx
import { Body } from '@ds/modal'

export function Example() {
  return <Body>Click me</Body>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `content` | `ReactNode` | — | Основной контент |
| `className` | `string` | — | CSS-класс для обёртки body |

## ButtonClose

```tsx
import { ButtonClose } from '@ds/modal'

export function Example() {
  return <ButtonClose>Click me</ButtonClose>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onClick` | `() => void` | — | Действие при клике |
| `className` | `string` | — | CSS-класс |

## Footer

```tsx
import { Footer } from '@ds/modal'

export function Example() {
  return <Footer>Click me</Footer>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS-класс |

## Header

```tsx
import { Header } from '@ds/modal'

export function Example() {
  return <Header truncate="title: 1; subtitle (string): 2">Click me</Header>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `title` | `string` | — | Заголовок |
| `titleId` | `string` | — | id для aria-labelledby |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `truncate` | `{ title?: number; subtitle?: number; } | undefined` | `title: 1; subtitle (string): 2` | Максимальное число строк перед обрезкой (`TruncateString`).
Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |
| `className` | `string` | — | CSS-класс |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |

## ModalCustom.Body

```tsx
import { ModalCustom.Body } from '@ds/modal'

export function Example() {
  return <ModalCustom.Body>Click me</ModalCustom.Body>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `content` | `ReactNode` | — | Основной контент |
| `className` | `string` | — | CSS-класс для обёртки body |

## ModalCustom.Footer

```tsx
import { ModalCustom.Footer } from '@ds/modal'

export function Example() {
  return <ModalCustom.Footer>Click me</ModalCustom.Footer>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS-класс |

## ModalCustom.Header

```tsx
import { ModalCustom.Header } from '@ds/modal'

export function Example() {
  return <ModalCustom.Header truncate="title: 1; subtitle (string): 2">Click me</ModalCustom.Header>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `title` | `string` | — | Заголовок |
| `titleId` | `string` | — | id для aria-labelledby |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `truncate` | `{ title?: number; subtitle?: number; } | undefined` | `title: 1; subtitle (string): 2` | Максимальное число строк перед обрезкой (`TruncateString`).
Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |
| `className` | `string` | — | CSS-класс |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |
