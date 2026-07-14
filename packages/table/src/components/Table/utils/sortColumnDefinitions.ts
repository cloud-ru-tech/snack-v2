import { ColumnDefinition } from '../../../types';
import { getColumnIdentifier } from './getColumnIdentifier';

export function sortColumnDefinitions(columnOrder: string[]) {
  return function sortColDefs<TData extends object>(
    colDefA: ColumnDefinition<TData>,
    colDefB: ColumnDefinition<TData>,
  ): number {
    const indexItemA = columnOrder.findIndex(columnIndex => columnIndex === getColumnIdentifier(colDefA));
    const indexItemB = columnOrder.findIndex(columnIndex => columnIndex === getColumnIdentifier(colDefB));

    return indexItemA - indexItemB;
  };
}
