import { FAVORITES_DROP_ID, isServiceFavoriteDragId, isServiceSourceDragId, parseServiceDragId } from './ids';

export type ClientRectLike = Pick<ClientRect, 'top' | 'height'>;

/** Before `overIndex` if referenceY is above the over item center, otherwise after. */
export function getInsertIndexByRects(
  overIndex: number,
  referenceY?: number | null,
  overRect?: ClientRectLike | null,
): number {
  if (referenceY == null || !overRect) {
    return overIndex;
  }

  const overCenterY = overRect.top + overRect.height / 2;

  return referenceY > overCenterY ? overIndex + 1 : overIndex;
}

export type GetFavoriteInsertIndexParams = {
  activeId: string | number;
  overId?: string | number;
  favoriteIds: string[];
  referenceY?: number | null;
  overRect?: ClientRectLike | null;
};

/** Insert index for a new source card; shared by indicator and drag-end. */
export function getFavoriteInsertIndex({
  activeId,
  overId,
  favoriteIds,
  referenceY,
  overRect,
}: GetFavoriteInsertIndexParams): number | null {
  if (!isServiceSourceDragId(activeId) || overId == null) {
    return null;
  }

  const activeServiceId = parseServiceDragId(activeId);

  if (favoriteIds.includes(activeServiceId)) {
    return null;
  }

  // Empty list only: drop zone is the sole target. With cards, ignore it — padding/gaps
  // would make the indicator jump between "append" and card before/after.
  if (String(overId) === FAVORITES_DROP_ID) {
    return favoriteIds.length === 0 ? 0 : null;
  }

  if (!isServiceFavoriteDragId(overId)) {
    return null;
  }

  const overIndex = favoriteIds.indexOf(parseServiceDragId(overId));

  if (overIndex === -1) {
    return null;
  }

  return getInsertIndexByRects(overIndex, referenceY, overRect);
}
