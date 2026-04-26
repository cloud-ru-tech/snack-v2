# Alert

`@ds/alert` — Семантическое уведомление — компонент Alert для inline-нотификаций в контенте и AlertTop для системных баннеров по верхней кромке.

Пакет `@ds/alert` предоставляет два варианта уведомлений:

- ****Alert**** — inline-алерт внутри страницы: в форме, в карточке, в списке. Поддерживает actions, close-кнопку и режим сворачивания.
- ****AlertTop**** — системный баннер, который крепится к верхней кромке страницы. Всегда на сплошной цветной подложке.

## Установка

```bash
pnpm add @ds/alert
```

```ts
import { Alert, AlertTop } from '@ds/alert'
```

## Alert

Inline-уведомление внутри контента — шесть appearance, два размера, режим сворачивания, горизонтальное и вертикальное выравнивание, опциональные actions и close.

Inline-уведомление, которое живёт в контенте — в форме, в карточке, в списке. Шесть appearance задают семантику, две оси (`size`, `align`) — форму, а пропсы `actions`, `onClose`, `collapsible` — поведение.

## Демо
<AlertDemo client:visible />

## Когда использовать
- Для подтверждения результата действия (success / error).
- Для предупреждения перед необратимой операцией (warning).
- Для информационного контекста внутри формы (info).

Когда **не** нужен: для коротких эфемерных сообщений («Скопировано», «Сохранено») используйте toast — `Alert` остаётся видимым, пока его не закрыть.

## Анатомия

### Appearance
Семантическая роль сообщения: `neutral`/`primary` — нейтральная/информативная подача, `info` — информ-акцент, `success` — успешное завершение, `warning` — предупреждение о потенциальной проблеме, `error` — ошибка или блокирующее состояние.

### Align
Выравнивание заголовка и контента: `horizontal` — заголовок и текст в одну строку, `vertical` — заголовок над текстом (для длинного контента и экшенов).

### Size
Компактность inline-алерта: `s` — для плотных поверхностей и табличных строк, `m` — дефолт.

## Установка
```bash
pnpm add @ds/alert
```

```ts
import { Alert } from '@ds/alert'
```

## Примеры использования
<Example title='1. Информационный алерт' code={InfoSrc}>
  <Info client:visible />
</Example>

<Example title='2. Ошибка с close-кнопкой' code={ErrorSrc}>
  <Error client:visible />
</Example>

<Example title='3. Алерт с действиями' code={WithActionsSrc}>
  <WithActions client:visible />
</Example>

<Example
  title='4. Сворачиваемый алерт'
  description='Длинное описание скрыто до клика по заголовку'
  code={CollapsibleSrc}
>
  <Collapsible client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `icon` | `boolean` | — | Отображать иконку |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |
| `description` | `ReactNode` | — | Описание |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `appearance` | `"neutral"` \| `"primary"` \| `"error"` \| `"warning"` \| `"success"` \| `"info"` | — | Внешний вид |
| `size` | `"s"` \| `"m"` | — | Размер |
| `className` | `string` | — | CSS-класс |
| `actions` | `{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "size" | "variant">; }` | — | Кнопки в футере |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `align` | `"horizontal"` \| `"vertical"` | — | Выравнивание контента |
| `outline` | `boolean` | — | Внешний бордер |

## Storybook
<StorybookEmbed storyId='components-alert-alert--playground' height={400} />

## AlertTop

Системный баннер по верхней кромке приложения — всегда на сплошной цветной подложке, используется для глобальных уведомлений.

Глобальный баннер, который крепится к верхней кромке приложения. В отличие от `Alert`, всегда рендерится на сплошной цветной подложке (определяется `appearance`) и не поддерживает `outline` — визуально это «полоса сообщения», а не карточка.

## Демо

<AlertTopDemo client:visible />

## Когда использовать

- Для плановых технических работ и maintenance-окон.
- Для глобальных ограничений (например, «В вашем регионе временно недоступны платежи»).
- Для системных анонсов, которые касаются всех пользователей приложения.

Когда **не** нужен: для сообщений, которые касаются конкретной страницы или формы — используйте `Alert`.

## Анатомия

### Appearance
Семантическая роль топ-баннера: `neutral`/`primary` — нейтрально-информативная подача, `info` — информ-акцент, `success` — успех (редко в топ-баннере), `warning` — предупреждение (maintenance), `error` — критическое ограничение/инцидент.

### Align
Выравнивание заголовка и описания: `horizontal` — в одну строку (короткий анонс), `vertical` — заголовок над текстом (длинное описание + действие).

### Size
Плотность баннера: `s` — компактный, `m` — дефолт.

## Установка

```bash
pnpm add @ds/alert
```

```ts
import { AlertTop } from '@ds/alert'
```

## Примеры использования

<Example title='Системное уведомление' code={SystemNoticeSrc}>
  <SystemNotice client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `icon` | `boolean` | — | Отображать иконку |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |
| `description` | `ReactNode` | — | Описание |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `appearance` | `"neutral"` \| `"primary"` \| `"error"` \| `"warning"` \| `"success"` \| `"info"` | — | Внешний вид |
| `size` | `"s"` \| `"m"` | — | Размер |
| `className` | `string` | — | CSS-класс |
| `actions` | `{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "size" | "variant">; }` | — | Кнопки в футере |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `align` | `"horizontal"` \| `"vertical"` | — | Выравнивание контента |

## Storybook

<StorybookEmbed storyId='components-alert-alerttop--playground' height={200} />

## AlertBase

```tsx
import { AlertBase } from '@ds/alert'

export function Example() {
  return <AlertBase truncate="title: 1">Click me</AlertBase>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `icon` | `boolean` | — | Отображать иконку |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |
| `description` | `ReactNode` | — | Описание |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `appearance` | `"neutral"` \| `"primary"` \| `"error"` \| `"warning"` \| `"success"` \| `"info"` | — | Внешний вид |
| `size` | `"s"` \| `"m"` | — | Размер |
| `className` | `string` | — | CSS-класс |
| `actions` | `{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "size" | "variant">; }` | — | Кнопки в футере |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `align` | `"horizontal"` \| `"vertical"` | — | Выравнивание контента |
| `variant` | `"inline"` \| `"top"` | — |  |
| `outline` | `boolean` | — |  |

## AlertButton

```tsx
import { AlertButton } from '@ds/alert'

export function Example() {
  return <AlertButton iconPosition="before" variant="onColor">Click me</AlertButton>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Текст кнопки |
| `icon` | `ReactNode` | — | Иконка |
| `iconPosition` | `"before"` \| `"after"` | `before` | Позиция иконки относительно текста |
| `size` | `"s"` \| `"m"` | `m` | Размер |
| `disabled` | `boolean` | `false` | Отключена |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `className` | `string` | — | Дополнительный класс |
| `variant` | `"onColor"` \| `"onAccent"` | `onColor` | Вариант оформления |
| `invertFocusOutlineColor` | `boolean` | — | Инвертировать цвет фокусного контура |
| `as` | `ElementType` | — | Элемент или компонент для рендера: 'button' | 'a' | ComponentType (например Link из react-router-dom) |
| `innerRef` | `any` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |

## getAlertAppearanceIcon

```tsx
import { getAlertAppearanceIcon } from '@ds/alert'

export function Example() {
  return <getAlertAppearanceIcon>Click me</getAlertAppearanceIcon>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
