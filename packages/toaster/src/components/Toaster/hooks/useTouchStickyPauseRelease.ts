import { Dispatch, RefObject, useEffect } from 'react';

import { isTouchPointer, UiAction } from '../utils';

/**
 * Слушает тач-pointerdown на document, пока активна sticky-pause: тап вне
 * контейнера снимает паузу. Listener висит только при активном `touchPaused`,
 * чтобы не платить за event на каждый тап страницы.
 */
export function useTouchStickyPauseRelease(
  containerRef: RefObject<HTMLDivElement | null>,
  touchPaused: boolean,
  stacked: boolean,
  dispatch: Dispatch<UiAction>,
): void {
  useEffect(() => {
    if (!touchPaused) return undefined;
    const onDocPointerDown = (e: PointerEvent) => {
      if (!isTouchPointer(e)) return;
      const root = containerRef.current;
      if (!root || root.contains(e.target as Node)) return;
      dispatch({ type: 'touch:tap-outside', stacked });
    };
    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [touchPaused, stacked, containerRef, dispatch]);
}
