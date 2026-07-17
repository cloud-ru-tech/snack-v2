import { ArrowDownSVG, ArrowUpSVG, UpdateSVG } from '@ds/icons/interface/system';
import { DroplistProps, ITEM_TYPE, SelectionSingleState } from '@ds/list';
import { Header, SortingState, Table } from '@tanstack/react-table';
import { ReactNode, useCallback, useMemo } from 'react';

import { DefaultColumns, TEST_IDS } from '../../constants';
import { TREE_CELL_ID } from '../../helperComponents/Cells/TreeCell/constants';
import { tableLocale } from '../../locale';
import { ColumnDefinition } from '../../types';
import styles from './useTableSorting.module.scss';
import { createColumnDefMap, getHeaderLabel, groupHeadersByPinned } from './utils';

type DroplistItems = DroplistProps['items'];

// Служебные колонки (selection/row-actions/tree) не попадают в droplist сортировки.
// Status-колонка исключается только в indicator-only варианте (без header) — см. фильтр sortableHeaders.
const SERVICE_COLUMN_IDS = new Set<string>([DefaultColumns.Selection, DefaultColumns.RowActions, TREE_CELL_ID]);

type UseTableSortingParams<TData extends object> = {
  table: Table<TData>;
  sorting?: SortingState;
  columnDefinitions: ColumnDefinition<TData>[];
  enabledColumns?: string[];
  areColumnsSettingsEnabled?: boolean;
};

type UseTableSortingReturn = {
  items: DroplistItems;
  pinBottom: DroplistItems;
  selection?: SelectionSingleState;
  currentSort: {
    id: string;
    label: string;
    desc: boolean;
  } | null;
  selectedSortId?: string;
  handleClearSort(): void;
};

export function useTableSorting<TData extends object>({
  table,
  sorting: sortingProp,
  columnDefinitions,
  enabledColumns,
  areColumnsSettingsEnabled = false,
}: UseTableSortingParams<TData>): UseTableSortingReturn {
  const { t } = tableLocale.useTranslations();
  const sorting = sortingProp ?? table.getState().sorting;
  const columnDefMap = useMemo(() => createColumnDefMap(columnDefinitions), [columnDefinitions]);

  const hiddenColumnsBySettings = useMemo(() => {
    if (!areColumnsSettingsEnabled) return new Set<string>();

    const hidden = new Set<string>();

    columnDefMap.forEach((colDef, columnId) => {
      if ((colDef as { columnSettings?: { mode?: string } }).columnSettings?.mode === 'hidden') {
        hidden.add(columnId);
      }
    });

    return hidden;
  }, [areColumnsSettingsEnabled, columnDefMap]);

  const sortableHeaders = useMemo(() => {
    let headers = table.getFlatHeaders().filter(header => {
      if (!header.column.getCanSort() || SERVICE_COLUMN_IDS.has(header.id)) {
        return false;
      }

      // Indicator-only статус-колонка (без header) дала бы пункт с техническим id вместо подписи.
      if (header.id === DefaultColumns.Status && header.column.columnDef.header == null) {
        return false;
      }

      return true;
    });

    if (areColumnsSettingsEnabled && enabledColumns) {
      headers = headers.filter(header => hiddenColumnsBySettings.has(header.id) || enabledColumns.includes(header.id));
    }

    return headers;
  }, [table, areColumnsSettingsEnabled, enabledColumns, hiddenColumnsBySettings]);

  const currentSort = useMemo(() => {
    if (sorting.length === 0) return null;

    const firstSort = sorting[0];

    if (areColumnsSettingsEnabled && enabledColumns) {
      const isHiddenColumn = hiddenColumnsBySettings.has(firstSort.id);
      const isEnabledColumn = enabledColumns.includes(firstSort.id);

      if (!isHiddenColumn && !isEnabledColumn) {
        return null;
      }
    }

    const header = table.getFlatHeaders().find(h => h.id === firstSort.id);

    if (!header) return null;

    const headerLabel = getHeaderLabel(header);

    return {
      id: firstSort.id,
      label: headerLabel || firstSort.id,
      desc: firstSort.desc,
    };
  }, [sorting, table, areColumnsSettingsEnabled, enabledColumns, hiddenColumnsBySettings]);

  const handleColumnSortToggle = useCallback(
    (columnId: string) => {
      const currentSorting = table.getState().sorting;
      const currentColumnSort = currentSorting.find(s => s.id === columnId);
      let newSorting: SortingState;

      if (!currentColumnSort) {
        newSorting = [{ id: columnId, desc: false }];
      } else if (!currentColumnSort.desc) {
        newSorting = [{ id: columnId, desc: true }];
      } else {
        newSorting = [];
      }

      table.setSorting(newSorting);
    },
    [table],
  );

  const handleClearSort = useCallback(() => {
    table.setSorting([]);
  }, [table]);

  const selectedSortId = useMemo(() => {
    if (sorting.length === 0) return undefined;

    const firstSort = sorting[0];

    if (areColumnsSettingsEnabled && enabledColumns) {
      const isHiddenColumn = hiddenColumnsBySettings.has(firstSort.id);
      const isEnabledColumn = enabledColumns.includes(firstSort.id);

      if (!isHiddenColumn && !isEnabledColumn) {
        return undefined;
      }
    }

    return `sort-${firstSort.id}`;
  }, [sorting, areColumnsSettingsEnabled, enabledColumns, hiddenColumnsBySettings]);

  const createSortItem = useCallback(
    (header: Header<TData, unknown>) => {
      const columnId = header.id;
      const currentColumnSort = sorting.find(s => s.id === columnId);
      const isAsc = currentColumnSort && !currentColumnSort.desc;
      const isDesc = currentColumnSort && currentColumnSort.desc;
      const headerLabel = getHeaderLabel(header) || columnId;

      let sortIcon: ReactNode;

      if (isAsc) {
        sortIcon = <ArrowUpSVG />;
      } else if (isDesc) {
        sortIcon = <ArrowDownSVG />;
      }

      return {
        id: `sort-${columnId}`,
        content: {
          option: headerLabel,
        },
        afterContent: sortIcon,
        onClick: () => handleColumnSortToggle(columnId),
        'data-test-id': TEST_IDS.viewSort.option,
      };
    },
    [sorting, handleColumnSortToggle],
  );

  const groupSortableHeadersByPinned = useCallback(
    () => groupHeadersByPinned(sortableHeaders, columnDefMap),
    [sortableHeaders, columnDefMap],
  );

  const { items, pinBottom } = useMemo(() => {
    const { leftHeaders, unpinnedHeaders, rightHeaders } = groupSortableHeadersByPinned();
    const groups: DroplistItems = [];

    if (leftHeaders.length > 0) {
      groups.push({
        type: ITEM_TYPE.Group,
        divider: false,
        items: leftHeaders.map(createSortItem),
      });
    }

    if (unpinnedHeaders.length > 0) {
      groups.push({
        type: ITEM_TYPE.Group,
        divider: leftHeaders.length > 0 || rightHeaders.length > 0,
        items: unpinnedHeaders.map(createSortItem),
      });
    }

    if (rightHeaders.length > 0) {
      groups.push({
        type: ITEM_TYPE.Group,
        divider: leftHeaders.length > 0 || unpinnedHeaders.length > 0,
        items: rightHeaders.map(createSortItem),
      });
    }

    const clearItem: DroplistItems = [
      {
        id: 'snack-internal-clear-id',
        content: {
          option: t('clearSort'),
        },
        afterContent: <UpdateSVG />,
        onClick: handleClearSort,
        disabled: sorting.length === 0,
        className: styles.clearSortItem,
      },
    ];

    const mainGroup = {
      type: ITEM_TYPE.Group,
      label: t('sort'),
      items: groups,
    };

    return {
      items: [mainGroup] as DroplistItems,
      pinBottom: clearItem,
    };
  }, [groupSortableHeadersByPinned, createSortItem, sorting, handleClearSort, t]);

  const handleSelectionChange = useCallback(
    (selectedId: string | number) => {
      const id = String(selectedId);

      const match = id.match(/^sort-(.+)$/);

      if (match) {
        const [, columnId] = match;
        handleColumnSortToggle(columnId);
      }
    },
    [handleColumnSortToggle],
  );

  const selection = useMemo<SelectionSingleState | undefined>(() => {
    if (!selectedSortId) return undefined;

    return {
      mode: 'single',
      value: selectedSortId,
      onChange: handleSelectionChange,
    };
  }, [selectedSortId, handleSelectionChange]);

  return {
    items,
    pinBottom,
    selection,
    currentSort,
    selectedSortId,
    handleClearSort,
  };
}
