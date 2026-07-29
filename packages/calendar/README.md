# Calendar

`@ds/calendar` — Пакет календаря и выбора времени — Calendar с режимами даты, диапазона и месяца/года, TimePicker и TimePickerDropdown для времени в составе полей ввода.

Пакет `@ds/calendar` объединяет полноэкранный и встраиваемый календарь с клавиатурной навигацией и два варианта выбора времени: встроенный `TimePicker` и `TimePickerDropdown` на базе `Dropdown` для полей с триггером.

- ****Calendar**** — выбор даты, даты со временем, диапазонов и месяцев/лет в режимах `CALENDAR_MODE`.
- ****TimePicker**** — выбор часов, минут и опционально секунд в потоке формы.
- ****TimePickerDropdown**** — то же время в выпадающей панели с кнопками действий и настройками позиционирования триггера.

## Когда использовать

- Нужен выбор периода или точечной даты с доступностью с клавиатуры и поддержкой локали.
- Время задаётся отдельно от даты или внутри поля — берите `TimePicker` или `TimePickerDropdown` по контексту (inline vs popover).

Когда **не** подходит: для простого текстового поля с маской без визуального календаря рассмотрите нативный `input type="date"` или поле с маской; для таймзон и сложного расписания — специализированные виджеты.

## Установка

```bash
pnpm add @ds/calendar
```

```ts
import { Calendar, CALENDAR_MODE, TimePicker, TimePickerDropdown } from '@ds/calendar'
```

## Figma

Макеты разбиты по узлам в библиотеке FF-8179 (сетка дней, месяцев, лет, барабан времени). Конкретные embed — на страницах компонентов ниже.

## Смотри также

- [Паттерны календаря и времени](/patterns/calendar-patterns) — контролируемое значение, локаль и составление с полями формы.
## Адаптивность

Триггерные `CalendarDropdown` и `TimePickerDropdown` переключают поверхность (surface-swap): на desktop — popover над триггером (`@ds/dropdown`), на mobile — `BottomSheet` из `@ds/bottom-sheet`. Раскладка берётся из `AdaptiveProvider` (контекст `@ds/adaptive`), пропа `layoutType` нет. Встраиваемые `Calendar` и `TimePicker` desktop-only и не адаптируются.

Детали поведения на mobile — на страницах **Calendar** и **TimePickerDropdown**. Общая модель — **Adaptive**.

## Calendar

Календарь с режимами одной даты, диапазона, даты со временем и выбора месяца или года — единый компонент с навигацией по месяцу, году и декаде.

Интерактивный календарь с переключением вида (месяц → год → декада) и режимами выбора от одной даты до диапазонов по дням, месяцам и годам. Поддерживает контролируемое и неконтролируемое значение, подсветку выходных и кастомизацию ячеек через `buildCellProps`.

### Когда использовать

- Нужен явный визуальный выбор даты или периода в модалке, сайдпанели или под полем ввода.
- Требуется согласованная навигация по месяцу/году и доступность с клавиатуры.

Когда **не** нужен: если достаточно свободного ввода текста или маски без обзора месяца — используйте поле ввода или другой паттерн.

- ✅ Управлять значением через `value` + `onChangeValue` или через `defaultValue` для неконтролируемого режима.
- ❌ Подменять выбор даты только стилем без обновления состояния — календарь перестанет совпадать с формой и полем ввода.

- ✅ Задавать «сегодня» через `today`, если нужно зафиксировать опорный день (тесты, таймзона продукта).
- ❌ Игнорировать локаль при работе с неделей и подписями — передавайте `locale`, если браузерная по умолчанию не совпадает с приложением.

### Анатомия

#### Size

| Значение | Назначение |
|----------|------------|
| `s` | Компактные попапы и плотные формы |
| `m` | Значение по умолчанию |
| `l` | Акцентные модальные сценарии |

#### Calendar mode (`mode`)

Режим определяет тип значения и разметку сетки: одна дата, пара дат (диапазон), дата со временем, месяц или год.

| Значение | Поведение |
|----------|-----------|
| `date` | Одна дата (`Date`) |
| `date-time` | Дата и время на одной сетке (`Date`) |
| `date-range` | Диапазон дней (`[Date, Date]`), доступны пресеты периода при `presets` |
| `month` / `month-range` | Выбор месяца или диапазона месяцев |
| `year` / `year-range` | Выбор года или диапазона лет |

#### View (навигация)

Внутренние уровни навигации соответствуют константам `VIEW_MODE`: месячная сетка дней, сетка месяцев года, сетка лет декады. Пользователь переключает уровень заголовком календаря.

#### Прочее

- `fitToContainer` — растягивание на контейнер (`width/height: 100%`); для демо ниже задана фиксированная ширина обёртки.
- `showHolidays` — подсветка субботы и воскресенья.
- `presets` — быстрые периоды только для `date-range` и без пользовательского `buildCellProps` (ограничение текущей версии).

### Примеры использования

#### Одна дата

Контролируемое значение

```tsx
import { Calendar, CALENDAR_MODE, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarDateSingle() {
  const [value, setValue] = useState<Date | undefined>(() => new Date(2026, 3, 10));

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar fitToContainer mode={CALENDAR_MODE.Date} size={SIZE.M} value={value} onChangeValue={d => setValue(d)} />
    </div>
  );
}
```

#### Диапазон дат

```tsx
import { Calendar, CALENDAR_MODE, Range, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarDateRange() {
  const [value, setValue] = useState<Range | undefined>(() => [new Date(2026, 3, 1), new Date(2026, 3, 20)]);

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.DateRange}
        size={SIZE.M}
        value={value}
        onChangeValue={r => setValue(r)}
      />
    </div>
  );
}
```

#### Диапазон с пресетами

Быстрые периоды через presets={{ enabled: true }} (только date-range)

```tsx
import { Calendar, CALENDAR_MODE, Range, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarWithPresets() {
  const [value, setValue] = useState<Range | undefined>();

  return (
    <div style={{ width: 520, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.DateRange}
        size={SIZE.M}
        presets={{ enabled: true }}
        value={value}
        onChangeValue={r => setValue(r)}
      />
    </div>
  );
}
```

#### Дата и время

Секунды включаются через showSeconds

```tsx
import { Calendar, CALENDAR_MODE, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarDateTime() {
  const [value, setValue] = useState<Date | undefined>(() => new Date(2026, 3, 10, 14, 30, 0));

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.DateTime}
        showSeconds
        size={SIZE.M}
        value={value}
        onChangeValue={d => setValue(d)}
      />
    </div>
  );
}
```

#### Выбор месяца

```tsx
import { Calendar, CALENDAR_MODE, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarMonthMode() {
  const [value, setValue] = useState<Date | undefined>(() => new Date(2026, 3, 1));

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.Month}
        size={SIZE.M}
        value={value}
        onChangeValue={d => setValue(d)}
      />
    </div>
  );
}
```

#### Диапазон лет

```tsx
import { Calendar, CALENDAR_MODE, Range, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarYearRange() {
  const [value, setValue] = useState<Range | undefined>(() => [new Date(2024, 0, 1), new Date(2026, 0, 1)]);

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.YearRange}
        size={SIZE.M}
        value={value}
        onChangeValue={r => setValue(r)}
      />
    </div>
  );
}
```

### Props

**CalendarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autofocus` | `boolean` | — | Автофокус |
| `bottomSlot` | `ReactNode` | — | Рендерится после основной разметки календаря, внутри `CalendarContext` (например футер с Apply в дропдауне). |
| `buildCellProps` | `BuildCellPropsFunction` | — | Колбек установки свойств ячеек календаря. Вызывается на построение каждой ячейки. Принимает два параметра: <br/> <br> `Date` - дата ячейки <br/> <br> `ViewMode`: <br/> <br> - `month` отображение месяца, каждая ячейка - 1 день <br/> <br> - `year` отображение года, каждая ячейка - 1 месяц <br/> <br> - `decade` отображение декады, каждая ячейка - 1 год <br/> <br><br> Колбек должен возвращать объект с полями, отвечающими за отключение и подкраску ячейки. |
| `className` | `string` | — | CSS-класс контейнера |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `Range` | — | Значение по-умолчанию для uncontrolled.<br> - в режиме date тип `Date` <br/> <br> - в режиме date-range тип `Range` (`[Date, Date]`) <br/> <br> - в режиме month-range тип `Range` (`[Date, Date]`) <br/> <br> - в режиме year-range тип `Range` (`[Date, Date]`) <br/> <br> - в режиме month тип `Date` <br/> <br> - в режиме date-time тип `Date` <br/> <br> - в режиме year тип `Date` |
| `fitToContainer` | `boolean` | `true` | Отключает предустановленный размер, заставляя компонент подстраиваться к размеру контейнра: (width: 100%, height: 100%). |
| `locale` | `Intl.Locale` | `Проставляется в соответствие с языком в настройках браузера` | Локаль, в соответствие с которой выставляется язык названий и первый день недели |
| `mode` | `"date"` \| `"date-range"` \| `"date-time"` \| `"month"` \| `"month-range"` \| `"year"` \| `"year-range"` | — | Режим работы календаря: <br> - `date` - режим выбора даты <br/> <br> - `date-range` - режим выбора периода <br/> <br> - `month-range` - режим выбора периода из месяцев <br/> <br> - `year-range` - режим выбора периода из лет <br/> <br> - `month` - режим выбора месяца <br/> <br> - `date-time` - режим выбора даты и времени <br/> <br> - `year` - режим выбора года |
| `navigationStartRef` | `RefObject<{ focus(): void; }>` | — | Ссылка на управление первым элементом навигации |
| `onChangeValue` | `((value: Date) => void) \| ((value: Range) => void) \| ((value: Range) => void) \| ((value: Range) => void) \| ((value: Date) => void) \| ((value: Date) => void) \| ((value: Date) => void)` | — | Колбек выбора значения.<br> - в режиме date принимает тип `Date` <br/> <br> - в режиме date-range принимает тип `Range` <br/> <br> - в режиме month-range принимает тип `Range` <br/> <br> - в режиме year-range принимает тип `Range` <br/> <br> - в режиме month принимает тип `Date` <br/> <br> - в режиме date-time принимает тип `Date` <br/> <br> - в режиме year принимает тип `Date` |
| `onFocusLeave` | `((direction: FocusDirection) => void)` | — | Колбек потери фокуса. Вызывается со значением `next`, когда фокус покидает компонент, передвигаясь вперед, по клавише `tab`. Со значением `prev` - по клавише стрелки вверх или `shift + tab`. |
| `presets` | `PresetsOptions` | — | Настройки секции с пресетами быстрого выбора периода. Доступны только при mode === 'date-range' и отсутствии buildCellProps (временно PDS-3139) |
| `showHolidays` | `boolean` | — | Раскрашивает субботу и воскресенье |
| `showSeconds` | `boolean` | — | Показывать ли секунды (только в режиме date-time) |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `style` | `CSSProperties` | — | Объект со стилями на контейнер. |
| `today` | `number \| Date` | — | Дата сегодняшнего дня |
| `value` | `Range` | — | Выбранное значение.<br> - в режиме date тип `Date` <br/> <br> - в режиме date-range тип `Range` (`[Date, Date]`) <br/> <br> - в режиме month-range тип `Range` (`[Date, Date]`) <br/> <br> - в режиме year-range тип `Range` (`[Date, Date]`) <br/> <br> - в режиме month тип `Date` <br/> <br> - в режиме date-time тип `Date` <br/> <br> - в режиме year тип `Date` |

##### Related types

- `BuildCellPropsFunction` = `(date: Date, viewMode: ViewMode) => BuildCellProps`

**PresetItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | ID периода |
| `label` | `string` | — | Лейбл пресета |
| `range` | `Range` | — | Период |

**PresetsOptions**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean \| undefined` | — | Включение отображения секции с пресетами |
| `items` | `PresetItem` | — | Кастомные пресеты быстрого выбора периода относительно текущего момента |

**Range**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `0` | `any` | — |  |
| `1` | `any` | — |  |
| `length` | `any` | — |  |

- `Size` = `"l"` \| `"m"` \| `"s"`

### Смотри также

- **TimePicker** и **TimePickerDropdown** — выбор времени.
- [Паттерны календаря и времени](/patterns/calendar-patterns).
### Адаптивность

Адаптируется только триггерный `CalendarDropdown` — он переключает поверхность (surface-swap) в зависимости от раскладки из `AdaptiveProvider` (контекст `@ds/adaptive`). Встраиваемый `Calendar` остаётся desktop-only: его разметка не меняется от раскладки. Публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — календарь в popover над триггером (`@ds/dropdown`).
- **mobile** — календарь в `BottomSheet` из `@ds/bottom-sheet` (панель снизу со свайпом для закрытия).

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

#### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <CalendarDropdown>…</CalendarDropdown>
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { CalendarDropdown } from '@ds/calendar'

  const MobileCalendarDropdown = withLayoutType(CalendarDropdown, 'mobile')
  ```

#### Поведение на mobile

- Бесконечная вертикальная прокрутка месяцев, лет и декад вместо постраничной навигации.
- Заголовок — центрированный дропдаун уровня (`месяц → год → декада`, например `Январь 2026 ⌄`) с иконками-действиями: фильтр слева открывает пресеты периода отдельным подэкраном (только `date-range`), часы справа открывают барабан времени отдельным подэкраном (только `date-time`).
- Футер показывает строку «Выбрано:» с текущим значением и кнопки «Сейчас» / «Применить» во всех режимах.
- Выбранное значение отражается в заголовке, а не позицией прокрутки; при повторном открытии панель центрируется на выбранном значении.
- Время на mobile выбирается барабаном (`TimePickerDrum`), а не колонками `TimePicker`.

#### Платформенные пропы

Пропы позиционирования popover'а, унаследованные из `@ds/dropdown` (`placement`, `fallbackPlacements`, `offset`, `widthStrategy` и др.), на mobile молча игнорируются — у `BottomSheet` своё позиционирование снизу.

| Пропы | desktop | mobile |
|-------|---------|--------|
| `placement`, `fallbackPlacements`, `offset`, `widthStrategy`, `trigger` | используется | игнорируется |
| `mode`, `value`, `defaultValue`, `onChangeValue`, `presets`, `showHolidays`, `open`, `onOpenChange` | используется | используется |

Подробнее о модели адаптивности — **Adaptive**.

## TimePicker

Встроенный выбор времени (часы, минуты, опционально секунды) с размерами s/m/l и поддержкой контролируемого значения.

Компонент для выбора времени в потоке формы: колонки часов/минут/секунд с прокруткой и фокусной навигацией. Делит контекст с календарём через внутренний `CalendarContext`, если используется рядом с `Calendar` в кастомной композиции.

### Когда использовать

- Нужен только выбор времени без даты на той же панели.
- Поле должно оставаться инлайн без выпадающего попапа.

Когда **не** нужен: если время выбирают редко и уместнее попап — используйте **TimePickerDropdown**.

- ✅ Синхронизировать значение с полем ввода через `value` / `onChangeValue`.
- ❌ Блокировать `onChangeValue` заглушкой — состояние не обновится и пример перестанет быть показательным.

### Анатомия

#### Size

| Значение | Назначение |
|----------|------------|
| `s` | Узкие колонки и плотные таблицы |
| `m` | Значение по умолчанию |
| `l` | Крупные тач-цели |

#### Секунды

`showSeconds` (`true` по умолчанию) скрывает третью колонку, если достаточно часов и минут.

### Примеры использования

#### Базовый выбор

```tsx
import { SIZE, TimePicker, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerBasic() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 9, minutes: 15, seconds: 0 });

  return (
    <div style={{ width: 280, maxWidth: '100%' }}>
      <TimePicker fitToContainer size={SIZE.M} value={value} onChangeValue={v => setValue(v)} />
    </div>
  );
}
```

#### Без секунд

```tsx
import { SIZE, TimePicker, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerNoSeconds() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 11, minutes: 45, seconds: 0 });

  return (
    <div style={{ width: 240, maxWidth: '100%' }}>
      <TimePicker fitToContainer showSeconds={false} size={SIZE.M} value={value} onChangeValue={v => setValue(v)} />
    </div>
  );
}
```

#### Размеры

```tsx
import { SIZE, TimePicker } from '@ds/calendar';

export function TimePickerSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: 200 }}>
        <TimePicker fitToContainer defaultValue={{ hours: 8, minutes: 0, seconds: 0 }} size={SIZE.S} />
      </div>
      <div style={{ width: 220 }}>
        <TimePicker fitToContainer defaultValue={{ hours: 12, minutes: 30, seconds: 0 }} size={SIZE.M} />
      </div>
      <div style={{ width: 240 }}>
        <TimePicker fitToContainer defaultValue={{ hours: 18, minutes: 45, seconds: 30 }} size={SIZE.L} />
      </div>
    </div>
  );
}
```

### Props

**TimePickerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс контейнера |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `TimeValue` | — | Значение по-умолчанию для uncontrolled. |
| `fitToContainer` | `boolean` | `true` | Отключает предустановленный размер, заставляя компонент подстраиваться к размеру контейнра: (width: 100%, height: 100%). |
| `navigationStartRef` | `RefObject<{ focus(): void; }>` | — | Ссылка на управление первым элементом навигации |
| `onChangeValue` | `((value?: TimeValue) => void)` | — | Колбек выбора значения |
| `onFocusLeave` | `((direction: FocusDirection) => void)` | — | Колбек потери фокуса. Вызывается со значением `next`, когда фокус покидает компонент, передвигаясь вперед, по клавише `tab`. Со значением `prev` - по клавише стрелки вверх или `shift + tab`. |
| `showSeconds` | `boolean` | `true` | Показывать ли секунды |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `today` | `number \| Date` | — | Дата сегодняшнего дня |
| `value` | `TimeValue` | — | Выбранное значение. |

##### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

**TimeValue**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hours` | `number \| undefined` | — |  |
| `minutes` | `number \| undefined` | — |  |
| `seconds` | `number \| undefined` | — |  |

### Смотри также

- **Calendar**
- **TimePickerDropdown**

## TimePickerDropdown

Выбор времени в выпадающей панели поверх триггера — наследует TimePicker и пропсы Dropdown (позиция, открытие по hover/click, контролируемый open).

Обёртка над `TimePicker` с `Dropdown`: произвольный триггер (`children`), управление открытием, позиционирование и опциональное закрытие после Apply. Подходит для полей «время открытия», фильтров и компактных форм.

### Когда использовать

- Нужна кнопка или кастомный триггер, а панель времени показывается по клику или ховеру.
- Требуется связать открытие с другим UI (например, контролируемый `open`).

Когда **не** нужен: для постоянно видимого времени в форме без попапа используйте **TimePicker**.

- ✅ Задавать `placement` и `trigger` в зависимости от layout и UX‑требований.
- ❌ Смешивать управляемый `open` с лишними внешними кнопками, которые дублируют открытие — проще контролировать только через `onOpenChange`.

### Анатомия

#### Триггер и открытие

`trigger` — `click` | `hover` | `focus` и др. (см. пропсы Dropdown в таблице). `closeOnApply` закрывает панель после подтверждения, если сценарий это предполагает.

#### Позиционирование

`placement` и `fallbackPlacements` наследуются из `@ds/dropdown` — подбирайте, чтобы панель не обрезалась у края экрана.

#### Визуал времени

Макет барабана времени совпадает с **TimePicker**; см. узел Figma ниже.

### Примеры использования

#### Клик по кнопке

closeOnApply закрывает после выбора

```tsx
import { Button } from '@ds/button';
import { SIZE, TimePickerDropdown, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerDropdownBasic() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 10, minutes: 5, seconds: 0 });

  return (
    <TimePickerDropdown
      closeOnApply
      fitToContainer={false}
      placement='bottom-start'
      size={SIZE.M}
      trigger='click'
      value={value}
      onChangeValue={v => setValue(v)}
    >
      <Button label='Выбрать время' />
    </TimePickerDropdown>
  );
}
```

#### Контролируемое open

```tsx
import { Button } from '@ds/button';
import { SIZE, TimePickerDropdown, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerDropdownControlled() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 14, minutes: 0, seconds: 0 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <TimePickerDropdown
        fitToContainer={false}
        open={open}
        placement='bottom-start'
        showSeconds={false}
        size={SIZE.S}
        trigger='click'
        value={value}
        onChangeValue={v => setValue(v)}
        onOpenChange={setOpen}
      >
        <Button label='Время (controlled open)' />
      </TimePickerDropdown>
      <span style={{ fontSize: 14, opacity: 0.8 }}>Панель времени: {open ? 'открыта' : 'закрыта'}</span>
    </div>
  );
}
```

#### Разные placement

```tsx
import { Button } from '@ds/button';
import { SIZE, TimePickerDropdown, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerDropdownPlacement() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 7, minutes: 30, seconds: 0 });

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <TimePickerDropdown
        closeOnApply
        fitToContainer={false}
        placement='bottom-start'
        size={SIZE.M}
        trigger='click'
        value={value}
        onChangeValue={v => setValue(v)}
      >
        <Button label='bottom-start' />
      </TimePickerDropdown>
      <TimePickerDropdown
        closeOnApply
        fitToContainer={false}
        placement='top-end'
        size={SIZE.M}
        trigger='click'
        value={value}
        onChangeValue={v => setValue(v)}
      >
        <Button label='top-end' />
      </TimePickerDropdown>
    </div>
  );
}
```

### Props

**TimePickerDropdownProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Контент триггера открытия dropdown |
| `className` | `string` | — | CSS-класс контейнера |
| `closeOnApply` | `boolean` | — | Закрыть dropdown после нажатия кнопки Apply |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `TimeValue` | — | Значение по-умолчанию для uncontrolled. |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` <br/> Работает для триггеров, которые умеют отдать свою DOM-ноду: нативные элементы, `forwardRef`-компоненты <br/> и компоненты, помеченные `withInnerRefSupport` из `@ds/utils`. Остальные всё равно получают `<span>` — <br/> без ноды поповеру не от чего считать позицию; в dev-режиме об этом печатается предупреждение. |
| `fallbackPlacements` | `Placement` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `fitToContainer` | `boolean` | `true` | Отключает предустановленный размер, заставляя компонент подстраиваться к размеру контейнра: (width: 100%, height: 100%). |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `navigationStartRef` | `RefObject<{ focus(): void; }>` | — | Ссылка на управление первым элементом навигации |
| `onApply` | `(() => void)` | — | Колбек по нажатию Apply |
| `onChangeValue` | `((value?: TimeValue) => void)` | — | Колбек выбора значения |
| `onCurrent` | `(() => void)` | — | Колбек по нажатию Current |
| `onFocusLeave` | `((direction: FocusDirection) => void)` | — | Колбек потери фокуса. Вызывается со значением `next`, когда фокус покидает компонент, передвигаясь вперед, по клавише `tab`. Со значением `prev` - по клавише стрелки вверх или `shift + tab`. |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `outsideClick` | `OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `showSeconds` | `boolean` | — | Показывать ли секунды |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `today` | `number \| Date` | — | Дата сегодняшнего дня |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `triggerRef` | `ForwardedRef<ReferenceType \| HTMLElement \| null>` | — | Ref ссылка на триггер |
| `value` | `TimeValue` | — | Выбранное значение. |

##### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

**TimeValue**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hours` | `number \| undefined` | — |  |
| `minutes` | `number \| undefined` | — |  |
| `seconds` | `number \| undefined` | — |  |

### Смотри также

- **TimePicker**
- **Dropdown** — базовый выпадающий контейнер.
### Адаптивность

`TimePickerDropdown` — адаптивный компонент с переключением поверхности (surface-swap). Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); встраиваемый `TimePicker` не адаптируется. Публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — барабан времени в popover над триггером (`@ds/dropdown`).
- **mobile** — барабан времени в `BottomSheet` из `@ds/bottom-sheet` с кнопками «Сейчас» / «Применить».

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

#### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <TimePickerDropdown>…</TimePickerDropdown>
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { TimePickerDropdown } from '@ds/calendar'

  const MobileTimePickerDropdown = withLayoutType(TimePickerDropdown, 'mobile')
  ```

#### Платформенные пропы

Пропы позиционирования и открытия popover'а (`placement`, `fallbackPlacements`, `trigger`, `closeOnApply` и др.) применяются только на desktop; на mobile `BottomSheet` имеет своё позиционирование снизу и игнорирует их.

| Пропы | desktop | mobile |
|-------|---------|--------|
| `placement`, `fallbackPlacements`, `trigger`, `closeOnApply` | используется | игнорируется |
| `value`, `defaultValue`, `onChangeValue`, `showSeconds`, `open`, `onOpenChange` | используется | используется |

Подробнее о модели адаптивности — **Adaptive**.
