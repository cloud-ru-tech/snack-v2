# Alert

`@ds/alert` — Семантическое уведомление — компонент Alert для inline-нотификаций в контенте и AlertTop для системных баннеров по верхней кромке.

Пакет `@ds/alert` предоставляет два варианта уведомлений:

- ****Alert**** — inline-алерт внутри страницы: в форме, в карточке, в списке. Поддерживает actions, close-кнопку и режим сворачивания.
- ****AlertTop**** — системный баннер, который крепится к верхней кромке страницы. Всегда на сплошной цветной подложке.

## Состав пакета

## Установка

```bash
pnpm add @ds/alert
```

```ts
import { Alert, AlertTop } from '@ds/alert'
import '@ds/alert/style.css'
```

## Appearance

`neutral`, `primary`, `info`, `success`, `warning`, `error` — семантические роли. `error` и `warning` должны сопровождать действия, которые приводят к ошибке или требуют внимания; `success` — подтверждение выполненной операции; `info` — дополнительный контекст.

## Общие принципы

- **Один алерт на задачу.** Не показывайте одновременно `success` и `error` для одного действия.
- **Цвет + иконка + текст.** Цвет — не единственный носитель смысла; иконка и текст обязаны дублировать семантику.
- **AlertTop — редко.** Системный баннер занимает внимание; используйте для действительно важных сообщений (плановые работы, ограничения).

## Alert

Inline-уведомление внутри контента — шесть appearance, два размера, режим сворачивания, горизонтальное и вертикальное выравнивание, опциональные actions и close.

Inline-уведомление, которое живёт в контенте — в форме, в карточке, в списке. Шесть appearance задают семантику, две оси (`size`, `align`) — форму, а пропсы `actions`, `onClose`, `collapsible` — поведение.

## Демо

## Когда использовать

- Для подтверждения результата действия (success / error).
- Для предупреждения перед необратимой операцией (warning).
- Для информационного контекста внутри формы (info).

Когда **не** нужен: для коротких эфемерных сообщений («Скопировано», «Сохранено») используйте toast — `Alert` остаётся видимым, пока его не закрыть.

## Для дизайнеров

### Appearance — семантика

| Appearance | Когда |
|-----------|-------|
| `neutral` | Информационный блок без цветовой нагрузки |
| `primary` | Акцентное сообщение, обычно в онбординге |
| `info` | Справочная информация |
| `success` | Успешное завершение операции |
| `warning` | Предупреждение перед действием |
| `error` | Ошибка, которая блокирует дальнейший флоу |

### Size и Align

- `size='s'` — компактные блоки в узких контейнерах.
- `size='m'` — по умолчанию, для основного контента.
- `align='horizontal'` — иконка, текст и actions в одной строке.
- `align='vertical'` — actions ниже текста, для длинных описаний.

### Do / Don't

- ✅ Один `Alert` на задачу — не мешайте `success` и `error` для одной операции.
- ❌ `error` без причины ошибки — пользователь не понимает, что исправить.
- ✅ `actions` обязательно с понятными глаголами: «Продолжить», «Отмена».
- ❌ `actions` с текстом «Да / Нет» — не даёт контекста.
- ✅ `onClose` если пользователь может отложить сообщение.
- ❌ `onClose` для критических ошибок, которые блокируют работу.

## Для разработчиков

### Установка

```bash
pnpm add @ds/alert
```

```ts
import { Alert } from '@ds/alert'
import '@ds/alert/style.css'
```

### Примеры использования

<Example title='1. Информационный алерт' code={InfoSrc}>
  <Info client:load />
</Example>

<Example title='2. Ошибка с close-кнопкой' code={ErrorSrc}>
  <Error client:load />
</Example>

<Example title='3. Алерт с действиями' code={WithActionsSrc}>
  <WithActions client:load />
</Example>

<Example
  title='4. Сворачиваемый алерт'
  description='Длинное описание скрыто до клика по заголовку'
  code={CollapsibleSrc}
>
  <Collapsible client:load />
</Example>

### States и behaviour

- **`collapsible`** — первый клик по заголовку раскрывает описание, повторный — сворачивает.
- **`onClose`** — показывает кнопку ✕. Закрытие — обязанность потребителя (удалить из state).
- **`actions`** — `primary` / `secondary`. Рендерятся справа в `horizontal`, ниже — в `vertical`.
- **`truncate.title`** — ограничение количества строк заголовка (по умолчанию 1).

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
| `outline` | `boolean` | — | Внешний бордер |

### Storybook

<StorybookEmbed storyId='components-alert-alert--playground' height={400} client:load />

## Доступность

- Корневой элемент — `role='alert'`: скринридеры произносят содержимое при появлении.
- Кнопка ✕ — нативный `<button>`, работает с клавиатурой.
- Цвет дублируется иконкой: `success` — галочка, `error` — крест, `warning` — треугольник.
- Не используйте `Alert` для эфемерных уведомлений — `role='alert'` прерывает скринридер.

## AlertTop

Системный баннер по верхней кромке приложения — всегда на сплошной цветной подложке, используется для глобальных уведомлений.

Глобальный баннер, который крепится к верхней кромке приложения. В отличие от `Alert`, всегда рендерится на сплошной цветной подложке (определяется `appearance`) и не поддерживает `outline` — визуально это «полоса сообщения», а не карточка.

## Демо

## Когда использовать

- Для плановых технических работ и maintenance-окон.
- Для глобальных ограничений (например, «В вашем регионе временно недоступны платежи»).
- Для системных анонсов, которые касаются всех пользователей приложения.

Когда **не** нужен: для сообщений, которые касаются конкретной страницы или формы — используйте `Alert`.

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

## Пример

<Example title='Системное уведомление'>
  <AlertTop
    appearance='info'
    title='Плановые работы'
    description='Сегодня с 22:00 до 23:00 возможны кратковременные перебои.'
  />
</Example>

## Storybook

<StorybookEmbed storyId='components-alert-alerttop--playground' height={200} client:load />

## Доступность

- `role='alert'` — содержимое зачитывается скринридером при появлении.
- Контраст цветной подложки и текста соответствует WCAG AA; не переопределяйте цвета.
- Кнопки (actions, close) — нативные, работают с клавиатуры.
- `AlertTop` не должен блокировать интерактивные элементы под ним: резервируйте под него вертикальное пространство в layout.

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
