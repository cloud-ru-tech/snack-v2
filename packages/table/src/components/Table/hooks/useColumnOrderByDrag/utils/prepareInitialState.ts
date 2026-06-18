import { isBrowser } from '@ds/utils';

import { tryParseLocalStorage } from '../../../../../helpers';
import { ColumnDefinition } from '../../../../../types';
import { TableProps } from '../../../../types';
import { getColumnIdentifier, isEveryArrayItemString } from '../../../utils';

export const getLocalStorageColumnOrderKey = (id: string): string => `${id}_columnOrder`;

export function prepareInitialState<TData extends object>(
  tableColumns: ColumnDefinition<TData>[],
  savedState: TableProps<TData>['savedState'],
): string[] {
  const columnOrder = tableColumns
    .filter(column => column.pinned !== 'left' && column.pinned !== 'right')
    .map(getColumnIdentifier);

  if (savedState?.columnSettings && isBrowser()) {
    const persistState = tryParseLocalStorage(getLocalStorageColumnOrderKey(savedState.id));
    const persistValue = isEveryArrayItemString(persistState) ? persistState : null;

    if (persistValue !== null) {
      return [...persistValue, ...columnOrder.filter(column => !persistValue?.includes(column))];
    }

    localStorage.setItem(getLocalStorageColumnOrderKey(savedState.id), JSON.stringify(columnOrder));
  }

  return columnOrder;
}
