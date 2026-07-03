import type { Table } from '@tanstack/react-table';

/** Параметры мастер-чекбокса выбора строк (заголовок таблицы / bulk в тулбаре) */
export type MasterSelectionOptions = {
  /** Режим «выбрать все строки» вместо только текущей страницы */
  isAllRowsMode?: boolean;
};

function countLeafRows(rows: { subRows: unknown[] }[]) {
  return rows.filter(row => !row.subRows.length).length;
}

export function getMasterSelectionState<TData>(table: Table<TData>, options: MasterSelectionOptions) {
  const isAllRowsMode = options.isAllRowsMode ?? false;

  return isAllRowsMode
    ? { checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected() }
    : { checked: table.getIsAllPageRowsSelected(), indeterminate: table.getIsSomePageRowsSelected() };
}

export function toggleMasterSelection<TData>(table: Table<TData>, options: MasterSelectionOptions) {
  const isAllRowsMode = options.isAllRowsMode ?? false;

  if (isAllRowsMode) {
    table.toggleAllRowsSelected();
  } else {
    table.toggleAllPageRowsSelected();
  }
}

export function getSelectionCounts<TData>(table: Table<TData>, options: MasterSelectionOptions) {
  const isAllRowsMode = options.isAllRowsMode ?? false;
  const selectedCount = countLeafRows(table.getSelectedRowModel().flatRows);
  const totalCount = isAllRowsMode
    ? countLeafRows(table.getFilteredRowModel().flatRows)
    : countLeafRows(table.getPaginationRowModel().flatRows);

  return { selectedCount, totalCount };
}
