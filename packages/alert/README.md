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

### Примеры использования
#### 1. Информационный алерт

```tsx
import { Alert } from '@ds/alert';

export function Info() {
  return (
    <Alert appearance='info' title='Настройки сохранены' content='Изменения применены ко всем активным проектам.' />
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
      content='Проверьте подключение к сети и повторите попытку.'
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
      content='Операция необратима. Продолжить?'
      actions={{
        primary: { label: 'Продолжить', onClick: () => undefined },
        secondary: { label: 'Отмена', onClick: () => undefined },
      }}
    />
  );
}
```

#### 4. Сворачиваемый алерт

```tsx
import { Alert } from '@ds/alert';

export function Collapsible() {
  return (
    <Alert
      appearance='info'
      collapsible
      title='Совет по настройке'
      content='Полное описание того, как правильно настроить функцию. Текст длинный и сворачивается до раскрытия.'
    />
  );
}
```

### Props
**AlertProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `AlertButtonProps` | — | Кнопки в футере |
| `align` | `"horizontal"` \| `"vertical"` | `vertical` | Выравнивание контента |
| `appearance` | `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop). <br/> При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `content` | `ReactNode` | — | Описание |
| `data-test-id` | `string` | — |  |
| `icon` | `boolean` | — | Отображать иконку |
| `layoutPresets` | `AlertLayoutDefaults` \| `LayoutPresets` | — | Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `ALERT_LAYOUT_PRESETS`). <br/> Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`. |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `outline` | `boolean` | — | Внешний бордер |
| `size` | `"m"` \| `"s"` | — | Размер |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |

##### Related types

**AlertButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `className` | `string \| undefined` | — | Дополнительный класс |
| `disabled` | `boolean \| undefined` | — | Отключена |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | — | Позиция иконки относительно текста |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `invertFocusOutlineColor` | `boolean \| undefined` | — | Инвертировать цвет фокусного контура |
| `label` | `string \| undefined` | — | Текст кнопки |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `size` | `"m"` \| `"s"` | — | Размер |
| `variant` | `"onAccent"` \| `"onColor"` | — | Вариант оформления |

**AlertLayoutDefaults**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `truncate` | `{ title?: number; } \| undefined` | — | Максимальное кол-во строк (только при `collapsible={false}`). |

- `Align` = `"horizontal"` \| `"vertical"`

- `Appearance` = `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"`

- `ButtonSize` = `"m"` \| `"s"`

- `ButtonVariant` = `"onAccent"` \| `"onColor"`

- `IconPosition` = `"after"` \| `"before"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `Size` = `"m"` \| `"s"`

### Адаптивность

`Alert` — адаптивный компонент класса preset-defaults: DOM один, по раскладке меняются только дефолты пропсов. Раскладку компонент читает из контекста **`@ds/adaptive`** — отдельного пропа `layoutType` нет.

> **Desktop-first.** Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-дефолты применяются автоматически. Override нужен только как escape-hatch.

На mobile заголовок усекается до **двух** строк вместо одной — на узких экранах это сохраняет читаемость без обрезки полезного текста.

| Проп | desktop | mobile |
|------|---------|--------|
| `truncate.title` | `1` | `2` |

Источник mobile-дефолтов — экспортируемая константа `ALERT_LAYOUT_PRESETS`.

#### Как переопределить

**Desktop-first:** перенос пропа из desktop-макета не ломает mobile. Приоритет (от высшего к низшему): `layoutPresets[layout]` (инстанс) → DS-пресет `ALERT_LAYOUT_PRESETS` → явный проп (= desktop-значение) → базовый дефолт.

```tsx
import { Alert } from '@ds/alert'

// 1. Явный проп — задаёт DESKTOP-значение; mobile остаётся 2 строки (mobile не ломается)
<Alert truncate={{ title: 3 }} title='…' content='…' />

// 2. layoutPresets.mobile — единственный способ изменить mobile (явно)
<Alert layoutPresets={{ mobile: { truncate: { title: 3 } } }} title='…' content='…' />

// 2b. layoutPresets.desktop — изменить только desktop, mobile-адаптив сохранён
<Alert layoutPresets={{ desktop: { truncate: { title: 3 } } }} title='…' content='…' />
```

DS-пресет (`ALERT_LAYOUT_PRESETS`) — точка форка mobile-дефолтов на уровне всей дизайн-системы.

#### Как форсировать раскладку

Раскладка переключается только контекстом, не пропом:

```tsx
import { AdaptiveProvider, withLayoutType } from '@ds/adaptive'
import { Alert } from '@ds/alert'

// поддерево — вложенный провайдер
<AdaptiveProvider layoutType='mobile'>
  <Alert title='…' content='…' />
</AdaptiveProvider>

// компонент/секция — HOC (module-scope, не в рендере)
const MobileAlert = withLayoutType(Alert, 'mobile')
```

Подробнее о модели раскладки — в **`@ds/adaptive`**.

#### Mobile — усечение заголовка

Раскладка форсирована в mobile: на узком экране длинный заголовок усекается в две строки вместо одной.

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Alert } from '@ds/alert';

const LONG_TITLE = 'Плановые технические работы в дата-центре: часть сервисов будет недоступна с 02:00 до 04:00 МСК';

export function AdaptiveTruncate() {
  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <div style={{ maxWidth: 360 }}>
        <Alert appearance='info' title={LONG_TITLE} content='На узком экране заголовок усекается в две строки.' />
      </div>
    </AdaptiveProvider>
  );
}
```

> Playground ниже показывает только переключение раскладки — сам текст короткий и не переносится ни на одной раскладке (кириллица в URL-args Storybook не резолвится, см. пример выше для наглядного усечения).

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

### Примеры использования

#### Системное уведомление

```tsx
import { AlertTop } from '@ds/alert';

export function SystemNotice() {
  return (
    <AlertTop
      appearance='info'
      title='Плановые работы'
      content='Сегодня с 22:00 до 23:00 возможны кратковременные перебои.'
    />
  );
}
```

### Props

**AlertTopProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `AlertButtonProps` | — | Кнопки в футере |
| `align` | `"horizontal"` \| `"vertical"` | `vertical` | Выравнивание контента |
| `appearance` | `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"` | — | Внешний вид |
| `className` | `string` | — | CSS-класс |
| `collapsible` | `boolean` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop). <br/> При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| `content` | `ReactNode` | — | Описание |
| `data-test-id` | `string` | — |  |
| `icon` | `boolean` | — | Отображать иконку |
| `layoutPresets` | `AlertTopLayoutDefaults` \| `LayoutPresets` | — | Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `ALERT_TOP_LAYOUT_PRESETS`). <br/> Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`. |
| `onClose` | `(() => void)` | — | Колбек закрытия |
| `size` | `"m"` \| `"s"` | — | Размер |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; }` | `title: 1` | Максимальное кол-во строк (только при `collapsible={false}`). |

##### Related types

**AlertButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `className` | `string \| undefined` | — | Дополнительный класс |
| `disabled` | `boolean \| undefined` | — | Отключена |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | — | Позиция иконки относительно текста |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `invertFocusOutlineColor` | `boolean \| undefined` | — | Инвертировать цвет фокусного контура |
| `label` | `string \| undefined` | — | Текст кнопки |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `size` | `"m"` \| `"s"` | — | Размер |
| `variant` | `"onAccent"` \| `"onColor"` | — | Вариант оформления |

**AlertTopLayoutDefaults**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsible` | `boolean \| undefined` | — | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop). <br/> При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |

- `Align` = `"horizontal"` \| `"vertical"`

- `Appearance` = `"error"` \| `"info"` \| `"neutral"` \| `"primary"` \| `"success"` \| `"warning"`

- `ButtonSize` = `"m"` \| `"s"`

- `ButtonVariant` = `"onAccent"` \| `"onColor"`

- `IconPosition` = `"after"` \| `"before"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `Size` = `"m"` \| `"s"`

### Адаптивность

`AlertTop` — адаптивный компонент класса preset-defaults: DOM один, по раскладке меняются только дефолты пропсов. Раскладку компонент читает из контекста **`@ds/adaptive`** — отдельного пропа `layoutType` нет.

> **Desktop-first.** Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-дефолты применяются автоматически. Override нужен только как escape-hatch.

На mobile баннер становится **раскрываемым** (`collapsible`): длинный текст и действия скрыты до клика по баннеру, на месте close-кнопки появляется шеврон раскрытия. На desktop баннер плоский.

| Проп | desktop | mobile |
|------|---------|--------|
| `collapsible` | `false` | `true` |

Источник mobile-дефолтов — экспортируемая константа `ALERT_TOP_LAYOUT_PRESETS`.

#### Как переопределить

**Desktop-first:** перенос пропа из desktop-макета не ломает mobile. Приоритет (от высшего к низшему): `layoutPresets[layout]` (инстанс) → DS-пресет `ALERT_TOP_LAYOUT_PRESETS` → явный проп (= desktop-значение) → базовый дефолт.

```tsx
import { AlertTop } from '@ds/alert'

// 1. Явный проп — задаёт DESKTOP-значение; mobile остаётся collapsible (mobile не ломается)
<AlertTop collapsible={false} title='…' content='…' />

// 2. layoutPresets.mobile — единственный способ изменить mobile (явно)
<AlertTop layoutPresets={{ mobile: { collapsible: false } }} title='…' content='…' />

// 2b. layoutPresets.desktop — изменить только desktop, mobile-адаптив сохранён
<AlertTop layoutPresets={{ desktop: { collapsible: true } }} title='…' content='…' />
```

DS-пресет (`ALERT_TOP_LAYOUT_PRESETS`) — точка форка mobile-дефолтов на уровне всей дизайн-системы.

#### Как форсировать раскладку

Раскладка переключается только контекстом, не пропом:

```tsx
import { AdaptiveProvider, withLayoutType } from '@ds/adaptive'
import { AlertTop } from '@ds/alert'

// поддерево — вложенный провайдер
<AdaptiveProvider layoutType='mobile'>
  <AlertTop title='…' content='…' />
</AdaptiveProvider>

// компонент/секция — HOC (module-scope, не в рендере)
const MobileAlertTop = withLayoutType(AlertTop, 'mobile')
```

Подробнее о модели раскладки — в **`@ds/adaptive`**.
