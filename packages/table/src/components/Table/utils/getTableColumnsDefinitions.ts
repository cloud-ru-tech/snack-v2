import { getSelectionCellColumnDef, getTreeColumnDef } from '../../../helperComponents';
import { MasterSelectionOptions } from '../../../helpers';
import { ColumnDefinition } from '../../../types';
import { RowAppearance, TableProps } from '../../types';

type GetTableColumnsDefinitionsProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  enableSelection: boolean;
  enableSelectPinned: boolean;
  expanding: TableProps<TData>['expanding'];
  rowSelectionAppearance?: RowAppearance;
  /** Параметры мастер-чекбокса выбора строк */
  masterSelection?: MasterSelectionOptions;
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
  masterSelection = {},
}: GetTableColumnsDefinitionsProps<TData>): ColumnDefinition<TData>[] {
  let cols = columnDefinitions;

  if (enableSelection && !expanding) {
    cols = [getSelectionCellColumnDef(enableSelectPinned, masterSelection), ...cols];
  }

  if (expanding) {
    cols = [
      getTreeColumnDef({
        ...expanding.expandingColumnDefinition,
        enableSelection,
        rowSelectionAppearance,
        ...masterSelection,
      }),
      ...cols,
    ];
  }

  return cols;
}
