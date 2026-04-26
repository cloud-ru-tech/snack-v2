# Modal

`@ds/modal` — Центрированное модальное окно поверх страницы с пресетной шапкой, телом и футером; низкоуровневая сборка — через ModalCustom.

Модальное окно для подтверждений, форм и важных сообщений. `Modal` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Полный контроль над разметкой — через `ModalCustom` и его субкомпоненты `ModalCustom.Header`, `.Body`, `.Footer`.

## Когда использовать

- Критическое подтверждение, блокирующее остальной интерфейс (удалить, отправить, выйти).
- Короткая форма, которая прерывает основной поток и требует завершения.
- Важное сообщение или онбординг, которое нужно явно закрыть.

Когда **не** нужен: всплывающий поповер рядом с элементом (берите `Popover`), боковая панель или drawer для сложных форм, тост-уведомления (не блокируют UI).

### Режим (`mode`)

| Режим | Закрытие | Подложка |
|-------|----------|----------|
| `regular` | Esc, клик по overlay, кнопка закрытия | Затемнение без blur |
| `aggressive` | Только кнопка закрытия | Затемнение с blur |
| `forced` | Нет кнопки, нет Esc/overlay — только действия в футере | Затемнение с blur |

### Размер (`width`)

| Width | Когда |
|-------|-------|
| `s` | Подтверждения, короткие уведомления — один-два параграфа |
| `m` | Короткие формы, карточки с медиа |
| `l` | Сложные формы, многоколоночные диалоги |

### Do / Don't

- ✅ Один `primary`-акцент в футере — основное действие.
- ❌ Два `primary`-кнопки в футере.
- ✅ `forced` — только для сценариев, где нельзя выходить без завершения.
- ❌ `forced` для обычного диалога.
- ✅ Заголовок из одной строки — ясная метка ситуации.
- ❌ Длинный `title` без `truncate` и без `subtitle` для пояснений.
- ✅ Картинка в `media` — когда она несёт смысл сценария (онбординг, пустое состояние).
- ❌ Декоративная иллюстрация ради украшения в критичном диалоге.

### Установка

```bash
pnpm add @ds/modal
```

```ts
import { Modal, ModalCustom, MODE, WIDTH } from '@ds/modal'
```

### Примеры использования

<Example title='Базовое использование' description='Контролируемое open/onClose, footer из `ButtonGroup`.' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='С критичным действием' description='Critical primary, neutral outline secondary.' code={WithFooterSrc}>
  <WithFooter client:load />
</Example>

<Example title='Состояние загрузки' description='`loading` прячет футер и показывает спиннер в теле.' code={LoadingSrc}>
  <Loading client:load />
</Example>

<Example title='Forced — без кнопки закрытия' description='Закрытие только через действие в футере.' code={ForcedSrc}>
  <Forced client:load />
</Example>

<Example title='ModalCustom — ручная композиция' description='Произвольная разметка: Header + Body + Footer.' code={CustomCompositionSrc}>
  <CustomComposition client:load />
</Example>

### Портал и контейнер

Окно рендерится через `createPortal`. По умолчанию — в `document.body` или в узел из `PortalContextProvider` (`@ds/portal-context`). Переопределяется пропсом `container` (HTMLElement или CSS-селектор).

### Фокус и клавиатура

- При открытии фокус ставится на контейнер диалога (`tabIndex={-1}`), без автофокуса на кнопки.
- `Tab` / `Shift+Tab` циклически проходят по tabbable-элементам внутри окна (focus trap).
- После закрытия фокус возвращается на элемент, с которого было открытие.
- В режиме `regular` — `Escape` закрывает окно.

### Props

#### Modal

<PropsTable data={modalDoc.Modal} />

#### ModalCustom

<PropsTable data={modalDoc.ModalCustom} />

### Storybook

<StorybookEmbed storyId='components-modal-modal--playground' height={480} client:load />

## Доступность

- `role="dialog"`, `aria-modal="true"` на корневом контейнере.
- При наличии `title` — `aria-labelledby` связывается с заголовком в шапке автоматически.
- Для `ModalCustom` без видимого заголовка задайте доступное имя вручную: `aria-label` или `aria-labelledby`.
- Кнопка закрытия имеет `aria-label="close modal"`.
- Focus trap: `Tab` не уходит из открытого диалога.
- `react-remove-scroll` блокирует скролл документа — фон под оверлеем не прокручивается.

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

## Modal

```tsx
import { Modal } from '@ds/modal'

export function Example() {
  return <Modal truncate="title: 1; subtitle (string): 2" mode="regular" width="s" heightAuto>Click me</Modal>
}
```

### Props

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

## ModalCustom

```tsx
import { ModalCustom } from '@ds/modal'

export function Example() {
  return <ModalCustom mode="regular" width="s" heightAuto>Click me</ModalCustom>
}
```

### Props

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
