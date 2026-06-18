import { FiltersState } from '@ds/chips';
import { GroupSelectItemProps } from '@ds/list';
import { ToolbarDataViewValue, ToolbarPersistConfig, usePersistState } from '@ds/toolbar';
import { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { VIEW, View } from '../../../constants';
import {
  type ColumnsSettingsToolbarSlotResult,
  type ExportToolbarSlotResult,
  type TableSortingToolbarSlotResult,
  useColumnsSettingsToolbarSlot,
  useExportToolbarSlot,
  useTableSortingToolbarSlot,
} from '../../../hooks';
import { tableLocale } from '../../../locale';
import { ColumnDefinition } from '../../../types';
import { TableProps } from '../../types';
import {
  mapPaginationToRequestPayload,
  mapPaginationToTableState,
  mapSortToRequestPayload,
  mapSortToTableState,
} from '../utils/saveTableState/mappers';
import { validateFilter, validatePaging, validateSorting } from '../utils/saveTableState/validators';

type UseTableToolbarParams<TData extends object, TFilters extends FiltersState> = {
  table: Table<TData>;
  columnDefinitions: ColumnDefinition<TData>[];
  sortingProp?: TableProps<TData>['sorting'];
  savedState?: TableProps<TData>['savedState'];
  columnFilters?: TableProps<TData>['columnFilters'];
  search?: TableProps<TData>['search'];
  suppressToolbar: boolean;
  suppressSearch: boolean;
  isCardsView: boolean;
  viewProp?: View;
  defaultView?: View;
  onViewChange?: (view: View) => void;
  headlineId?: string;
  setView: (view: View) => void;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (value: { pageIndex: number; pageSize: number }) => void;
  sorting: ReturnType<Table<TData>['getState']>['sorting'];
  onSortingChange: (value: ReturnType<Table<TData>['getState']>['sorting']) => void;
  filter: TFilters | undefined;
  setFilter: (value: TFilters | undefined) => void;
  setFilterVisibility: (value: string[]) => void;
  enableSelection: boolean;
  multiRow: boolean;
  isAllRowsMode: boolean;
  handleOnToolbarCheck: () => void;
  bulkActions?: TableProps<TData>['bulkActions'];
  areColumnsSettingsEnabled: boolean;
  enabledColumns: string[];
  columnsSettings: [GroupSelectItemProps];
  setEnabledColumns: (columns: string[]) => void;
  outline?: boolean;
  moreActions?: TableProps<TData>['moreActions'];
  onExport?: TableProps<TData>['onExport'];
  onRefresh?: () => void;
  handleOnRefresh: () => void;
};

type UseTableToolbarResult<TFilters extends FiltersState> = {
  tableToolbarPersistConfig: ToolbarPersistConfig<TFilters> | undefined;
  toolbarBulkProps?:
    | {
        checked: boolean;
        indeterminate: boolean;
        onCheck: () => void;
        bulkActions?: TableProps<object>['bulkActions'];
        selectedCount: number;
        totalCount: number;
        showBulkCheckbox: boolean;
      }
    | undefined;
  dataViewValue: ToolbarDataViewValue;
  handleDataViewChange: (value: ToolbarDataViewValue) => void;
  cardsViewEnabled: boolean;
  showToolbarSorting: boolean;
  exportToolbarSlot: ExportToolbarSlotResult;
  sortingToolbarSlot: TableSortingToolbarSlotResult;
  columnsSettingsToolbarSlot: ColumnsSettingsToolbarSlotResult;
  hasMobileToolbarMounts: boolean;
  searchPlaceholder: string;
};

export function useTableToolbar<TData extends object, TFilters extends FiltersState = Record<string, unknown>>({
  table,
  columnDefinitions,
  sortingProp,
  savedState,
  columnFilters,
  suppressToolbar,
  suppressSearch,
  isCardsView,
  viewProp,
  defaultView,
  onViewChange,
  headlineId,
  setView,
  globalFilter,
  onGlobalFilterChange,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  filter,
  setFilter,
  setFilterVisibility,
  enableSelection,
  multiRow,
  isAllRowsMode,
  handleOnToolbarCheck,
  bulkActions,
  areColumnsSettingsEnabled,
  enabledColumns,
  columnsSettings,
  setEnabledColumns,
  onExport,
}: UseTableToolbarParams<TData, TFilters>): UseTableToolbarResult<TFilters> {
  const { t } = tableLocale.useTranslations();

  const validatePersistedState = useMemo(
    () => (data: unknown) => {
      const dataAsSettings = data as {
        pagination?: unknown;
        ordering?: unknown;
        search?: unknown;
        filter?: unknown;
      };
      const isPaginationValid = validatePaging(dataAsSettings?.pagination);
      const isSortingValid = validateSorting(dataAsSettings?.ordering);
      const isSearchValid = !dataAsSettings?.search || typeof dataAsSettings?.search === 'string';
      const isFilterValid =
        !columnFilters?.filters || Boolean(validateFilter(dataAsSettings.filter, columnFilters.filters));

      return isPaginationValid && isSortingValid && isSearchValid && isFilterValid;
    },
    [columnFilters?.filters],
  );

  const hasSortableColumns = useMemo(() => columnDefinitions.some(column => column.enableSorting), [columnDefinitions]);
  const shouldShowSorting = Boolean(sortingProp) || hasSortableColumns;

  const cardsViewEnabled =
    viewProp !== undefined || defaultView !== undefined || onViewChange !== undefined || headlineId !== undefined;

  const dataViewValue: ToolbarDataViewValue = isCardsView ? 'compact' : 'list';

  const handleDataViewChange = useCallback(
    (value: ToolbarDataViewValue) => {
      setView(value === 'compact' ? VIEW.Cards : VIEW.Table);
    },
    [setView],
  );

  const tableToolbarPersistConfig = useMemo(() => {
    if (!savedState?.id || !savedState?.filterQueryKey) {
      return undefined;
    }

    return {
      id: savedState.id,
      filterQueryKey: savedState.filterQueryKey,
      validateData: validatePersistedState,
      state: {
        pagination: mapPaginationToRequestPayload(pagination),
        ordering: mapSortToRequestPayload(sorting),
        filter,
        search: globalFilter || '',
      },
      serializer: savedState.serializer,
      parser: savedState.parser,
      onLoad: (state: {
        pagination?: Parameters<typeof mapPaginationToTableState>[0];
        search?: string;
        ordering?: Parameters<typeof mapSortToTableState>[0];
        filter?: TFilters;
      }) => {
        state.pagination && onPaginationChange(mapPaginationToTableState(state.pagination));
        state.search && onGlobalFilterChange(state.search);
        state.ordering && onSortingChange(mapSortToTableState(state.ordering));
        if (state.filter) {
          setFilter(state.filter);
          setFilterVisibility(Object.keys(state.filter));
        }
      },
    };
  }, [
    filter,
    globalFilter,
    onGlobalFilterChange,
    onPaginationChange,
    onSortingChange,
    pagination,
    savedState?.filterQueryKey,
    savedState?.id,
    savedState?.parser,
    savedState?.serializer,
    setFilter,
    setFilterVisibility,
    sorting,
    validatePersistedState,
  ]);

  usePersistState({
    persist: suppressToolbar ? (tableToolbarPersistConfig as ToolbarPersistConfig<TFilters>) : undefined,
    filter,
    search: suppressSearch ? undefined : globalFilter,
  });

  const { checked, indeterminate } = isAllRowsMode
    ? { checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected() }
    : { checked: table.getIsAllPageRowsSelected(), indeterminate: table.getIsSomePageRowsSelected() };

  const toolbarBulkProps =
    enableSelection && multiRow
      ? {
          checked,
          indeterminate,
          onCheck: handleOnToolbarCheck,
          bulkActions,
          selectedCount: table.getSelectedRowModel().flatRows.filter(r => !r.subRows.length).length,
          totalCount: table.getFilteredRowModel().flatRows.filter(r => !r.subRows.length).length,
          showBulkCheckbox: isCardsView,
        }
      : undefined;

  const showToolbarSorting = shouldShowSorting && isCardsView;

  const exportToolbarSlot = useExportToolbarSlot({
    onExport,
  });

  const sortingToolbarSlot = useTableSortingToolbarSlot({
    enabled: showToolbarSorting,
    table,
    columnDefinitions,
    enabledColumns: areColumnsSettingsEnabled ? enabledColumns : undefined,
    areColumnsSettingsEnabled,
  });

  const columnsSettingsToolbarSlot = useColumnsSettingsToolbarSlot({
    enabled: areColumnsSettingsEnabled,
    columnsSettings,
    enabledColumns,
    setEnabledColumns,
  });

  const hasMobileToolbarMounts = Boolean(sortingToolbarSlot.mobileMount || columnsSettingsToolbarSlot.mobileMount);

  return {
    tableToolbarPersistConfig: tableToolbarPersistConfig as ToolbarPersistConfig<TFilters> | undefined,
    toolbarBulkProps,
    dataViewValue,
    handleDataViewChange,
    cardsViewEnabled,
    showToolbarSorting,
    exportToolbarSlot,
    sortingToolbarSlot,
    columnsSettingsToolbarSlot,
    hasMobileToolbarMounts,
    searchPlaceholder: t('searchPlaceholder'),
  };
}
