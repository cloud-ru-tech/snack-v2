import { ClientRect, useDndContext } from '@dnd-kit/core';
import { horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Transform } from '@dnd-kit/utilities';
import { useMemo } from 'react';

import { ColumnOrder } from '../types';

type ColumnDragState = {
  transform: Transform | null;
  isDragging: boolean;
};

/**
 * Сдвиг ячейки тела за колонкой, которую тянут за шапку.
 *
 * Не `useSortable`: он зарегистрировал бы ячейку в реестре dnd-kit под id колонки — тем же, что у
 * шапки. Реестр ключуется по id, поэтому размонтирование строк удаляло запись колонки целиком и
 * драг переставал работать.
 */
export function useColumnDragTransform(columnId: string, columnOrder: ColumnOrder): ColumnDragState {
  const { active, over, activeNodeRect, droppableRects } = useDndContext();

  const activeId = active ? String(active.id) : undefined;
  const overId = over ? String(over.id) : undefined;

  const transform = useMemo(() => {
    if (!activeId) {
      return null;
    }

    const measured = columnOrder.filter(id => droppableRects.get(id));

    const index = measured.indexOf(columnId);
    const activeIndex = measured.indexOf(activeId);

    if (index < 0 || activeIndex < 0) {
      return null;
    }

    const overIndex = overId ? measured.indexOf(overId) : -1;

    return horizontalListSortingStrategy({
      rects: measured.map(id => droppableRects.get(id) as ClientRect),
      activeNodeRect,
      activeIndex,
      overIndex: overIndex < 0 ? activeIndex : overIndex,
      index,
    });
  }, [activeId, overId, columnId, columnOrder, droppableRects, activeNodeRect]);

  return { transform, isDragging: activeId === columnId };
}
