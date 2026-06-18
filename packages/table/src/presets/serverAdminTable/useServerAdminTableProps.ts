import { FiltersState } from '@ds/chips';
import { useMemo } from 'react';

import { actionsColumn, defineColumns, statusColumn } from '../../columnUtils';
import { ServerTableProps } from '../../components/types';
import { DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';
import { ServerAdminTableInput, toServerAdminTableProps } from './toServerAdminTableProps';

/** Возвращает готовые пропсы для `ServerTable` из упрощённого API `ServerAdminTable` */
export function useServerAdminTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
  input: ServerAdminTableInput<TData, TFilters>,
): ServerTableProps<TData, TFilters> {
  const { columns, statusColumn: statusColumnConfig, rowActions, getRowId, pagination } = input;

  const columnDefinitions = useMemo(
    () => [
      ...(statusColumnConfig ? [statusColumn(statusColumnConfig)] : []),
      ...defineColumns(columns),
      ...(rowActions ? [actionsColumn(rowActions)] : []),
    ],
    [statusColumnConfig, columns, rowActions],
  );

  const wrappedGetRowId = useMemo(() => wrapGetRowId(getRowId), [getRowId]);

  const defaultPagination = useMemo(() => ({ options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] }), []);

  return {
    ...toServerAdminTableProps(input),
    columnDefinitions,
    getRowId: wrappedGetRowId,
    pagination: pagination ?? defaultPagination,
  };
}
