import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DRAG_MODE, DragGhost, DropIndicator, PLACEMENT } from '@ds/drag-and-drop';
import { CardServiceLight, CardServiceLightProps } from '@ds/uikit-product-card-predefined';

import { getServiceFavoriteDragId } from '../../../utils/dnd';
import styles from '../styles.module.scss';

export type SortableFavoriteCardProps = {
  serviceId: string;
  showInsertIndicatorBefore?: boolean;
  showInsertIndicatorAfter?: boolean;
  isFirst?: boolean;
} & Pick<
  CardServiceLightProps<'a'>,
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

export function SortableFavoriteCard({
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

      <CardServiceLight as='a' {...cardProps} className={className ?? styles.card} tabIndex={tabIndex} />

      {showInsertIndicatorAfter && <DropIndicator placement={PLACEMENT.After} atEdge />}
    </DragGhost>
  );
}
