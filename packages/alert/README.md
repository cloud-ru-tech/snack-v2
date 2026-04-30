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

### Когда использовать
- Для подтверждения результата действия (success / error).
- Для предупреждения перед необратимой операцией (warning).
- Для информационного контекста внутри формы (info).

Когда **не** нужен: для коротких эфемерных сообщений («Скопировано», «Сохранено») используйте toast — `Alert` остаётся видимым, пока его не закрыть.

### Анатомия

#### Appearance
Семантическая роль сообщения: `neutral`/`primary` — нейтральная/информативная подача, `info` — информ-акцент, `success` — успешное завершение, `warning` — предупреждение о потенциальной проблеме, `error` — ошибка или блокирующее состояние.

#### Align
Выравнивание заголовка и контента: `horizontal` — заголовок и текст в одну строку, `vertical` — заголовок над текстом (для длинного контента и экшенов).

#### Size
Компактность inline-алерта: `s` — для плотных поверхностей и табличных строк, `m` — дефолт.

### Установка
```bash
pnpm add @ds/alert
```

```ts
import { Alert } from '@ds/alert'
```

### Примеры использования
#### 1. Информационный алерт

```tsx
import { Alert } from '@ds/alert';

export function Info() {
  return (
    <Alert appearance='info' title='Настройки сохранены' description='Изменения применены ко всем активным проектам.' />
  );
}
```

#### 2. Ошибка с close-кнопкой

```tsx
import { Alert } from '@ds/alert';

export function Error() {
  return (
    <Alert
      appearance='error'
      title='Не удалось сохранить'
      description='Проверьте подключение к сети и повторите попытку.'
      onClose={() => undefined}
    />
  );
}
```

#### 3. Алерт с действиями

```tsx
import { Alert } from '@ds/alert';

export function WithActions() {
  return (
    <Alert
      appearance='warning'
      title='Требуется подтверждение'
      description='Операция необратима. Продолжить?'
      actions={{
        primary: { label: 'Продолжить', onClick: () => undefined },
        secondary: { label: 'Отмена', onClick: () => undefined },
      }}
    />
  );
}
```

#### 4. Сворачиваемый алерт

Длинное описание скрыто до клика по заголовку

```tsx
import { Alert } from '@ds/alert';

export function Collapsible() {
  return (
    <Alert
      appearance='info'
      collapsible
      title='Совет по настройке'
      description='Полное описание того, как правильно настроить функцию. Текст длинный и сворачивается до раскрытия.'
    />
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "size" | "variant">; }` | — | Кнопки в футере |
| `align` | `"horizontal"` \| `"vertical"` | `vertical` | Выравнивание контента |
| `appearance` | `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `data-test-id` | `string` | — |  |
| `description` | `ReactNode` | — | Описание |
| `icon` | `boolean` | — | Отображать иконку |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `outline` | `boolean` | — | Внешний бордер |
| `size` | `"m"` \| `"s"` | — | Размер |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |

## AlertTop

Системный баннер по верхней кромке приложения — всегда на сплошной цветной подложке, используется для глобальных уведомлений.

Глобальный баннер, который крепится к верхней кромке приложения. В отличие от `Alert`, всегда рендерится на сплошной цветной подложке (определяется `appearance`) и не поддерживает `outline` — визуально это «полоса сообщения», а не карточка.

### Когда использовать

- Для плановых технических работ и maintenance-окон.
- Для глобальных ограничений (например, «В вашем регионе временно недоступны платежи»).
- Для системных анонсов, которые касаются всех пользователей приложения.

Когда **не** нужен: для сообщений, которые касаются конкретной страницы или формы — используйте `Alert`.

### Анатомия

#### Appearance
Семантическая роль топ-баннера: `neutral`/`primary` — нейтрально-информативная подача, `info` — информ-акцент, `success` — успех (редко в топ-баннере), `warning` — предупреждение (maintenance), `error` — критическое ограничение/инцидент.

#### Align
Выравнивание заголовка и описания: `horizontal` — в одну строку (короткий анонс), `vertical` — заголовок над текстом (длинное описание + действие).

#### Size
Плотность баннера: `s` — компактный, `m` — дефолт.

### Установка

```bash
pnpm add @ds/alert
```

```ts
import { AlertTop } from '@ds/alert'
```

### Примеры использования

#### Системное уведомление

```tsx
import { AlertTop } from '@ds/alert';

export function SystemNotice() {
  return (
    <AlertTop
      appearance='info'
      title='Плановые работы'
      description='Сегодня с 22:00 до 23:00 возможны кратковременные перебои.'
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "size" | "variant">; }` | — | Кнопки в футере |
| `align` | `"horizontal"` \| `"vertical"` | `vertical` | Выравнивание контента |
| `appearance` | `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `data-test-id` | `string` | — |  |
| `description` | `ReactNode` | — | Описание |
| `icon` | `boolean` | — | Отображать иконку |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `size` | `"m"` \| `"s"` | — | Размер |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |

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
| `actions` | `{ primary: Omit<AlertButtonProps, "size" | "variant">; secondary?: Omit<AlertButtonProps, "size" | "variant">; }` | — | Кнопки в футере |
| `align` | `"horizontal"` \| `"vertical"` | — | Выравнивание контента |
| `appearance` | `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `data-test-id` | `string` | — |  |
| `description` | `ReactNode` | — | Описание |
| `icon` | `boolean` | — | Отображать иконку |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `outline` | `boolean` | — |  |
| `size` | `"m"` \| `"s"` | — | Размер |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |
| `variant` | `"inline"` \| `"top"` | — |  |

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
| `as` | `ElementType` | — | Элемент или компонент для рендера: 'button' | 'a' | ComponentType (например Link из react-router-dom) |
| `className` | `string` | — | Дополнительный класс |
| `disabled` | `boolean` | `false` | Отключена |
| `icon` | `ReactNode` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | `before` | Позиция иконки относительно текста |
| `innerRef` | `any` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `invertFocusOutlineColor` | `boolean` | — | Инвертировать цвет фокусного контура |
| `label` | `string` | — | Текст кнопки |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `size` | `"m"` \| `"s"` | `m` | Размер |
| `variant` | `"onAccent"` \| `"onColor"` | `onColor` | Вариант оформления |
