import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMainMenuDndOverlay } from '../../../hooks/useMainMenuDnd';
import { FavoriteProps, InnerLink } from '../../../types';
import {
  FAVORITES_DROP_ID,
  getServiceFavoriteDragId,
  isServiceDragId,
  isServiceFavoriteDragId,
  parseServiceDragId,
} from '../../../utils';
import { ServiceCard } from '../../ServiceCard';
import { FAVORITES_SEGMENT, FavoritesSegment } from '../constants';
import { useFavoritesInsertIndicator } from './useFavoritesInsertIndicator';

type UseFavoritesDndParams = {
  favorite: FavoriteProps;
  favoriteItems: InnerLink[];
  segment: FavoritesSegment;
  setSegment(segment: FavoritesSegment): void;
};

/**
 * Оркестрирует drag&drop избранного: приём карточек сервисов из общей сетки
 * (droppable), реордер внутри списка (insert-индикатор) и drag-превью.
 *
 * Требует `<DndContext>`-предка (см. `MainMenuDndContext`) — доступно только
 * на desktop-раскладке, на mobile избранное рендерится без drag&drop.
 */
export function useFavoritesDnd({ favorite, favoriteItems, segment, setSegment }: UseFavoritesDndParams) {
  const { setGroupDragOverlay } = useMainMenuDndOverlay();

  const [activeFavoriteId, setActiveFavoriteId] = useState<string | null>(null);
  const [isFavoriteReorderDrag, setIsFavoriteReorderDrag] = useState(false);
  const [isDraggingToFavorites, setDraggingToFavorites] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);
  const shouldScrollToEndRef = useRef(false);

  const isFavoritesSegment = segment === FAVORITES_SEGMENT.Favorites;

  const favoriteSortableIds = useMemo(() => favorite.value.map(getServiceFavoriteDragId), [favorite.value]);

  const insertIndex = useFavoritesInsertIndicator(favorite.value);
  const isInsertingToEnd = favoriteItems.length > 0 && insertIndex === favoriteItems.length;
  const isInsertingNew = isDraggingToFavorites && !favoriteItems.length;
  const insertIndexRef = useRef(insertIndex);
  insertIndexRef.current = insertIndex;

  const activeFavorite = favoriteItems.find(service => service.id === activeFavoriteId);

  const { setNodeRef, isOver } = useDroppable({
    id: FAVORITES_DROP_ID,
    // Only needed for an empty list; with cards, card droppables own the hit-testing.
    disabled: !isFavoritesSegment || isFavoriteReorderDrag || favoriteItems.length > 0,
  });

  useDndMonitor({
    onDragStart({ active }) {
      if (isServiceDragId(active.id)) {
        setSegment(FAVORITES_SEGMENT.Favorites);
        setDraggingToFavorites(true);
      }

      if (isServiceFavoriteDragId(active.id)) {
        setActiveFavoriteId(parseServiceDragId(active.id));
        setIsFavoriteReorderDrag(true);
      }
    },
    onDragEnd() {
      shouldScrollToEndRef.current = isDraggingToFavorites && insertIndexRef.current === favorite.value.length;

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
  }, [favorite.value]);

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
