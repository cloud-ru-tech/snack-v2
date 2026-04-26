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

## Демо

<TooltipDemo client:visible />

## Когда использовать

- Для раскрытия контекста на icon-only кнопке («Настройки», «Экспорт»).
- Для подсказки по disabled-элементу — почему он недоступен.
- Для аббревиатур и терминов в таблицах.

Когда **не** нужен: для длинного описания — вместо этого Popover или отдельная страница.

## Установка

```bash
pnpm add @ds/tooltip
```

```ts
import { Tooltip } from '@ds/tooltip'
```

## Примеры использования

<Example
  title='1. Базовая подсказка'
  description='Hover + focus по умолчанию'
  code={BasicSrc}
>
  <Basic client:visible />
</Example>

<Example
  title='2. Click trigger'
  description='Открывается по клику и остаётся видимой'
  code={ClickTriggerSrc}
>
  <ClickTrigger client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `tip` | `ReactNode` | — | Содержимое тултипа (текст или разметка) |
| `disableMaxWidth` | `boolean` | `false` | Отключение ограничения ширины тултипа |
| `className` | `string` | — |  |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `hoverDelayOpen` | `number` | `0` | Задержка открытия по ховеру |
| `hoverDelayClose` | `number` | `0` | Задержка закрытия по ховеру |
| `triggerRef` | `ForwardedRef<ReferenceType | HTMLElement | null>` | — | Ref ссылка на триггер |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера
<br/>
Пригодится для элементов с `position: absolute` |
| `fallbackPlacements` | `Placement[]` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
| `trigger` | `"hoverAndFocusVisible"` \| `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | `TRIGGER.HoverAndFocusVisible` | Условие отображения поповера:
<br/> - `click` - открывать по клику
<br/> - `hover` - открывать по ховеру
<br/> - `focusVisible` - открывать по focus-visible
<br/> - `focus` - открывать по фокусу
<br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible
<br/> - `hoverAndFocus` - открывать по ховеру и фокусу
<br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `placement` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` \| `"left-start"` \| `"left-end"` \| `"right-start"` \| `"right-end"` \| `"top-start"` \| `"top-end"` \| `"bottom-start"` \| `"bottom-end"` | `PLACEMENT.Top` | Положение поповера относительно своего триггера (children). |
| `children` | `ReactNode | ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |

## Storybook

<StorybookEmbed storyId='components-tooltip-tooltip--playground' height={320} />

## Анатомия

### Size
`xs` — короткие подписи на одной строке, `s` — многострочные подсказки и описания.

## QuestionTooltip

Специализированный тултип с готовым триггером-иконкой «?» — для подсказок к полям форм и терминам.

Тултип с встроенным триггером — иконкой «?» размером 16px. Использует `Tooltip` под капотом, добавляя стандартный triggerButton с `aria-label`.

## Демо

<QuestionTooltipDemo client:visible />

## Когда использовать

- Рядом с названием поля формы, чтобы объяснить назначение поля.
- Рядом с термином или аббревиатурой в тексте и таблицах.
- В онбординговых состояниях — пояснение новой фичи.

## Установка

```bash
pnpm add @ds/tooltip
```

```ts
import { QuestionTooltip } from '@ds/tooltip'
```

## Примеры использования

<Example
  title='Подсказка к полю формы'
  description='aria-label триггера задаётся через triggerLabel'
  code={QuestionSrc}
>
  <Question client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `tip` | `ReactNode` | — | Содержимое тултипа (текст или разметка) |
| `disableMaxWidth` | `boolean` | `false` | Отключение ограничения ширины тултипа |
| `className` | `string` | — |  |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `triggerRef` | `ForwardedRef<ReferenceType | HTMLElement | null>` | — | Ref ссылка на триггер |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера
<br/>
Пригодится для элементов с `position: absolute` |
| `fallbackPlacements` | `Placement[]` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
| `trigger` | `"hoverAndFocusVisible"` \| `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | `TRIGGER.Hover` | Условие отображения поповера:
<br/> - `click` - открывать по клику
<br/> - `hover` - открывать по ховеру
<br/> - `focusVisible` - открывать по focus-visible
<br/> - `focus` - открывать по фокусу
<br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible
<br/> - `hoverAndFocus` - открывать по ховеру и фокусу
<br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `placement` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` \| `"left-start"` \| `"left-end"` \| `"right-start"` \| `"right-end"` \| `"top-start"` \| `"top-end"` \| `"bottom-start"` \| `"bottom-end"` | `top` | Положение поповера относительно своего триггера (children). |
| `children` | `ReactNode | ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `tooltipClassname` | `string` | — | CSS-класс контейнера подсказки |
| `triggerLabel` | `string` | `Подсказка` | Доступное имя для иконки-триггера |
| `tabIndex` | `number` | `0` | Tab index для кнопки-триггера |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |

## Storybook

<StorybookEmbed storyId='components-tooltip-questiontooltip--playground' height={320} />

## Анатомия

### Size
Размер триггера-иконки и тултипа: `xs` — для плотных форм, `s` — дефолт рядом с заголовками секций.
