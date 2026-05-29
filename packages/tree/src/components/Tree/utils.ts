import { SELECTION_MODE } from '../../constants';
import { TreeBaseProps, TreeMultiSelect, TreeSingleSelect, TreeView } from '../../types';

type SelectableProps<T> = Pick<T, Extract<keyof T, 'selectionMode' | 'selected' | 'onSelect'>>;

// Сужение discriminated union к конкретному варианту: TS не выводит ветку из switch-case по
// дженерик-проп `selectionMode`, поэтому возвращаем строго типизированный Pick через `as`.
export function extractSelectableProps({ selectionMode, selected, onSelect }: SelectableProps<TreeBaseProps>) {
  if (selectionMode === SELECTION_MODE.Single) {
    return { selectionMode, selected, onSelect } as SelectableProps<TreeSingleSelect>;
  }
  if (selectionMode === SELECTION_MODE.Multi) {
    return { selectionMode, selected, onSelect } as SelectableProps<TreeMultiSelect>;
  }
  return {} as SelectableProps<TreeView>;
}
