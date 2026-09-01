import { useLayoutEffect } from '@ds/utils';
import type { Header, Table } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { DefaultColumns } from '../../../constants';
import { TREE_CELL_ID } from '../../../helperComponents/Cells/TreeCell/constants';
import { ColumnDefinition } from '../../../types';
import { TableProps } from '../../types';
// Импорт по файлам: баррель `../utils` загружает helperComponents и весь пакет следом.
import { getInitColumnSizeFromLocalStorage, saveStateToLocalStorage } from '../utils/columnSize';
import { getColumnIdentifier } from '../utils/getColumnIdentifier';
import { getColumnStyleVars } from '../utils/getColumnStyleVars';
import { getCurrentlyConfiguredHeaderWidth } from '../utils/getCurrentlyConfiguredHeaderWidth';

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

      // Ширина задана, если о колонке есть запись в `columnSizing`. Сравнение с дефолтом врало на
      // колонке, чей `minSize` совпал с рассчитанным дефолтом. Ресайзимость здесь ни при чём:
      // замороженная колонка должна остаться фиксированной и после отпускания кнопки.
      const hasAssignedSize = table.getState().columnSizing[header.id] !== undefined;

      if (hasAssignedSize) {
        const currentSize = header.getSize();

        realSizes[header.id] = currentSize;
        size = `${currentSize}px`;
      } else if (resizedColumnIndex >= 0 && size === '100%') {
        // Началось перетаскивание — фиксируем на отрисованной ширине ВСЕ тянущиеся колонки разом,
        // включая НЕресайзимые: стабильность раскладки от ресайзимости не зависит. Зафиксировать
        // часть нельзя — у тянущихся колонок `width: 100%` и `flex-shrink: 1`, ширину они делят
        // сообща, и стоит одной выпасть из дележа, как остаток перераспределяется на остальные.
        const measuredWidth = measuredHeaderWidths[header.id];

        if (measuredWidth === undefined) {
          headerIdsToMeasure.push(header.id);
        } else if (measuredWidth) {
          realSizes[header.id] = measuredWidth;
          size = `${measuredWidth}px`;
        }
        // Без layout (jsdom, скрытая таблица) замер даёт 0 — тогда колонка остаётся тянущейся.
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
