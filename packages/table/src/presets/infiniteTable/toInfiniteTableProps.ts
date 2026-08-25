import { Ref } from 'react';

import { CardViewInput, mapCardViewProps } from '../../columnUtils';
import { InfiniteTableProps } from '../../components/types';
import { ColumnDefinition } from '../../types';
import { wrapGetRowId } from '../wrapGetRowId';

/** Входные пропсы `InfiniteTable` / `useInfiniteTableProps` */
export type InfiniteTableInput<TData extends object> = CardViewInput<TData> & {
  data: TData[];
  /**
   * Определения колонок в стандартном виде — том же, что у `Table.columnDefinitions`.
   * Упрощённое описание здесь не используется: у таблиц с бесконечной подгрузкой колонки
   * обычно не выражаются им (спред `getStatusColumnDef`, собственный `cell`, `id` не совпадающий
   * с `accessorKey`), а `defineColumns` остаётся доступен отдельно, если он всё же нужен.
   */
  columns: ColumnDefinition<TData>[];
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
  const {
    data,
    columns,
    getRowId,
    headlineKey,
    defaultView,
    view,
    onViewChange,
    renderCard,
    outline,
    enableRowVirtualization,
    ...rest
  } = input;

  return {
    ...rest,
    ...mapCardViewProps({ headlineKey, defaultView, view, onViewChange, renderCard }),
    data,
    columnDefinitions: columns,
    infiniteLoading: true,
    outline: outline ?? true,
    enableRowVirtualization: enableRowVirtualization ?? true,
    getRowId: wrapGetRowId(getRowId),
    scrollRef: scrollRef ?? undefined,
  };
}
