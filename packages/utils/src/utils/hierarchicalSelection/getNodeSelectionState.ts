import { checkGroupSelection } from './checkGroupSelection';
import { GetNodeSelectionStateParams } from './types';

/**
 * Единая формула checked/indeterminate для иерархического мультивыбора.
 */
export function getNodeSelectionState<TId extends string | number>({
  nodeId,
  childIds,
  selectedIds,
  includeParentsInValue,
}: GetNodeSelectionStateParams<TId>) {
  const { allSelected, someSelected } = checkGroupSelection(childIds, selectedIds);

  if (!includeParentsInValue) {
    return {
      checked: allSelected,
      indeterminate: someSelected,
    };
  }

  const inValue = selectedIds.includes(nodeId);
  const checked = inValue || allSelected;

  return {
    checked,
    indeterminate: !checked && someSelected,
  };
}
