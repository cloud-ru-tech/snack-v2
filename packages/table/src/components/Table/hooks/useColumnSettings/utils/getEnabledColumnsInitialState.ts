import { isBrowser } from '@ds/utils';

import { tryParseLocalStorage } from '../../../../../helpers';
import { ColumnDefinition } from '../../../../../types';
import { TableProps } from '../../../../types';
import { getColumnIdentifier, isEveryArrayItemString } from '../../../utils';
import { isColumnEnabledInitially } from './isColumnEnabledInitially';

function getSettingsFromLocalStorage(localStorageKey: string): string[] | null {
  if (isBrowser()) {
    const localStorageState = tryParseLocalStorage(localStorageKey);
    return isEveryArrayItemString(localStorageState) ? localStorageState : null;
  }

  return null;
}

export function getEnabledColumnsInitialState<TData extends object>(
  configurableColumns: ColumnDefinition<TData>[],
  savedState: TableProps<TData>['savedState'],
  localStorageKey: string,
): string[] {
  const localStorageSettings = getSettingsFromLocalStorage(localStorageKey);

  return configurableColumns
    .filter(colDef => {
      const columnIdentifier = getColumnIdentifier(colDef);

      if (localStorageSettings && savedState?.columnSettings) {
        return Boolean(localStorageSettings.find(columnKey => columnKey === columnIdentifier));
      }

      return isColumnEnabledInitially(colDef);
    })
    .map(getColumnIdentifier);
}
