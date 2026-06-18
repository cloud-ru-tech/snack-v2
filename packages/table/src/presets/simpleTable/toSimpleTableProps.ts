import { CardViewInput, defineColumns, mapCardViewProps, SimpleColumnDef } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { DEFAULT_PRESET_PAGE_SIZE, DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';

/** Входные пропсы `SimpleTable` / `useSimpleTableProps` */
export type SimpleTableInput<TData extends object> = CardViewInput<TData> & {
  /** Данные для отрисовки */
  data: TData[];
  /** Декларативное описание колонок */
  columns: SimpleColumnDef<TData>[];
  /** Количество строк на страницу @default 10 */
  pageSize?: number;
  /** Стабильный идентификатор строки */
  getRowId?: (row: TData) => string;
} & Omit<ClientTableProps<TData>, 'data' | 'columnDefinitions' | 'getRowId' | 'headlineId'>;

/** Маппинг упрощённых пропсов в `ClientTableProps` для `Table` */
export function toSimpleTableProps<TData extends object>(input: SimpleTableInput<TData>): ClientTableProps<TData> {
  const {
    data,
    columns,
    pageSize = DEFAULT_PRESET_PAGE_SIZE,
    getRowId,
    headlineKey,
    defaultView,
    view,
    onViewChange,
    renderCard,
    outline,
    pagination,
    ...rest
  } = input;

  return {
    ...rest,
    ...mapCardViewProps({ headlineKey, defaultView, view, onViewChange, renderCard }),
    data,
    columnDefinitions: defineColumns(columns),
    outline: outline ?? true,
    pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
    pagination: pagination ?? { options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] },
    getRowId: wrapGetRowId(getRowId),
  };
}
