# Tooltip

`@ds/tooltip` — Пакет подсказок — компонент Tooltip для произвольного триггера и QuestionTooltip с иконкой «?» для полей форм и сложной терминологии.

Пакет `@ds/tooltip` содержит всплывающие подсказки:

- ****Tooltip**** — универсальная подсказка. Оборачивает произвольный триггер (кнопка, иконка, текст) и показывает pop-up по hover, focus или клику.
- ****QuestionTooltip**** — специализированный вариант с готовым триггером «?» для полей форм и терминов.

## Установка

```bash
pnpm add @ds/tooltip
```

```ts
import { Tooltip, QuestionTooltip } from '@ds/tooltip'
```

## Tooltip

Всплывающая подсказка над произвольным триггером — четыре placement, четыре варианта trigger, поддержка клавиатуры и screen-reader.

Pop-up-подсказка над произвольным триггером. Принимает `children` (сам триггер) и `tip` (содержимое подсказки).

### Когда использовать

- Для раскрытия контекста на icon-only кнопке («Настройки», «Экспорт»).
- Для подсказки по disabled-элементу — почему он недоступен.
- Для аббревиатур и терминов в таблицах.

Когда **не** нужен: для длинного описания — вместо этого Popover или отдельная страница.

### Анатомия

#### Size
`xs` — короткие подписи на одной строке, `s` — многострочные подсказки и описания.

### Примеры использования

#### 1. Базовая подсказка

Hover + focus по умолчанию

```tsx
import { Tooltip } from '@ds/tooltip';

export function Basic() {
  return (
    <Tooltip tip='Сохранить изменения'>
      <button type='button'>Сохранить</button>
    </Tooltip>
  );
}
```

#### 2. Click trigger

Открывается по клику и остаётся видимой

```tsx
import { Tooltip } from '@ds/tooltip';

export function ClickTrigger() {
  return (
    <Tooltip tip='Открывается по клику и остаётся видимой' trigger='click'>
      <button type='button'>Подробнее</button>
    </Tooltip>
  );
}
```

### Props

**TooltipProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `className` | `string` | — |  |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `data-test-id` | `string` | — |  |
| `disableMaxWidth` | `boolean` | `false` | Отключение ограничения ширины тултипа |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` <br/> Работает для триггеров, которые умеют отдать свою DOM-ноду: нативные элементы, `forwardRef`-компоненты <br/> и компоненты, помеченные `withInnerRefSupport` из `@ds/utils`. Остальные всё равно получают `<span>` — <br/> без ноды поповеру не от чего считать позицию; в dev-режиме об этом печатается предупреждение. |
| `fallbackPlacements` | `Placement` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `hoverDelayClose` | `number` | `0` | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | `0` | Задержка открытия по ховеру |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `tip` | `ReactNode` | — | Содержимое тултипа (текст или разметка) |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | `hoverAndFocusVisible` | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerRef` | `ForwardedRef<HTMLElement \| ReferenceType \| null>` | — | Ref ссылка на триггер |

##### Related types

- `Placement` = `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"`

## QuestionTooltip

Специализированный тултип с готовым триггером-иконкой «?» — для подсказок к полям форм и терминам.

Тултип с встроенным триггером — иконкой «?» размером 16px. Использует `Tooltip` под капотом, добавляя стандартный triggerButton с `aria-label`.

### Когда использовать

- Рядом с названием поля формы, чтобы объяснить назначение поля.
- Рядом с термином или аббревиатурой в тексте и таблицах.
- В онбординговых состояниях — пояснение новой фичи.

### Анатомия

#### Size
Размер триггера-иконки и тултипа: `xs` — для плотных форм, `s` — дефолт рядом с заголовками секций.

### Примеры использования

#### Подсказка к полю формы

aria-label триггера задаётся через triggerLabel

```tsx
import { QuestionTooltip } from '@ds/tooltip';

export function Question() {
  return (
    <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <span>API-ключ</span>
      <input type='text' name='api-key' placeholder='sk_...' />
      <QuestionTooltip tip='Строка из 32 символов. Хранится зашифрованной, видна только владельцу.' />
    </label>
  );
}
```

### Props

**QuestionTooltipProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `className` | `string` | — |  |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `data-test-id` | `string` | — |  |
| `disableMaxWidth` | `boolean` | `false` | Отключение ограничения ширины тултипа |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` <br/> Работает для триггеров, которые умеют отдать свою DOM-ноду: нативные элементы, `forwardRef`-компоненты <br/> и компоненты, помеченные `withInnerRefSupport` из `@ds/utils`. Остальные всё равно получают `<span>` — <br/> без ноды поповеру не от чего считать позицию; в dev-режиме об этом печатается предупреждение. |
| `fallbackPlacements` | `Placement` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `tabIndex` | `number` | `0` | Tab index для кнопки-триггера |
| `tip` | `ReactNode` | — | Содержимое тултипа (текст или разметка) |
| `tooltipClassname` | `string` | — | CSS-класс контейнера подсказки |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | `hover` | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerLabel` | `string` | `Подсказка` | Доступное имя для иконки-триггера |
| `triggerRef` | `ForwardedRef<HTMLElement \| ReferenceType \| null>` | — | Ref ссылка на триггер |

##### Related types

- `Placement` = `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"`

- `Size` = `"s"` \| `"xs"`
