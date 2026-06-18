import { ActionsGenerator, getRowActionsColumnDef } from '../helperComponents/Cells/RowActionsCell/RowActionsCell';
import { ColumnDefinition } from '../types';

export type RowActionsConfig<T extends object> = {
  /** Генератор пунктов меню действий строки */
  actionsGenerator: ActionsGenerator<T>;
  /** Закрепить колонку справа */
  pinned?: boolean;
};

/** Упрощённая обёртка над `getRowActionsColumnDef` */
export function actionsColumn<T extends object>({
  actionsGenerator,
  pinned = true,
}: RowActionsConfig<T>): ColumnDefinition<T> {
  return getRowActionsColumnDef<T>({ actionsGenerator, pinned });
}
