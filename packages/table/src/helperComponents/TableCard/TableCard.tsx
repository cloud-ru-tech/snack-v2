// VIEW из @ds/card (simple|outline|shadow) — не путать с VIEW таблицы (table|cards).
import { Card, RADIUS, VIEW as CARD_VIEW } from '@ds/card';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { KeyboardEvent, MouseEvent, useCallback, useState } from 'react';

import { RowAppearance } from '../../components/types';
import { DefaultColumns, TEST_IDS } from '../../constants';
import { RowContext } from '../../contexts';
import { TREE_CELL_ID } from '../Cells/TreeCell/constants';
import { RowClickHandler } from '../Rows';
import styles from './styles.module.scss';

/**
 * Режим выбора карточки:
 * `single` — выбор одной карточки (повторный клик не снимает выбор),
 * `multiple` — тоггл выбора,
 * `none` — выбор отключён.
 */
type CardSelection = 'multiple' | 'single' | 'none';

export type TableCardProps<TData extends object> = {
  /** Id колонки, чей рендер используется как заголовок карточки */
  headlineId?: string;
  /** Строка tanstack-таблицы, отрисовываемая как карточка */
  row: Row<TData>;
  /** Инстанс tanstack-таблицы */
  table: Table<TData>;
  /** Режим выбора */
  selection: CardSelection;
  /** Внешний вид недоступной для выбора строки */
  selectionAppearance?: RowAppearance;
  /** Скрыть подписи-заголовки полей карточки */
  suppressHeader?: boolean;
  /** Обработчик клика по карточке (аналог клика по строке в режиме `view='table'`) */
  onRowClick?: RowClickHandler<TData>;
};

export function TableCard<TData extends object>({
  headlineId,
  table,
  row,
  selection,
  selectionAppearance = RowAppearance.Disabled,
  suppressHeader = false,
  onRowClick,
}: TableCardProps<TData>) {
  const headerGroups = table.getHeaderGroups();
  const headerCell = row._getAllCellsByColumnId()[headlineId ?? ''];
  const headerColumn = table.getFlatHeaders().find(header => header.id === headlineId);
  const actionsCell = row._getAllCellsByColumnId()[DefaultColumns.RowActions];
  const actionsColumn = table.getFlatHeaders().find(header => header.id === DefaultColumns.RowActions);

  const [dropListOpened, setDropListOpen] = useState(false);

  const isSelected = row.getIsSelected();
  const canSelect = row.getCanSelect();
  const isDisabled = !canSelect;

  const isSelectable = selection !== 'none';
  const isMultiSelect = selection === 'multiple';

  const handleSelection = useCallback(() => {
    if (isDisabled) return;
    if (selection === 'single') row.toggleSelected(true);
    if (selection === 'multiple') row.toggleSelected(!isSelected);
  }, [isDisabled, isSelected, row, selection]);

  // Зеркало BodyRow.handleRowClick: selection-тоггл + публичный onRowClick одним кликом.
  const handleCardClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      handleSelection();

      if (isDisabled && selectionAppearance === RowAppearance.Disabled) {
        return;
      }

      onRowClick?.(e, {
        id: row.id,
        data: row.original,
        selected: row.getIsSelected(),
        toggleSelected: row.toggleSelected,
      });
    },
    [handleSelection, isDisabled, onRowClick, row, selectionAppearance],
  );

  // Клавиатурный путь выбора: Enter/Space на сфокусированном корне карточки
  // (@ds/card проксирует onKeyDown и ставит tabIndex=0 при interactive).
  // Проверка target === currentTarget отсекает события, всплывшие от вложенных
  // интерактивов (кнопка действий, radio) — иначе Enter на них тогглил бы выбор.
  const handleCardKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.key === ' ') e.preventDefault();
      handleSelection();
    },
    [handleSelection],
  );

  const isClickable = isSelectable || Boolean(onRowClick);

  return (
    <RowContext.Provider value={{ dropListOpened, setDropListOpen, disabledRowAppearance: selectionAppearance }}>
      <Card
        className={styles.card}
        radius={RADIUS.S}
        view={CARD_VIEW.Outline}
        interactive={isClickable && !isDisabled}
        multiSelect={isMultiSelect}
        checked={isSelectable ? isSelected : undefined}
        onClick={isClickable ? handleCardClick : undefined}
        onKeyDown={isSelectable && !isDisabled ? handleCardKeyDown : undefined}
        data-test-id={TEST_IDS.card}
        data-selection-mode={selection}
      >
        <div className={styles.content}>
          {headerCell && headerColumn && (
            <div className={styles.headline}>
              {flexRender(headerColumn.column.columnDef.cell, headerCell.getContext())}
            </div>
          )}

          <div className={styles.body}>
            {headerGroups.map(group =>
              group.headers.map((header, index) => {
                // headline, tree-, row-actions- и selection-колонка не показываются как поля карточки:
                // заголовок выносится отдельно, чевроны дерева в карточке не имеют смысла,
                // действия — в угол, выбор — клик по карточке/бэйдж.
                if (
                  [headlineId, TREE_CELL_ID, DefaultColumns.RowActions, DefaultColumns.Selection].includes(header.id)
                ) {
                  return null;
                }

                const column = header.column.columnDef;

                // Indicator-only вариант статус-колонки (без header) в карточке нечитаем:
                // цветная полоска без подписи. Вариант с header/renderDescription остаётся полем.
                if (header.id === DefaultColumns.Status && column.header == null) {
                  return null;
                }

                const cell = row._getAllCellsByColumnId()[header.column.id];

                return (
                  <div className={styles.cardRow} key={header.id || index}>
                    {!suppressHeader && (
                      <div className={styles.cardRowHeader}>{flexRender(column.header, header.getContext())}</div>
                    )}
                    <div className={styles.cardRowContent}>{flexRender(column.cell, cell.getContext())}</div>
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {actionsCell && actionsColumn && (
          <div className={styles.button}>
            {flexRender(actionsColumn.column.columnDef.cell, actionsCell.getContext())}
          </div>
        )}
      </Card>
    </RowContext.Provider>
  );
}
