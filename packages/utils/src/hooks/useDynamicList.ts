import { RefObject, useEffect, useRef, useState } from 'react';

import { useEventHandler } from './useEventHandler';
import { useLayoutEffect } from './useIsomorphicLayoutEffect';

type UseDynamicListProps<T extends object> = {
  items: T[];
  resizingContainerRef?: RefObject<HTMLDivElement>;
  parentContainerRef: RefObject<HTMLDivElement>;
  maxVisibleItems?: number;
};

type UseDynamicListReturnType<T extends object> = {
  visibleItems: T[];
  hiddenItems: T[];
};

/**
 * Хук позволяет распределять элементы списка на две группы: видимые и невидимые,
 * в зависимости от ширины контейнера
 * @function React hook
 */
export function useDynamicList<T extends object>({
  parentContainerRef,
  resizingContainerRef = parentContainerRef,
  items,
  maxVisibleItems = Infinity,
}: UseDynamicListProps<T>): UseDynamicListReturnType<T> {
  const adjustAmount = (value: number) => Math.max(0, Math.min(maxVisibleItems, value));

  const [measurement, setMeasurement] = useState({
    itemsCount: items.length,
    limit: maxVisibleItems,
    amount: adjustAmount(items.length),
  });
  // Reconcile the limit before rendering children, so a temporary stale count cannot unmount
  // an action that remains visible when a preceding hidden action is restored.
  const visibleItemsAmount =
    measurement.itemsCount === items.length && measurement.limit === maxVisibleItems
      ? measurement.amount
      : adjustAmount(items.length);
  if (measurement.itemsCount !== items.length || measurement.limit !== maxVisibleItems) {
    setMeasurement({ itemsCount: items.length, limit: maxVisibleItems, amount: visibleItemsAmount });
  }

  const [width, setWidth] = useState(Infinity);
  const widthRef = useRef(width);

  const handleVisibleItemsAmount = (value: number) => {
    const amount = adjustAmount(value);
    setMeasurement(previous =>
      previous.itemsCount === items.length && previous.limit === maxVisibleItems && previous.amount === amount
        ? previous
        : { itemsCount: items.length, limit: maxVisibleItems, amount },
    );
  };

  const tryHidingItem = useEventHandler(() => {
    const container = parentContainerRef.current;

    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const hasOverflow =
      container.scrollWidth > container.clientWidth ||
      Array.from(container.children).some(child => {
        const rect = child.getBoundingClientRect();
        return rect.left < containerRect.left - 1 || rect.right > containerRect.right + 1;
      });

    if (hasOverflow) {
      const itemToHide = items[visibleItemsAmount - 1];

      if (itemToHide) {
        handleVisibleItemsAmount(visibleItemsAmount - 1);
      }
    }
  });

  const toggleItemWidth = useEventHandler(
    ({ changedWidth, initialWidth }: { changedWidth: number; initialWidth: number }) => {
      if (changedWidth > initialWidth) {
        // Re-measure the full eligible list: one resize may make room for several items.
        handleVisibleItemsAmount(items.length);
      } else if (changedWidth < initialWidth) {
        // check if item should be hidden
        tryHidingItem();
      }
    },
  );

  useEffect(() => {
    const listener = () => {
      tryHidingItem();

      if (parentContainerRef.current) {
        setWidth(parentContainerRef.current.scrollWidth);
      }
    };

    document.fonts.addEventListener('loadingdone', listener);
    return () => document.fonts.removeEventListener('loadingdone', listener);
  }, [parentContainerRef, tryHidingItem]);

  useEffect(() => {
    const container = resizingContainerRef.current;

    if (container) {
      const observer = new ResizeObserver(entities =>
        entities.forEach(entity => {
          if (entity.target === container) {
            const newWidth = entity.contentBoxSize[0]?.inlineSize;
            if (newWidth !== undefined) {
              setWidth(Math.floor(newWidth));
            }
          }
        }),
      );

      observer.observe(container);

      return () => observer.disconnect();
    }
  }, [resizingContainerRef]);

  useLayoutEffect(() => {
    if (parentContainerRef.current) {
      toggleItemWidth({
        initialWidth: parentContainerRef.current.scrollWidth,
        changedWidth: widthRef.current,
      });
    }
  }, [items, parentContainerRef, toggleItemWidth]);

  useLayoutEffect(() => {
    toggleItemWidth({
      initialWidth: widthRef.current,
      changedWidth: width,
    });

    widthRef.current = width;
  }, [width, toggleItemWidth]);

  useLayoutEffect(() => {
    tryHidingItem();
  }, [tryHidingItem, visibleItemsAmount]);

  return {
    visibleItems: items.slice(0, visibleItemsAmount),
    hiddenItems: items.slice(visibleItemsAmount),
  };
}
