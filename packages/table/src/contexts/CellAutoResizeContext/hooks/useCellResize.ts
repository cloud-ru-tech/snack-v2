import { Cell } from '@tanstack/react-table';
import { useContext, useEffect, useRef } from 'react';

import { CellAutoResizeContext } from '../CellAutoResizeContext';

export const useCellResize = <TData, TValue>(columnId: string, cell: Cell<TData, TValue>) => {
  const { updateCellMap, removeCellFromMap } = useContext(CellAutoResizeContext);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scrollWidth отражает полную ширину содержимого включая padding контейнера,
    // даже если часть скрыта через overflow:hidden.
    updateCellMap({
      columnId,
      size: ref.current?.scrollWidth || 0,
      cellId: cell.id,
    });

    return () => {
      removeCellFromMap({ columnId, cellId: cell.id });
    };
  }, [columnId, cell, updateCellMap, removeCellFromMap]);

  return { ref };
};
