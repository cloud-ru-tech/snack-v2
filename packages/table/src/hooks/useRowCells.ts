import { Row } from '@tanstack/react-table';
import { useMemo } from 'react';

import { useTableContext } from '../contexts';

export function useRowCells<TData>(row: Row<TData>) {
  const { table, virtualCenterColumnIds } = useTableContext();
  const pinEnabled = table.getIsSomeColumnsPinned();
  const columnDefs = table._getColumnDefs();
  const { columnOrder } = table.getState();

  return useMemo(() => {
    if (!pinEnabled) {
      const allCells = row.getVisibleCells();
      return {
        unpinned: virtualCenterColumnIds
          ? allCells.filter(cell => virtualCenterColumnIds.has(cell.column.id))
          : allCells,
      };
    }

    const left = row.getLeftVisibleCells();
    const right = row.getRightVisibleCells();
    const center = row.getCenterVisibleCells();

    return {
      leftPinned: left.length ? left : undefined,
      rightPinned: right.length ? right : undefined,
      unpinned: virtualCenterColumnIds ? center.filter(cell => virtualCenterColumnIds.has(cell.column.id)) : center,
    };
    // need to rebuild if columnDefinitions has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, pinEnabled, columnDefs, columnOrder, virtualCenterColumnIds]);
}
