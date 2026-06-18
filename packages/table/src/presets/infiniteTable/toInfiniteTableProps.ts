import { Ref } from 'react';

import { CardViewInput, defineColumns, mapCardViewProps, SimpleColumnDef } from '../../columnUtils';
import { InfiniteTableProps } from '../../components/types';
import { wrapGetRowId } from '../wrapGetRowId';

/** Входные пропсы `InfiniteTable` / `useInfiniteTableProps` */
export type InfiniteTableInput<TData extends object> = CardViewInput<TData> & {
  data: TData[];
  columns: SimpleColumnDef<TData>[];
  getRowId?: (row: TData) => string;
} & Omit<
    InfiniteTableProps<TData>,
    'data' | 'columnDefinitions' | 'getRowId' | 'headlineId' | 'infiniteLoading' | 'scrollRef'
  >;

/** Маппинг упрощённых пропсов в `InfiniteTableProps` для `Table` */
export function toInfiniteTableProps<TData extends object>(
  input: InfiniteTableInput<TData>,
  scrollRef: Ref<HTMLElement> | null,
): InfiniteTableProps<TData> {
  const { data, columns, getRowId, headlineKey, defaultView, view, onViewChange, renderCard, outline, ...rest } = input;

  return {
    ...rest,
    ...mapCardViewProps({ headlineKey, defaultView, view, onViewChange, renderCard }),
    data,
    columnDefinitions: defineColumns(columns),
    infiniteLoading: true,
    outline: outline ?? true,
    getRowId: wrapGetRowId(getRowId),
    scrollRef: scrollRef ?? undefined,
  };
}
