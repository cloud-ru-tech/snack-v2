import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ANIMATION_DELAY_INTERVAL, ANIMATION_HOVER_DELAY } from '../../constants';
import { AiFieldNoticeDescriptionItem, AiFieldNoticeDescriptionListItem } from '../../types';
import { getDescriptionContent, normalizeDescriptionItems } from '../../utils';

type UseAnimatedDescriptionResult = {
  animatedItemCount: number;
  currentIndex: number;
  setMouseEntered(value: boolean): void;
  sourceItemCount: number;
  totalTextItems: AiFieldNoticeDescriptionItem[];
};

export function useAnimatedDescription(
  items: readonly AiFieldNoticeDescriptionListItem[],
): UseAnimatedDescriptionResult {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationEnded, setAnimationEnded] = useState(false);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const mouseEnteredRef = useRef(false);
  const isAnimationEndedRef = useRef(false);
  const currentIndexRef = useRef(0);

  const sourceItems = useMemo(() => normalizeDescriptionItems(items), [items]);
  const totalTextItems = useMemo(() => getDescriptionContent(items), [items]);
  const sourceItemCount = sourceItems.length;
  const animatedItemCount = totalTextItems.length;
  const restingIndex = sourceItemCount - 1;
  const hoverTargetIndex = animatedItemCount - 1;
  const hasHoverTarget = hoverTargetIndex > restingIndex;

  isAnimationEndedRef.current = isAnimationEnded;
  currentIndexRef.current = currentIndex;

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = undefined;
    }
  }, []);

  const scheduleHoverIndex = useCallback(
    (targetIndex: number) => {
      clearHoverTimeout();

      if (currentIndexRef.current === targetIndex) {
        return;
      }

      hoverTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(targetIndex);
      }, ANIMATION_HOVER_DELAY);
    },
    [clearHoverTimeout],
  );

  const setMouseEntered = useCallback(
    (value: boolean) => {
      const wasEntered = mouseEnteredRef.current;

      mouseEnteredRef.current = value;

      if (!isAnimationEndedRef.current || !hasHoverTarget) {
        return;
      }

      if (value && !wasEntered) {
        scheduleHoverIndex(hoverTargetIndex);
        return;
      }

      if (!value && wasEntered) {
        scheduleHoverIndex(restingIndex);
      }
    },
    [hasHoverTarget, hoverTargetIndex, restingIndex, scheduleHoverIndex],
  );

  useEffect(() => () => clearHoverTimeout(), [clearHoverTimeout]);

  useEffect(() => {
    if (isAnimationEnded || sourceItemCount <= 1) {
      return;
    }

    if (currentIndex >= restingIndex) {
      const timeout = setTimeout(() => {
        setAnimationEnded(true);

        if (mouseEnteredRef.current && hasHoverTarget && currentIndexRef.current === restingIndex) {
          scheduleHoverIndex(hoverTargetIndex);
        }
      }, ANIMATION_DELAY_INTERVAL);

      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, restingIndex));
    }, ANIMATION_DELAY_INTERVAL);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    hasHoverTarget,
    hoverTargetIndex,
    isAnimationEnded,
    restingIndex,
    scheduleHoverIndex,
    sourceItemCount,
  ]);

  return {
    animatedItemCount,
    currentIndex,
    setMouseEntered,
    sourceItemCount,
    totalTextItems,
  };
}
