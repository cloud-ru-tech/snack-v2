import { ColumnPinningState, getCoreRowModel, Table, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { getSelectionCellColumnDef, getTreeColumnDef, renderTreeColumnLoadingHeader } from '../../../helperComponents';
import { ColumnDefinition } from '../../../types';
import { RowAppearance, TableProps } from '../../types';
import { getLoadingCell } from './loadingTableCells';

type UseLoadingTableProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  pageSize: number;
  columnPinning: ColumnPinningState;
  enableSelection?: boolean;
  enableSelectPinned?: boolean;
  expanding?: TableProps<TData>['expanding'];
  rowSelectionAppearance?: RowAppearance;
};

export function useLoadingTable<TData extends object>({
  pageSize,
  columnDefinitions,
  columnPinning,
  enableSelection,
  enableSelectPinned,
  expanding,
  rowSelectionAppearance,
}: UseLoadingTableProps<TData>): { loadingTable: Table<TData> } {
  const data = useMemo(() => Array.from({ length: pageSize }).map(() => ({}) as TData), [pageSize]);

  const columns = useMemo(() => {
    let cols: ColumnDefinition<TData>[] = columnDefinitions.map(column => ({
      ...column,
      cell: getLoadingCell(column),
    }));

    // for selection column
    if (enableSelection && !expanding) {
      const selectionColumnDef = getSelectionCellColumnDef(enableSelectPinned ?? false, {});
      // В скелетоне мастер-чекбокс не показываем — header пустой, ячейки — скелетон.
      const loadingSelectionColumn = {
        ...selectionColumnDef,
        header: undefined,
        cell: getLoadingCell(selectionColumnDef),
      } as ColumnDefinition<TData>;
      cols = [loadingSelectionColumn, ...cols];
    }

    // for tree column
    if (expanding) {
      const expandingColumnDefinition = expanding.expandingColumnDefinition;
      const showToggle = expandingColumnDefinition.showToggle ?? Boolean(enableSelection);

      const treeColumnDef = getTreeColumnDef({
        ...expandingColumnDefinition,
        enableSelection,
        rowSelectionAppearance,
      });
      const treeDefaultSize = treeColumnDef.minSize ?? treeColumnDef.size ?? 150;
      // Мастер-чекбокс скрываем, но слот cellToggles в шапке и строках сохраняем.
      const loadingTreeColumn = {
        ...treeColumnDef,
        minSize: treeDefaultSize,
        size: treeDefaultSize,
        header: renderTreeColumnLoadingHeader(expandingColumnDefinition.header, {
          enableSelection,
          showToggle,
        }),
        cell: getLoadingCell(treeColumnDef),
      } as ColumnDefinition<TData>;
      cols = [loadingTreeColumn, ...cols];
    }

    return cols;
  }, [columnDefinitions, enableSelection, enableSelectPinned, expanding, rowSelectionAppearance]);

  const loadingTable = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return { loadingTable };
}
