import { Checkbox, Radio } from '@ds/toggles';
import { Row, RowSelectionState } from '@tanstack/react-table';
import { MouseEvent } from 'react';

import { COLUMN_PIN_POSITION, DefaultColumns, TEST_IDS } from '../../../constants';
import { MasterSelectionOptions, renderMasterSelectionToggle } from '../../../helpers';
import { ColumnDefinition } from '../../../types';
import styles from './styles.module.scss';

// Ширина колонки выбора по Figma (cellToggles width=32). Совпадает с токеном
// table.content.tableLine.pinnedWrapper.elementWrapper.cellToggles.width в styles.module.scss.
const SELECTION_COLUMN_WIDTH = 32;

function getRowsToToggle<TData>(rows: Row<TData>[], clickedRowId: string, previousClickedRowId: string) {
  const rowsToToggle: Row<TData>[] = [];
  const processedRowsMap: Record<string, boolean> = {
    [clickedRowId]: false,
    [previousClickedRowId]: false,
  };
  const engagedRows = [clickedRowId, previousClickedRowId];

  for (const row of rows) {
    if (engagedRows.includes(row.id)) {
      if (previousClickedRowId === '') {
        rowsToToggle.push(row);
        break;
      }

      processedRowsMap[row.id] = true;
    }

    if ((processedRowsMap[clickedRowId] || processedRowsMap[previousClickedRowId]) && !row.getIsGrouped()) {
      rowsToToggle.push(row);
    }

    if (processedRowsMap[clickedRowId] && processedRowsMap[previousClickedRowId]) {
      break;
    }
  }

  return rowsToToggle;
}

export function getSelectionCellColumnDef<TData>(
  enableSelectPinned: boolean,
  masterSelection: MasterSelectionOptions = {},
): ColumnDefinition<TData> {
  let previousClickedRowId = '';

  return {
    id: DefaultColumns.Selection,
    pinned: COLUMN_PIN_POSITION.Left,
    noBodyCellPadding: true,
    noHeaderCellPadding: true,
    size: SELECTION_COLUMN_WIDTH,
    headerClassName: styles.selectionCellHeader,
    enableResizing: false,
    // Мастер-чекбокс («царь») выбора всех строк живёт в строке заголовков таблицы
    // (view='table'); в тулбаре он скрыт через showBulkCheckbox=false.
    header: ({ table }) => {
      const masterToggle = renderMasterSelectionToggle({
        table,
        masterSelection,
        className: styles.selectionCell,
      });

      return masterToggle;
    },
    cell: ({ row, table }) => {
      const disabled = !row.getCanSelect();

      if (disabled || (!enableSelectPinned && row.getIsPinned())) return null;

      const { enableMultiRowSelection } = table.options;
      const isMulti = typeof enableMultiRowSelection === 'boolean' ? enableMultiRowSelection : true;
      const checked = row.getIsSelected();

      const handleCellClick = (e: MouseEvent) => {
        e.stopPropagation();
        globalThis.getSelection()?.removeAllRanges();

        if (e.shiftKey && isMulti) {
          const { rows, rowsById } = table.getRowModel();
          const rowsToToggle = getRowsToToggle(
            rows,
            row.id,
            rows.map(r => r.id).includes(previousClickedRowId) ? previousClickedRowId : '',
          );
          const isSelected = !rowsById[row.id]?.getIsSelected() || false;
          const newSelected = rowsToToggle.reduce<RowSelectionState>((acc, row) => {
            acc[row.id] = isSelected;

            return acc;
          }, {});

          table.setRowSelection(oldState => ({ ...oldState, ...newSelected }));
        } else {
          row.toggleSelected(!checked);
        }

        previousClickedRowId = row.id;
      };

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={handleCellClick} className={styles.selectionCell} data-test-id={TEST_IDS.rowSelect}>
          {isMulti ? <Checkbox size='xs' checked={checked} /> : <Radio size='xs' checked={checked} />}
        </div>
      );
    },
    meta: {
      skipOnExport: true,
    },
  };
}
