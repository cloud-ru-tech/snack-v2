# Fields

`@ds/fields` — Поля ввода с единой обёрткой label/caption/hint/error и общими осями size/validationState — текст, пароль, число, ползунок, дата, время, выбор, цвет.

Пакет `@ds/fields` объединяет поля ввода с общими осями `size` (`s`/`m`/`l`) и `validationState` (`default`/`error`/`warning`/`success`) и единой обёрткой label/caption/hint/error.

- **`FieldText`** — однострочное текстовое поле.
- **`FieldSecure`** — поле для паролей и токенов с переключателем видимости.
- **`FieldTextArea`** — многострочное поле с опциональным resize.
- **`FieldStepper`** — числовое поле с кнопками −/+.
- **`FieldSlider`** — поле с ползунком + связанным input'ом.
- **`FieldSelect`** — выпадающий список с одиночным и множественным выбором.
- **`FieldDate`** — поле выбора даты/даты-времени с календарём и маской ввода.
- **`FieldTime`** — поле выбора времени с пикером и маской.
- **`FieldColor`** — поле выбора цвета с ColorPicker в дропдауне.

Структурная обёртка `FieldDecorator` (label/caption/hint/error/length) вынесена в отдельный пакет **`@ds/field-decorator`**.

## Установка

```bash
pnpm add @ds/fields
```

```ts
import {
  FieldText,
  FieldSecure,
  FieldTextArea,
  FieldStepper,
  FieldSlider,
  FieldSelect,
  FieldDate,
  FieldTime,
  FieldColor,
} from '@ds/fields'
```

## FieldColor

```tsx
import { FieldColor } from '@ds/fields';
import { useState } from 'react';

export function ColorBasic() {
  const [value, setValue] = useState('#1976d2');
  return (
    <FieldColor
      label='Цвет акцента'
      hint='Откройте палитру шевроном или кликом по полю'
      value={value}
      onChange={setValue}
    />
  );
}
```

### Props `FieldColorProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoApply` | `boolean` | `true` | Применять изменения автоматически. Если `false` — появляются кнопки Cancel/Apply. <br/> По умолчанию `true` — без футера (паритет с Figma colorPicker, где Cancel/Apply нет). |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `availableModes` | `ColorMode` | `['hex', 'hsv', 'rgb']` | Какие цветовые модели доступны переключателю. |
| `background` | `boolean` | `true` | Фон поля (acrylic). |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | `field-color` |  |
| `defaultValue` | `string` | `` | Начальное значение (uncontrolled-режим). |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим работы экранной клавиатуры |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string) => void)` | — | Колбек смены значения. |
| `onClearButtonClick` | `(() => void)` | — | Колбек после клика по кнопке очистки. |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения. |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onOpenChange` | `((open: boolean) => void)` | — | Колбек смены состояния открытия. |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `open` | `boolean` | — | Открыт color-picker. |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки (видна при value && !readonly && !disabled). |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования (видна при readonly && value && !disabled). |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `type` | `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"` | — | Тип инпута |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `string` | — | Текущее значение (hex/rgb/hsl-строка, controlled-режим). |
| `withAlpha` | `boolean` | `true` | Управляет альфа-каналом палитры и наличием поля Alpha. |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

## FieldCombo

```tsx
import { FieldCombo } from '@ds/fields';
import { useState } from 'react';

export function Affixes() {
  const [value, setValue] = useState('100');
  return <FieldCombo label='Сумма' prefix='$' postfix='USD' value={value} onChange={setValue} />;
}
```

### Props `FieldComboProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `false` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | `` | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `elementAfter` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот справа (кнопка / селект с опциональным выпадающим списком) |
| `elementBefore` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот слева (кнопка / селект с опциональным выпадающим списком) |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `hint` | `string` | — | Подсказка |
| `iconAfter` | `ReactNode` | — | Иконка справа от строки ввода |
| `iconBefore` | `ReactNode` | — | Иконка слева от строки ввода |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `innerTestIds` | `{ shell?: string; input?: string; } \| undefined` | — | Идентификаторы внутренних слотов — оболочки и строки ввода. Нужны компонентам, которые <br/> рендерят `FieldCombo` под собственным именем (`FieldText`): их e2e адресует свои слоты, <br/> а не слоты `FieldCombo`. |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим работы экранной клавиатуры |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `(() => void)` | — | Колбек клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `outline` | `boolean` | `true` | Разделитель между основным полем и слотами `elementBefore` / `elementAfter` |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `postfix` | `ReactNode` | — | Постфикс (текст или нода) |
| `prefix` | `ReactNode` | — | Префикс (текст или нода) |
| `prefixIcon` | `ReactNode` | — | Ведущая иконка. <br/> @deprecated Используйте `iconBefore` — он приоритетнее, если заданы оба. |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (как в Search) |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`) |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `type` | `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"` | — | Тип инпута |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `string` | — | Значение поля (controlled-режим) |

#### Related types

- `ButtonSize` = `"l"` \| `"m"` \| `"s"`

**FieldElementButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Содержимое (иконка и т.д.) |
| `className` | `string \| undefined` | — | CSS-класс (передаётся обёрткой `Droplist` / `PopoverPrivate` на триггер) |
| `data-test-id` | `string \| undefined` | — | data-test-id кнопки-слота |
| `disabled` | `boolean \| undefined` | — | Деактивировано |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `onClick` | `(() => void) \| undefined` | — | Обработчик клика |
| `onKeyDown` | `((event: KeyboardEvent<HTMLButtonElement>) => void) \| undefined` | — | Обработчик нажатия клавиш (передаётся обёрткой `Droplist` для ArrowDown/ArrowUp) |
| `open` | `boolean \| undefined` | — | Контролируемое состояние раскрытия (используется обёрткой `FieldElementButtonList`). <br/> Если задано — шеврон отражает это значение; иначе кнопка управляет шевроном сама. |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер (совпадает с размером поля) |
| `tabIndex` | `number \| undefined` | — | HTML tabIndex (`-1` — исключить кнопку из tab-order, фокус по Tab уходит в поле) |
| `variant` | `"after"` \| `"before"` | — | Положение относительно поля |
| `withDropdownList` | `boolean \| undefined` | — | Показать шеврон раскрытия |

**FieldElementSlot**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Содержимое (иконка и т.д.) |
| `className` | `string \| undefined` | — | CSS-класс (передаётся обёрткой `Droplist` / `PopoverPrivate` на триггер) |
| `data-test-id` | `string \| undefined` | — | data-test-id кнопки-слота |
| `disabled` | `boolean \| undefined` | — | Деактивировано |
| `droplist` | `DroplistListProps` \| `DroplistMobileSlots` \| `EmptyState` \| `FieldElementDroplistProps` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — | Встроенный выпадающий список (действия / выбор) на `@ds/list` `Droplist` |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `onClick` | `(() => void) \| undefined` | — | Обработчик клика |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер (совпадает с размером поля) |
| `tabIndex` | `number \| undefined` | — | HTML tabIndex (`-1` — исключить кнопку из tab-order, фокус по Tab уходит в поле) |
| `withDropdownList` | `boolean \| undefined` | — | Показать шеврон раскрытия |

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

- `Variant` = `"after"` \| `"before"`

## FieldDate

```tsx
import { FieldDate } from '@ds/fields';
import { useState } from 'react';

export function DateBasic() {
  const [value, setValue] = useState<Date | undefined>(undefined);
  return <FieldDate label='Дата' hint='Маска DD.MM.YYYY или выбор в календаре' value={value} onChange={setValue} />;
}
```

### Props `FieldDateProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoFocus` | `boolean` | — | Автофокус input при монтировании. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `buildCellProps` | `BuildCellPropsFunction` | — | Колбек установки свойств ячеек календаря. Вызывается на построение каждой ячейки. Принимает два параметра: <br/> <br> `Date` - дата ячейки <br/> <br> `ViewMode`: <br/> <br> - `month` отображение месяца, каждая ячейка - 1 день <br/> <br> - `year` отображение года, каждая ячейка - 1 месяц <br/> <br> - `decade` отображение декады, каждая ячейка - 1 год <br/> <br><br> Колбек должен возвращать объект с полями, отвечающими за отключение и подкраску ячейки. |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `closeOnApply` | `boolean` | — | Закрыть dropdown после нажатия Apply. |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `DateRangeValue` \| `DateValue` | — | Неуправляемое значение по умолчанию |
| `disabled` | `boolean` | — | Поле выключено <br/> Деактивировано |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `hint` | `string` | — | Подсказка |
| `iconBefore` | `ReactNode` | — | Иконка перед текстом (если не задано — `CalendarSVG`) |
| `id` | `string` | — | HTML-атрибут `id` для input (и `for` у label) |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelFrom` | `string` | `'Начало периода'` | `aria-label` поля начала периода (режим `date-range`). |
| `labelTo` | `string` | `'Конец периода'` | `aria-label` поля конца периода (режим `date-range`). |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `locale` | `Intl.Locale` | `Проставляется в соответствие с языком в настройках браузера` | Локаль, в соответствие с которой выставляется язык названий и первый день недели |
| `mode` | `"date"` \| `"date-range"` \| `"date-time"` | — | Режим выбора даты. По умолчанию `'date'`. <br/> Режим выбора периода |
| `name` | `string` | — | HTML-атрибут `name` для input |
| `onBlur` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек блюра input |
| `onChange` | `((value: DateValue) => void) \| ((value: DateRangeValue) => void)` | — | Колбек смены значения |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек фокуса input |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `placeholder` | `string` | — | Placeholder в триггере, когда нет значения |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `presets` | `PresetsOptions` | — | Настройки секции с пресетами быстрого выбора периода. Доступны только при mode === 'date-range' и отсутствии buildCellProps (временно PDS-3139) |
| `readonly` | `boolean` | — | Только для чтения <br/> Read-only режим |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (✕). Активна, когда есть значение и поле не disabled/readonly. |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly` и непустом значении). |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `showHolidays` | `boolean` | — | Раскрашивает субботу и воскресенье |
| `showSeconds` | `boolean` | `true` | Показывать секунды в режиме `date-time` (в маске и в выпадающем календаре). |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `today` | `number \| Date` | — | Дата сегодняшнего дня |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | — | Состояние валидации |
| `value` | `DateRangeValue` \| `DateValue` | — | Управляемое значение |

#### Related types

**DateRangeValue**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `0` | `any` | — |  |
| `1` | `any` | — |  |
| `length` | `any` | — |  |

- `DateValue` = `Date | undefined`

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

## FieldSecure

```tsx
import { FieldSecure } from '@ds/fields';
import { useState } from 'react';

export function Secure() {
  const [value, setValue] = useState('');
  return (
    <FieldSecure
      label='Пароль'
      required
      placeholder='Минимум 8 символов'
      hint='Не передавайте пароль третьим лицам'
      showHintIcon
      value={value}
      onChange={setValue}
    />
  );
}
```

### Props `FieldSecureProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `false` | Разрешить ввод свыше `maxLength` символов. |
| `asyncValueGetter` | `(() => Promise<string>)` | — | Async-загрузчик значения. Вызывается перед раскрытием/копированием значения, <br/> результат передаётся через `onChange`. Во время запроса показывается Skeleton. <br/> После успешного запроса значение считается полученным и больше не запрашивается. |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultHidden` | `boolean` | `true` | Начальное состояние маскирования (uncontrolled-режим). Кнопка «глаз» переключает <br/> маскирование сама; `hidden` для этого передавать не нужно. |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `hidden` | `boolean` | — | Скрыто ли значение (controlled). Для uncontrolled-режима используйте `defaultHidden`. |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим работы экранной клавиатуры |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onHiddenChange` | `((hidden: boolean) => void)` | — | Колбек смены маскирования |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `prefixIcon` | `ReactNode` | — | Ведущая иконка. <br/> @deprecated Используйте `iconBefore`. |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования (только при `readonly = true` и непустом `value`) |
| `showHideButton` | `boolean` | `true` | Показывать кнопку «глаз» |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `string` | — | Значение (controlled-режим) |

## FieldSelect

```tsx
import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 's', content: { label: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { label: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { label: 'Large (4 vCPU, 8 GB)' } },
  { id: 'xl', content: { label: 'X-Large (8 vCPU, 16 GB)' } },
];

export function Select() {
  const [value, setValue] = useState<ItemId | undefined>('m');
  return (
    <FieldSelect
      label='Размер инстанса'
      placeholder='Выберите размер'
      selection='single'
      items={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

### Props `FieldSelectProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `addOptionByEnter` | `boolean` | `false` | Зафиксировать введённый текст как новый выбор по `Enter` (создание опции «на лету»). |
| `autoFocus` | `boolean` | — | Автофокус input при монтировании. На mobile выключается адаптивно (см. `layoutPresets`) |
| `autocomplete` | `boolean` | `false` | Не фильтровать список на клиенте — фильтрацию обеспечивает потребитель (серверный поиск). <br/> Введённый текст уходит в `search.onChange`, список берётся из `items` как есть. |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `chips` | `boolean` | `true` | Отображать выбранные значения как чипы (`@ds/tag`) внутри поля. Если `false`, <br/> показывает строку из `formatSelected` либо comma-joined. |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `closeDroplistOnItemClick` | `boolean` | `true false` | Закрывать дроплист после клика на айтем. |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `data-test-id` | `string` | — | Тестовый id корня |
| `dataError` | `DroplistProps` | — | Флаг «ошибка загрузки данных» — при `true` дроплист рендерит `errorDataState` <br/> вместо списка (для асинхронной подгрузки с провалившимся запросом). |
| `dataFiltered` | `DroplistProps` | — | Флаг «список отфильтрован» — при `true` и пустом результате дроплист рендерит <br/> `noResultsState`. По умолчанию выводится из строки поиска (`searchable` + ввод). |
| `defaultValue` | `ItemId` | — | Неуправляемое значение по умолчанию. Пустая строка трактуется как «значение не выбрано». <br/> Неуправляемые значения по умолчанию |
| `disabled` | `boolean` | — | Поле выключено <br/> Деактивировано |
| `enableFuzzySearch` | `boolean` | `true` | Включить нечёткий поиск: символы запроса должны встречаться в лейбле в том же порядке <br/> (например, `lge` найдёт `Large`). Если `false` — простой substring-match. |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `formatSelected` | `((selected: { id: ItemId; label: string; }[]) => string)` | `— список лейблов через `, `` | Форматтер строки выбранных значений (используется, если `chips=false`). |
| `hint` | `string` | — | Подсказка |
| `iconBefore` | `ReactNode` | — | Иконка перед текстом |
| `id` | `string` | — | HTML-атрибут `id` для input (и `for` у label) |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `items` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `ItemProps` \| `ScrollProps` | — | Список айтемов дроплиста (формат `@ds/list`) |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `limitedScrollHeight` | `boolean` | — | Ограничить максимальную высоту скролл-контейнера в зависимости от `size` |
| `loading` | `boolean` | — | Флаг, отвечающий за состояние загрузки списка |
| `name` | `string` | — | HTML-атрибут `name` для input |
| `noDataState` | `EmptyStateProps` | — | Экран при отсутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отсутствии результатов поиска или фильтров |
| `onBlur` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек блюра input |
| `onChange` | `((value: ItemId) => void) \| ((value: ItemId[]) => void)` | — | Колбек смены значения <br/> Колбек смены значений |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек фокуса input |
| `onKeyDown` | `((event: KeyboardEvent<HTMLInputElement>) => void)` | — | Колбек нажатия клавиши на input (вызывается после внутренней обработки навигации) |
| `onOpenChange` | `DroplistProps` | — | Колбек смены открытия |
| `open` | `DroplistProps` | — | Управляемое открытие дроплиста |
| `pinBottom` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `ItemProps` \| `ScrollProps` | — | Пресет-айтемы снизу (формат `@ds/list`) |
| `pinTop` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `ItemProps` \| `ScrollProps` | — | Пресет-айтемы сверху (формат `@ds/list`) |
| `placeholder` | `string` | — | Placeholder в триггере, когда нет выбранного значения |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Placement дроплиста |
| `postfix` | `ReactNode` | — | Постфикс — текст или нода после значения (Figma `postfix`) |
| `prefix` | `ReactNode` | — | Префикс — текст или нода перед значением (Figma `prefix`) |
| `readonly` | `boolean` | — | Только для чтения <br/> Read-only режим |
| `removeByBackspace` | `boolean` | `true` | Удалять последний чип по `Backspace`, когда строка ввода пустая. <br/> Работает только при `chips=true` и `searchable=true`. |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `resetSearchOnOptionSelection` | `boolean` | `true` | Сбрасывать строку поиска к выбранному значению после выбора. `false` нужен при асинхронной <br/> подгрузке (оставить введённый запрос как значение, пока данные не пришли). |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвечающий за прокручивание до выбранного элемента |
| `search` | `{ value?: string; defaultValue?: string; onChange?(value: string): void; } \| undefined` | — | Управляемое/неуправляемое состояние строки поиска (текста в поле). Позволяет потребителю <br/> читать и задавать запрос (например, для серверного поиска вместе с `autocomplete`). |
| `searchable` | `boolean` | `true` | Включить поиск/ввод в поле — пользователь печатает, список фильтруется по подстроке лейбла. |
| `selectedOptionFormatter` | `((selected: { id: ItemId; label: string; }) => string)` | — | Кастомный форматтер лейбла выбранного значения. Применяется к каждому выбранному <br/> элементу (single — значение в поле, multiple — лейбл чипа или элемент в comma-joined). |
| `selection` | `"multiple"` \| `"single"` | — | Режим выбора. По умолчанию `'single'`. <br/> Режим выбора |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (✕). Активна, когда есть выбранное значение <br/> и поле не disabled/readonly. |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly` и непустом значении). |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `untouchableScrollbars` | `boolean` | — | Отключает возможность взаимодействовать со скролбарами мышью. |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | — | Состояние валидации |
| `value` | `ItemId` | — | Управляемое значение. Пустая строка трактуется как «значение не выбрано». <br/> Управляемые значения |
| `virtualized` | `boolean` | — | Включить виртуализацию элементов списка. Рекомендуется при количестве элементов от 1000. |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `'eq' — равна ширине триггера` | Стратегия ширины дроплиста. |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

## FieldSlider

```tsx
import { FieldSlider } from '@ds/fields';
import { useState } from 'react';

export function SliderRange() {
  const [value, setValue] = useState<number[]>([20, 80]);
  return (
    <FieldSlider
      label='Диапазон цены'
      hint='₽/мес. Текстовое поле в range-режиме только для чтения'
      range
      min={0}
      max={100}
      step={1}
      postfix='₽'
      value={value}
      onChange={v => setValue(v as number[])}
    />
  );
}
```

### Props `FieldSliderProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `SliderValue` | — | Начальное значение (uncontrolled-режим). По умолчанию `min` (или `[min, max]` при `range`). |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `marks` | `SliderMarks` | — | Метки на шкале |
| `marksEqualSpacing` | `boolean` | `false` | Равномерно распределять метки по шкале при нелинейных значениях <br/> (например `1 2 4 8 16 32` — равные промежутки вместо логарифмических). |
| `max` | `number` | — | Максимум |
| `min` | `number` | — | Минимум |
| `name` | `string` | — | HTML name |
| `onBlur` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек блюра |
| `onChange` | `((value: SliderValue) => void)` | — | Колбек смены значения |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после успешного копирования значения. |
| `onFocus` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек фокуса |
| `postfix` | `ReactNode` | — | Произвольный постфикс |
| `postfixIcon` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — | Иконка-постфикс справа от текстового поля |
| `prefix` | `ReactNode` | — | Произвольный префикс |
| `range` | `boolean` | `false` | Диапазон с двумя ручками. Текстовое поле в этом режиме `readonly` <br/> и показывает значение как `min – max`. |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (видна в readonly, при `!disabled`). |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `showScaleBar` | `boolean` | `true` | Показывать линейку с метками |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `step` | `number \| null` | — | Шаг приращения. `null` — снэп только к меткам. |
| `textInputFormatter` | `TextInputFormatter` | — | Форматирование значения в текстовом поле |
| `unbindInputFromMarks` | `boolean` | `false` | Если `true` — текстовое поле принимает любые числа в диапазоне `min..max`, <br/> не снэпя к меткам. |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `SliderValue` | — | Значение (число или диапазон при `range`; controlled-режим) |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

- `SliderMarks` = `{ [x: string]: ReactNode | MarkObj; [x: number]: ReactNode | MarkObj; }`

- `SliderValue` = `number | number[]`

- `TextInputFormatter` = `(value: number) => string`

## FieldStepper

```tsx
import { FieldStepper } from '@ds/fields';
import { useState } from 'react';

export function Stepper() {
  const [value, setValue] = useState(1);
  return <FieldStepper label='Количество' value={value} onChange={setValue} />;
}
```

### Props `FieldStepperProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanLimits` | `boolean` | `true` | Разрешить ввод значений вне `min`/`max`. Если `false`, на blur значение клампится. |
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `clampTooltipText` | `{ min?: ((value: number) => string); max?: ((value: number) => string); } \| undefined` | `{ min: 'Значение должно быть больше либо равно {value}', max: 'Значение должно быть меньше либо равно {value}' }` | Тексты тултипа клампа (показывается на 2с после blur с выходом за `min`/`max`). |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `number` | — | Начальное значение (uncontrolled-режим). По умолчанию выводится из `min`/`max`. |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `max` | `number` | — | Максимум |
| `min` | `number` | — | Минимум |
| `minusButtonTooltip` | `TooltipProps` | — | Тултип над кнопкой `−` |
| `name` | `string` | — | HTML name |
| `onBlur` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек блюра |
| `onChange` | `((value: number, event?: ChangeEvent<HTMLInputElement>) => void)` | — | Колбек смены значения. Второй аргумент — событие, если изменение пришло из ручного ввода. |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после успешного копирования значения. |
| `onFocus` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек фокуса |
| `plusButtonTooltip` | `TooltipProps` | — | Тултип над кнопкой `+` |
| `postfix` | `ReactNode` | — | Постфикс — текст или иконка справа от значения (например, единица измерения) |
| `prefix` | `ReactNode` | — | Префикс — текст или иконка слева от значения |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (видна в readonly, при `!disabled`). |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `step` | `number` | `1` | Шаг приращения |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `number` | — | Значение (controlled-режим) |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

## FieldText

```tsx
import { FieldText } from '@ds/fields';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState('');
  return <FieldText label='Имя' hint='Как к вам обращаться' placeholder='Иван' value={value} onChange={setValue} />;
}
```

### Props `FieldTextProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `false` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим работы экранной клавиатуры |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `(() => void)` | — | Колбек клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `outline` | `boolean` | `true` | Разделитель между основным полем и слотами `elementBefore` / `elementAfter` |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (как в Search) |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`) |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `type` | `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"` | — | Тип инпута |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение поля (controlled-режим) |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

## FieldTextArea

```tsx
import { FieldTextArea } from '@ds/fields';
import { useState } from 'react';

export function TextArea() {
  const [value, setValue] = useState('');
  return (
    <FieldTextArea
      label='Комментарий'
      placeholder='Расскажите подробнее'
      hint='До 500 символов'
      minRows={3}
      maxRows={8}
      value={value}
      onChange={setValue}
    />
  );
}
```

### Props `FieldTextAreaProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `true` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | `` | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `footer` | `ReactNode` | — | Нода под textarea — ряд элементов после контента (Figma `elementWrapperAfter` / <br/> `slotAfterContent`): действия, счётчик-плагин и т.п. |
| `header` | `ReactNode` | — | Нода над textarea — ряд элементов до контента (Figma `elementWrapperBefore` / <br/> `slotBeforeContent`): тулбар с кнопками, чипами и т.п. |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим виртуальной клавиатуры (`inputmode` нативного `<textarea>`) |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `maxLength` | `number` | — | Максимальное количество символов |
| `maxRows` | `number` | `1000` | Максимальное количество строк (после — появляется скролл) |
| `minRows` | `number` | `3` | Минимальное количество строк |
| `name` | `string` | — | HTML name |
| `onBlur` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек блюра |
| `onChange` | `((value: string, event?: ChangeEvent<HTMLTextAreaElement>) => void)` | — | Колбек смены значения |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования |
| `onFocus` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек фокуса |
| `onKeyDown` | `((event: KeyboardEvent<HTMLTextAreaElement>) => void)` | — | Колбек нажатия клавиши |
| `placeholder` | `string` | — | Плейсхолдер |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `resizable` | `boolean` | `false` | Можно ли менять высоту мышкой за нижний угол. Игнорируется при `disabled` или `readonly`. |
| `showClearButton` | `boolean` | `true` | Кнопка очистки (видна при value && !readonly) |
| `showCopyButton` | `boolean` | `true` | Кнопка копирования (видна при непустом value в режиме readonly, как у остальных полей) |
| `showCopyButtonInEditMode` | `boolean` | `false` | Показывать кнопку копирования и в обычном (не readonly) режиме — рядом с кнопкой очистки. <br/> Опция только для textarea: в многострочном поле копирование значения осмысленно и при вводе. |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | — | Проверка орфографии |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `string` | — | Значение (controlled-режим) |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |

## FieldTime

```tsx
import { TimeValue } from '@ds/calendar';
import { FieldTime } from '@ds/fields';
import { useState } from 'react';

export function TimeBasic() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 9, minutes: 30, seconds: 0 });
  return (
    <FieldTime label='Время' hint='Введите HH:MM:SS или выберите из дропдауна' value={value} onChange={setValue} />
  );
}
```

### Props `FieldTimeProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic). |
| `caption` | `string` | — | Вторичная подпись справа |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `closeOnApply` | `boolean` | `true` | Закрыть picker после Apply. |
| `data-test-id` | `string` | `field-time` |  |
| `defaultValue` | `TimeValue` | — | Дефолтное значение для uncontrolled-режима |
| `disabled` | `boolean` | — | Поле выключено <br/> Отключено |
| `error` | `string` | — | Ошибка (приоритетнее `hint`; форсит `validationState=error`) |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `hint` | `string` | — | Подсказка |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | `` | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка (question-tooltip) у заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `FieldLength` | — | Счётчик длины `current/max` |
| `name` | `string` | — | HTML name |
| `onBlur` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек блюра input |
| `onChange` | `((value: TimeValue) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `(() => void)` | — | Колбек после клика по кнопке очистки. |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения. |
| `onFocus` | `((event: FocusEvent<HTMLInputElement, Element>) => void)` | — | Колбек фокуса input |
| `onOpenChange` | `((open: boolean) => void)` | — | Колбек смены состояния открытия |
| `open` | `boolean` | — | Открыт ли picker (controlled) |
| `placeholder` | `string` | — | Плейсхолдер маски; по умолчанию `чч:мм:сс` или `чч:мм` в зависимости от `showSeconds`. |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | — | Показать знак обязательности `*` |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки (видна при value && !readonly && !disabled). |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования (видна при readonly && value && !disabled). |
| `showHintIcon` | `boolean` | — | Отображение статус-иконки у подсказки (по умолчанию `true`) |
| `showSeconds` | `boolean` | `true` | Показывать секунды в picker и в маске input. |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Состояние валидации |
| `value` | `TimeValue` | — | Значение |

#### Related types

**FieldLayoutPresets**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `desktop` | `any` | — |  |
| `desktopSmall` | `any` | — |  |
| `mobile` | `any` | — |  |
| `tablet` | `any` | — |  |
