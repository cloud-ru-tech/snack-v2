import { closestCenter, CollisionDetection, rectIntersection } from '@dnd-kit/core';

import { FAVORITES_DROP_ID, isFavoritesDroppableId, isServiceDragId, isServiceFavoriteDragId } from './ids';

export const favoriteListCollisionDetection: CollisionDetection = args => {
  const collisions = closestCenter(args);

  // Group reorder: ignore favorites droppables so they don't steal collisions from groups.
  if (!isServiceDragId(args.active.id)) {
    return collisions.filter(({ id }) => !isFavoritesDroppableId(id));
  }

  // Favorite reorder: stay among favorite cards.
  if (isServiceFavoriteDragId(args.active.id)) {
    return collisions.filter(({ id }) => isServiceFavoriteDragId(id));
  }

  // Source → favorites: only when the dragged rect actually hits the favorites panel.
  // closestCenter always returns a nearest favorite even while still over the catalog —
  // that would add the card on a pick-up-and-release without moving into favorites.
  const hits = rectIntersection(args);
  const hasFavoriteCards = args.droppableContainers.some(({ id }) => id != null && isServiceFavoriteDragId(id));
  // With cards in the list, ignore FAVORITES_DROP_ID — padding/gaps would otherwise
  // oscillate between "append" and a card-based insert index.
  const favoriteHits = hits.filter(({ id }) => {
    if (isServiceFavoriteDragId(id)) {
      return true;
    }

    return id === FAVORITES_DROP_ID && !hasFavoriteCards;
  });

  return favoriteHits;
};
