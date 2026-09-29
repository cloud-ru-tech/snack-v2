import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Accordion } from '@ds/accordion';
import { DRAG_MODE, DragGhost, DragPreview } from '@ds/drag-and-drop';
import { useThemeAppearance } from '@ds/theme';
import { AnimationEvent, CSSProperties, memo, Ref, useCallback, useState } from 'react';

import { LinksGroup, LinksGroupBlockColor, LinksGroupTitle } from '../../../../types';
import { CardsContext, CardsContextValue } from '../../cardsContext';
import { TEST_IDS } from '../../constants';
import { SortableGroupCards, SortableGroupHeader, SortableGroupHeaderProps } from './components';
import styles from './styles.module.scss';

export type SortableGroupProps = Pick<LinksGroup, 'icon' | 'items'> & {
  /** Id группы. */
  id: string;

  /** Заголовок группы. */
  label: LinksGroupTitle;

  /** Раскрыта ли группа. */
  isExpanded?: boolean;

  /** Мобильная раскладка. */
  isMobile?: boolean;

  /** Группу можно перетаскивать (иначе рендерится без `useSortable`). */
  enableServiceDrag?: boolean;

  /** Цвет блока группы. */
  blockColor?: LinksGroupBlockColor;

  /** Визуальное выделение группы. */
  highlight?: boolean;

  /** Разрешено ли добавление карточек группы в избранное. */
  groupFavoritesEnabled?: boolean;

  /** Группа появляется с fade-in при монтировании (на desktop; на mobile анимирует контейнер). */
  appear?: boolean;
};

type GroupViewProps = SortableGroupProps &
  Pick<SortableGroupHeaderProps, 'attributes' | 'listeners'> & {
    setNodeRef?: Ref<HTMLDivElement>;
    style?: CSSProperties;
    isDragging?: boolean;
  };

function GroupView({
  id,
  icon,
  label,
  items,
  isExpanded,
  isMobile,
  enableServiceDrag,
  groupFavoritesEnabled = true,
  blockColor,
  highlight,
  appear,
  attributes,
  listeners,
  setNodeRef,
  style,
  isDragging,
}: GroupViewProps) {
  const { colorScheme } = useThemeAppearance().appearance;

  // Появление проигрывается один раз. React переставляет узлы `insertBefore`, а браузер при
  // повторной вставке перезапускает CSS-анимацию — при перетаскивании группы соседи «моргали».
  // После окончания флаг снимается, и перестановка анимацию уже не запускает.
  const [isAppearing, setIsAppearing] = useState(Boolean(appear));

  const handleAnimationEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    // `animationend` всплывает от вложенных анимаций — нужна только своя.
    if (event.target === event.currentTarget) {
      setIsAppearing(false);
    }
  }, []);

  return (
    <DragGhost
      innerRef={setNodeRef}
      id={id}
      style={style}
      className={styles.group}
      dragging={isDragging}
      mode={DRAG_MODE.Dynamic}
      data-appear={isAppearing || undefined}
      onAnimationEnd={handleAnimationEnd}
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
            icon={icon}
            isExpanded={isExpanded}
            enableServiceDrag={enableServiceDrag}
            attributes={attributes}
            listeners={listeners}
            isMobile={isMobile}
          />
        }
      >
        <SortableGroupCards groupId={id} items={items} groupFavoritesEnabled={groupFavoritesEnabled} />
      </Accordion.CollapseBlockTertiary>
    </DragGhost>
  );
}

function DraggableGroup(props: SortableGroupProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });

  const style = {
    // CSS.Transform добавляет scaleX/scaleY, из-за чего перетаскиваемая группа "растягивается"
    // при пересечении с соседней группой другой высоты. CSS.Translate использует только сдвиг.
    // Во время drag transform на источнике не применяем — превью в DragOverlay, иначе transform
    // раздувает scrollHeight контейнера и auto-scroll уходит в бесконечный цикл.
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
  };

  return (
    <GroupView
      {...props}
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      style={style}
      isDragging={isDragging}
    />
  );
}

function SortableGroupBase(props: SortableGroupProps) {
  // Без drag (mobile, поиск, нет избранного) группа не регистрируется в `SortableContext`.
  return props.enableServiceDrag ? <DraggableGroup {...props} /> : <GroupView {...props} />;
}

export const SortableGroup = memo(SortableGroupBase);

export type SortableGroupDragPreviewProps = Omit<SortableGroupProps, 'enableServiceDrag'> &
  Pick<CardsContextValue, 'showDescription' | 'favoriteIds' | 'onFavoriteChange'>;

/**
 * Превью группы в `DragOverlay`. Рендерится вне `Content`, поэтому свой `CardsContext` собирает
 * сам: без drag-обвязки карточек и без обработчика клика.
 */
export function SortableGroupDragPreview({
  id,
  label,
  items,
  isExpanded,
  showDescription,
  isMobile,
  favoriteIds,
  onFavoriteChange,
  groupFavoritesEnabled,
  blockColor,
  highlight,
}: SortableGroupDragPreviewProps) {
  const { colorScheme } = useThemeAppearance().appearance;

  const cardsContext: CardsContextValue = {
    showDescription,
    isMobile,
    dragEnabled: false,
    favoriteIds,
    onFavoriteChange,
  };

  return (
    <DragPreview className={styles.groupDragPreview}>
      <div className={styles.group} data-drag-preview={true}>
        <div className={styles.decoration} data-color-scheme={colorScheme} data-is-highlighted={highlight || undefined}>
          <div className={styles.decorationBackground}>
            <div className={styles.colorMarker} data-block-color={blockColor} />
          </div>
        </div>
        <div className={styles.groupDragPreviewHeader}>
          <SortableGroupHeader label={label} isExpanded={isExpanded} isMobile={isMobile} enableServiceDrag />
        </div>

        {isExpanded && (
          <CardsContext.Provider value={cardsContext}>
            <SortableGroupCards groupId={id} items={items} groupFavoritesEnabled={groupFavoritesEnabled} />
          </CardsContext.Provider>
        )}
      </div>
    </DragPreview>
  );
}
