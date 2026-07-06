import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NO_DRAG_ATTRIBUTE } from '@ds/bottom-sheet';
import { CSSProperties, MouseEvent } from 'react';

import { stopPropagation } from '../../../../../utils';
import { BaseItem } from '../../../BaseItem';
import { FlattenSimpleItem, ItemId } from '../../../types';
import { REORDER_TOP_LEVEL } from '../../constants';
import styles from '../../styles.module.scss';
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
    // одного контейнера. Строка без группы (`groupId` пуст) лежит в общем контейнере верхнего уровня
    // вместе с группами (можно менять местами строку и группу); строка группы — в контейнере группы.
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

  return (
    <div ref={setNodeRef} style={style} className={styles.item} data-dragging={isDragging || undefined}>
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
            onMouseDown={handleMouseDown}
            onClick={stopPropagation}
          />
        }
      />
    </div>
  );
}
