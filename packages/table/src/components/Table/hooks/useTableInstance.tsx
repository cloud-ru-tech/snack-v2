import { TruncateString } from '@ds/truncate-string';
import {
  ColumnOrderState,
  ColumnPinningState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  RowPinningState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo } from 'react';

import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { getColumnId } from '../../../helpers';
import { ColumnDefinition } from '../../../types';
import { fuzzyFilter } from '../../../utils';
import { RowAppearance, TableProps } from '../../types';
import { getTableColumnsDefinitions, PinnedGroupsState } from '../utils';
import { useLoadingTable } from './useLoadingTable';

type UseTableInstanceParams<TData extends object> = {
  data: TData[];
  rowPinning: RowPinningState;
  keepPinnedRows: boolean;
  enableSelectPinned: boolean;
  rowSelectionProp: TableProps<TData>['rowSelection'];
  globalFilter: string;
  onGlobalFilterChange: OnChangeFn<string>;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  expanded: ExpandedState;
  onExpandedChange: OnChangeFn<ExpandedState>;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount?: number;
  pageSize: number;
  manualSorting: boolean;
  manualPagination: boolean;
  manualFiltering: boolean;
  autoResetPageIndex: boolean;
  getRowId?: TableProps<TData>['getRowId'];
  enableFuzzySearch?: boolean;
  expanding?: TableProps<TData>['expanding'];
  rowAutoHeight?: boolean;
  enabledTableColumns: ColumnDefinition<TData>[];
  enabledColumnsDefinitions: ColumnDefinition<TData>[];
  columnPinning: ColumnPinningState;
  columnOrder: ColumnOrderState;
  enableColumnsOrderSortByDrag: boolean;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  isAllRowsMode: boolean;
  infiniteLoading: boolean;
  loading: boolean;
  onRefresh?: () => void;
  bulkActionsProp?: TableProps<TData>['bulkActions'];
};

export function useTableInstance<TData extends object>({
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
  isAllRowsMode,
  infiniteLoading,
  loading,
  onRefresh,
  bulkActionsProp,
}: UseTableInstanceParams<TData>) {
  const enableSelection = Boolean(rowSelectionProp?.enable);

  const enableRowSelection = useCallback(
    (row: Row<TData>) => {
      const parent = row.getParentRow();
      const isParentSelected = parent ? parent.getCanSelect() : true;
      let isCurrentRowSelected = true;

      if (rowSelectionProp?.enable !== undefined) {
        isCurrentRowSelected =
          typeof rowSelectionProp.enable === 'boolean' ? rowSelectionProp.enable : rowSelectionProp.enable(row);
      }

      return (
        isParentSelected && isCurrentRowSelected && ((row.getIsPinned() && enableSelectPinned) || !row.getIsPinned())
      );
    },
    [rowSelectionProp, enableSelectPinned],
  );

  const table = useReactTable({
    data,
    columns: enabledTableColumns,
    state: {
      columnPinning,
      columnOrder: enableColumnsOrderSortByDrag ? columnOrder : undefined,
      globalFilter,
      rowSelection,
      sorting,
      pagination,
      rowPinning: expanding ? { top: [] } : rowPinning,
      expanded,
    },
    pageCount,
    defaultColumn: {
      enableSorting: false,
      enableResizing: false,
      minSize: 32,
      cell: cell => {
        if (rowAutoHeight) {
          return cell.getValue();
        }

        return <TruncateString text={String(cell.getValue() ?? '')} maxLines={1} />;
      },
    },
    onColumnOrderChange: enableColumnsOrderSortByDrag ? setColumnOrder : undefined,
    manualSorting,
    manualPagination,
    manualFiltering,
    globalFilterFn: enableFuzzySearch ? fuzzyFilter : 'includesString',
    onGlobalFilterChange,
    getRowId,
    onRowSelectionChange,
    enableGrouping: true,
    enableRowSelection,
    enableMultiRowSelection: rowSelectionProp?.enable && rowSelectionProp?.multiRow,
    enableFilters: true,
    getSubRows: expanding?.getSubRows,
    filterFromLeafRows: Boolean(expanding),
    enableSubRowSelection: true,
    onExpandedChange,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableColumnResizing: true,
    paginateExpandedRows: manualPagination,
    enableSorting: true,
    enableMultiSort: true,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange,
    autoResetPageIndex,
    ...(infiniteLoading ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onEnd',
    keepPinnedRows,
  });

  useEffect(() => {
    if (!expanding) {
      table.toggleAllRowsExpanded(false);
    }
  }, [expanding, table]);

  const { loadingTable } = useLoadingTable({
    pageSize: Math.min(Math.max(pageSize, 5), DEFAULT_PAGE_SIZE),
    columnDefinitions: enabledColumnsDefinitions,
    columnPinning,
    enableSelection,
    enableSelectPinned,
    expanding,
    rowSelectionAppearance: rowSelectionProp?.appearance,
  });

  const handleOnRefresh = useCallback(() => {
    table.resetRowSelection();
    onRefresh?.();
  }, [onRefresh, table]);

  const bulkActions = useMemo(
    () =>
      enableSelection
        ? bulkActionsProp?.map(action => ({
            ...action,
            onClick: () => action.onClick?.(table.getState().rowSelection, table.resetRowSelection),
          }))
        : undefined,
    [bulkActionsProp, enableSelection, table],
  );

  const handleOnToolbarCheck = useCallback(() => {
    if (!loading && rowSelectionProp?.multiRow) {
      isAllRowsMode ? table.toggleAllRowsSelected() : table.toggleAllPageRowsSelected();
    }
  }, [isAllRowsMode, loading, rowSelectionProp?.multiRow, table]);

  return {
    table,
    loadingTable,
    enableSelection,
    bulkActions,
    handleOnRefresh,
    handleOnToolbarCheck,
  };
}

export function buildColumnPinning<TData extends object>(pinnedGroups: PinnedGroupsState<TData>) {
  const getColDefIdsFromGroup = (columnDefinitions: PinnedGroupsState<TData>['left']) =>
    columnDefinitions.reduce<string[]>((accArr, colDef) => {
      const id = getColumnId(colDef);
      if (id) {
        accArr.push(id);
      }
      return accArr;
    }, []);

  return {
    left: getColDefIdsFromGroup(pinnedGroups.left),
    right: getColDefIdsFromGroup(pinnedGroups.right),
  };
}

export function buildAllTableColumns<TData extends object>({
  columnDefinitions,
  enableSelection,
  enableSelectPinned,
  expanding,
  rowSelectionAppearance,
  isAllRowsMode,
}: {
  columnDefinitions: TableProps<TData>['columnDefinitions'];
  enableSelection: boolean;
  enableSelectPinned: boolean;
  expanding?: TableProps<TData>['expanding'];
  rowSelectionAppearance?: RowAppearance;
  isAllRowsMode: boolean;
}) {
  return getTableColumnsDefinitions({
    columnDefinitions,
    enableSelection,
    enableSelectPinned,
    expanding,
    rowSelectionAppearance,
    isAllRowsMode,
  });
}
