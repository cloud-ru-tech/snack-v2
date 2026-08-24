import { arrayMove } from '@dnd-kit/sortable';

import { ClientRectLike, getFavoriteInsertIndex } from './getFavoriteInsertIndex';
import { FAVORITES_DROP_ID, isServiceDragId, isServiceFavoriteDragId, parseServiceDragId } from './ids';

type ResolveFavoriteOrderOnDragEndParams = {
  activeId: string | number;

  overId?: string | number;

  favoriteIds: string[];

  referenceY?: number | null;

  overRect?: ClientRectLike | null;
};

export function resolveFavoriteOrderOnDragEnd({
  activeId,
  overId,
  favoriteIds,
  referenceY,
  overRect,
}: ResolveFavoriteOrderOnDragEndParams): string[] | null {
  if (!isServiceDragId(activeId) || overId == null) {
    return null;
  }

  const activeServiceId = parseServiceDragId(activeId);
  const activeFavoriteIndex = isServiceFavoriteDragId(activeId) ? favoriteIds.indexOf(activeServiceId) : -1;

  // Reorder an existing favorite.
  if (activeFavoriteIndex !== -1) {
    if (String(overId) === FAVORITES_DROP_ID) {
      const lastIndex = favoriteIds.length - 1;

      if (activeFavoriteIndex === lastIndex) {
        return null;
      }

      return arrayMove(favoriteIds, activeFavoriteIndex, lastIndex);
    }

    if (!isServiceFavoriteDragId(overId)) {
      return null;
    }

    const overFavoriteIndex = favoriteIds.indexOf(parseServiceDragId(overId));

    if (overFavoriteIndex === -1 || activeFavoriteIndex === overFavoriteIndex) {
      return null;
    }

    return arrayMove(favoriteIds, activeFavoriteIndex, overFavoriteIndex);
  }

  // Insert from catalog — same index as the insert indicator.
  const insertIndex = getFavoriteInsertIndex({
    activeId,
    overId,
    favoriteIds,
    referenceY,
    overRect,
  });

  if (insertIndex == null) {
    return null;
  }

  const nextOrder = [...favoriteIds];
  nextOrder.splice(insertIndex, 0, activeServiceId);

  return nextOrder;
}
