import { GroupSelectionState } from './types';

/**
 * Проверяет состояние выбора группы по flat-списку дочерних id.
 */
export function checkGroupSelection<TId extends string | number>(
  childIds: TId[],
  selectedIds: TId[],
): GroupSelectionState {
  if (!childIds.length) {
    return { allSelected: false, someSelected: false };
  }

  const selectedCount = childIds.filter(id => selectedIds.includes(id)).length;
  const someSelected = selectedCount > 0;
  const allSelected = someSelected && selectedCount === childIds.length;

  return {
    allSelected,
    someSelected: !allSelected && someSelected,
  };
}
