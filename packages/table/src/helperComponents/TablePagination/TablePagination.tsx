import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button } from '@ds/button';
import { ChipChoice } from '@ds/chips';
import { ChevronLeftSVG, ChevronRightSVG } from '@ds/icons/interface/system';
import { Pagination } from '@ds/pagination';
import { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { View } from '../../constants';
import { tableLocale } from '../../locale';
import styles from './styles.module.scss';

const MAX_PAGE_OPTIONS = 1000;

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
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);
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

  const handlePreviousPage = useCallback(() => table.previousPage(), [table]);
  const handleNextPage = useCallback(() => table.nextPage(), [table]);
  const handlePageSelect = useCallback(
    (value: string | number | undefined) => {
      if (value !== undefined) {
        handlePaginationOnChange(Number(value));
      }
    },
    [handlePaginationOnChange],
  );

  const tablePaginationState = table.getState().pagination;

  const options = useMemo(
    () =>
      (optionsProp?.length ? Array.from(new Set([...optionsProp, tablePaginationState.pageSize])) : undefined)
        ?.sort((a, b) => a - b)
        .map((value, idx) => ({
          label: String(optionsRender ? optionsRender(value, idx) : value),
          value: String(value),
        })),
    [optionsProp, optionsRender, tablePaginationState.pageSize],
  );

  const pageCount = table.getPageCount();
  const currentPage = tablePaginationState.pageIndex + 1;
  const hasKnownPageCount = Number.isSafeInteger(pageCount) && pageCount >= 0;
  const showPagination = !hasKnownPageCount || pageCount > 1;
  const showPagePicker = mobile && hasKnownPageCount && pageCount > 1 && pageCount <= MAX_PAGE_OPTIONS;
  const useCompactPagination = mobile || !hasKnownPageCount;
  const pageOptions = useMemo(
    () =>
      showPagePicker
        ? Array.from({ length: pageCount }, (_, index) => {
            const page = String(index + 1);
            return { label: page, value: page };
          })
        : [],
    [showPagePicker, pageCount],
  );

  if (!showPagination && !options?.length) {
    return null;
  }

  return (
    <div className={styles.footer} data-view={view}>
      {showPagination && useCompactPagination && (
        <nav className={styles.mobilePagination} aria-label={t('pagination')}>
          <Button
            size='s'
            view='outline'
            appearance='neutral'
            icon={<ChevronLeftSVG />}
            aria-label={t('previousPage')}
            disabled={!table.getCanPreviousPage()}
            onClick={handlePreviousPage}
          />
          {showPagePicker && (
            <ChipChoice.Single
              label={t('page')}
              value={String(currentPage)}
              options={pageOptions}
              onChange={handlePageSelect}
              size='s'
              droplistSize='s'
              withDividers={false}
            />
          )}
          <Button
            size='s'
            view='outline'
            appearance='neutral'
            icon={<ChevronRightSVG />}
            aria-label={t('nextPage')}
            disabled={!table.getCanNextPage()}
            onClick={handleNextPage}
          />
        </nav>
      )}

      {showPagination && !useCompactPagination && (
        <Pagination
          total={pageCount}
          page={currentPage}
          onChange={handlePaginationOnChange}
          size='s'
          className={styles.pagination}
        />
      )}

      {options && options.length > 0 && (mobile || table.getRowCount() >= Number(options[0].value)) && (
        <ChipChoice.Single
          value={String(tablePaginationState.pageSize)}
          onChange={value => handleRowsVolumeOnChange(String(value))}
          placement='top-end'
          options={options}
          label={optionsLabel}
          widthStrategy='eq'
          size='s'
          droplistSize='s'
          withDividers={false}
        />
      )}
    </div>
  );
}
