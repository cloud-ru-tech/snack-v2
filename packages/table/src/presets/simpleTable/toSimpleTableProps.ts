import { WithSupportProps } from '@ds/utils';

import { defineColumns, SimpleColumnDef } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { wrapGetRowId } from '../wrapGetRowId';

/** Входные пропсы `SimpleTable` / `useSimpleTableProps` */
export type SimpleTableInput<TData extends object> = WithSupportProps<
  {
    /** Данные для отрисовки */
    data: TData[];
    /** Декларативное описание колонок */
    columns: SimpleColumnDef<TData>[];
    /** Стабильный идентификатор строки */
    getRowId?(row: TData): string;
  } & Pick<
    ClientTableProps<TData>,
    | 'className'
    | 'outline'
    | 'fullWidth'
    | 'loading'
    | 'dataError'
    | 'noDataState'
    | 'errorDataState'
    | 'onRowClick'
    | 'rowAutoHeight'
    | 'suppressHeader'
    | 'dataFiltered'
    | 'noResultsState'
    | 'onRefresh'
    | 'rowPinning'
  >
>;

/** Маппинг упрощённых пропсов в `ClientTableProps` для `Table` */
export function toSimpleTableProps<TData extends object>(input: SimpleTableInput<TData>): ClientTableProps<TData> {
  const { data, columns, getRowId, outline, ...rest } = input;

  return {
    ...rest,
    view: 'table',
    data,
    columnDefinitions: defineColumns(columns),
    outline: outline ?? true,
    pageSize: Math.max(data.length, 1),
    manualPagination: true,
    suppressToolbar: true,
    suppressPagination: true,
    getRowId: wrapGetRowId(getRowId),
  };
}
