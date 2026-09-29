import { useDndContext, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMainMenuDndOverlay } from '../../../hooks/useMainMenuDnd';
import { InnerLink } from '../../../types';
import {
  FAVORITES_DROP_ID,
  getServiceFavoriteDragId,
  isServiceFavoriteDragId,
  isServiceSourceDragId,
  parseServiceDragId,
} from '../../../utils';
import { ServiceCard } from '../../ServiceCard';
import { useFavoritesInsertIndicator } from './useFavoritesInsertIndicator';

type UseFavoritesReorderParams = {
  /** Id избранных сервисов (`FavoriteProps['value']`). */
  favoriteIds: string[];
  favoriteItems: InnerLink[];
};

/**
 * Оркестрирует drag&drop сегмента «Избранное»: приём карточек сервисов из общей сетки
 * (droppable), реордер внутри списка (insert-индикатор) и drag-превью.
 *
 * Монтируется только вместе с {@link FavoritesReorderList}, то есть пока активен сегмент
 * «Избранное» — переключение на этот сегмент при старте drag из каталога обеспечивает
 * {@link useFavoritesAutoSwitch}, смонтированный отдельно и постоянно. Из-за этого хук может
 * подключиться уже посреди drag (сегмент только что переключился) — начальное состояние в
 * этом случае читается из текущего активного drag через `useDndContext`, а не только из
 * будущих событий монитора.
 *
 * Требует `<DndContext>`-предка (см. `MainMenuDndContext`) — доступно только на desktop-раскладке,
 * на mobile избранное рендерится без drag&drop.
 */
export function useFavoritesReorder({ favoriteIds, favoriteItems }: UseFavoritesReorderParams) {
  const { setGroupDragOverlay } = useMainMenuDndOverlay();
  const { active: activeOnMount } = useDndContext();

  const [activeFavoriteId, setActiveFavoriteId] = useState<string | null>(() =>
    activeOnMount && isServiceFavoriteDragId(activeOnMount.id) ? parseServiceDragId(activeOnMount.id) : null,
  );
  const [isFavoriteReorderDrag, setIsFavoriteReorderDrag] = useState(() =>
    Boolean(activeOnMount && isServiceFavoriteDragId(activeOnMount.id)),
  );
  const [isDraggingToFavorites, setDraggingToFavorites] = useState(() =>
    Boolean(activeOnMount && isServiceSourceDragId(activeOnMount.id)),
  );

  const listEndRef = useRef<HTMLDivElement>(null);
  const shouldScrollToEndRef = useRef(false);

  const favoriteSortableIds = useMemo(() => favoriteIds.map(getServiceFavoriteDragId), [favoriteIds]);

  const insertIndex = useFavoritesInsertIndicator(favoriteIds);
  const isInsertingToEnd = favoriteItems.length > 0 && insertIndex === favoriteItems.length;
  const isInsertingNew = isDraggingToFavorites && !favoriteItems.length;
  const insertIndexRef = useRef(insertIndex);
  insertIndexRef.current = insertIndex;

  const activeFavorite = favoriteItems.find(service => service.id === activeFavoriteId);

  const { setNodeRef, isOver } = useDroppable({
    id: FAVORITES_DROP_ID,
    // Only needed for an empty list; with cards, card droppables own the hit-testing.
    disabled: isFavoriteReorderDrag || favoriteItems.length > 0,
  });

  useDndMonitor({
    onDragStart({ active }) {
      if (isServiceSourceDragId(active.id)) {
        setDraggingToFavorites(true);
      }

      if (isServiceFavoriteDragId(active.id)) {
        setActiveFavoriteId(parseServiceDragId(active.id));
        setIsFavoriteReorderDrag(true);
      }
    },
    onDragEnd() {
      shouldScrollToEndRef.current = isDraggingToFavorites && insertIndexRef.current === favoriteIds.length;

      setActiveFavoriteId(null);
      setIsFavoriteReorderDrag(false);
      setDraggingToFavorites(false);
    },
    onDragCancel() {
      shouldScrollToEndRef.current = false;
      setActiveFavoriteId(null);
      setIsFavoriteReorderDrag(false);
      setDraggingToFavorites(false);
    },
  });

  useEffect(() => {
    if (!activeFavorite) {
      setGroupDragOverlay(null);
      return;
    }

    setGroupDragOverlay(<ServiceCard service={activeFavorite} showDescription={false} dragPreview />);

    return () => setGroupDragOverlay(null);
  }, [activeFavorite, setGroupDragOverlay]);

  useEffect(() => {
    if (!shouldScrollToEndRef.current) {
      return;
    }

    shouldScrollToEndRef.current = false;

    const frameId = requestAnimationFrame(() => {
      listEndRef.current?.scrollIntoView({ block: 'nearest' });
    });

    return () => cancelAnimationFrame(frameId);
  }, [favoriteIds]);

  const showDropOver = ((isOver || isDraggingToFavorites) && !isFavoriteReorderDrag) || undefined;
  const showInsertNew = (isInsertingNew && isOver) || undefined;

  return {
    setNodeRef,
    listEndRef,
    favoriteSortableIds,
    insertIndex,
    isInsertingToEnd,
    showDropOver,
    showInsertNew,
  };
}
