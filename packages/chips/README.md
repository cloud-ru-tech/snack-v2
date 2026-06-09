# Chips

`@ds/chips` — Пакет чипов дизайн-системы — ChipAssist, ChipToggle, ChipChoice и ChipChoiceRow для фильтрации и выбора.

Пакет `@ds/chips` предоставляет четыре компонента-чипа для фильтрации данных и пользовательского выбора.

- ****ChipAssist**** — кликабельный чип для инициации действия.
- ****ChipToggle**** — чип с состоянием выбран/не выбран.
- **ChipChoice** — семейство чип-фильтров с выпадающим списком:
  **Single**, **Multiple**, **Date**, **DateRange**, **Time**, **Custom**.
- ****ChipChoiceRow**** — строка из нескольких ChipChoice-фильтров с кнопками добавить/сбросить.

## Установка

```bash
pnpm add @ds/chips
```

```ts
import { ChipAssist, ChipToggle, ChipChoice, ChipChoiceRow } from '@ds/chips';
```

## Figma

Все компоненты следуют одному мастер-файлу Figma «chips - Matrix». Ссылки на конкретные узлы — на страницах компонентов.

## Смотри также

- **`@ds/button`** — кнопки для основных действий.
- **`@ds/dropdown`** — выпадающие меню (используются внутри ChipChoice).
- **`@ds/calendar`** — календари для ChipChoiceDate / ChipChoiceDateRange / ChipChoiceTime.

## ChipAssist

Кликабельный чип для инициации действия — с иконкой, лейблом и состояниями disabled/loading.

Кликабельный чип-кнопка. Используется для инициации действий в контексте фильтров, тегов и быстрых команд.

### Когда использовать

- Для inline-действий в плоском списке (добавить тег, применить команду).
- Когда действие визуально должно восприниматься как выбираемый элемент, а не классическая кнопка.
- Для набора коротких quick-action-команд рядом с контентом.

Когда **не** нужен ChipAssist: для основного CTA используйте `Button`; для переключения состояния — `ChipToggle`.

### Анатомия

#### Size
Три размера: `s` / `m` / `l`.

#### Состояния
`disabled` отключает взаимодействие; `loading` показывает спиннер `Sun` вместо иконки.

### Примеры использования

```tsx
// Базовый
<ChipAssist label='Action' onClick={() => {}} />

// С иконкой
<ChipAssist label='Add' icon={<PlusSVG />} size='m' onClick={() => {}} />

// Disabled
<ChipAssist label='Action' disabled onClick={() => {}} />
```

### Props

**ChipAssistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Отключён |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек обработки клика |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `middle` | Вариант обрезания строки |

##### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

### Смотри также

- **ChipToggle** — чип с состоянием выбора.
- **Button** — основные кнопки действий.

## ChipToggle

Чип с состоянием выбран/не выбран — управляемый и неуправляемый режим, иконка, disabled/loading.

Чип-переключатель с двумя состояниями: выбран / не выбран. Рендерится как `<label>` + скрытый `<input type="checkbox">` для нативной семантики.

### Когда использовать

- Для множественной фильтрации по категориям (несколько независимых тоглов).
- Для включения/выключения одной опции без модального контекста.
- Как альтернатива Checkbox в более компактном, pill-образном виде.

### Анатомия

#### Size
Три размера: `s` / `m` / `l`.

#### Состояния
`checked`, `disabled`, `loading`. При `checked` на корневом элементе ставится `data-checked='true'`.

### Примеры использования

```tsx
// Неуправляемый
<ChipToggle label='Category' checked={false} onChange={(checked) => console.log(checked)} />

// С иконкой
<ChipToggle label='Filter' icon={<SettingsSVG />} size='m' checked={true} onChange={() => {}} />
```

### Props

**ChipToggleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Отмечен ли компонент |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Отключён |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `onChange` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` | — | Колбек смены значения |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | `0` | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `middle` | Вариант обрезания строки |

##### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

### Смотри также

- **ChipAssist** — кликабельный чип-кнопка.
- **ChipChoice.Single** — чип с выпадающим выбором значения.

## ChipChoiceSingle

ChipChoice для одиночного выбора значения из списка.

Одиночный выбор значения из списка. Подходит для фильтров, где активным может быть только одно значение.

### Когда использовать

- Для статуса, категории, владельца или другого одиночного атрибута.
- Когда пользователь должен выбрать ровно одно значение из списка.
- Когда нужен `autoApply`: выбор сразу применяется и закрывает droplist.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoApply` | `boolean` | `true` | Флаг, отвечающий за применение выбранного значения по умолчанию |
| `className` | `string` | — | CSS-класс |
| `contentRender` | `((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => ReactNode) \| undefined` | — | Кастомный рендер контента опции |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — | Загрузка данных завершилась ошибкой: показывается `errorDataState` |
| `dataFiltered` | `boolean` | — | Текущий пустой список — результат поиска/фильтра: показывается `noResultsState` вместо `noDataState` |
| `defaultValue` | `ItemId` | — | Начальное состояние |
| `disableFuzzySearch` | `boolean` | `false` | Отключает Fuzzy Search |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `filterFn` | `((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => boolean) \| undefined` | — | Функция фильтрации опций |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки <br/> Флаг, отвечающий за состояние загрузки списка |
| `noDataState` | `EmptyStateProps` | — | Экран при отсутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отсутствии результатов поиска или фильтров |
| `onApprove` | `(() => void)` | — | Колбек основной кнопки |
| `onCancel` | `(() => void)` | — | Колбек кнопки отмены |
| `onChange` | `OnChangeHandler<ItemId>` | — | Controlled обработчик изменения состояния — получает выбранный `ItemId` |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `options` | `FilterOption<T>[]` | — | Массив опций |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Расположение выпадающего меню |
| `scrollContainerRef` | `Ref<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвечающий за прокручивание до выбранного элемента |
| `searchable` | `boolean` | — | Показывать строку поиска в дроплисте |
| `selection` | `SelectionMultipleState \| SelectionSingleState` | — | Настройки выбора элементов. `mode: 'single'` — один выбранный элемент (`value: ItemId`), <br/> `mode: 'multiple'` — множественный выбор (`value: ItemId[]`). Без `selection` выбора нет — <br/> клик вызывает только `onClick` элемента. |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `ItemId` | — | Controlled состояние |
| `valueRender` | `((option?: BaseOption<T>) => ReactNode)` | — | Колбек формирующий отображение выбранного значения |
| `virtualized` | `boolean` | — | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера |

### Смотри также

- **Chips** — обзор пакета.
- **ChipChoice.Multiple** — множественный выбор.
### Пример использования

```tsx
<ChipChoice.Single
  label='Status'
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]}
  defaultValue='active'
  autoApply
  onChange={value => console.log(value)}
/>
```

## ChipChoiceMultiple

ChipChoice для множественного выбора значений из списка.

Множественный выбор значений из списка. По умолчанию показывает `All`, одно выбранное значение или счётчик выбранных элементов.

### Когда использовать

- Когда фильтр допускает несколько активных значений.
- Когда список значений длиннее набора независимых `ChipToggle`.
- Когда нужно отложенное применение через `autoApply={false}` и footer с кнопками.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoApply` | `boolean` | `true` | Флаг, отвечающий за применение выбранного значения по умолчанию |
| `className` | `string` | — | CSS-класс |
| `contentRender` | `((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => ReactNode) \| undefined` | — | Кастомный рендер контента опции |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — | Загрузка данных завершилась ошибкой: показывается `errorDataState` |
| `dataFiltered` | `boolean` | — | Текущий пустой список — результат поиска/фильтра: показывается `noResultsState` вместо `noDataState` |
| `defaultValue` | `ItemId[]` | — | Начальное состояние |
| `disableFuzzySearch` | `boolean` | `false` | Отключает Fuzzy Search |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `filterFn` | `((option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => boolean) \| undefined` | — | Функция фильтрации опций |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки <br/> Флаг, отвечающий за состояние загрузки списка |
| `noDataState` | `EmptyStateProps` | — | Экран при отсутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отсутствии результатов поиска или фильтров |
| `onApprove` | `(() => void)` | — | Колбек основной кнопки |
| `onCancel` | `(() => void)` | — | Колбек кнопки отмены |
| `onChange` | `OnChangeHandler<ItemId[]>` | — | Controlled обработчик изменения состояния — получает массив выбранных `ItemId[]` |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `options` | `FilterOption<T>[]` | — | Массив опций |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Расположение выпадающего меню |
| `scrollContainerRef` | `Ref<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвечающий за прокручивание до выбранного элемента |
| `searchable` | `boolean` | — | Показывать строку поиска в дроплисте |
| `selection` | `SelectionMultipleState \| SelectionSingleState` | — | Настройки выбора элементов. `mode: 'single'` — один выбранный элемент (`value: ItemId`), <br/> `mode: 'multiple'` — множественный выбор (`value: ItemId[]`). Без `selection` выбора нет — <br/> клик вызывает только `onClick` элемента. |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `ItemId[]` | — | Controlled состояние |
| `valueRender` | `((option?: BaseOption<T>[]) => ReactNode)` | — | Колбек формирующий отображение выбранного значения |
| `virtualized` | `boolean` | — | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера |

### Смотри также

- **Chips** — обзор пакета.
- **ChipChoice.Single** — одиночный выбор.
### Пример использования

```tsx
<ChipChoice.Multiple
  label='Category'
  options={[
    { value: 'compute', label: 'Compute' },
    { value: 'storage', label: 'Storage' },
  ]}
  defaultValue={['compute']}
  onChange={values => console.log(values)}
/>
```

## ChipChoiceDate

ChipChoice для выбора одной даты через календарь.

Выбор одной даты через `@ds/calendar`. Поддерживает режимы `date`, `date-time`, `month` и `year`.

### Когда использовать

- Для фильтрации по конкретной дате.
- Для выбора месяца или года без отдельного поля ввода.
- Когда значение должно отображаться прямо в чипе после выбора.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buildCalendarCellProps` | `BuildCellPropsFunction` | — | Колбек свойств для управления ячейками календаря |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `Date` | — | Значение компонента по-умолчанию |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `mode` | `"date"` \| `"date-time"` \| `"month"` \| `"year"` | `date` | Режим выбора даты <br/> Режим выбора даты и времени <br/> Режим выбора даты без времени |
| `onChange` | `((value: Date) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Расположение выпадающего меню |
| `showSeconds` | `boolean` | — | Показывать секунды в выборе и отображении времени |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `Date` | — | Значение компонента |
| `valueRender` | `((value?: Date) => ReactNode)` | — | Колбек формирующий строковое представление выбранного значения |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера |

### Смотри также

- **Chips** — обзор пакета.
- **Calendar** — календарь, используемый внутри.
### Пример использования

```tsx
<ChipChoice.Date label='Created at' defaultValue={new Date()} onChange={date => console.log(date)} />
```

## ChipChoiceDateRange

ChipChoice для выбора диапазона дат через календарь.

Выбор диапазона дат через календарь. Отображает выбранные даты в compact-формате внутри чипа.

### Когда использовать

- Для фильтрации по периоду.
- Для отчётов, логов и списков событий.
- Когда пользователю нужно задать начало и конец диапазона.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buildCalendarCellProps` | `BuildCellPropsFunction` | — | Колбек свойств для управления ячейками календаря |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `Range` | — | Значение компонента по умолчанию |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `onChange` | `((value: Range) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Расположение выпадающего меню |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `Range` | — | Значение компонента |
| `valueRender` | `((value?: Range) => ReactNode)` | — | Колбек формирующий строковое представление выбранного значения |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера |

### Смотри также

- **Chips** — обзор пакета.
- **Calendar** — календарь, используемый внутри.
### Пример использования

```tsx
<ChipChoice.DateRange
  label='Period'
  defaultValue={[new Date('2026-01-01'), new Date('2026-01-31')]}
  onChange={range => console.log(range)}
/>
```

## ChipChoiceTime

ChipChoice для выбора времени.

Выбор времени через `TimePicker`. Может отображать секунды или только часы и минуты.

### Когда использовать

- Для фильтрации событий по времени.
- Для настройки расписаний и временных окон.
- Когда дата не нужна, а значение должно быть компактно показано в чипе.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `TimeValue` | — | Значение по-умолчанию для uncontrolled. |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `onChange` | `((value: TimeValue) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Расположение выпадающего меню |
| `showSeconds` | `boolean` | `true` | Показывать ли секунды |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `TimeValue` | — | Выбранное значение. |
| `valueRender` | `((value?: TimeValue) => ReactNode)` | — | Колбек формирующий строковое представление выбранного значения |

### Смотри также

- **Chips** — обзор пакета.
- **Calendar** — пакет с `TimePicker`.
### Пример использования

```tsx
<ChipChoice.Time
  label='Time'
  defaultValue={{ hours: 12, minutes: 30 }}
  showSeconds={false}
  onChange={time => console.log(time)}
/>
```

## ChipChoiceCustom

ChipChoice с произвольным содержимым выпадающего меню.

Вариант для случаев, когда стандартного списка, календаря или time picker недостаточно. Содержимое dropdown задаётся через `content`.

### Когда использовать

- Для нестандартных фильтров с кастомной разметкой.
- Для компактных форм внутри dropdown.
- Когда значение и отображение нужно полностью контролировать снаружи.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `content` | `((props: CustomContentRenderProps<any>) => ReactNode)` | — | Контент выпадающего меню |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `onChange` | `((value: any) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `bottom-start` | Расположение выпадающего меню |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `any` | — | Фактическое значение |
| `valueRender` | `((value: any) => ReactNode)` | — | Отображаемое значение |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера |

### Смотри также

- **Chips** — обзор пакета.
- **Dropdown** — базовый dropdown-контейнер.
### Пример использования

```tsx
<ChipChoice.Custom
  label='Custom'
  value='Alpha'
  valueRender={value => value}
  content={({ closeDroplist, onChange }) => (
    <button
      type='button'
      onClick={() => {
        onChange?.('Beta');
        closeDroplist();
      }}
    >
      Beta
    </button>
  )}
/>
```

## ChipChoiceRow

Строка фильтров из нескольких ChipChoice с кнопками добавить и сбросить все.

Контейнер строки фильтров, управляющий группой `ChipChoice`-чипов. Поддерживает закреплённые фильтры (`pinned`), кнопку «Добавить фильтр» с выпадающим списком незакреплённых, кнопку «Сбросить всё» и управляемый/неуправляемый режим значений.

### Когда использовать

- Для страниц с комплексной фильтрацией таблиц/списков (несколько независимых фильтров).
- Когда набор фильтров может меняться (пользователь добавляет/скрывает через «Добавить»).
- Когда нужна кнопка сброса всех активных фильтров за один клик.

### Анатомия

#### Pinned-фильтры
Фильтры с `pinned: true` всегда видны в строке и не убираются через меню «Добавить».

#### Visible-фильтры
Фильтры без `pinned`, добавленные пользователем через кнопку «Добавить», рендерятся после pinned. Управляются через `visibleFilters` (контролируемый режим) или `defaultVisibleFilters` (неуправляемый).

#### Типы фильтров
`CHIP_CHOICE_TYPE.Single`, `Multiple`, `Date`, `DateRange`, `Time`, `Custom` — соответствуют типам `ChipChoice.*`.

#### Кнопка «Добавить»
Показывается если `showAddButton !== false`. Становится disabled, когда все незакреплённые фильтры уже видны.

#### Кнопка «Сбросить»
Показывается при `showClearButton` только тогда, когда хотя бы один фильтр имеет значение.

### Примеры использования

```tsx
const FILTERS = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Status',
    pinned: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    id: 'category',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Category',
    options: [
      { value: 'cat1', label: 'Category 1' },
      { value: 'cat2', label: 'Category 2' },
    ],
  },
  {
    id: 'createdAt',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Created at',
    options: [],
  },
]

// Неуправляемый режим
<ChipChoiceRow
  filters={FILTERS}
  showClearButton
  showAddButton
/>

// Управляемый режим
<ChipChoiceRow
  filters={FILTERS}
  value={{ status: 'active' }}
  visibleFilters={['category']}
  showClearButton
  onChange={(value) => console.log(value)}
  onVisibleFiltersChange={(ids) => console.log(ids)}
/>
```

### Props

**ChipChoiceRowProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `TState` | — | Начальное состояние фильтров |
| `filters` | `BaseChipProps` \| `ChipChoiceDateWithSeconds` \| `ChipChoiceRowFilter` \| `DropdownBridgeProps` | — | Массив чипов |
| `onChange` | `((filters: TState) => void)` | — | Колбек изменения состояния фильтров |
| `onVisibleFiltersChange` | `((value: string[]) => void)` | — | Коллбек на изменение видимых фильтров |
| `showAddButton` | `boolean` | `true` | Скрыть/показать кнопку добавления фильров |
| `showClearButton` | `boolean` | `true` | Скрыть/показать кнопку очиски фильтров |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `value` | `TState` | — | Состояние фильтров |
| `visibleFilters` | `string[]` | — | Состояние для видимых фильтров |

##### Related types

**BaseChipProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — | CSS-класс |
| `disabled` | `boolean \| undefined` | — | Отключён |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `tabIndex` | `number \| undefined` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | — | Вариант обрезания строки |

**ChipChoiceDateWithSeconds**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"date-time"` | — | Режим выбора даты и времени |
| `showSeconds` | `boolean \| undefined` | — | Показывать секунды в выборе и отображении времени |

- `ChipChoiceRowFilter` = `OmitBetter<ChipChoiceProps, "value" | "defaultValue" | "onChange" | "size"> & { pinned?: boolean; }`

- `ChipChoiceRowSize` = `"l"` \| `"m"` \| `"s"`

### Смотри также

- **ChipChoice.Single** — одиночный выбор.
- **ChipChoice.Multiple** — множественный выбор.
- **ChipChoice.Date** — выбор даты.
- **ChipChoice.DateRange** — выбор диапазона дат.
- **ChipChoice.Time** — выбор времени.
- **ChipChoice.Custom** — произвольный фильтр.

## ButtonClearValue

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — |  |
| `onKeyDown` | `KeyboardEventHandler<HTMLButtonElement>` | — |  |
| `size` | `"m"` \| `"s"` | — |  |
| `tabIndex` | `number` | `-1` |  |

## ChipChoiceBase

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `disabled` | `boolean` | — | Отключён |
| `icon` | `ReactNode` | — | Иконка |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onKeyDown` | `((e: KeyboardEvent<HTMLDivElement>) => void)` | — | Колбек обработки нажатия клавиш |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер |
| `tabIndex` | `number` | `0` | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `middle` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `value` | `unknown` | — | Фактическое значение. Используется для отображения кнопки очистки |
| `valueToRender` | `ReactNode` | — | Отображаемое значение |

## ForwardedChipChoice

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoApply` | `boolean` | — | Флаг, отвечающий за применение выбранного значения по умолчанию |
| `buildCalendarCellProps` | `BuildCellPropsFunction` | — | Колбек свойств для управления ячейками календаря |
| `className` | `string` | — | CSS-класс |
| `content` | `((props: CustomContentRenderProps<any>) => ReactNode)` | — | Контент выпадающего меню |
| `contentRender` | `((option: { label: ItemId; value?: ItemId; contentRenderProps?: ContentRenderProps; }) => ReactNode) \| undefined` | — | Кастомный рендер контента опции |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — | Загрузка данных завершилась ошибкой: показывается `errorDataState` |
| `dataFiltered` | `boolean` | — | Текущий пустой список — результат поиска/фильтра: показывается `noResultsState` вместо `noDataState` |
| `defaultValue` | `Date \| Range \| ItemId \| ItemId[] \| TimeValue` | — | Начальное состояние <br/> Значение компонента по-умолчанию <br/> Значение по-умолчанию для uncontrolled. <br/> Значение компонента по умолчанию |
| `disableFuzzySearch` | `boolean` | `false` | Отключает Fuzzy Search |
| `disabled` | `boolean` | — | Отключён |
| `dropDownClassName` | `string` | — |  |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `filterFn` | `((option: { label: ItemId; value?: ItemId; contentRenderProps?: ContentRenderProps; }) => boolean) \| undefined` | — | Функция фильтрации опций |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `icon` | `ReactNode` | — | Иконка |
| `id` | `string` | — |  |
| `label` | `string` | — | Текст чипа |
| `loading` | `boolean` | — | Состояние загрузки <br/> Флаг, отвечающий за состояние загрузки списка |
| `mode` | `"date"` \| `"date-time"` \| `"month"` \| `"year"` | — | Режим выбора даты <br/> Режим выбора даты и времени <br/> Режим выбора даты без времени |
| `noDataState` | `EmptyStateProps` | — | Экран при отсутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отсутствии результатов поиска или фильтров |
| `onApprove` | `(() => void)` | — | Колбек основной кнопки |
| `onCancel` | `(() => void)` | — | Колбек кнопки отмены |
| `onChange` | `((value: any) => void) \| ((value: Date) => void) \| ((value: Range) => void) \| OnChangeHandler<ItemId[]> \| OnChangeHandler<ItemId> \| ((value: TimeValue) => void)` | — | Controlled обработчик изменения состояния — получает массив выбранных `ItemId[]` <br/> Controlled обработчик изменения состояния — получает выбранный `ItemId` <br/> Колбек смены значения |
| `onClearButtonClick` | `MouseEventHandler<HTMLButtonElement>` | — | Колбек для клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | — | Колбек обработки клика |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента |
| `open` | `boolean` | — | Управляет состоянием показан/не показан |
| `options` | `FilterOption<ContentRenderProps>[]` | — | Массив опций |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Расположение выпадающего меню |
| `scrollContainerRef` | `Ref<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвечающий за прокручивание до выбранного элемента |
| `searchable` | `boolean` | — | Показывать строку поиска в дроплисте |
| `selection` | `SelectionMultipleState \| SelectionSingleState` | — | Настройки выбора элементов. `mode: 'single'` — один выбранный элемент (`value: ItemId`), <br/> `mode: 'multiple'` — множественный выбор (`value: ItemId[]`). Без `selection` выбора нет — <br/> клик вызывает только `onClick` элемента. |
| `showSeconds` | `boolean` | — | Показывать секунды в выборе и отображении времени <br/> Показывать ли секунды |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `tabIndex` | `number` | — | Индекс в порядке фокусировки |
| `truncateVariant` | `"end"` \| `"middle"` | `'middle'` | Вариант обрезания строки <br/> Вариант обрезания значения |
| `type` | `"custom"` \| `"date"` \| `"date-range"` \| `"date-time"` \| `"multiple"` \| `"single"` \| `"time"` | — |  |
| `value` | `any` | — | Controlled состояние <br/> Значение компонента <br/> Выбранное значение. <br/> Фактическое значение |
| `valueRender` | `((value: any) => ReactNode) \| ((value?: Date) => ReactNode) \| ((value?: Range) => ReactNode) \| ((value?: TimeValue \| undefined) => ReactNode) \| ((option?: BaseOption<...>[] \| undefined) => ReactNode) \| ((option?: BaseOption<...> \| undefined) => ReactNode) \| undefined` | — | Колбек формирующий отображение выбранного значения <br/> Колбек формирующий строковое представление выбранного значения <br/> Отображаемое значение |
| `virtualized` | `boolean` | — | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера |

## useAutoApply

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoApply` | `boolean` | — |  |
| `onApprove` | `() => void` | — |  |
| `onCancel` | `() => void` | — |  |
| `size` | `"l"` \| `"m"` \| `"s"` | — |  |
