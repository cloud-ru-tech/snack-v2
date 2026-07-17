import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { APPEARANCE, Button, VIEW as BUTTON_VIEW } from '@ds/button';
import { SortSVG } from '@ds/icons/interface/product';
import { ArrowDownSVG, ArrowUpSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { SortingState, Table } from '@tanstack/react-table';
import { ComponentType, ReactNode, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { renderTableSortingOverflowButton } from '../../helpers';
import { tableLocale } from '../../locale';
import { ColumnDefinition } from '../../types';
import { useTableSorting } from '../useTableSorting';
import styles from './useTableSortingToolbarSlot.module.scss';

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
  mobileMount: ReactNode;
};

/** Слот сортировки в тулбаре: `afterContent` — в `after`, `mobileMount` — BottomSheet вне строки тулбара. */
export function useTableSortingToolbarSlot<TData extends object>({
  enabled = true,
  table,
  sorting,
  columnDefinitions,
  enabledColumns,
  areColumnsSettingsEnabled = false,
}: TableSortingToolbarSlotParams<TData>): TableSortingToolbarSlotResult {
  const { t } = tableLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const [open, setOpen] = useState(false);

  const { items, pinBottom, selection, currentSort, selectedSortId, handleClearSort } = useTableSorting({
    table,
    sorting,
    columnDefinitions,
    enabledColumns,
    areColumnsSettingsEnabled,
  });

  const handleClear = () => {
    handleClearSort();
    setOpen(false);
  };

  const clearItem = pinBottom?.[0] ? [{ ...pinBottom[0], onClick: handleClear }] : undefined;

  let SortIcon: ComponentType = SortSVG;

  if (currentSort) {
    SortIcon = currentSort.desc ? ArrowDownSVG : ArrowUpSVG;
  }

  const droplist = (
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
      {isMobile ? (
        <span className={styles.hiddenTrigger} aria-hidden />
      ) : (
        <Button
          size='m'
          view={BUTTON_VIEW.Function}
          icon={<SortIcon />}
          appearance={selectedSortId ? APPEARANCE.Primary : APPEARANCE.Neutral}
          data-test-id={TEST_IDS.viewSort.droplistTrigger}
        />
      )}
    </Droplist>
  );

  if (!enabled) {
    return { afterContent: null, mobileMount: null };
  }

  if (isMobile) {
    return {
      afterContent: renderTableSortingOverflowButton({
        ariaLabel: t('sort'),
        onClick: () => setOpen(true),
        selectedSortId,
        currentSortDesc: currentSort?.desc,
      }),
      mobileMount: droplist,
    };
  }

  return { afterContent: droplist, mobileMount: null };
}
