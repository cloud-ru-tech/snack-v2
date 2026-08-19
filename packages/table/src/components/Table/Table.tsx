import { DndContext, DragOverlay } from '@dnd-kit/core';
import { isMobileLayout, LayoutPresets, mergePresets, useAdaptiveLayout, useLayoutDefaults } from '@ds/adaptive';
import { FiltersState } from '@ds/chips';
import { DragPreview } from '@ds/drag-and-drop';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { useThemeClassnames } from '@ds/theme';
import { ToolbarPersistConfig } from '@ds/toolbar';
import { extractSupportProps } from '@ds/utils';
import { flexRender } from '@tanstack/react-table';
import cn from 'classnames';
import { CSSProperties, ReactNode, Ref, RefObject, useEffect, useMemo } from 'react';

import {
  DEFAULT_EXPANDED,
  DEFAULT_PAGE_SIZE,
  DEFAULT_ROW_SELECTION,
  DEFAULT_SORTING,
  DEFAULT_VIEW,
  TABLE_COLUMN_CSS_VARS,
  VIEW,
} from '../../constants';
import { CellAutoResizeContext, TableContext, useCellAutoResizeController } from '../../contexts';
import {
  getControlsAcrylicAttrs,
  getRowActionsColumnDef,
  getStatusColumnDef,
  HeaderRow,
  LoadMoreButton,
  STATUS_APPEARANCE,
  TableEmptyState,
  TablePagination,
  useEmptyState,
} from '../../helperComponents';
import { TableLayoutDefaults, TableProps, ToolbarCheckBoxMode } from '../types';
import { getCardsListProps, TableCardsBody } from './components/TableCardsBody';
import { TableChrome } from './components/TableChrome';
import { TableRowsBody } from './components/TableRowsBody';
import { TableScrollHost } from './components/TableScrollHost';
import { TableSkeletonBody } from './components/TableSkeletonBody';
import { TableToolbar } from './components/TableToolbar';
import {
  buildAllTableColumns,
  buildColumnPinning,
  useColumnOrderByDrag,
  useColumnSettings,
  useColumnSizes,
  useColumnVirtualizer,
  useFilters,
  usePageReset,
  useRowVirtualizer,
  useStateControl,
  useTableInstance,
  useTableScroll,
  useTableToolbar,
  useTableView,
} from './hooks';
import { isFilterableColumn } from './hooks/useColumnSettings/utils';
import styles from './styles.module.scss';
import { alignOverlayToHeader, getColumnIdentifier, getPinnedGroups } from './utils';

const TABLE_CONTENT_ACRYLIC = getControlsAcrylicAttrs(BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level);

const BASE_STICKY_CONTROLS: TableLayoutDefaults['stickyControls'] = {
  enabled: false,
  offsetTop: 0,
  offsetBottom: 0,
};

const BASE_TABLE_LAYOUT_DEFAULTS: TableLayoutDefaults = {
  stickyControls: BASE_STICKY_CONTROLS,
  fullWidth: true,
  defaultView: DEFAULT_VIEW,
};

/** DS-пресет адаптива `Table`: mobile-дефолты sticky-хрома, `fullWidth` и стартовый вид `cards`. Desktop — `BASE_TABLE_LAYOUT_DEFAULTS`. */
export const TABLE_LAYOUT_PRESETS: LayoutPresets<TableLayoutDefaults> = {
  mobile: {
    stickyControls: {
      enabled: true,
      offsetTop: 0,
      offsetBottom: 0,
    },
    fullWidth: true,
    defaultView: VIEW.Cards,
  },
};

/** Компонент таблицы */
export function Table<TData extends object, TFilters extends FiltersState = Record<string, unknown>>({
  data,
  rowPinning = {
    top: [],
  },
  columnDefinitions,
  keepPinnedRows = false,
  copyPinnedRows = false,
  enableSelectPinned = false,
  rowSelection: rowSelectionProp,
  search,
  sorting: sortingProp,
  columnFilters,
  pagination: paginationProp,
  className,
  onRowClick,
  onRefresh,
  pageSize = DEFAULT_PAGE_SIZE,
  pageCount,
  loading = false,
  infiniteLoading = false,
  onLoadMore,
  hasMore,
  loadMoreTrigger = 'scroll',
  outline = false,
  fullWidth,
  moreActions,
  onExport,
  dataFiltered,
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  suppressToolbar = false,
  suppressHeader = false,
  suppressSearch = false,
  toolbarAfter,
  suppressPagination = false,
  manualSorting = false,
  manualPagination: manualPaginationProp = false,
  manualFiltering = false,
  autoResetPageIndex = false,
  scrollRef,
  scrollContainerRef,
  stickyControls: stickyControlsProp,
  layoutPresets,
  getRowId,
  enableFuzzySearch,
  savedState,
  expanding,
  bulkActions: bulkActionsProp,
  rowAutoHeight,
  columnsSettings: columnsSettingsProp,
  getRowBackgroundColor,
  headerRowBackgroundColor,
  toolbarCheckBoxMode,
  view: viewProp,
  defaultView: defaultViewProp,
  onViewChange,
  showDataView = false,
  headlineId,
  cardColumns,
  cardMinWidth,
  renderCard,
  enableRowVirtualization = false,
  rowVirtualizerOptions,
  rowVirtualizerInstanceRef,
  enableColumnVirtualization = false,
  columnVirtualizerOptions,
  columnVirtualizerInstanceRef,
  ...rest
}: TableProps<TData, TFilters>) {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const {
    stickyControls,
    fullWidth: resolvedFullWidth,
    defaultView,
  } = useLayoutDefaults<TableLayoutDefaults>(
    BASE_TABLE_LAYOUT_DEFAULTS,
    mergePresets(TABLE_LAYOUT_PRESETS, layoutPresets),
    { stickyControls: stickyControlsProp, fullWidth, defaultView: defaultViewProp },
  );

  const isStickyControls = stickyControls.enabled ?? false;
  const stickyControlsOffsetTop = stickyControls.offsetTop ?? 0;
  const stickyControlsOffsetBottom = stickyControls.offsetBottom ?? 0;
  const stickyControlsBackgroundPredefined =
    stickyControlsProp?.backgroundPredefined ?? BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level;

  const { view, isCardsView, setView } = useTableView({ view: viewProp, defaultView, onViewChange });

  const usePageStickyHeader = isStickyControls && !isCardsView;
  const isAllRowsMode = toolbarCheckBoxMode === ToolbarCheckBoxMode.AllRows;

  const masterSelection = useMemo(() => ({ isAllRowsMode }), [isAllRowsMode]);

  const [globalFilter, onGlobalFilterChange] = useStateControl(search, '');
  const [rowSelection, onRowSelectionChange] = useStateControl(rowSelectionProp, DEFAULT_ROW_SELECTION);

  const defaultPaginationState = useMemo(
    () => ({
      pageIndex: 0,
      pageSize,
    }),
    [pageSize],
  );

  const [sorting, onSortingChange] = useStateControl(sortingProp, DEFAULT_SORTING);
  const [expanded, onExpandedChange] = useStateControl(expanding, DEFAULT_EXPANDED);
  const [pagination, onPaginationChange] = useStateControl(paginationProp, defaultPaginationState);

  const { filter, patchedFilter, setFilter, setFilterVisibility } = useFilters({ columnFilters });

  const enableSelection = Boolean(rowSelectionProp?.enable);

  const allTableColumns = useMemo(
    () =>
      buildAllTableColumns({
        columnDefinitions,
        enableSelection,
        enableSelectPinned,
        expanding,
        rowSelectionAppearance: rowSelectionProp?.appearance,
        masterSelection,
      }),
    [columnDefinitions, enableSelection, enableSelectPinned, expanding, masterSelection, rowSelectionProp?.appearance],
  );

  const pinnedGroups = useMemo(() => getPinnedGroups(allTableColumns), [allTableColumns]);

  const {
    enabledColumns,
    setEnabledColumns,
    getColumnsSettings,
    enabledTableColumns,
    enabledColumnsDefinitions,
    areColumnsSettingsEnabled,
  } = useColumnSettings({
    columnDefinitions,
    pinnedGroups,
    savedState,
    columnsSettings: columnsSettingsProp,
    rowSelection: rowSelectionProp,
    enableSelectPinned,
    expanding,
    masterSelection,
  });

  const hideableColumnIds = useMemo(
    () => new Set(columnDefinitions.filter(isFilterableColumn).map(getColumnIdentifier)),
    [columnDefinitions],
  );

  useEffect(() => {
    if (!areColumnsSettingsEnabled || !sorting.length) {
      return;
    }

    const hasSortingOnHiddenColumn = sorting.some(
      ({ id }) => hideableColumnIds.has(id) && !enabledColumns.includes(id),
    );

    if (hasSortingOnHiddenColumn) {
      onSortingChange([]);
    }
  }, [areColumnsSettingsEnabled, enabledColumns, hideableColumnIds, onSortingChange, sorting]);

  const { columnOrder, setColumnOrder, dndContextProps, enableColumnsOrderSortByDrag, draggingColumnId } =
    useColumnOrderByDrag({
      tableColumns: allTableColumns,
      savedState,
      columnSettings: columnsSettingsProp,
    });

  const manualPagination = infiniteLoading || manualPaginationProp;
  const columnsSettings = useMemo(() => getColumnsSettings(columnOrder), [columnOrder, getColumnsSettings]);
  const columnPinning = useMemo(() => buildColumnPinning(pinnedGroups), [pinnedGroups]);

  const { table, loadingTable, bulkActions, handleOnRefresh, handleOnToolbarCheck } = useTableInstance({
    data,
    rowPinning,
    keepPinnedRows,
    enableSelectPinned,
    rowSelectionProp,
    globalFilter,
    onGlobalFilterChange,
    rowSelection,
    onRowSelectionChange,
    sorting,
    onSortingChange,
    expanded,
    onExpandedChange,
    pagination,
    onPaginationChange,
    pageCount,
    pageSize,
    manualSorting,
    manualPagination,
    manualFiltering,
    autoResetPageIndex,
    getRowId,
    enableFuzzySearch,
    expanding,
    rowAutoHeight,
    enabledTableColumns,
    enabledColumnsDefinitions,
    columnPinning,
    columnOrder,
    enableColumnsOrderSortByDrag,
    setColumnOrder,
    masterSelection,
    infiniteLoading,
    loading,
    onRefresh,
    bulkActionsProp,
  });

  const tableRows = table.getRowModel().rows;
  const tableCenterRows = table.getCenterRows();
  const tableFilteredRows = table.getFilteredRowModel().rows;
  const tableFilteredRowsIds = tableFilteredRows.map(row => row.id);
  const topRows = table.getTopRows();
  const loadingTableRows = loadingTable.getRowModel().rows;

  const filteredTopRows = table.getState().globalFilter
    ? topRows.filter(tr => tableFilteredRowsIds.includes(tr.id))
    : topRows;

  const centerRows = copyPinnedRows ? tableRows : tableCenterRows;
  const isLoadingState = (!infiniteLoading || !data.length) && loading;
  const sizingTable = isLoadingState ? loadingTable : table;

  const { columnSizes } = useColumnSizes({
    table: sizingTable,
    headers: sizingTable.getFlatHeaders(),
    isLoadingState,
    savedState,
  });

  const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });

  usePageReset({
    manualPagination,
    maximumAvailablePage: pageCount || tableFilteredRows.length / pagination.pageSize,
    pagination,
    onPaginationChange,
    autoResetPageIndex,
  });

  const { updateCellMap, removeCellFromMap } = useCellAutoResizeController(table);

  const showToolbar = !suppressToolbar;
  const showHeader = !suppressHeader;
  const showPagination = !infiniteLoading && !suppressPagination;

  const {
    internalScrollRef,
    wrapperRef,
    stickyToolbarRef,
    isScrollReady,
    handleScrollInitialized,
    syncHeaderHorizontalScroll,
    scrollOverflow,
  } = useTableScroll({
    usePageStickyHeader,
    isStickyControls,
    stickyControlsOffsetTop,
    stickyControlsOffsetBottom,
    showToolbar,
    isCardsView,
    isMobile,
    view,
    isLoadingState,
    columnSizeVars: columnSizes.vars,
    scrollContainerRef,
  });

  const multiRow = Boolean(rowSelectionProp?.multiRow);
  const selectionMode = multiRow ? 'multiple' : 'single';
  const cardSelection = enableSelection ? selectionMode : 'none';

  const {
    tableToolbarPersistConfig,
    toolbarBulkProps,
    dataView,
    showToolbarSorting,
    exportToolbarSlot,
    sortingToolbarSlot,
    columnsSettingsToolbarSlot,
    hasMobileToolbarMounts,
    searchPlaceholder,
  } = useTableToolbar({
    table,
    columnDefinitions,
    sortingProp,
    savedState,
    columnFilters,
    suppressToolbar,
    suppressSearch,
    isCardsView,
    showDataView,
    setView,
    globalFilter,
    onGlobalFilterChange,
    pagination,
    onPaginationChange,
    sorting,
    onSortingChange,
    filter,
    setFilter,
    setFilterVisibility,
    enableSelection,
    multiRow,
    masterSelection,
    handleOnToolbarCheck,
    bulkActions,
    areColumnsSettingsEnabled,
    enabledColumns,
    columnsSettings,
    setEnabledColumns,
    setColumnOrder,
    outline,
    moreActions,
    onExport,
    onRefresh,
    handleOnRefresh,
  });

  const rowVirtualizationActive =
    enableRowVirtualization && !isCardsView && !isLoadingState && !isMobile && isScrollReady;

  const rowVirtualizer = useRowVirtualizer({
    enabled: rowVirtualizationActive,
    count: centerRows.length,
    scrollRef: internalScrollRef,
    options: rowVirtualizerOptions,
    instanceRef: rowVirtualizerInstanceRef,
  });

  const centerLeafHeaders = useMemo(() => {
    if (!enableColumnVirtualization || isCardsView) return [];
    return table.getIsSomeColumnsPinned() ? table.getCenterLeafHeaders() : table.getLeafHeaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableColumnVirtualization, isCardsView, table, columnSizes]);

  const columnVirtualizationActive =
    enableColumnVirtualization && !isCardsView && !isMobile && !isLoadingState && isScrollReady;

  const columnVirtualizer = useColumnVirtualizer({
    enabled: columnVirtualizationActive,
    centerHeaders: centerLeafHeaders,
    scrollRef: internalScrollRef,
    options: columnVirtualizerOptions,
    instanceRef: columnVirtualizerInstanceRef,
  });

  const cardsListProps = getCardsListProps({ isMobile, cardMinWidth, cardColumns });

  const tableEmptyState = (
    <TableEmptyState
      emptyStates={emptyStates}
      dataError={dataError}
      dataFiltered={dataFiltered || Boolean(table.getState().globalFilter)}
      tableRowsLength={tableRows.length + filteredTopRows.length}
    />
  );

  const showInfiniteLoadingTail = data.length > 0 && infiniteLoading && loading && !dataError;

  const loadMoreButtonNode =
    infiniteLoading && loadMoreTrigger === 'button' ? (
      <LoadMoreButton onClick={onLoadMore} loading={loading} hasMore={hasMore} />
    ) : null;

  const isEmptyBody = !isLoadingState && tableRows.length + filteredTopRows.length === 0;

  // Мастер держит шапку колонок в пустом состоянии noData/noResult (колонки известны),
  // но скрывает при dataError. Загрузка и непустое тело — шапка всегда.
  const showTableHeader =
    showHeader &&
    (isLoadingState || centerRows.length > 0 || filteredTopRows.length > 0 || (isEmptyBody && !dataError));

  const draggingHeader = draggingColumnId
    ? table.getFlatHeaders().find(header => header.column.id === draggingColumnId)
    : undefined;

  // Копия колонки едет за курсором в портале: внутри скролла она растила бы его ширину
  // и ныряла под закреплённые колонки.
  const draggingColumnPreview = (
    <DragOverlay dropAnimation={null} modifiers={[alignOverlayToHeader]}>
      {draggingHeader ? (
        <DragPreview
          className={styles.columnDragPreview}
          style={{ width: `var(${TABLE_COLUMN_CSS_VARS.size(draggingHeader.column.id)})` } as CSSProperties}
        >
          {flexRender(draggingHeader.column.columnDef.header, draggingHeader.getContext())}
        </DragPreview>
      ) : null}
    </DragOverlay>
  );

  const tableHeaderElement = showTableHeader ? (
    <HeaderRow
      rowAutoHeight={rowAutoHeight}
      columnOrder={columnOrder}
      enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
      suppressSticky={usePageStickyHeader}
    />
  ) : null;

  const tableRowsContent = (
    <TableRowsBody
      filteredTopRows={filteredTopRows}
      centerRows={centerRows}
      rowVirtualizer={rowVirtualizer}
      columnOrder={columnOrder}
      rowAutoHeight={rowAutoHeight}
      onRowClick={onRowClick}
      enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
      rowSelectionAppearance={rowSelectionProp?.appearance}
      emptyState={tableEmptyState}
      showInfiniteLoadingTail={showInfiniteLoadingTail}
      loadingTableRows={loadingTableRows}
      loadMoreButton={loadMoreButtonNode}
    />
  );

  const cardsContentBody = (
    <TableCardsBody
      filteredTopRows={filteredTopRows}
      centerRows={centerRows}
      table={table}
      headlineId={headlineId}
      cardSelection={cardSelection}
      rowSelectionAppearance={rowSelectionProp?.appearance}
      suppressHeader={suppressHeader}
      onRowClick={onRowClick}
      renderCard={renderCard}
      cardsListProps={cardsListProps}
      emptyState={tableEmptyState}
      showInfiniteLoadingTail={showInfiniteLoadingTail}
      loadingTableRows={loadingTableRows}
      loadingTable={loadingTable}
      loadMoreButton={loadMoreButtonNode}
    />
  );

  const tableContentBody = (
    <>
      {!usePageStickyHeader ? tableHeaderElement : null}
      {tableRowsContent}
    </>
  );

  let tableBody: ReactNode = tableContentBody;
  let tableScrollRows: ReactNode = tableRowsContent;

  if (isLoadingState) {
    tableBody = (
      <TableSkeletonBody
        variant={isCardsView ? 'cards' : 'table'}
        loadingTableRows={loadingTableRows}
        loadingTable={loadingTable}
        columnOrder={columnOrder}
        rowAutoHeight={rowAutoHeight}
        rowSelectionAppearance={rowSelectionProp?.appearance}
        usePageStickyHeader={usePageStickyHeader}
        showHeader={showHeader}
        headlineId={headlineId}
        suppressHeader={suppressHeader}
        cardsListProps={cardsListProps}
      />
    );
    tableScrollRows = (
      <TableSkeletonBody
        variant='table'
        loadingTableRows={loadingTableRows}
        loadingTable={loadingTable}
        columnOrder={columnOrder}
        rowAutoHeight={rowAutoHeight}
        rowSelectionAppearance={rowSelectionProp?.appearance}
        usePageStickyHeader={usePageStickyHeader}
        showHeader={showHeader}
        headlineId={headlineId}
        suppressHeader={suppressHeader}
        cardsListProps={cardsListProps}
        tableScrollRowsOnly
      />
    );
  } else if (isCardsView) {
    tableBody = cardsContentBody;
  }

  const tableContextValue = useMemo(
    () => ({
      table: isLoadingState ? loadingTable : table,
      getRowBackgroundColor,
      headerRowBackgroundColor,
      isCardsView,
      virtualCenterColumnIds: isLoadingState || !columnVirtualizer ? null : columnVirtualizer.virtualColumnIds,
      columnVirtualPadding:
        isLoadingState || !columnVirtualizer
          ? null
          : { left: columnVirtualizer.paddingLeft, right: columnVirtualizer.paddingRight },
      fullWidth: resolvedFullWidth,
    }),
    [
      isLoadingState,
      loadingTable,
      table,
      getRowBackgroundColor,
      headerRowBackgroundColor,
      isCardsView,
      columnVirtualizer,
      resolvedFullWidth,
    ],
  );

  const themeClassName = useThemeClassnames({ density: isMobile ? 'comfort' : 'compact' });

  const controlsAcrylic = useMemo(
    () => (isStickyControls ? getControlsAcrylicAttrs(stickyControlsBackgroundPredefined) : null),
    [isStickyControls, stickyControlsBackgroundPredefined],
  );

  const scrollPaddingAbsolute = isStickyControls && !isCardsView;

  const tableScrollContent = (
    <div className={styles.body} data-empty-body={isEmptyBody || undefined} style={columnSizes.vars as CSSProperties}>
      <CellAutoResizeContext.Provider value={{ updateCellMap, removeCellFromMap }}>
        {tableScrollRows}
      </CellAutoResizeContext.Provider>
    </div>
  );

  const tableContentWithProviders = (
    <div className={styles.body} data-empty-body={isEmptyBody || undefined} style={columnSizes.vars as CSSProperties}>
      <CellAutoResizeContext.Provider value={{ updateCellMap, removeCellFromMap }}>
        {tableBody}
      </CellAutoResizeContext.Provider>
    </div>
  );

  let scrollContent = tableContentWithProviders;

  if (isMobile && isCardsView) {
    scrollContent = tableBody;
  } else if (usePageStickyHeader) {
    scrollContent = tableScrollContent;
  }

  const toolbarElement = (
    <TableToolbar
      search={
        suppressSearch
          ? undefined
          : {
              value: globalFilter,
              onChange: onGlobalFilterChange,
              loading: search?.loading,
              placeholder: search?.placeholder || searchPlaceholder,
            }
      }
      onRefresh={onRefresh ? handleOnRefresh : undefined}
      persist={showToolbar ? (tableToolbarPersistConfig as ToolbarPersistConfig<TFilters>) : undefined}
      checked={toolbarBulkProps?.checked}
      indeterminate={toolbarBulkProps?.indeterminate}
      onCheck={toolbarBulkProps?.onCheck}
      bulkActions={toolbarBulkProps?.bulkActions as Parameters<typeof TableToolbar<TFilters>>[0]['bulkActions']}
      selectedCount={toolbarBulkProps?.selectedCount}
      totalCount={toolbarBulkProps?.totalCount}
      showBulkCheckbox={toolbarBulkProps?.showBulkCheckbox}
      outline={outline}
      dataView={dataView}
      after={
        toolbarAfter || onExport || areColumnsSettingsEnabled || showToolbarSorting ? (
          <>
            {toolbarAfter}
            {exportToolbarSlot.afterContent}
            {sortingToolbarSlot.afterContent}
            {columnsSettingsToolbarSlot.afterContent}
          </>
        ) : undefined
      }
      moreActions={moreActions}
      filterRow={patchedFilter}
    />
  );

  let toolbarChrome: ReactNode = null;

  if (showToolbar) {
    const stickyToolbarChromeRef = isStickyControls ? stickyToolbarRef : undefined;

    toolbarChrome =
      isStickyControls && controlsAcrylic ? (
        <TableChrome ref={stickyToolbarChromeRef} variant='header' acrylic={controlsAcrylic}>
          {toolbarElement}
        </TableChrome>
      ) : (
        <TableChrome ref={stickyToolbarChromeRef} variant='header'>
          {toolbarElement}
        </TableChrome>
      );
  }

  let paginationChrome: ReactNode = null;

  if (showPagination) {
    const pagination = (
      <TablePagination
        table={table}
        options={paginationProp?.options}
        optionsLabel={paginationProp?.optionsLabel}
        pageCount={pageCount}
        optionsRender={paginationProp?.optionsRender}
      />
    );

    paginationChrome =
      isStickyControls && controlsAcrylic ? (
        <TableChrome variant='footer' acrylic={controlsAcrylic}>
          {pagination}
        </TableChrome>
      ) : (
        pagination
      );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.wrapper, className, themeClassName)}
      data-view={view}
      data-layout-type={layoutType}
      data-sticky-controls={isStickyControls || undefined}
      data-with-toolbar={showToolbar || undefined}
      data-empty-body={isEmptyBody || undefined}
      data-fit-content={!resolvedFullWidth || undefined}
      {...extractSupportProps(rest)}
    >
      <TableContext.Provider value={tableContextValue}>
        {toolbarChrome}

        <div className={styles.tableView}>
          <div
            className={styles.content}
            data-outline={!isCardsView && outline ? true : undefined}
            data-page-sticky-header={!isCardsView && usePageStickyHeader ? true : undefined}
            {...(!isCardsView ? TABLE_CONTENT_ACRYLIC : {})}
          >
            {!isCardsView ? <span className={styles.contentAcrylic} data-acrylic-background aria-hidden /> : null}
            {hasMobileToolbarMounts ? (
              <div className={styles.mobileToolbarMounts}>
                {sortingToolbarSlot.mobileMount}
                {columnsSettingsToolbarSlot.mobileMount}
              </div>
            ) : null}

            {/* Накрывает и шапку, и тело: sticky-шапка рендерится вне скролла. */}
            <DndContext {...dndContextProps}>
              {draggingColumnPreview}
              <TableScrollHost
                view={view}
                isMobile={isMobile}
                isCardsView={isCardsView}
                usePageStickyHeader={usePageStickyHeader}
                scrollOverflow={scrollOverflow}
                scrollPaddingAbsolute={scrollPaddingAbsolute}
                internalScrollRef={internalScrollRef}
                scrollRef={scrollRef as Ref<HTMLDivElement>}
                scrollContainerRef={scrollContainerRef as RefObject<HTMLDivElement>}
                handleScrollInitialized={handleScrollInitialized}
                syncHeaderHorizontalScroll={syncHeaderHorizontalScroll}
                tableHeaderElement={tableHeaderElement}
                columnSizeVars={columnSizes.vars as CSSProperties}
              >
                {scrollContent}
              </TableScrollHost>
            </DndContext>
            {!isCardsView && outline ? <span className={styles.contentBorder} aria-hidden /> : null}
          </div>

          {paginationChrome}
        </div>
      </TableContext.Provider>
    </div>
  );
}

Table.getStatusColumnDef = getStatusColumnDef;
Table.statusAppearances = STATUS_APPEARANCE;
Table.getRowActionsColumnDef = getRowActionsColumnDef;
