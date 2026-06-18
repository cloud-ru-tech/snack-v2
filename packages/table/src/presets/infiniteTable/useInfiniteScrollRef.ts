import { useCallback, useEffect, useState } from 'react';

type UseInfiniteScrollRefOptions = {
  /** Колбэк подгрузки следующей порции */
  onLoadMore?: () => void;
  /** Есть ли ещё данные для загрузки */
  hasMore?: boolean;
  /** Блокировать подгрузку во время загрузки */
  loading?: boolean;
  /** Длина data — пересоздаёт observer после подгрузки */
  dataLength?: number;
};

/**
 * Callback-ref на scroll-stub Table + IntersectionObserver для infinite scroll.
 * Использует useState для отслеживания смены DOM-узла: при переключении вида
 * (cards ↔ table) stub монтируется в новый элемент, и observer пересоздаётся.
 */
export function useInfiniteScrollRef({
  onLoadMore,
  hasMore = false,
  loading = false,
  dataLength = 0,
}: UseInfiniteScrollRefOptions) {
  const [scrollNode, setScrollNode] = useState<HTMLElement | null>(null);

  const scrollRef = useCallback((node: HTMLElement | null) => {
    setScrollNode(node);
  }, []);

  useEffect(() => {
    if (!scrollNode || !onLoadMore || !hasMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        onLoadMore();
      }
    });

    observer.observe(scrollNode);

    return () => observer.disconnect();
  }, [scrollNode, onLoadMore, hasMore, loading, dataLength]);

  return scrollRef;
}
