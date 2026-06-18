import { getSelectionCellColumnDef, getTreeColumnDef } from '../../../helperComponents';
import { ColumnDefinition } from '../../../types';
import { RowAppearance, TableProps } from '../../types';

type GetTableColumnsDefinitionsProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  enableSelection: boolean;
  enableSelectPinned: boolean;
  expanding: TableProps<TData>['expanding'];
  rowSelectionAppearance?: RowAppearance;
  /** Режим мастер-чекбокса: выбор всех строк (true) или только текущей страницы (false) */
  isAllRowsMode?: boolean;
};

/**
 * Получение фактического списка columnDefinitions с учётом всевозможных настроек
 * @function getTableColumnsDefinitions
 */
export function getTableColumnsDefinitions<TData extends object>({
  columnDefinitions,
  enableSelection,
  enableSelectPinned,
  expanding,
  rowSelectionAppearance = RowAppearance.Disabled,
  isAllRowsMode = false,
}: GetTableColumnsDefinitionsProps<TData>): ColumnDefinition<TData>[] {
  let cols = columnDefinitions;

  if (enableSelection && !expanding) {
    cols = [getSelectionCellColumnDef(enableSelectPinned, isAllRowsMode), ...cols];
  }

  if (expanding) {
    cols = [
      getTreeColumnDef({
        ...expanding.expandingColumnDefinition,
        enableSelection,
        rowSelectionAppearance,
        isAllRowsMode,
      }),
      ...cols,
    ];
  }

  return cols;
}
