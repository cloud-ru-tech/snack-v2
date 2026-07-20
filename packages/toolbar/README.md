# Toolbar

`@ds/toolbar` — Панель инструментов списков и таблиц — поиск, фильтры, массовые действия, меню «Ещё».

`Toolbar` — композитная панель над таблицей или списком: поиск, обновление, фильтры, переключатель вида данных, массовые действия и overflow-меню «⋯». Панель адаптивна: на mobile меню «⋯» и bulk-действия переезжают в `BottomSheet`. Раскладку компонент берёт из `AdaptiveProvider` — отдельного пропа `layoutType` нет.

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
- ✅ Один `<AdaptiveProvider>` в корне приложения — mobile-перестроение включается само.
- ❌ Ручное ветвление desktop/mobile-вёрстки тулбара в обход контекста раскладки.
- ✅ Уникальный `persist.id` на каждый инстанс.
- ❌ Один `id` на несколько тулбаров — состояние фильтров смешается.

## Анатомия

Слоты сверху вниз:

- **Строка панели** — `onRefresh`, `search`, `after`, `dataView`, кнопка фильтров, `moreActions`.
- **Строка фильтров** — `ChipChoiceRow` / `MobileChipChoiceRow` при `filterRow`.
- **Bulk-панель** — чекбокс, счётчик выбранных, tonal-кнопки; не влезшие действия — в «⋯».

### Outline (default `false`)

- `true` — внешний бордер через отдельный слой `border` на контейнере.
- `false` — панель без внешнего бордера.

## Установка

```bash
pnpm add @ds/toolbar
```

```ts
import { Toolbar } from '@ds/toolbar';
```

## Примеры использования

{/* client:only — Droplist/BottomSheet из @ds/* не резолвятся при SSR (ESM dir-import) */}

### Базовый desktop

Поиск, обновление и меню «⋯»

```tsx
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function Basic() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
        onRefresh={() => setSearch('')}
        moreActions={[
          { content: { label: 'Экспорт' }, onClick: () => undefined },
          { content: { label: 'Настройки' }, onClick: () => undefined },
        ]}
      />
    </div>
  );
}
```

### Фильтры

Кнопка фильтров и строка ChipChoiceRow

```tsx
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function WithFilters() {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filterValue, setFilterValue] = useState<Record<string, unknown>>({});

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
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
  );
}
```

### Массовые действия

Bulk-панель под фильтрами с чекбоксом и tonal-кнопками

```tsx
import { CheckSVG, CopySVG, CrossSVG } from '@ds/icons/interface/system';
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function BulkActions() {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
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
  );
}
```

### Слоты after и dataView

Дополнительная кнопка и SegmentControl

```tsx
import { Button } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function WithDataView() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
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
        moreActions={[{ content: { label: 'Ещё' }, onClick: () => undefined }]}
      />
    </div>
  );
}
```

## Props

**ToolbarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `after` | `ReactNode` | — | Дополнительный слот между поиском и переключателем вида (+ slotExtraButton в Figma). <br> <br/> На mobile-раскладке (из `AdaptiveProvider`) не рендерится в строке — кнопки переносятся в меню «⋯» <br/> (`Button` с `onClick` и `label` / `icon` / `aria-label`, одна обёртка вокруг кнопки <br/> или элемент с `data-toolbar-after-overflow`). Иначе — в `moreActions`. |
| `api` | `ToolbarApi` | — | Бэкенд команд: WYSIWYG (TipTap) в preview-режиме либо markdown-исходник (textarea) в raw-режиме. |
| `bulkActions` | `BulkAction[]` | — | Список массовых действий |
| `checked` | `boolean` | — | Значение чекбокса |
| `className` | `string` | — | Класснейм |
| `data-test-id` | `string` | — |  |
| `dataView` | `ToolbarDataViewProps` | — | Переключатель вида данных — SegmentControl (showDataView в Figma) |
| `filterRow` | `FilterRow<TState>` | — |  |
| `indeterminate` | `boolean` | — | Состояние частичного выбора |
| `items` | `ToolbarItemId` | — |  |
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
## Адаптивность

`Toolbar` — адаптивный компонент: DOM остаётся единым, но при mobile-раскладке панель перестраивается. Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — overflow «⋯» открывается в `Droplist`, bulk-действия идут строкой под чипами фильтров.
- **mobile** — overflow «⋯» и bulk-действия переезжают в `BottomSheet` (панель снизу без backdrop при активном выборе).

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-перестроение включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

### Mobile layout

Mobile-раскладка — включите чекбокс, чтобы открыть bulk-панель в BottomSheet внутри рамки

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { CheckSVG, CrossSVG } from '@ds/icons/interface/system';
import { Checkbox } from '@ds/toggles';
import { Toolbar } from '@ds/toolbar';
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
        <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
          <Toolbar
            search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
            onRefresh={() => setSearch('')}
            moreActions={[{ content: { label: 'Действие' }, onClick: () => undefined }]}
            checked={checked}
            onCheck={() => setChecked(value => !value)}
            selectedCount={checked ? 12 : 0}
            totalCount={100}
            bulkActions={[
              { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
              { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
            ]}
          />
        </AdaptiveProvider>
      </MobilePreview>
    </div>
  );
}
```

### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <Toolbar search={search} onRefresh={refresh} moreActions={actions} />
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { Toolbar } from '@ds/toolbar'

  const MobileToolbar = withLayoutType(Toolbar, 'mobile')
  ```

Подробнее о модели адаптивности — [Адаптивность — паттерн](/patterns/adaptive).
