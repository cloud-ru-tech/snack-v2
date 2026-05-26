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
| `api` | `ToolbarApi` | — | Бэкенд команд: WYSIWYG (TipTap) в preview-режиме либо markdown-исходник (textarea) в raw-режиме. |
| `bulkActions` | `BulkAction[]` | — | Список массовых действий |
| `checked` | `boolean` | — | Значение чекбокса |
| `className` | `string` | — | Класснейм |
| `data-test-id` | `string` | — |  |
| `dataView` | `ToolbarDataViewProps` | — | Переключатель вида данных — SegmentControl (showDataView в Figma) |
| `filterRow` | `FilterRow<TState>` | — |  |
| `indeterminate` | `boolean` | — | Состояние частичного выбора |
| `items` | `ToolbarItemId` | — |  |
| `layoutType` | `"desktop"` \| `"mobile"` | `desktop` | Режим отображения: desktop (по умолчанию) или mobile |
| `moreActions` | `Action[]` | — | Элементы выпадающего списка кнопки с действиями |
| `onCheck` | `(() => void)` | — | Колбек смены значения чекбокса |
| `onRefresh` | `(() => void)` | — | Колбек обновления |
| `outline` | `boolean` | `true` | Внешний бордер |
| `persist` | `ToolbarPersistConfig<TState>` | — | Конфиг для сохранения состояния в localStorage и queryParams. <br> <br/> Поле id должно быть уникальным для каждого инстанса компонента. <br> |
| `search` | `SearchProps` | — | Параметры отвечают за строку поиска <br> <br/> <strong>value</strong>: Значение строки поиска <br> <br/> <strong>onChange</strong>: Колбэк смены значения <br> <br/> <strong>onSubmit</strong>: Колбэк на подтверждение поиска по строке <br/> <strong>placeholder</strong>: Плейсхолдер <br> <br/> <strong>loading</strong>: Состояние загрузки <br> |
| `selectedCount` | `number` | — | Количество выбранных элементов (для подписи Selected: N) |
| `showBulkCheckbox` | `boolean` | `true` | Показывать чекбокс слева (Figma: showBulkCheckbox) |
| `totalCount` | `number` | — | Общее количество элементов (для подписи Selected: N of M) |

## Смотри также

- **`Search`** — поле поиска внутри тулбара (`background={false}`).
- **`SegmentControl`** — типичный контент слота `dataView`.
