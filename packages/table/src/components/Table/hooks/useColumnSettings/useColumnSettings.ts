import { FiltersState } from '@ds/chips';
import { GroupSelectItemProps } from '@ds/list';
import { isBrowser } from '@ds/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { tableLocale } from '../../../../locale';
import { ColumnDefinition } from '../../../../types';
import { TableProps } from '../../../types';
import { getColumnIdentifier, getTableColumnsDefinitions, PinnedGroupsState } from '../../utils';
import {
  getEnabledColumnsInitialState,
  isColumnEnabledInitially,
  isFilterableColumn,
  prepareColumnsSettings,
} from './utils';

type UseColumnSettingsProps<TData extends object, TFilters extends FiltersState> = Pick<
  TableProps<TData, TFilters>,
  'columnDefinitions' | 'columnsSettings' | 'savedState' | 'rowSelection' | 'expanding'
> &
  Required<Pick<TableProps<TData, TFilters>, 'enableSelectPinned'>> & {
    pinnedGroups: PinnedGroupsState<TData>;
  };

export function useColumnSettings<TData extends object, TFilters extends FiltersState>({
  columnDefinitions,
  columnsSettings,
  pinnedGroups,
  savedState,
  rowSelection,
  enableSelectPinned,
  expanding,
}: UseColumnSettingsProps<TData, TFilters>): {
  enabledColumns: string[];
  setEnabledColumns: (value: string[]) => void;
  enabledColumnsDefinitions: ColumnDefinition<TData>[];
  enabledTableColumns: ColumnDefinition<TData>[];
  getColumnsSettings: (columnOrder: string[]) => [GroupSelectItemProps];
  areColumnsSettingsEnabled: boolean;
} {
  const { t } = tableLocale.useTranslations();

  const localStorageKey = `${savedState?.id}_columnSettings`;

  const configurableColumns = useMemo(() => columnDefinitions.filter(isFilterableColumn), [columnDefinitions]);

  const [enabledColumns, setEnabledColumns] = useState(() =>
    getEnabledColumnsInitialState(configurableColumns, savedState, localStorageKey),
  );

  useEffect(() => {
    setEnabledColumns(prev => {
      const currentIds = configurableColumns.map(getColumnIdentifier);
      const kept = prev.filter(id => currentIds.includes(id));
      const added = currentIds
        .filter(id => !kept.includes(id))
        .filter(id => {
          const colDef = configurableColumns.find(col => getColumnIdentifier(col) === id);

          return colDef ? isColumnEnabledInitially(colDef) : false;
        });
      const reconciled = [...kept, ...added];

      if (reconciled.length === prev.length && reconciled.every((id, i) => id === prev[i])) {
        return prev;
      }

      return reconciled;
    });
  }, [configurableColumns]);

  const setEnabledColumnsOuter = useCallback(
    (value: string[]) => {
      if (savedState?.columnSettings && isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }

      setEnabledColumns(value);
    },
    [localStorageKey, savedState?.columnSettings],
  );

  const areColumnsSettingsEnabled = Boolean(columnsSettings?.enableSettingsMenu);

  const enabledColumnsDefinitions = useMemo(() => {
    if (!areColumnsSettingsEnabled) {
      return columnDefinitions;
    }

    return columnDefinitions.filter(colDef => {
      if (isFilterableColumn(colDef)) {
        return enabledColumns.includes(getColumnIdentifier(colDef));
      }

      return true;
    });
  }, [columnDefinitions, enabledColumns, areColumnsSettingsEnabled]);

  const enableSelection = Boolean(rowSelection?.enable);

  const enabledTableColumns = useMemo(
    () =>
      getTableColumnsDefinitions({
        columnDefinitions: enabledColumnsDefinitions,
        enableSelection,
        enableSelectPinned,
        expanding,
        rowSelectionAppearance: rowSelection?.appearance,
      }),
    [enableSelectPinned, enableSelection, enabledColumnsDefinitions, expanding, rowSelection?.appearance],
  );

  const areAllColumnsEnabled = enabledColumns.length === configurableColumns.length;

  const getColumnsSettings = useCallback(
    (columnOrder: string[]) =>
      prepareColumnsSettings({
        pinnedGroups,
        columnOrder,
        areAllColumnsEnabled,
        t,
      }),
    [areAllColumnsEnabled, pinnedGroups, t],
  );

  return {
    enabledColumns,
    setEnabledColumns: setEnabledColumnsOuter,
    enabledColumnsDefinitions,
    enabledTableColumns,
    getColumnsSettings,
    areColumnsSettingsEnabled,
  };
}
