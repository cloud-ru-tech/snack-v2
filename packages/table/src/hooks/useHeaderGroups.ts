import { HeaderGroup } from '@tanstack/react-table';
import { useMemo } from 'react';

import { useTableContext } from '../contexts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasHeaders(groups: HeaderGroup<any>[]) {
  return groups.some(group => group.headers.length);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterGroupsByVirtualIds(groups: HeaderGroup<any>[], virtualIds: Set<string>): HeaderGroup<any>[] {
  return groups.map(group => ({
    ...group,
    headers: group.headers.filter(h => virtualIds.has(h.column.id)),
  }));
}

export function useHeaderGroups() {
  const { table, virtualCenterColumnIds } = useTableContext();
  const columnDefs = table._getColumnDefs();
  const pinEnabled = table.getIsSomeColumnsPinned();
  const { columnOrder } = table.getState();

  return useMemo(() => {
    if (!pinEnabled) {
      const groups = table.getHeaderGroups();
      return {
        unpinned: virtualCenterColumnIds ? filterGroupsByVirtualIds(groups, virtualCenterColumnIds) : groups,
      };
    }

    const left = table.getLeftHeaderGroups();
    const right = table.getRightHeaderGroups();
    const center = table.getCenterHeaderGroups();

    return {
      leftPinned: hasHeaders(left) ? left : undefined,
      rightPinned: hasHeaders(right) ? right : undefined,
      unpinned: virtualCenterColumnIds ? filterGroupsByVirtualIds(center, virtualCenterColumnIds) : center,
    };
    // need to rebuild if columnDefinitions has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, pinEnabled, columnDefs, columnOrder, virtualCenterColumnIds]);
}
