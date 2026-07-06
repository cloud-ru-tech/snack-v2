import { useDndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NO_DRAG_ATTRIBUTE } from '@ds/bottom-sheet';
import { CSSProperties, MouseEvent, ReactNode } from 'react';

import { Separator } from '../../../../../helperComponents';
import { stopPropagation } from '../../../../../utils';
import { useNewListContext } from '../../../../Lists/contexts';
import { ItemId } from '../../../types';
import { REORDER_TOP_LEVEL } from '../../constants';
import styles from '../../styles.module.scss';
import { GroupHeaderContent } from '../../types';
import { animateLayoutChanges } from '../../utils';
import { DragHandle } from '../DragHandle';

export type SimpleGroupBlockProps = GroupHeaderContent & {
  /** Идентификатор группы — sortable identity для перестановки групп между собой. */
  id: ItemId;
  /** Id сортируемых строк группы для вложенного `SortableContext` (переупорядочивание строк внутри группы). */
  rowIds: ItemId[];
  /** Отрисованные строки группы (`SimpleItem`). */
  children: ReactNode;
};

/**
 * Сортируемый блок группы reorder-режима: заголовок с ручкой `@dnd-kit` + строки группы во
 * вложенном `SortableContext`. Перетаскивается **вся группа целиком** (заголовок и строки едут
 * вместе), потому что `useSortable` висит на контейнере блока. Строки при этом переставляются
 * внутри своей группы (собственный `SortableContext`). Копию заголовка на время перетаскивания группы
 * рендерит `SimpleGroupBlockOverlay` в `DragOverlay`.
 */
export function SimpleGroupBlock({ id, rowIds, children, ...separatorProps }: SimpleGroupBlockProps) {
  const { size = 'm' } = useNewListContext();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    // Группа — «брат» строк верхнего уровня: тот же контейнер, что и у строк без группы.
    data: { container: REORDER_TOP_LEVEL },
    animateLayoutChanges,
  });

  // Идёт ли переупорядочивание строки этой группы (а не самой группы). Оно жёстко ограничено
  // своим контейнером (`container === id` в `data` строки, см. `SimpleItem`), поэтому границы
  // блока группы подсвечиваются — видно, что строка не выходит за пределы группы, а не «сломалась».
  const { active } = useDndContext();
  const activeContainer = (active?.data.current as { container?: ItemId } | undefined)?.container;
  const isReorderingWithinGroup = active != null && active.id !== id && activeContainer === id;

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const { onMouseDown, ...restListeners } = listeners || {};

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    stopPropagation(e);
    onMouseDown?.(e);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.groupBlock}
      data-dragging={isDragging || undefined}
      data-reorder-boundary={isReorderingWithinGroup || undefined}
    >
      <div className={styles.groupHeader} data-size={size}>
        <DragHandle
          // Pointer-жест не доходит до BottomSheet: иначе vertical drag одновременно закрывает sheet.
          {...{ [NO_DRAG_ATTRIBUTE]: '' }}
          {...attributes}
          {...restListeners}
          onMouseDown={handleMouseDown}
          onClick={stopPropagation}
        />
        <Separator {...separatorProps} />
      </div>

      <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
}
