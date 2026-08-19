import { ValueOf } from '@ds/utils';

export const COLUMN_PIN_POSITION = {
  Left: 'left',
  Right: 'right',
} as const;

export const COLUMN_ALIGN = {
  Left: 'left',
  Right: 'right',
} as const;

export const COLUMN_SETTINGS_MODE = {
  /** В меню настроек `Switch` заблокирован, колонка всегда видима */
  Locked: 'locked',
  /** В меню, по умолчанию включена. Режим по умолчанию для любой колонки */
  DefaultVisible: 'defaultVisible',
  /** В меню, по умолчанию выключена */
  DefaultHidden: 'defaultHidden',
} as const;

export const SORT_FN = {
  DateTime: 'datetime',
  AlphaNumeric: 'alphanumeric',
} as const;

export const TABLE_ROW_COLOR = {
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
  Neutral: 'neutral',
} as const;

/** Режим отображения таблицы: классическая сетка (`table`) или карточки (`cards`) */
export const VIEW = {
  Table: 'table',
  Cards: 'cards',
} as const;

export type View = ValueOf<typeof VIEW>;

/** CSS custom properties таблицы. Синхронизируй с `components/Table/styles.module.scss` / `helperComponents/Rows/styles.module.scss`. */
export const TABLE_CSS_VARS = {
  stickyControlsOffsetTop: '--table-sticky-controls-offset-top',
  stickyControlsOffsetBottom: '--table-sticky-controls-offset-bottom',
  stickyToolbarOffset: '--table-sticky-toolbar-offset',
  headerScrollLeft: '--table-header-scroll-left',
  viewportWidth: '--table-viewport-width',
  cardMinWidth: '--table-card-min-width',
  cardColumns: '--table-card-columns',
  virtualRowStart: '--virtual-row-start',
} as const;

export const TABLE_COLUMN_CSS_VARS = {
  size: (columnId: string) => `--table-column-${columnId}-size`,
  flex: (columnId: string) => `--table-column-${columnId}-flex`,
};

/** Идентификаторы предопределённых служебных колонок */
export const DefaultColumns = {
  Status: 'snack_predefined_statusColumn',
  Selection: 'selectionCell',
  RowActions: 'rowActions',
} as const;

export type DefaultColumns = ValueOf<typeof DefaultColumns>;

export const TEST_IDS = {
  headerSortIndicator: 'table__header__sort-indicator',
  headerRow: 'table__header-row',
  headerCell: 'table__header-cell',
  bodyRow: 'table__body-row',
  bodyCell: 'table__body-cell',
  /** Скелетон ячейки в loading-состоянии (e2e/visual: skeleton-text__line внутри) */
  loadingCellSkeleton: 'table__loading-cell-skeleton',
  loadMoreButton: 'table__load-more-button',
  pinnedCells: 'table__pinned-cells',
  rowSelect: 'table__row-select',
  selectAll: 'table__select-all',
  tree: {
    node: 'tree__node',
    chevron: 'tree__chevron',
    checkbox: 'tree__checkbox',
    radio: 'tree__radio',
    icon: 'tree__icon',
  },
  rowActions: {
    droplistTrigger: 'table__body-row__droplistTrigger',
    droplist: 'table__body-row__actions-droplist',
    option: 'list__base-item-label',
  },
  statusIndicator: 'table__status-indicator',
  toolbar: 'table__toolbar',
  copyButton: 'button-copy-value',
  headerResizeHandleMovingPart: 'table__header-cell-resize-handle-moving-part',
  columnSettings: {
    trigger: 'table__column-settings',
    droplist: 'table__column-settings-droplist',
    overflowTrigger: 'table__column-settings-overflow-trigger',
  },
  export: {
    trigger: 'table__export',
    overflowTrigger: 'table__export-overflow-trigger',
  },
  // card view (view='cards')
  card: 'table__card',
  cardSelectionController: 'table__card__selection-controller',
  // FLAG[snack-v2 Toolbar dataView]: сегмент-контрол переключения table/cards рендерится внутри
  // @ds/toolbar, собственный test-id туда не доезжает — toolbar сам ставит 'toolbar__data-view'
  // на обёртку dataView-слота (см. TEST_IDS.dataView пакета @ds/toolbar).
  viewSort: {
    droplistTrigger: 'table__view-sort__droplistTrigger',
    droplist: 'table__view-sort__droplist',
    option: 'table__view-sort__option',
    overflowTrigger: 'table__view-sort__overflow-trigger',
  },
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const EXPORT_MAX_COLUMN_WIDTH = 50;
export const DEFAULT_SORTING = [];
export const DEFAULT_FILTER_VISIBILITY = [];
export const DEFAULT_ROW_SELECTION = {};
export const DEFAULT_EXPANDED = {};
export const DEFAULT_VIEW = VIEW.Table;

export const DEFAULT_COLUMNS = [DefaultColumns.Status, DefaultColumns.Selection, DefaultColumns.RowActions];
