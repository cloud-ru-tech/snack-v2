import { DragEndEvent, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { useCallback } from 'react';

import { useMainMenuDndOverlay } from '../../../hooks/useMainMenuDnd';
import { LinksGroup } from '../../../types';
import { isServiceDragId, resolveGroupBlockColor } from '../../../utils';
import { CardsContextValue } from '../cardsContext';
import { SortableGroupDragPreview } from '../helperComponents/SortableGroup';

type UseSegmentDndProps = {
  visibleGroups: LinksGroup[];

  expandedIds: string[];

  onSortableDragEnd(event: DragEndEvent): void;

  showDescription: boolean;

  showGroupsColors?: boolean;
} & Pick<CardsContextValue, 'favoriteIds' | 'onFavoriteChange'>;

/**
 * DnD групп внутри активного сегмента: drag overlay группы поверх `useContentSegmentsSortable`.
 * Сервис-драг (карточка → избранное) сюда не попадает — фильтруется через `isServiceDragId`.
 */
export function useSegmentDnd({
  visibleGroups,
  expandedIds,
  onSortableDragEnd,
  showDescription,
  showGroupsColors,
  favoriteIds,
  onFavoriteChange,
}: UseSegmentDndProps) {
  const { setGroupDragOverlay } = useMainMenuDndOverlay();

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      if (!isServiceDragId(active.id)) {
        const activeGroup = visibleGroups.find(({ id }) => id === String(active.id));

        if (activeGroup) {
          setGroupDragOverlay(
            <SortableGroupDragPreview
              id={activeGroup.id}
              label={activeGroup.label}
              items={activeGroup.items}
              isExpanded={expandedIds.includes(activeGroup.id)}
              blockColor={resolveGroupBlockColor(activeGroup.blockColor, showGroupsColors)}
              showDescription={showDescription}
              favoriteIds={activeGroup.favoritesEnabled ? favoriteIds : undefined}
              onFavoriteChange={onFavoriteChange}
              highlight={activeGroup.highlight}
            />,
          );
        }
      }
    },
    [expandedIds, favoriteIds, onFavoriteChange, setGroupDragOverlay, showDescription, showGroupsColors, visibleGroups],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setGroupDragOverlay(null);

      if (isServiceDragId(event.active.id)) {
        return;
      }

      onSortableDragEnd(event);
    },
    [onSortableDragEnd, setGroupDragOverlay],
  );

  const handleDragCancel = useCallback(() => {
    setGroupDragOverlay(null);
  }, [setGroupDragOverlay]);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });
}
