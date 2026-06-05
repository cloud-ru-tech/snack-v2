# Toolbar

`@ds/toolbar` — Панель инструментов списков и таблиц — поиск, фильтры, массовые действия, меню «Ещё».

`Toolbar` — композитная панель над таблицей или списком: поиск, обновление, фильтры, переключатель вида данных, массовые действия и overflow-меню «⋯». Режим `layoutType` переключает desktop- и mobile-поведение (Droplist vs BottomSheet, размер чипов фильтров).

## Когда использовать

- Над таблицей или списком с поиском, фильтрами и действиями над выбранными строками.
- Когда нужно сохранять состояние фильтров и поиска в URL или `localStorage` (`persist`).

Когда **не** нужен:

- Для одиночного поля поиска без остальных слотов — **`Search`** или **`SearchPrivate`**.
- Для переключения вкладок раздела — **`Tabs`**.
- Для произвольного меню действий без контекста списка — **`Dropdown`**.

### Рекомендации

- ✅ Один `Toolbar` на экран над данными.
- ❌ Дублировать поиск и фильтры в header и в теле страницы.
- ✅ Controlled `search` через `value` + `onChange`.
- ❌ No-op `onChange` — строка поиска не реагирует на ввод.
- ✅ `layoutType="mobile"` на узких viewport и в Storybook mobile-сценариях.
- ❌ Desktop overflow «⋯» на мобильном без смены `layoutType`.
- ✅ Уникальный `persist.id` на каждый инстанс.
- ❌ Один `id` на несколько тулбаров — состояние фильтров смешается.

## Анатомия

Слоты сверху вниз:

- **Строка панели** — `onRefresh`, `search`, `after`, `dataView`, кнопка фильтров, `moreActions`.
- **Строка фильтров** — `ChipChoiceRow` / `MobileChipChoiceRow` при `filterRow`.
- **Bulk-панель** — чекбокс, счётчик выбранных, tonal-кнопки; не влезшие действия — в «⋯».

### Layout (default `desktop`)

- `desktop` — overflow «⋯» в Droplist, чипы фильтров size `s`, bulk-действия в строке под чипами.
- `mobile` — overflow в BottomSheet, чипы size `s`, bulk-действия в sheet без backdrop при активном выборе.

### Outline (default `false`)

- `true` — внешний бордер через отдельный слой `border` на контейнере.
- `false` — панель без внешнего бордера.

## Установка

```bash
pnpm add @ds/toolbar
```

```ts
import { Toolbar, LAYOUT_TYPE } from '@ds/toolbar';
```

## Примеры использования

{/* client:only — Droplist/BottomSheet из @sbercloud/snack-v2-* не резолвятся при SSR (ESM dir-import) */}

### Базовый desktop

Поиск, обновление и меню «⋯»

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function Basic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          moreActions={[
            { content: { option: 'Экспорт' }, onClick: () => undefined },
            { content: { option: 'Настройки' }, onClick: () => undefined },
          ]}
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Фильтры

Кнопка фильтров и строка ChipChoiceRow

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function WithFilters() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filterValue, setFilterValue] = useState<Record<string, unknown>>({});

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          filterRow={{
            open: filtersOpen,
            onOpenChange: setFiltersOpen,
            value: filterValue,
            onChange: setFilterValue,
            filters: [
              {
                id: 'status',
                type: 'single',
                label: 'Статус',
                options: [
                  { value: 'active', label: 'Активные' },
                  { value: 'archived', label: 'Архив' },
                ],
              },
            ],
            defaultValue: {},
          }}
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Массовые действия

Bulk-панель под фильтрами с чекбоксом и tonal-кнопками

```tsx
import { CheckSVG, CopySVG, CrossSVG } from '@ds/icons';
import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function BulkActions() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          checked={checked}
          indeterminate={false}
          selectedCount={checked ? 5 : 0}
          totalCount={100}
          onCheck={() => setChecked(value => !value)}
          bulkActions={[
            { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
            { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
            { label: 'Копировать', icon: CopySVG, onClick: () => undefined },
          ]}
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Mobile layout

layoutType mobile — включите чекбокс, чтобы открыть bulk-панель в BottomSheet внутри рамки

```tsx
import { CheckSVG, CrossSVG } from '@ds/icons';
import { Checkbox } from '@ds/toggles';
import { LAYOUT_TYPE, Toolbar } from '@ds/toolbar';
import { useId, useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function MobileLayout() {
  const selectionToggleId = useId();
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <label
        htmlFor={selectionToggleId}
        style={{ display: 'inline-flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}
      >
        <Checkbox id={selectionToggleId} size='s' checked={checked} onChange={setChecked} />
        <span>Есть выбранные строки таблицы</span>
      </label>
      <MobilePreview>
        <Toolbar
          layoutType={LAYOUT_TYPE.Mobile}
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          moreActions={[{ content: { option: 'Действие' }, onClick: () => undefined }]}
          checked={checked}
          onCheck={() => setChecked(value => !value)}
          selectedCount={checked ? 12 : 0}
          totalCount={100}
          bulkActions={[
            { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
            { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
          ]}
        />
      </MobilePreview>
    </div>
  );
}
```

### Слоты after и dataView

Дополнительная кнопка и SegmentControl

```tsx
import { Button } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons';
import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function WithDataView() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          after={
            <Button
              view='function'
              appearance='neutral'
              icon={<PlaceholderSVG />}
              size='m'
              aria-label='Дополнительное действие'
              onClick={() => undefined}
            />
          }
          dataView={{ show: true }}
          moreActions={[{ content: { option: 'Ещё' }, onClick: () => undefined }]}
        />
      </div>
    </PortalContextProvider>
  );
}
```

## Props

**ToolbarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `after` | `ReactNode` | — | Дополнительный слот между поиском и переключателем вида (+ slotExtraButton в Figma). <br> <br/> На mobile (`layoutType="mobile"`) не рендерится в строке — кнопки переносятся в меню «⋯» <br/> (`Button` с `onClick` и `label` / `icon` / `aria-label`, одна обёртка вокруг кнопки <br/> или элемент с `data-toolbar-after-overflow`). Иначе — в `moreActions`. |
| `bulkActions` | `BulkActionsProps` | — | Список массовых действий |
| `checked` | `boolean` | — | Значение чекбокса |
| `className` | `string` | — | Класснейм |
| `data-test-id` | `string` | — |  |
| `dataView` | `DataViewBaseProps` \| `ToolbarDataViewProps` | — | Переключатель вида данных — SegmentControl (showDataView в Figma) |
| `filterRow` | `FilterRow` \| `TState` | — |  |
| `indeterminate` | `boolean` | — | Состояние частичного выбора |
| `layoutType` | `"desktop"` \| `"mobile"` | `desktop` | Режим отображения: desktop (по умолчанию) или mobile |
| `moreActions` | `MoreActionsProps` | — | Элементы выпадающего списка кнопки с действиями |
| `onCheck` | `(() => void)` | — | Колбек смены значения чекбокса |
| `onRefresh` | `(() => void)` | — | Колбек обновления |
| `outline` | `boolean` | `true` | Внешний бордер |
| `persist` | `TState` \| `ToolbarPersistConfig` | — | Конфиг для сохранения состояния в localStorage и queryParams. <br> <br/> Поле id должно быть уникальным для каждого инстанса компонента. <br> |
| `search` | `SearchProps` | — | Параметры отвечают за строку поиска <br> <br/> <strong>value</strong>: Значение строки поиска <br> <br/> <strong>onChange</strong>: Колбэк смены значения <br> <br/> <strong>onSubmit</strong>: Колбэк на подтверждение поиска по строке <br/> <strong>placeholder</strong>: Плейсхолдер <br> <br/> <strong>loading</strong>: Состояние загрузки <br> |
| `selectedCount` | `number` | — | Количество выбранных элементов (для подписи Selected: N) |
| `showBulkCheckbox` | `boolean` | `true` | Показывать чекбокс слева (Figma: showBulkCheckbox) |
| `totalCount` | `number` | — | Общее количество элементов (для подписи Selected: N of M) |

#### Related types

**Action**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode \| ItemContentProps` | — | Основной контент айтема |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Флаг неактивности элемента |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки клика |
| `tagLabel` | `string \| undefined` | — |  |

**BulkAction**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — |  |
| `icon` | `((props: { className?: string; }, deprecatedLegacyContext?: any) => ReactNode) \| (new (props: { className?: string; }, deprecatedLegacyContext?: any) => Component<any, any>)` | — |  |
| `label` | `string` | — |  |
| `onClick` | `(() => void) \| undefined` | — |  |
| `tooltip` | `TooltipProps` | — |  |

**BulkActionsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `BulkAction` | — | Список массовых действий |
| `checked` | `boolean \| undefined` | — | Значение чекбокса |
| `data-test-id` | `string \| undefined` | — |  |
| `indeterminate` | `boolean \| undefined` | — | Состояние частичного выбора |
| `onCheck` | `(() => void) \| undefined` | — | Колбек смены значения чекбокса |
| `selectedCount` | `number \| undefined` | — | Количество выбранных элементов (для подписи Selected: N) |
| `showBulkCheckbox` | `boolean \| undefined` | — | Показывать чекбокс слева (Figma: showBulkCheckbox) |
| `totalCount` | `number \| undefined` | — | Общее количество элементов (для подписи Selected: N of M) |

**DataViewBaseProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `"compact"` \| `"list"` | — |  |
| `items` | `DataViewValue` \| `Segment` \| `SegmentControlProps` | — |  |
| `onChange` | `((value: DataViewValue) => void) \| undefined` | — |  |
| `value` | `"compact"` \| `"list"` | — |  |

- `DataViewValue` = `"compact"` \| `"list"`

**FilterRow**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — | CSS-класс |
| `defaultValue` | `TState` | — | Начальное состояние фильтров |
| `filters` | `BaseChipProps` \| `ChipChoiceDateWithSeconds` \| `ChipChoiceRowFilter` \| `DropdownBridgeProps` | — | Массив чипов |
| `initialOpen` | `boolean \| undefined` | — | Начальное состояние filter-row (mobile) |
| `onChange` | `((filters: TState) => void) \| undefined` | — | Колбек изменения состояния фильтров |
| `onOpenChange` | `((isOpen: boolean) => void) \| undefined` | — |  |
| `onVisibleFiltersChange` | `((value: string[]) => void) \| undefined` | — | Коллбек на изменение видимых фильтров |
| `open` | `boolean \| undefined` | — |  |
| `showAddButton` | `boolean \| undefined` | — | Скрыть/показать кнопку добавления фильров |
| `showClearButton` | `boolean \| undefined` | — | Скрыть/показать кнопку очиски фильтров |
| `value` | `TState` | — | Состояние фильтров |
| `visibleFilters` | `string[] \| undefined` | — | Состояние для видимых фильтров |

**MoreActionsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string \| undefined` | — |  |
| `layoutType` | `"desktop"` \| `"mobile"` | — | Режим отображения: desktop (по умолчанию) или mobile |
| `moreActions` | `Action` | — | Элементы выпадающего списка кнопки с действиями |

**PersistedFilterState**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filter` | `T` | — |  |
| `ordering` | `FieldSort[] \| undefined` | — |  |
| `pagination` | `PaginationParams \| undefined` | — |  |
| `search` | `string \| undefined` | — |  |

**SearchProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean \| undefined` | — |  |
| `onChange` | `(value: string) => void` | — |  |
| `onSubmit` | `((value: string) => void) \| undefined` | — |  |
| `placeholder` | `string \| undefined` | — |  |
| `value` | `string` | — |  |

**ToolbarDataViewProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string \| undefined` | — |  |
| `defaultValue` | `"compact"` \| `"list"` | — |  |
| `items` | `DataViewValue` \| `Segment` \| `SegmentControlProps` | — |  |
| `onChange` | `((value: DataViewValue) => void) \| undefined` | — |  |
| `show` | `boolean \| undefined` | — | Показать переключатель вида. Если `dataView` не передан — равносильно `show: false` |
| `value` | `"compact"` \| `"list"` | — |  |

**ToolbarPersistConfig**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filterQueryKey` | `string \| undefined` | — | Ключ для queryParams |
| `id` | `string \| undefined` | — | Уникальный id для текущего инстанса компонента |
| `onLoad` | `((state: PersistedFilterState<T>) => void) \| undefined` | — | Колбэк при первом рендере для получения сохраненных данных и установки их в стейт |
| `parser` | `((value: string) => PersistedFilterState<T>) \| undefined` | — | Custom-парсер queryParams для преобразования в данные состояния |
| `serializer` | `((value: PersistedFilterState<T>) => string) \| undefined` | — | Custom-сериализация состояния перед сохранением в queryParams |
| `state` | `PersistedFilterState` \| `T` | — | Состояние для сохранения |
| `validateData` | `((value: unknown) => value is PersistedFilterState<T>) \| undefined` | — | Валидатор сохраненных |

## Смотри также

- **`Search`** — поле поиска внутри тулбара (`background={false}`).
- **`SegmentControl`** — типичный контент слота `dataView`.
