import { useMemo } from 'react';

import { defineColumns } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { wrapGetRowId } from '../wrapGetRowId';
import { toTreeTableProps, TreeTableInput } from './toTreeTableProps';

/** Возвращает готовые пропсы для `Table` из упрощённого API `TreeTable` */
export function useTreeTableProps<TData extends object>(input: TreeTableInput<TData>): ClientTableProps<TData> {
  const { secondaryColumns = [], getRowId } = input;

  const columnDefinitions = useMemo(() => defineColumns(secondaryColumns), [secondaryColumns]);

  const wrappedGetRowId = useMemo(() => wrapGetRowId(getRowId), [getRowId]);

  return {
    ...toTreeTableProps(input),
    columnDefinitions,
    getRowId: wrappedGetRowId,
  };
}
