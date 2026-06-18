import { Table } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CellMap, CollMap, RemoveCellOptions, UpdateCellMapOptions } from '../types';

export const useCellAutoResizeController = <TData>(table: Table<TData>) => {
  const [cellMap, setCellMap] = useState<CollMap>({});

  const updateCellMap = useCallback(({ columnId, size, cellId }: UpdateCellMapOptions) => {
    setCellMap(prevMap => ({
      ...prevMap,
      [columnId]: {
        ...prevMap[columnId],
        [cellId]: size,
      },
    }));
  }, []);

  const removeCellFromMap = useCallback(({ columnId, cellId }: RemoveCellOptions) => {
    setCellMap(prevMap => {
      const column = { ...prevMap[columnId] };
      delete column[cellId];

      return { ...prevMap, [columnId]: column };
    });
  }, []);

  const maxSizes = useMemo(
    () =>
      Object.entries(cellMap).reduce<Record<string, number>>((acc, [columnId, sizes]: [string, CellMap]) => {
        const maxSize = Math.max(...Object.values(sizes));

        return {
          ...acc,
          [columnId]: maxSize,
        };
      }, {}),
    [cellMap],
  );

  useEffect(() => {
    table.setColumnSizing(old => ({
      ...old,
      ...maxSizes,
    }));
  }, [maxSizes, table]);

  return {
    updateCellMap,
    removeCellFromMap,
  };
};
