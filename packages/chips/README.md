# Chips

`@ds/chips` — Пакет чипов дизайн-системы — ChipAssist, ChipToggle, семейство ChipChoice и ChipChoiceRow для действий, переключения и фильтрации.

Пакет `@ds/chips` предоставляет компактные элементы управления — чипы. Они закрывают три задачи: инициировать действие, переключать бинарное состояние и фильтровать данные через выпадающий список.

- ****ChipAssist**** — кликабельный чип-кнопка для inline-действия с иконкой, лейблом и состояниями `disabled` / `loading`.
- ****ChipToggle**** — чип с состоянием выбран / не выбран (controlled через `checked` + `onChange`).
- **ChipChoice** — семейство чип-фильтров с выпадающим списком. Экспортируется как namespace:
  - **`ChipChoice.Single`** — одиночный выбор.
  - **`ChipChoice.Multiple`** — множественный выбор.
  - **`ChipChoice.Date`** — выбор даты (`date` / `date-time` / `month` / `year`).
  - **`ChipChoice.DateRange`** — выбор периода.
  - **`ChipChoice.Time`** — выбор времени.
  - **`ChipChoice.Custom`** — произвольный контент выпадающего меню.
- ****ChipChoiceRow**** — строка из нескольких ChipChoice-фильтров с кнопками добавить / сбросить и pinned-чипами.

## Анатомия

### Size (default `s`)

Все компоненты пакета разделяют один размерный ряд:

- `s` — для плотных поверхностей: тулбары, строки фильтров, таблицы.
- `m` — стандартный размер для форм.
- `l` — для крупных форм и акцентных фильтров.

## Установка

```bash
pnpm add @ds/chips
```

```ts
import { ChipAssist, ChipToggle, ChipChoice, ChipChoiceRow } from '@ds/chips'
```

`ChipChoice` — namespace: варианты доступны как `ChipChoice.Single`, `ChipChoice.Multiple`, `ChipChoice.Date`, `ChipChoice.DateRange`, `ChipChoice.Time`, `ChipChoice.Custom`.

Компоненты с выпадающим списком (всё семейство `ChipChoice`) требуют `PortalContextProvider` из `@ds/portal-context` где-то выше по дереву — иначе выпадающее меню рендерится в `null`-root.

## Figma

Все компоненты следуют одному мастер-файлу Figma «chips — Matrix». Ссылки на конкретные узлы — на страницах компонентов.

## Смотри также

- **`@ds/button`** — кнопки для основных действий.
- **`@ds/dropdown`** — выпадающие меню (используются внутри ChipChoice).
- **`@ds/calendar`** — календари для `ChipChoice.Date` / `DateRange` / `Time`.

## ChipAssist

Кликабельный чип-кнопка для inline-действия — с иконкой, лейблом, размерами s/m/l и состояниями disabled/loading.

Кликабельный чип-кнопка. Инициирует действие в контексте фильтров, тегов и быстрых команд. Лейбл обязателен, иконка опциональна.

### Когда использовать

- Для inline-действий рядом с контентом: добавить тег, применить быструю команду.
- Когда действие визуально должно восприниматься как чип в ряду фильтров, а не как классическая кнопка.

Когда **не** нужен ChipAssist:

- Для основного CTA экрана — используйте **`Button`**.
- Для переключения бинарного состояния — используйте **`ChipToggle`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Icon

Опциональная иконка перед лейблом через проп `icon`. При `loading` иконка заменяется спиннером.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер вместо иконки и блокирует клик.

### Примеры использования

#### Три размера в ряд

```tsx
import { ChipAssist } from '@ds/chips';

export function AssistSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ChipAssist size='s' label='Small' onClick={() => {}} />
      <ChipAssist size='m' label='Medium' onClick={() => {}} />
      <ChipAssist size='l' label='Large' onClick={() => {}} />
    </div>
  );
}
```

#### С иконкой

Иконка перед лейблом через проп icon

```tsx
import { ChipAssist } from '@ds/chips';
import { PlusSVG } from '@ds/icons';

export function AssistWithIcon() {
  return <ChipAssist label='Добавить тег' icon={<PlusSVG />} size='m' onClick={() => {}} />;
}
```

#### Состояния

default, disabled и loading

```tsx
import { ChipAssist } from '@ds/chips';
import { PlusSVG } from '@ds/icons';

export function AssistStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ChipAssist label='Обычный' icon={<PlusSVG />} onClick={() => {}} />
      <ChipAssist label='Отключён' icon={<PlusSVG />} disabled onClick={() => {}} />
      <ChipAssist label='Загрузка' icon={<PlusSVG />} loading onClick={() => {}} />
    </div>
  );
}
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

Чип с бинарным состоянием выбора — controlled-компонент с иконкой, лейблом, размерами s/m/l и состояниями disabled/loading.

Чип с состоянием выбора. Переключает бинарное значение — выбран или нет — и подходит для мультивыбора в строках фильтров. Компонент controlled: значение `checked` и обработчик `onChange` обязательны.

### Когда использовать

- Для мультивыбора в наборе фильтров: каждый чип независимо включается и выключается.
- Когда нужно показать активное состояние выбора прямо на чипе, без отдельного индикатора.

Когда **не** нужен ChipToggle:

- Для одиночного действия без состояния — используйте **`ChipAssist`**.
- Для выбора одного варианта из взаимоисключающего набора — используйте **`ChipChoice.Single`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Icon

Опциональная иконка перед лейблом через проп `icon`. При `loading` иконка заменяется спиннером.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер вместо иконки и блокирует переключение.

Компонент controlled: текущее значение передаётся в `checked`, а изменение приходит в `onChange(checked, event)`. Хранить состояние и обновлять его при `onChange` — обязанность потребителя.

### Примеры использования

#### Базовый переключатель

checked в локальном useState, обновляется в onChange

```tsx
import { ChipToggle } from '@ds/chips';
import { useState } from 'react';

export function ToggleBasic() {
  const [checked, setChecked] = useState(false);

  return <ChipToggle label='React' size='m' checked={checked} onChange={setChecked} />;
}
```

#### Набор фильтров

Мультивыбор — каждый чип со своим состоянием

```tsx
import { ChipToggle } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = ['React', 'Vue', 'Svelte'];

export function ToggleGroup() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ React: true });

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {OPTIONS.map(option => (
        <ChipToggle
          key={option}
          label={option}
          size='m'
          checked={Boolean(selected[option])}
          onChange={checked => setSelected(prev => ({ ...prev, [option]: checked }))}
        />
      ))}
    </div>
  );
}
```

#### Состояния

active, disabled и loading

```tsx
import { ChipToggle } from '@ds/chips';
import { useState } from 'react';

export function ToggleStates() {
  const [state, setState] = useState<Record<string, boolean>>({
    interactive: true,
    disabled: true,
    loading: false,
  });

  const flip = (key: string) => (checked: boolean) => setState(prev => ({ ...prev, [key]: checked }));

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ChipToggle label='Активный' size='m' checked={state.interactive} onChange={flip('interactive')} />
      <ChipToggle label='Отключён' size='m' disabled checked={state.disabled} onChange={flip('disabled')} />
      <ChipToggle label='Загрузка' size='m' loading checked={state.loading} onChange={flip('loading')} />
    </div>
  );
}
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

- **ChipAssist** — чип-кнопка для inline-действия.
- **ChipChoice.Single** — выбор одного варианта из набора.

## ChipChoiceRow

Строка из нескольких ChipChoice-фильтров с pinned-чипами и кнопками добавить/сбросить.

Контейнер, который собирает несколько `ChipChoice`-фильтров в одну строку и управляет их общим состоянием. Добавляет кнопку выбора фильтров и кнопку сброса.

### Когда использовать

- Для панели фильтров над таблицей или списком, где фильтров несколько и они меняются вместе.
- Когда часть фильтров должна быть закреплена (`pinned`), а остальные — добавляться пользователем по необходимости.

Когда **не** нужен ChipChoiceRow:

- Для одного фильтра — используйте нужный `ChipChoice.*` напрямую.
- Для действий, а не фильтрации — **`ChipAssist`**.

### Анатомия

#### Size (default `s`)

Размер применяется ко всем чипам строки: `s` / `m` / `l`.

#### Filters

Проп `filters` — массив описаний фильтров. Каждый элемент задаёт:

- `id` — уникальный ключ фильтра в состоянии.
- `type` — тип чипа из `CHIP_CHOICE_TYPE`:
  - `Single` — одиночный выбор.
  - `Multiple` — множественный выбор.
  - `Date` — дата.
  - `DateRange` — период.
  - `Time` — время.
  - `Custom` — произвольный контент.
- `label` — подпись чипа.
- `options` — список значений (для `Single` / `Multiple`).

#### Pinned

Фильтр с `pinned: true` всегда виден в строке и не убирается из неё. Остальные фильтры пользователь добавляет через кнопку добавления.

#### Add / Clear buttons

- `showAddButton` (default `true`) — кнопка выбора дополнительных фильтров.
- `showClearButton` (default `true`) — кнопка сброса всех значений.

### Примеры использования

#### Строка фильтров

Single + Multiple + Date с кнопками добавления и сброса

```tsx
import { CHIP_CHOICE_TYPE, ChipChoiceRow } from '@ds/chips';
import { useState } from 'react';

const FILTERS = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Статус',
    options: [
      { value: 'active', label: 'Активный' },
      { value: 'inactive', label: 'Неактивный' },
    ],
  },
  {
    id: 'category',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Категория',
    options: [
      { value: 'cat1', label: 'Категория 1' },
      { value: 'cat2', label: 'Категория 2' },
      { value: 'cat3', label: 'Категория 3' },
    ],
  },
  {
    id: 'date',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Дата',
  },
];

export function ChoiceRowBasic() {
  const [value, setValue] = useState({});

  return <ChipChoiceRow filters={FILTERS} value={value} onChange={setValue} showClearButton showAddButton />;
}
```

#### Закреплённый фильтр

pinned: true держит чип в строке, остальные добавляются по кнопке

```tsx
import { CHIP_CHOICE_TYPE, ChipChoiceRow } from '@ds/chips';
import { useState } from 'react';

const FILTERS = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Статус',
    pinned: true,
    options: [
      { value: 'active', label: 'Активный' },
      { value: 'inactive', label: 'Неактивный' },
    ],
  },
  {
    id: 'category',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Категория',
    options: [
      { value: 'cat1', label: 'Категория 1' },
      { value: 'cat2', label: 'Категория 2' },
    ],
  },
  {
    id: 'date',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Дата',
  },
];

export function ChoiceRowPinned() {
  const [value, setValue] = useState({});

  return <ChipChoiceRow filters={FILTERS} value={value} onChange={setValue} showAddButton showClearButton />;
}
```

### Props

**ChipChoiceRowProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `TState` | — | Начальное состояние фильтров |
| `filters` | `BaseChipProps` \| `ChipChoiceDateWithSeconds` \| `ChipChoiceRowFilter` \| `DropdownBridgeProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionMultipleState` \| `SelectionSingleState` \| `SelectionState` | — | Массив чипов |
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

- `Size` = `"l"` \| `"m"` \| `"s"`

### Смотри также

- **ChipChoice.Single** — одиночный фильтр.
- **Chips** — обзор пакета.

## ChipChoiceSingle

Чип-селектор с одиночным выбором из списка опций — с поиском, режимом моментального или ручного применения и состояниями disabled/loading.

Чип с выпадающим списком опций и одиночным выбором. Текущее значение отображается в лейбле чипа, список открывается кликом и рендерится через портал.

### Когда использовать

- Для выбора одного значения из набора прямо в ряду фильтров: статус, владелец, категория.
- Когда выбор должен выглядеть как компактный чип, а не полноценный `Select` в форме.
- Когда списку нужен поиск по опциям — через проп `searchable`.

Когда **не** нужен ChipChoice.Single:

- Нужно выбрать несколько значений одновременно:
  - используйте **`ChipChoice.Multiple`**.
- Нужно inline-действие без выбора:
  - используйте **`ChipAssist`**.
- Нужна классическая кнопка действия:
  - используйте **`Button`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Apply mode

Режим применения выбора управляется пропом `autoApply`.

- `autoApply` (default `true`) — выбор опции применяется сразу и закрывает список.
- `autoApply={false}` — внизу списка появляется футер с кнопками Apply/Cancel; изменение фиксируется через `onApprove`, отмена — через `onCancel`.

#### Searchable

- `searchable` — добавляет поле поиска в выпадающий список, опции фильтруются по введённому тексту.

Уместно для списков от 6–7 опций, где скролл становится неудобным.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер и блокирует открытие списка.

### Примеры использования

#### Одиночный выбор

Контролируемое значение через useState

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'active', label: 'Активный' },
  { value: 'inactive', label: 'Неактивный' },
  { value: 'archived', label: 'В архиве' },
];

export function ChoiceSingleBasic() {
  const [value, setValue] = useState<string | number | undefined>('active');

  return <ChipChoice.Single label='Status' options={OPTIONS} value={value} onChange={setValue} />;
}
```

#### С поиском

searchable добавляет поле поиска по опциям

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'design', label: 'Дизайн' },
  { value: 'frontend', label: 'Фронтенд' },
  { value: 'backend', label: 'Бэкенд' },
  { value: 'analytics', label: 'Аналитика' },
  { value: 'qa', label: 'Тестирование' },
  { value: 'devops', label: 'DevOps' },
];

export function ChoiceSingleSearchable() {
  const [value, setValue] = useState<string | number | undefined>('frontend');

  return <ChipChoice.Single searchable label='Team' options={OPTIONS} value={value} onChange={setValue} />;
}
```

#### Ручное применение

autoApply={false} — футер с Apply/Cancel

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'anna', label: 'Анна' },
  { value: 'boris', label: 'Борис' },
  { value: 'vera', label: 'Вера' },
];

export function ChoiceSingleManualApply() {
  const [value, setValue] = useState<string | number | undefined>('anna');

  return <ChipChoice.Single autoApply={false} label='Owner' options={OPTIONS} value={value} onChange={setValue} />;
}
```

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

- **ChipChoice.Multiple** — чип-селектор с множественным выбором.
- **Chips** — обзор семейства чипов.

## ChipChoiceMultiple

Чип-селектор с множественным выбором из списка опций — с поиском, режимом моментального или ручного применения и состояниями disabled/loading.

Чип с выпадающим списком опций и множественным выбором. Значение — массив выбранных опций; список открывается кликом и рендерится через портал.

### Когда использовать

- Для фильтрации по нескольким значениям сразу: категории, теги, статусы.
- Когда выбор должен выглядеть как компактный чип в ряду фильтров.
- Когда списку нужен поиск по опциям — через проп `searchable`.

Когда **не** нужен ChipChoice.Multiple:

- Нужно выбрать ровно одно значение:
  - используйте **`ChipChoice.Single`**.
- Нужно inline-действие без выбора:
  - используйте **`ChipAssist`**.
- Нужна классическая кнопка действия:
  - используйте **`Button`**.

### Анатомия

#### Value display

`value` и `defaultValue` — массивы значений `(string | number)[]`. В лейбле чипа отображается сводка по выбранным опциям; при множественном выборе показывается счётчик или перечисление через `valueRender`.

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Apply mode

Режим применения выбора управляется пропом `autoApply`.

- `autoApply` (default `true`) — каждое изменение выбора применяется сразу.
- `autoApply={false}` — внизу списка появляется футер с кнопками Apply/Cancel; подтверждение — через `onApprove`, отмена — через `onCancel`.

#### Searchable

- `searchable` — добавляет поле поиска в выпадающий список, опции фильтруются по введённому тексту.

Уместно для списков от 6–7 опций, где скролл становится неудобным.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер и блокирует открытие списка.

### Примеры использования

#### Множественный выбор

Контролируемый массив значений через useState

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'news', label: 'Новости' },
  { value: 'guides', label: 'Гайды' },
  { value: 'releases', label: 'Релизы' },
  { value: 'events', label: 'События' },
];

export function ChoiceMultipleBasic() {
  const [value, setValue] = useState<(string | number)[]>(['news', 'releases']);

  return (
    <ChipChoice.Multiple label='Category' options={OPTIONS} value={value} onChange={next => setValue(next ?? [])} />
  );
}
```

#### С поиском

searchable добавляет поле поиска по опциям

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik' },
];

export function ChoiceMultipleSearchable() {
  const [value, setValue] = useState<(string | number)[]>(['react', 'svelte']);

  return (
    <ChipChoice.Multiple
      searchable
      label='Tags'
      options={OPTIONS}
      value={value}
      onChange={next => setValue(next ?? [])}
    />
  );
}
```

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

- **ChipChoice.Single** — чип-селектор с одиночным выбором.
- **Chips** — обзор семейства чипов.

## ChipChoiceDate

Чип-фильтр с выбором даты через календарь — режимы date, date-time, month, year, размеры s/m/l и состояния disabled/loading.

Чип-фильтр с выбором даты. Открывает календарь в поповере, значение — объект `Date`. Поддерживает выбор даты, даты со временем, месяца и года через проп `mode`.

### Когда использовать

- Для фильтрации списка или таблицы по дате в ряду чипов-фильтров.
- Когда нужно выбрать конкретный день, месяц, год или дату со временем компактным контролом.

Когда **не** нужен ChipChoice.Date:

- Для выбора диапазона дат — используйте **`ChipChoice.DateRange`**.
- Для выбора только времени без даты — используйте **`ChipChoice.Time`**.
- Для выбора из произвольного списка значений — используйте **`ChipChoice.Single`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Mode

Режим выбора задаётся пропом `mode` (default `date`):

- `date` — выбор конкретного дня.
- `date-time` — выбор дня и времени; вместе с ним доступен `showSeconds` для отображения секунд.
- `month` — выбор месяца.
- `year` — выбор года.

Текст внутри чипа настраивается через `valueRender(value)` — функция получает текущий `Date` и возвращает узел для отображения.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер и блокирует открытие календаря.

### Примеры использования

#### Выбор даты

Контролируемое значение через value и onChange

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateBasic() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 15));

  return <ChipChoice.Date label='Дата' value={value} onChange={setValue} />;
}
```

#### Дата и время

mode='date-time' с отображением секунд

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateTime() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 15, 9, 30, 0));

  return <ChipChoice.Date label='Дата и время' mode='date-time' showSeconds value={value} onChange={setValue} />;
}
```

#### Выбор месяца

mode='month'

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateMonth() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 1));

  return <ChipChoice.Date label='Месяц' mode='month' value={value} onChange={setValue} />;
}
```

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

- **ChipChoice.DateRange** — выбор диапазона дат.
- **ChipChoice.Time** — выбор времени.
- **ChipChoice.Single** — выбор одного значения из списка.

## ChipChoiceDateRange

Чип-фильтр с выбором диапазона дат через календарь — значение в виде кортежа [Date, Date], размеры s/m/l и состояния disabled/loading.

Чип-фильтр с выбором диапазона дат. Открывает календарь в поповере, значение — кортеж `[Date, Date]` с начальной и конечной датой периода.

### Когда использовать

- Для фильтрации списка или таблицы по периоду «с — по» в ряду чипов-фильтров.
- Когда нужно выбрать интервал дат компактным контролом без отдельной формы.

Когда **не** нужен ChipChoice.DateRange:

- Для выбора одной даты — используйте **`ChipChoice.Date`**.
- Для выбора только времени — используйте **`ChipChoice.Time`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Value — период

Значение — кортеж из двух дат `[Date, Date]`:

- первый элемент — начало периода.
- второй элемент — конец периода.

Текст внутри чипа настраивается через `valueRender(value)` — функция получает текущий кортеж `[Date, Date]` и возвращает узел для отображения.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер и блокирует открытие календаря.

### Примеры использования

#### Выбор периода

Контролируемое значение через value и onChange

```tsx
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateRangeBasic() {
  const [value, setValue] = useState<[Date, Date] | undefined>([new Date(2024, 0, 15), new Date(2024, 0, 22)]);

  return <ChipChoice.DateRange label='Период' value={value} onChange={setValue} />;
}
```

#### Неконтролируемый режим

Начальный период через defaultValue

```tsx
import { ChipChoice } from '@ds/chips';

export function ChoiceDateRangeUncontrolled() {
  return <ChipChoice.DateRange label='Период' defaultValue={[new Date(2024, 0, 15), new Date(2024, 0, 22)]} />;
}
```

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

- **ChipChoice.Date** — выбор одной даты.
- **ChipChoice.Time** — выбор времени.
- **ChipChoice.Single** — выбор одного значения из списка.

## ChipChoiceTime

Чип-фильтр с выбором времени — значение в виде объекта { hours, minutes, seconds }, опциональные секунды, размеры s/m/l и состояния disabled/loading.

Чип-фильтр с выбором времени. Значение — объект `{ hours, minutes, seconds }`. Секунды отображаются опционально через `showSeconds`.

### Когда использовать

- Для фильтрации по времени суток в ряду чипов-фильтров.
- Когда нужно выбрать часы и минуты (опционально секунды) компактным контролом.

Когда **не** нужен ChipChoice.Time:

- Для выбора даты или даты со временем — используйте **`ChipChoice.Date`**.
- Для выбора периода дат — используйте **`ChipChoice.DateRange`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных тулбаров и строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Seconds (default `false`)

Проп `showSeconds` управляет отображением секунд:

- `false` — выбор только часов и минут.
- `true` — добавляет поле секунд; поле `seconds` объекта значения становится значимым.

Текст внутри чипа настраивается через `valueRender(value)` — функция получает текущий объект `{ hours, minutes, seconds }` и возвращает узел для отображения.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер и блокирует открытие выпадающего списка времени.

### Примеры использования

#### Выбор времени

Часы и минуты, контролируемое значение

```tsx
import { ChipChoice, ChipChoiceTimeProps } from '@ds/chips';
import { useState } from 'react';

export function ChoiceTimeBasic() {
  const [value, setValue] = useState<ChipChoiceTimeProps['value']>({
    hours: 9,
    minutes: 30,
  });

  return <ChipChoice.Time label='Время' value={value} onChange={setValue} />;
}
```

#### С секундами

showSeconds добавляет поле секунд

```tsx
import { ChipChoice, ChipChoiceTimeProps } from '@ds/chips';
import { useState } from 'react';

export function ChoiceTimeSeconds() {
  const [value, setValue] = useState<ChipChoiceTimeProps['value']>({
    hours: 9,
    minutes: 30,
    seconds: 15,
  });

  return <ChipChoice.Time label='Время' showSeconds value={value} onChange={setValue} />;
}
```

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

- **ChipChoice.Date** — выбор даты.
- **ChipChoice.DateRange** — выбор диапазона дат.
- **ChipChoice.Single** — выбор одного значения из списка.

## ChipChoiceCustom

Чип-фильтр с произвольным контентом выпадающего меню — для нестандартных сценариев выбора.

Чип-фильтр, в выпадающем меню которого рендерится произвольный контент через проп `content`. Подходит для сценариев, которые не покрываются готовыми вариантами `Single` / `Multiple` / `Date` / `Time`.

### Когда использовать

- Когда контент выпадающего меню — нестандартный: вложенная форма, слайдер диапазона, кастомный список с группировкой.
- Когда нужно полностью контролировать разметку и логику выбора значения.

Когда **не** нужен ChipChoice.Custom:

- Для одиночного или множественного выбора из списка — используйте **`Single`** / **`Multiple`**.
- Для дат и времени — **`Date`** / **`DateRange`** / **`Time`**.

### Анатомия

#### Size (default `s`)

- `s` — для плотных строк фильтров.
- `m` — стандартный размер.
- `l` — для крупных форм.

#### Content

Проп `content` получает объект `CustomContentRenderProps` и возвращает контент выпадающего меню:

- `value` — текущее значение компонента.
- `onChange(value)` — применить новое значение.
- `closeDroplist()` — закрыть меню и вернуть фокус на чип.

Отображение выбранного значения в самом чипе задаёт `valueRender(value)`.

#### Состояния

- `disabled` — отключает взаимодействие.
- `loading` — показывает спиннер вместо иконки.

### Примеры использования

#### Произвольное меню

content рендерит свой список, onChange + closeDroplist применяют выбор

```tsx
import { Button } from '@ds/button';
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const PRIORITIES = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
];

export function ChoiceCustomBasic() {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <ChipChoice.Custom
      label='Приоритет'
      value={value}
      onChange={setValue}
      valueRender={current => PRIORITIES.find(item => item.value === current)?.label ?? null}
      content={({ closeDroplist, onChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8 }}>
          {PRIORITIES.map(item => (
            <Button
              key={item.value}
              view='function'
              appearance='neutral'
              label={item.label}
              onClick={() => {
                onChange?.(item.value);
                closeDroplist();
              }}
            />
          ))}
        </div>
      )}
    />
  );
}
```

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

- **ChipChoice.Single** — одиночный выбор из списка.
- **Chips** — обзор пакета.
