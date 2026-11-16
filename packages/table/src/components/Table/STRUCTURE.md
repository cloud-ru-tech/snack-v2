# Table — внутренняя структура

`Table.tsx` связывает пропсы, состояние и контексты таблицы и собирает панель инструментов, область прокрутки и пагинацию.

Публичный API компонента — в [packages/table/docs/table.mdx](../../../docs/table.mdx).

`Table` и `ServerTable` — базовые компоненты. `ServerTable` использует `Table` для серверной пагинации, сортировки и фильтрации. Готовые варианты находятся в [src/presets](../../presets), общие компоненты — в [src/helperComponents](../../helperComponents). `SimpleTable` отображает все переданные строки без панели инструментов и пагинации.

## Архитектура

```mermaid
flowchart TB
  Table[Table.tsx]
  Adaptive["@ds/adaptive"]
  Contexts[contexts/]
  useState[useStateControl]
  useInstance[useTableInstance]
  useLoading[useLoadingTable]
  useSizes[useColumnSizes]
  useScroll[useTableScroll]
  useToolbar[useTableToolbar]
  usePageReset[usePageReset]
  Toolbar[TableToolbar]
  ScrollHost[TableScrollHost]
  RowsBody[TableRowsBody]
  CardsBody[TableCardsBody]
  Skeleton[TableSkeletonBody]
  Chrome[TableChrome]
  Pagination[TablePagination]
  LoadMore[LoadMoreButton]
  Helpers[helperComponents]

  Table --> Adaptive
  Table --> Contexts
  Table --> useState
  Table --> useInstance
  useInstance --> useLoading
  Table --> useSizes
  Table --> useScroll
  Table --> useToolbar
  Table --> usePageReset
  Table --> Toolbar
  Table --> ScrollHost
  ScrollHost --> RowsBody
  ScrollHost --> CardsBody
  ScrollHost --> Skeleton
  ScrollHost --> LoadMore
  Table --> Chrome
  Table --> Pagination
  RowsBody --> Helpers
  CardsBody --> Helpers
  ScrollHost --> Helpers
```

## Зоны ответственности

| Зона | Модуль | Ответственность |
| ---- | ------ | --------------- |
| Controlled props | `hooks/useStateControl` | uncontrolled/controlled glue для `search`, `sorting`, `pagination`, `rowSelection`, `expanding` |
| State / tanstack | `hooks/useTableInstance` + `buildAllTableColumns` | column defs, pinning, `useReactTable`, bulk selection |
| Loading table | `hooks/useLoadingTable` | skeleton-строки и loading column defs (внутри `useTableInstance`) |
| Column resize | `hooks/useColumnSizes` | CSS-vars ширин колонок, localStorage, sync в tanstack |
| Scroll / sticky | `hooks/useTableScroll` | scroll refs, header scroll sync, toolbar/chrome CSS-vars offset, `scrollOverflow` |
| Toolbar | `hooks/useTableToolbar` + `components/TableToolbar` | persist (`saveTableState`), search, bulk, dataView, sorting/columns slots |
| Column settings | `hooks/useColumnSettings` | видимость колонок, меню настроек, saved state |
| Filters | `hooks/useFilters` | filter-row, состояние фильтров |
| Virtualization | `hooks/useRowVirtualizer`, `hooks/useColumnVirtualizer` | виртуализация строк и колонок |
| Column order | `hooks/useColumnOrderByDrag` + `DndContext` в `Table.tsx` | DnD порядка колонок |
| Page index | `hooks/usePageReset` | сброс `pageIndex`, если страница вне диапазона (client pagination) |
| Adaptive | `@ds/adaptive` + `TABLE_LAYOUT_PRESETS` | `layoutType`, mobile-дефолты `stickyControls`, `fullWidth` |
| Context | `contexts/` (`TableContext`, `CellAutoResizeContext`) | auto-resize ячеек, `fullWidth`, virtualization padding, shared table API для строк/ячеек |
| Table rows | `components/TableRowsBody` | закреплённые сверху строки, виртуализация, индикатор дозагрузки, пустые состояния |
| Cards view | `components/TableCardsBody` | сетка карточек и список на мобильной раскладке |
| Loading | `components/TableSkeletonBody` | skeleton table/cards |
| Scroll shell | `components/TableScrollHost` | контейнер прокрутки для строк и карточек, закреплённый заголовок, кнопка дозагрузки после содержимого |
| Пагинация | `helperComponents/TablePagination` | кнопки перехода и выбор страницы через BottomSheet на мобильной раскладке |
| Chrome | `components/TableChrome` | `ControlsChrome` для toolbar и pagination |
| Layout shell | `Table.tsx` + `styles.module.scss` | `.wrapper`, grid/flex, `data-fit-content` при `fullWidth={false}`, провайдеры |
| Утилиты | `utils/` | pinning, column ids, CSS-vars, `getTableColumnsDefinitions`, `saveTableState/*` |
| Примитивы UI | `helperComponents/` | `HeaderRow`, `BodyRow`, `Row` (`data-fit-content` из `TableContext`), ячейки, `TableCard`, `TablePagination`, `TableEmptyState`, `LoadMoreButton`, `ControlsChrome` |

## Дерево файлов

```text
packages/table/src/components/Table/
├── STRUCTURE.md
├── Table.tsx
├── index.ts
├── styles.module.scss              ← layout-стили Table (общий модуль)
├── hooks/
│   ├── useTableInstance.tsx        ← buildAllTableColumns
│   ├── useLoadingTable.tsx
│   ├── loadingTableCells.tsx
│   ├── useStateControl.ts
│   ├── usePageReset.ts
│   ├── useColumnSizes.ts
│   ├── useTableScroll.ts
│   ├── useTableToolbar.ts
│   ├── useTableView.ts
│   ├── useColumnSettings/
│   ├── useFilters/
│   ├── useRowVirtualizer.ts
│   ├── useColumnVirtualizer.ts
│   └── useColumnOrderByDrag/
├── components/
│   ├── TableToolbar/
│   ├── TableRowsBody/
│   ├── TableCardsBody/
│   ├── TableSkeletonBody/
│   ├── TableScrollHost/
│   └── TableChrome/
└── utils/
    ├── getTableColumnsDefinitions.ts
    ├── columnSize.ts
    └── saveTableState/             ← persist toolbar (validators, mappers)

packages/table/src/contexts/          ← TableContext, CellAutoResizeContext
packages/table/src/helperComponents/  ← строки, ячейки, карточки, pagination, empty state, chrome
```

## Стили

Все layout-стили таблицы — в едином [`styles.module.scss`](styles.module.scss). Подкомпоненты в `components/` импортируют классы оттуда (`import styles from '../../styles.module.scss'`): родительские селекторы вроде `.wrapper .tableView .table` завязаны на один CSS Modules scope.

При разнесении стилей по подкомпонентам — только `data-*` атрибуты в shell-селекторах, без привязки к class name дочерних модулей.
