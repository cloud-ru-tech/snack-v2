import { getEventCoordinates } from '@dnd-kit/utilities';

import { ClientRectLike } from './getFavoriteInsertIndex';

type GetDragReferenceYParams = {
  activatorEvent?: Event | null;
  deltaY?: number;
  activeRect?: ClientRectLike | null;
};

/** Pointer Y (activator + delta), or active rect center as fallback (keyboard). */
export function getDragReferenceY({ activatorEvent, deltaY = 0, activeRect }: GetDragReferenceYParams): number | null {
  if (activatorEvent) {
    const coordinates = getEventCoordinates(activatorEvent);

    if (coordinates) {
      return coordinates.y + deltaY;
    }
  }

  if (!activeRect) {
    return null;
  }

  return activeRect.top + activeRect.height / 2;
}
