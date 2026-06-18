import { Header } from '@tanstack/react-table';
import { useVirtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { MutableRefObject, RefObject } from 'react';

import { ColumnVirtualizer } from '../../types';

type Params<TData> = {
  enabled: boolean;
  /** Leaf-заголовки центрального (unpinned) пула колонок */
  centerHeaders: Header<TData, unknown>[];
  scrollRef: RefObject<HTMLElement>;
  options?: Partial<VirtualizerOptions<HTMLElement, Element>>;
  instanceRef?: MutableRefObject<ColumnVirtualizer>;
};

type ColumnVirtualizerResult = {
  /** Идентификаторы колонок, которые должны быть отрисованы */
  virtualColumnIds: Set<string>;
  /** Отступ слева от начала контента до первой видимой колонки, px */
  paddingLeft: number;
  /** Отступ справа от последней видимой колонки до конца контента, px */
  paddingRight: number;
  /** Общая ширина всех центральных колонок, px */
  totalSize: number;
};

/**
 * Хук виртуализации колонок таблицы (windowing по горизонтали).
 * Virtuализирует только center (unpinned) колонки.
 * Pinned-колонки (left/right) всегда отрисовываются вне этого хука.
 * Возвращает `null` когда `enabled=false`.
 */
export function useColumnVirtualizer<TData extends object>({
  enabled,
  centerHeaders,
  scrollRef,
  options,
  instanceRef,
}: Params<TData>): ColumnVirtualizerResult | null {
  const virtualizer = useVirtualizer({
    horizontal: true,
    count: centerHeaders.length,
    estimateSize: i => centerHeaders[i]?.getSize() ?? 100,
    getScrollElement: () => (enabled ? scrollRef.current : null),
    overscan: 3,
    enabled,
    ...options,
  });

  if (instanceRef && enabled) {
    instanceRef.current = virtualizer;
  }

  if (!enabled || !centerHeaders.length) {
    return null;
  }

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  const paddingLeft = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingRight = totalSize - (virtualItems.length > 0 ? virtualItems[virtualItems.length - 1].end : 0);

  const virtualColumnIds = new Set(
    virtualItems.map(vi => centerHeaders[vi.index]?.id).filter((id): id is string => id !== undefined),
  );

  return { virtualColumnIds, paddingLeft, paddingRight, totalSize };
}
