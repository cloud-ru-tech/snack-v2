import { isBrowser } from '@ds/utils';
import { useVirtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { MutableRefObject, RefObject } from 'react';

import { RowVirtualizer } from '../../types';

type Params = {
  enabled: boolean;
  count: number;
  scrollRef: RefObject<HTMLElement>;
  options?: Partial<VirtualizerOptions<HTMLElement, Element>>;
  instanceRef?: MutableRefObject<RowVirtualizer>;
};

/**
 * Хук виртуализации строк таблицы (windowing по вертикали).
 * Возвращает `null` когда `enabled=false` (нет затрат на создание virtualizer'а).
 * Когда включён — возвращает инстанс `@tanstack/react-virtual` Virtualizer.
 */
export function useRowVirtualizer({ enabled, count, scrollRef, options, instanceRef }: Params) {
  const virtualizer = useVirtualizer({
    count,
    estimateSize: () => 40,
    getScrollElement: () => (enabled ? scrollRef.current : null),
    measureElement:
      isBrowser() && !navigator.userAgent.includes('Firefox') ? el => el?.getBoundingClientRect().height : undefined,
    overscan: 10,
    enabled,
    ...options,
  });

  if (instanceRef && enabled) {
    instanceRef.current = virtualizer;
  }

  return enabled ? virtualizer : null;
}
