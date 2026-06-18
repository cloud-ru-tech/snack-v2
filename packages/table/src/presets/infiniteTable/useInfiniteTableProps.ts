import { useMemo } from 'react';

import { defineColumns } from '../../columnUtils';
import { InfiniteTableProps } from '../../components/types';
import { wrapGetRowId } from '../wrapGetRowId';
import { InfiniteTableInput, toInfiniteTableProps } from './toInfiniteTableProps';
import { useInfiniteScrollRef } from './useInfiniteScrollRef';

/** Возвращает готовые пропсы для `Table` из упрощённого API `InfiniteTable` */
export function useInfiniteTableProps<TData extends object>(
  input: InfiniteTableInput<TData>,
): InfiniteTableProps<TData> {
  const isButtonMode = input.loadMoreTrigger === 'button';

  const scrollRef = useInfiniteScrollRef({
    onLoadMore: isButtonMode ? undefined : input.onLoadMore,
    hasMore: isButtonMode ? false : input.hasMore,
    loading: input.loading,
    dataLength: input.data.length,
  });

  const { columns, getRowId } = input;

  const columnDefinitions = useMemo(() => defineColumns(columns), [columns]);

  const wrappedGetRowId = useMemo(() => wrapGetRowId(getRowId), [getRowId]);

  return {
    ...toInfiniteTableProps(input, isButtonMode ? null : scrollRef),
    columnDefinitions,
    getRowId: wrappedGetRowId,
  };
}
