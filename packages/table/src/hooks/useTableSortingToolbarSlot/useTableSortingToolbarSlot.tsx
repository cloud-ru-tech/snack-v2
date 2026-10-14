import { APPEARANCE, Button, VIEW as BUTTON_VIEW } from '@ds/button';
import { SortSVG } from '@ds/icons/interface/product';
import { ArrowDownSVG, ArrowUpSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { SortingState, Table } from '@tanstack/react-table';
import { ComponentType, ReactNode, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { tableLocale } from '../../locale';
import { ColumnDefinition } from '../../types';
import { useTableSorting } from '../useTableSorting';

export type TableSortingProps<TData extends object> = {
  /** Инстанс tanstack-таблицы */
  table: Table<TData>;
  /** Управляемое состояние сортировки (по умолчанию берётся из `table.getState().sorting`) */
  sorting?: SortingState;
  /** Определения колонок */
  columnDefinitions: ColumnDefinition<TData>[];
  /** Список включённых колонок (при включённых настройках колонок) */
  enabledColumns?: string[];
  /** Включены ли настройки колонок */
  areColumnsSettingsEnabled?: boolean;
};

export type TableSortingToolbarSlotParams<TData extends object> = TableSortingProps<TData> & {
  enabled?: boolean;
};

export type TableSortingToolbarSlotResult = {
  afterContent: ReactNode;
};

/**
 * Слот сортировки в тулбаре: `afterContent` — в `pinnedAfter`, поэтому на mobile кнопка остаётся в строке
 * тулбара. Список открывается в `BottomSheet` (surface-swap `Droplist`).
 */
export function useTableSortingToolbarSlot<TData extends object>({
  enabled = true,
  table,
  sorting,
  columnDefinitions,
  enabledColumns,
  areColumnsSettingsEnabled = false,
}: TableSortingToolbarSlotParams<TData>): TableSortingToolbarSlotResult {
  const { t } = tableLocale.useTranslations();
  const [open, setOpen] = useState(false);

  const { items, pinBottom, selection, currentSort, selectedSortId, handleClearSort } = useTableSorting({
    table,
    sorting,
    columnDefinitions,
    enabledColumns,
    areColumnsSettingsEnabled,
  });

  if (!enabled) {
    return { afterContent: null };
  }

  const handleClear = () => {
    handleClearSort();
    setOpen(false);
  };

  const clearItem = pinBottom?.[0] ? [{ ...pinBottom[0], onClick: handleClear }] : undefined;

  let SortIcon: ComponentType = SortSVG;

  if (currentSort) {
    SortIcon = currentSort.desc ? ArrowDownSVG : ArrowUpSVG;
  }

  return {
    afterContent: (
      <Droplist
        scroll
        items={items}
        selection={selection}
        virtualized={items.length > 10}
        pinBottom={clearItem}
        open={open}
        onOpenChange={setOpen}
        label={t('sort')}
        data-test-id={TEST_IDS.viewSort.droplist}
      >
        <Button
          size='m'
          view={BUTTON_VIEW.Function}
          icon={<SortIcon />}
          appearance={selectedSortId ? APPEARANCE.Primary : APPEARANCE.Neutral}
          aria-label={t('sort')}
          data-test-id={TEST_IDS.viewSort.droplistTrigger}
        />
      </Droplist>
    ),
  };
}
