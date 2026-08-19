import {
  closestCenter,
  CollisionDetection,
  DndContextProps,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { isBrowser } from '@ds/utils';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { ColumnDefinition } from '../../../../types';
import { TableProps } from '../../../types';
import { getColumnIdentifier } from '../../utils';
import { getLocalStorageColumnOrderKey, prepareInitialState } from './utils/prepareInitialState';

const draggingOptions = {
  activationConstraint: {
    distance: 5, // Is required to differ click (sort) from drag
  },
};

type UseColumnOrderByDragProps<TData extends object> = {
  tableColumns: ColumnDefinition<TData>[];
  savedState: TableProps<TData>['savedState'];
  columnSettings: TableProps<TData>['columnsSettings'];
};

export function useColumnOrderByDrag<TData extends object>({
  tableColumns,
  savedState,
  columnSettings,
}: UseColumnOrderByDragProps<TData>): {
  columnOrder: string[];
  setColumnOrder: Dispatch<SetStateAction<string[]>>;
  dndContextProps: DndContextProps;
  enableColumnsOrderSortByDrag: boolean;
  /** Колонка под курсором прямо сейчас: по ней рендерится копия в портале. */
  draggingColumnId?: string;
} {
  const [columnOrder, setColumnOrderState] = useState<string[]>(() => prepareInitialState(tableColumns, savedState));
  const [draggingColumnId, setDraggingColumnId] = useState<string>();

  useEffect(() => {
    setColumnOrderState(prev => {
      const currentIds = tableColumns
        .filter(column => column.pinned !== 'left' && column.pinned !== 'right')
        .map(getColumnIdentifier);
      const kept = prev.filter(id => currentIds.includes(id));
      const added = currentIds.filter(id => !kept.includes(id));
      const reconciled = [...kept, ...added];

      if (reconciled.length === prev.length && reconciled.every((id, i) => id === prev[i])) {
        return prev;
      }

      return reconciled;
    });
  }, [tableColumns]);

  const setColumnOrder = useCallback<Dispatch<SetStateAction<string[]>>>(
    value => {
      let updatedOrder: string[];

      if (value instanceof Function) {
        updatedOrder = value(columnOrder);
      } else {
        updatedOrder = value;
      }

      if (savedState?.columnSettings && isBrowser()) {
        localStorage.setItem(getLocalStorageColumnOrderKey(savedState.id), JSON.stringify(updatedOrder));
      }

      setColumnOrderState(updatedOrder);
    },
    [columnOrder, savedState],
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setDraggingColumnId(String(active.id));
  }, []);

  const handleDragCancel = useCallback(() => {
    setDraggingColumnId(undefined);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setDraggingColumnId(undefined);

      if (!active || !over) {
        return;
      }

      const activeId = active.id.toString();
      const overId = over.id.toString();

      if (activeId === overId) {
        return;
      }

      if (!columnOrder.includes(overId)) {
        return;
      }

      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(activeId);
        const newIndex = columnOrder.indexOf(overId);

        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    },
    [columnOrder, setColumnOrder],
  );

  // `over` вне SortableContext сбрасывает transform'ы всей сортировки — колонка рывком
  // возвращается на место. Держим `over` внутри колонок сортировки.
  const collisionDetection = useCallback<CollisionDetection>(
    args =>
      closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter(container => columnOrder.includes(String(container.id))),
      }),
    [columnOrder],
  );

  const sensors = useSensors(useSensor(MouseSensor, draggingOptions), useSensor(TouchSensor, {}));

  const enableColumnsOrderSortByDrag = Boolean(columnSettings?.enableDrag);

  const dndContextProps = useMemo<DndContextProps>(() => {
    if (!enableColumnsOrderSortByDrag) {
      return {};
    }

    return {
      collisionDetection,
      modifiers: [restrictToHorizontalAxis],
      onDragStart: handleDragStart,
      onDragCancel: handleDragCancel,
      onDragEnd: handleDragEnd,
      sensors,
    };
  }, [collisionDetection, enableColumnsOrderSortByDrag, handleDragCancel, handleDragEnd, handleDragStart, sensors]);

  return {
    columnOrder,
    setColumnOrder,
    dndContextProps,
    enableColumnsOrderSortByDrag,
    draggingColumnId,
  };
}
