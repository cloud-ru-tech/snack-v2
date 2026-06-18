import { FiltersState } from '@ds/chips';
import { useMemo } from 'react';

import { actionsColumn, defineColumns, statusColumn } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';
import { AdminTableInput, toAdminTableProps } from './toAdminTableProps';

/** Возвращает готовые пропсы для `Table` из упрощённого API `AdminTable` */
export function useAdminTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
  input: AdminTableInput<TData, TFilters>,
): ClientTableProps<TData, TFilters> {
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
    ...toAdminTableProps(input),
    columnDefinitions,
    getRowId: wrappedGetRowId,
    pagination: pagination ?? defaultPagination,
  };
}
