import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DRAG_MODE, DragGhost, DropIndicator, PLACEMENT } from '@ds/drag-and-drop';
import { CardNavigation, CardNavigationProps } from '@ds/uikit-product-card-predefined';
import { memo } from 'react';

import { getServiceFavoriteDragId } from '../../../utils/dnd';
import styles from '../styles.module.scss';

export type SortableFavoriteCardProps = {
  /** Id сервиса (используется для drag-идентификатора карточки). */
  serviceId: string;
  /** Показывать индикатор вставки перед карточкой (drag поверх избранного). */
  showInsertIndicatorBefore?: boolean;
  /** Показывать индикатор вставки после карточки (drag поверх избранного). */
  showInsertIndicatorAfter?: boolean;
  /** Карточка первая в списке — влияет на позиционирование индикатора вставки. */
  isFirst?: boolean;
} & Pick<
  CardNavigationProps<'a'>,
  | 'href'
  | 'className'
  | 'tabIndex'
  | 'title'
  | 'onClick'
  | 'icon'
  | 'promoTag'
  | 'tooltip'
  | 'favorite'
  | 'expandable'
  | 'data-test-id'
>;

function SortableFavoriteCardBase({
  serviceId,
  className,
  showInsertIndicatorBefore,
  showInsertIndicatorAfter,
  isFirst,
  ...cardProps
}: SortableFavoriteCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: getServiceFavoriteDragId(serviceId),
  });

  const transformStyle = transform ? CSS.Translate.toString(transform) : undefined;

  const style = {
    // CSS.Transform добавляет scaleX/scaleY, из-за чего перетаскиваемая карточка "растягивается"
    // при пересечении с соседней карточкой. CSS.Translate использует только сдвиг.
    // Во время drag transform на источнике не применяем — превью в DragOverlay.
    transform: isDragging ? undefined : transformStyle,
    transition,
  };

  const { tabIndex, ...restAttributes } = attributes ?? {};

  return (
    <DragGhost
      innerRef={setNodeRef}
      style={style}
      className={styles.sortableCard}
      dragging={isDragging}
      mode={DRAG_MODE.Dynamic}
      {...listeners}
      {...restAttributes}
    >
      {showInsertIndicatorBefore && <DropIndicator placement={PLACEMENT.Before} atEdge={isFirst} />}

      <CardNavigation as='a' {...cardProps} className={className ?? styles.card} tabIndex={tabIndex} />

      {showInsertIndicatorAfter && <DropIndicator placement={PLACEMENT.After} atEdge />}
    </DragGhost>
  );
}

export const SortableFavoriteCard = memo(SortableFavoriteCardBase);
