import { useLayoutEffect } from '@ds/utils';
import type { Header, Table } from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';

import { DefaultColumns } from '../../../constants';
import { TREE_CELL_ID } from '../../../helperComponents/Cells/TreeCell/constants';
import { ColumnDefinition } from '../../../types';
import { TableProps } from '../../types';
// Импорт по файлам: баррель `../utils` загружает helperComponents и весь пакет следом.
import { getInitColumnSizeFromLocalStorage, saveStateToLocalStorage } from '../utils/columnSize';
import { getColumnIdentifier } from '../utils/getColumnIdentifier';
import { getColumnStyleVars } from '../utils/getColumnStyleVars';
import { getCurrentlyConfiguredHeaderWidth } from '../utils/getCurrentlyConfiguredHeaderWidth';

/** Дефолты `defaultColumnSizing`: наружу tanstack их не экспортирует. */
const TANSTACK_DEFAULT_COLUMN_SIZE = 150;
const TANSTACK_DEFAULT_COLUMN_MIN_SIZE = 20;
const TANSTACK_DEFAULT_COLUMN_MAX_SIZE = Number.MAX_SAFE_INTEGER;

/**
 * Размер, который вернёт `header.getSize()`, пока в `columnSizing` нет записи о колонке.
 * Сравнивать с `columnDef.size` напрямую нельзя: `getSize` ограничивает его значениями
 * `minSize` и `maxSize`, поэтому у колонки с `minSize` больше `size` они не совпадут
 * никогда — колонка постоянно считалась бы изменённой пользователем.
 */
function getDefaultColumnSize<TData>(header: Header<TData, unknown>): number {
  const {
    size = TANSTACK_DEFAULT_COLUMN_SIZE,
    minSize = TANSTACK_DEFAULT_COLUMN_MIN_SIZE,
    maxSize = TANSTACK_DEFAULT_COLUMN_MAX_SIZE,
  } = header.column.columnDef;

  return Math.min(Math.max(minSize, size), maxSize);
}

type UseColumnSizesParams<TData extends object> = {
  table: Table<TData>;
  headers: Header<TData, unknown>[];
  isLoadingState: boolean;
  savedState: TableProps<TData>['savedState'];
};

export function useColumnSizes<TData extends object>({
  table,
  headers,
  isLoadingState,
  savedState,
}: UseColumnSizesParams<TData>) {
  const columnSizeVarsRef = useRef<Record<string, string>>();
  const [measuredHeaderWidths, setMeasuredHeaderWidths] = useState<Record<string, number>>({});
  const isResizingColumn = table.getState().columnSizingInfo.isResizingColumn;

  const columnSizes = useMemo(() => {
    const originalColumnDefs = table._getColumnDefs();
    const vars: Record<string, string> = {};
    const realSizes: Record<string, number> = {};
    const statesToSave: Array<{ id: string; columnId: string; size: string }> = [];
    const headerIdsToMeasure: string[] = [];
    const resizedColumnIndex = headers.findIndex(({ column }) => column.getIsResizing());

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const { sizeKey, flexKey } = getColumnStyleVars(header.id);
      const originalColDef = originalColumnDefs.find(
        col => header.id === getColumnIdentifier(col as unknown as ColumnDefinition<TData>),
      );

      const originalColumnDefSize = originalColDef?.size;
      let initSize = originalColumnDefSize ? `${originalColumnDefSize}px` : '100%';
      const prevSize = columnSizeVarsRef.current?.[sizeKey];
      const isResizeSavedToStore = originalColDef?.enableResizing && savedState?.id && savedState?.resize !== false;

      if (isResizeSavedToStore) {
        const savedSize = getInitColumnSizeFromLocalStorage({ id: savedState.id, columnId: header.id });

        if (savedSize) {
          initSize = savedSize;

          // Sync tanstack's columnSizing with the persisted value so that the first
          // resize starts from the correct base instead of the columnDef default.
          if (savedSize.endsWith('px')) {
            const savedSizeNum = Number.parseInt(savedSize, 10);

            if (!Number.isNaN(savedSizeNum) && table.getState().columnSizing[header.id] !== savedSizeNum) {
              realSizes[header.id] = savedSizeNum;
            }
          }
        }
      }

      let size = initSize;

      if (header.column.getCanResize()) {
        const currentSize = header.getSize();
        const defaultSize = getDefaultColumnSize(header);

        if (currentSize !== defaultSize || (i < resizedColumnIndex && prevSize === '100%')) {
          let realSize = currentSize;
          let needsMeasurement = false;

          if (prevSize === '100%') {
            const measuredWidth = measuredHeaderWidths[header.id];

            if (measuredWidth !== undefined) {
              realSize = measuredWidth;
            } else {
              needsMeasurement = true;
              headerIdsToMeasure.push(header.id);
            }
          }

          if (!needsMeasurement) {
            realSizes[header.id] = realSize;
            size = `${realSize}px`;
          }
        }
      }

      if (isLoadingState && header.id === TREE_CELL_ID) {
        const minTreeWidth = originalColDef?.minSize ?? originalColDef?.size ?? 150;
        const parsedSize = size.endsWith('px') ? Number.parseInt(size, 10) : Number.NaN;

        if (Number.isNaN(parsedSize) || parsedSize < minTreeWidth) {
          size = `${minTreeWidth}px`;
          realSizes[header.id] = minTreeWidth;
        }
      }

      if (isLoadingState && header.id === DefaultColumns.RowActions) {
        const parsedSize = size.endsWith('px') ? Number.parseInt(size, 10) : Number.NaN;

        if (Number.isNaN(parsedSize)) {
          const measuredWidth = measuredHeaderWidths[header.id];

          if (measuredWidth !== undefined && measuredWidth > 0) {
            size = `${measuredWidth}px`;
            realSizes[header.id] = measuredWidth;
          } else {
            headerIdsToMeasure.push(header.id);
          }
        }
      }

      if (isResizeSavedToStore) {
        statesToSave.push({ id: savedState.id, columnId: header.id, size });
      }

      vars[sizeKey] = size;
      vars[flexKey] = size === '100%' ? 'unset' : '0';
    }

    return { vars, realSizes, statesToSave, headerIdsToMeasure };
    /*
      effect must be called only on columnSizingInfo.isResizingColumn changes
      to reduce unnecessary recalculations

      headers ids can also change, so they also should present here

      table.getTotalSize() will trigger re-render after double-click size reset
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizingColumn, headers, table.getTotalSize(), isLoadingState, measuredHeaderWidths]);

  useEffect(() => {
    if (!isResizingColumn) {
      setMeasuredHeaderWidths({});
    }
  }, [isResizingColumn]);

  useLayoutEffect(() => {
    if (columnSizes.headerIdsToMeasure.length) {
      setMeasuredHeaderWidths(prev => {
        const next = { ...prev };
        let changed = false;

        for (const id of columnSizes.headerIdsToMeasure) {
          if (next[id] !== undefined) {
            continue;
          }

          next[id] = getCurrentlyConfiguredHeaderWidth(id);
          changed = true;
        }

        return changed ? next : prev;
      });

      return;
    }

    // `setColumnSizing` всегда создаёт новый объект состояния таблицы, то есть вызывает
    // рендер, а рендер возвращает выполнение сюда. Записываем только реальные изменения,
    // иначе обновления становятся бесконечными.
    const currentColumnSizing = table.getState().columnSizing;
    const hasSizeChanges = Object.entries(columnSizes.realSizes).some(
      ([columnId, size]) => currentColumnSizing[columnId] !== size,
    );

    if (hasSizeChanges) {
      table.setColumnSizing(old => ({ ...old, ...columnSizes.realSizes }));
    }

    columnSizeVarsRef.current = columnSizes.vars;
  }, [columnSizes, table]);

  useEffect(() => {
    if (columnSizes.headerIdsToMeasure.length) {
      return;
    }

    for (const args of columnSizes.statesToSave) {
      saveStateToLocalStorage(args);
    }
  }, [columnSizes]);

  return { columnSizes };
}
