import { ChipChoice } from '@ds/chips';
import { Pagination } from '@ds/pagination';
import { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { View } from '../../constants';
import { tableLocale } from '../../locale';
import styles from './styles.module.scss';

export type TablePaginationProps<TData> = {
  table: Table<TData>;
  options?: number[];
  optionsLabel?: string;
  optionsRender?(value: number, idx: number): string | number;
  pageCount?: number;
  /** Режим таблицы: в карточках пагинация занимает всю свободную ширину футера */
  view?: View;
};

export function TablePagination<TData>({
  table,
  options: optionsProp,
  optionsLabel: optionsLabelProp,
  optionsRender,
  view,
}: TablePaginationProps<TData>) {
  const { t } = tableLocale.useTranslations();
  const optionsLabel = optionsLabelProp ?? t('rowsOptionsLabel');

  const handlePaginationOnChange = useCallback(
    (pageIndex: number) => {
      table.setPageIndex(pageIndex - 1);
    },
    [table],
  );

  const handleRowsVolumeOnChange = useCallback(
    (value: string) => {
      table.setPageSize(Number(value));
    },
    [table],
  );

  const options = useMemo(
    () =>
      optionsProp
        ?.slice()
        .sort((a, b) => a - b)
        .map((value, idx) => ({
          label: String(optionsRender ? optionsRender(value, idx) : value),
          value: String(value),
        })),
    [optionsProp, optionsRender],
  );

  const tablePaginationState = table.getState().pagination;

  if (table.getPageCount() <= 1 && !options) {
    return null;
  }

  return (
    <div className={styles.footer} data-view={view}>
      {table.getPageCount() > 1 && (
        <Pagination
          total={table.getPageCount()}
          page={tablePaginationState.pageIndex + 1}
          onChange={handlePaginationOnChange}
          size='s'
          className={styles.pagination}
        />
      )}

      {options && table.getRowModel().rows.length >= Number(options[0].value) && (
        <ChipChoice.Single
          value={String(tablePaginationState.pageSize)}
          onChange={value => handleRowsVolumeOnChange(String(value))}
          placement='top-end'
          options={options}
          label={optionsLabel}
          widthStrategy='eq'
          size='s'
        />
      )}
    </div>
  );
}
