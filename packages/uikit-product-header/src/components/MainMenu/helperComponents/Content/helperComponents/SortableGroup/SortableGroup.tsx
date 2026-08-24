import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Accordion } from '@ds/accordion';
import { DRAG_MODE, DragGhost, DragPreview } from '@ds/drag-and-drop';
import { useThemeAppearance } from '@ds/theme';

import { LinksGroupBlockColor, LinksGroupTitle } from '../../../../types';
import { TEST_IDS } from '../../constants';
import { SortableGroupCards, SortableGroupCardsProps, SortableGroupHeader } from './components';
import styles from './styles.module.scss';

export type SortableGroupProps = Omit<SortableGroupCardsProps, 'groupId'> & {
  id: string;

  label: LinksGroupTitle;

  isExpanded?: boolean;

  blockColor?: LinksGroupBlockColor;

  highlight?: boolean;
};

export function SortableGroup({
  id,
  label,
  items,
  isExpanded,
  showDescription,
  isMobile,
  enableServiceDrag,
  favorite,
  onServiceClick,
  blockColor,
  highlight,
}: SortableGroupProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !enableServiceDrag,
  });

  const style = {
    // CSS.Transform добавляет scaleX/scaleY, из-за чего перетаскиваемая группа "растягивается"
    // при пересечении с соседней группой другой высоты. CSS.Translate использует только сдвиг.
    // Во время drag transform на источнике не применяем — превью в DragOverlay, иначе transform
    // раздувает scrollHeight контейнера и auto-scroll уходит в бесконечный цикл.
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
  };

  const { colorScheme } = useThemeAppearance().appearance;

  return (
    <DragGhost
      innerRef={setNodeRef}
      id={id}
      style={style}
      className={styles.group}
      dragging={isDragging}
      mode={DRAG_MODE.Dynamic}
      data-test-id={`${TEST_IDS.groupCard}-${id}`}
    >
      <div className={styles.decoration} data-color-scheme={colorScheme} data-is-highlighted={highlight || undefined}>
        <div className={styles.decorationBackground}>
          <div className={styles.colorMarker} data-block-color={blockColor} />
        </div>
      </div>
      <Accordion.CollapseBlockTertiary
        id={id}
        showChevron={false}
        afterTitle={
          <SortableGroupHeader
            label={label}
            isExpanded={isExpanded}
            enableServiceDrag={enableServiceDrag}
            attributes={attributes}
            listeners={listeners}
            isMobile={isMobile}
          />
        }
      >
        <SortableGroupCards
          groupId={id}
          items={items}
          showDescription={showDescription}
          isMobile={isMobile}
          enableServiceDrag={enableServiceDrag}
          favorite={favorite}
          onServiceClick={onServiceClick}
        />
      </Accordion.CollapseBlockTertiary>
    </DragGhost>
  );
}

export function SortableGroupDragPreview({
  id,
  label,
  items,
  isExpanded,
  showDescription,
  isMobile,
  favorite,
  blockColor,
  highlight,
}: Omit<SortableGroupProps, 'enableServiceDrag'>) {
  const { colorScheme } = useThemeAppearance().appearance;

  return (
    <DragPreview className={styles.groupDragPreview}>
      <div className={styles.group} data-drag-preview={true} data-block-color={blockColor}>
        <div className={styles.decoration} data-color-scheme={colorScheme} data-is-highlighted={highlight || undefined}>
          <div className={styles.decorationBackground}>
            <div className={styles.colorMarker} data-block-color={blockColor} />
          </div>
        </div>
        <div className={styles.groupDragPreviewHeader}>
          <SortableGroupHeader label={label} isExpanded={isExpanded} isMobile={isMobile} enableServiceDrag />
        </div>

        {isExpanded && (
          <SortableGroupCards
            groupId={id}
            items={items}
            showDescription={showDescription}
            isMobile={isMobile}
            favorite={favorite}
          />
        )}
      </div>
    </DragPreview>
  );
}
