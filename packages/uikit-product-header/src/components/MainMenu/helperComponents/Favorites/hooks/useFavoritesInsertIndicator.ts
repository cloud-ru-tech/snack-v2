import { Active, Over, Translate, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';

import { getDragReferenceY, getFavoriteInsertIndex } from '../../../utils';

export function useFavoritesInsertIndicator(favoriteIds: string[]) {
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const updateInsertIndex = (active: Active, over: Over | null, delta: Translate, activatorEvent: Event) => {
    setInsertIndex(
      getFavoriteInsertIndex({
        activeId: active.id,
        overId: over?.id,
        favoriteIds,
        referenceY: getDragReferenceY({
          activatorEvent,
          deltaY: delta.y,
          activeRect: active.rect.current.translated,
        }),
        overRect: over?.rect,
      }),
    );
  };

  useDndMonitor({
    onDragMove({ active, over, delta, activatorEvent }) {
      updateInsertIndex(active, over, delta, activatorEvent);
    },
    onDragOver({ active, over, delta, activatorEvent }) {
      updateInsertIndex(active, over, delta, activatorEvent);
    },
    onDragEnd() {
      setInsertIndex(null);
    },
    onDragCancel() {
      setInsertIndex(null);
    },
  });

  return insertIndex;
}
