import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NO_DRAG_ATTRIBUTE } from '@ds/bottom-sheet';
import { DRAG_MODE, DragGhost } from '@ds/drag-and-drop';
import { CSSProperties, MouseEvent } from 'react';

import { stopPropagation } from '../../../../../utils';
import { BaseItem } from '../../../BaseItem';
import { FlattenSimpleItem, ItemId } from '../../../types';
import { REORDER_TOP_LEVEL } from '../../constants';
import { animateLayoutChanges } from '../../utils';
import { DragHandle } from '../DragHandle';

type SimpleItemProps = FlattenSimpleItem & {
  /** Id группы-родителя (если строка внутри группы) — уходит в `data` `useSortable` (kind=row). */
  groupId?: ItemId;
};

/**
 * Листовая сортируемая строка `List`/`Droplist` в reorder-режиме (проп `onItemsReorder`):
 * `BaseItem` + ручка `@dnd-kit` слева. Группировку задаёт `SimpleGroupItem` уровнем выше.
 */
// `option` несёт и служебные поля flatten-модели (`items`/`allChildIds`) — `BaseItem` их не знает
// и отбрасывает через `extractSupportProps`, в DOM они не попадают.
export function SimpleItem({ id, disabled, groupId, ...option }: SimpleItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    // `disabled` на строке отключает `Switch` и клик (`BaseItem`), но не переупорядочивание:
    // ручка всегда активна.
    // `container` читает кастомный `collisionDetection` в `ListPrivate`: drop разрешён только внутри
    // одного контейнера. Строка без группы (`groupId` пуст) лежит в контейнере верхнего уровня,
    // строка группы — в контейнере своей группы.
    data: { container: groupId ?? REORDER_TOP_LEVEL },
    animateLayoutChanges,
  });

  const style: CSSProperties = {
    // Только трансляция без scale: иначе `@dnd-kit` подмешивает scaleY (`adjustScale`) и короткая
    // строка растягивается под высоту соседа. `CSS.Translate` даёт `translate3d` без scale.
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const { onMouseDown, ...restListeners } = listeners || {};

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    stopPropagation(e);
    onMouseDown?.(e);
  };

  // Динамический перенос: точку вставки показывает пустой слот, поэтому линии (`DropIndicator`) нет.
  return (
    <DragGhost innerRef={setNodeRef} style={style} dragging={isDragging} mode={DRAG_MODE.Dynamic}>
      <BaseItem
        {...option}
        id={id}
        disabled={disabled}
        dragHandle={
          <DragHandle
            // Pointer-жест не доходит до BottomSheet: иначе vertical drag одновременно закрывает sheet.
            {...{ [NO_DRAG_ATTRIBUTE]: '' }}
            {...attributes}
            {...restListeners}
            // `useSortable` ставит ручке tabIndex=0, но список ведёт свою roving-навигацию и
            // перехватывает Tab (см. `useNewKeyboardNavigation`) — с ручки было некуда уйти.
            // Убираем её из таб-порядка: строка остаётся доступной с клавиатуры, ручка — мышью.
            tabIndex={-1}
            onMouseDown={handleMouseDown}
            onClick={stopPropagation}
          />
        }
      />
    </DragGhost>
  );
}
