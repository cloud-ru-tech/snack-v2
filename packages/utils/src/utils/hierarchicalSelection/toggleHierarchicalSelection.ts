import { checkGroupSelection } from './checkGroupSelection';
import { ToggleHierarchicalSelectionParams } from './types';

function resolveIsSelected<TId extends string | number>({
  nodeId,
  descendantIds,
  selectableDescendantIds,
  childIds,
  selectedIds,
  includeParentsInValue,
}: ToggleHierarchicalSelectionParams<TId>): boolean {
  const hasDescendants = descendantIds.length > 0;

  if (!includeParentsInValue && hasDescendants) {
    const idsForChecked = childIds ?? descendantIds;
    const selectable = selectableDescendantIds ?? descendantIds;
    const allChildrenSelected = idsForChecked.length > 0 && idsForChecked.every(id => selectedIds.includes(id));
    const allEnabledSelected = selectable.length > 0 && selectable.every(id => selectedIds.includes(id));

    return allChildrenSelected || allEnabledSelected;
  }

  if (hasDescendants) {
    const { allSelected, someSelected } = checkGroupSelection(descendantIds, selectedIds);

    return allSelected || someSelected;
  }

  return selectedIds.includes(nodeId);
}

function toggleWithParentsInValue<TId extends string | number>({
  nodeId,
  descendantIds,
  selectedIds,
  ancestors,
  isSelected,
}: ToggleHierarchicalSelectionParams<TId> & { isSelected: boolean }): TId[] {
  const idsFromNode = [nodeId, ...descendantIds];

  let updatedSelectedIds = isSelected
    ? selectedIds.filter(id => !idsFromNode.includes(id))
    : [...selectedIds, ...idsFromNode.filter(id => !selectedIds.includes(id))];

  if (!ancestors?.length) {
    return updatedSelectedIds;
  }

  for (const ancestor of ancestors) {
    if (!ancestor.childIds.length) {
      continue;
    }

    const parentSelection = checkGroupSelection(ancestor.childIds, updatedSelectedIds);

    if (isSelected) {
      if (!parentSelection.allSelected) {
        updatedSelectedIds = updatedSelectedIds.filter(id => id !== ancestor.id);
      }
    } else if (parentSelection.allSelected && !updatedSelectedIds.includes(ancestor.id)) {
      updatedSelectedIds = [...updatedSelectedIds, ancestor.id];
    }
  }

  return updatedSelectedIds;
}

function toggleWithoutParentsInValue<TId extends string | number>({
  nodeId,
  descendantIds,
  selectableDescendantIds,
  selectedIds,
  isSelected,
}: ToggleHierarchicalSelectionParams<TId> & { isSelected: boolean }): TId[] {
  if (!descendantIds.length) {
    if (isSelected) {
      return selectedIds.filter(id => id !== nodeId);
    }

    if (selectedIds.includes(nodeId)) {
      return selectedIds;
    }

    return [...selectedIds, nodeId];
  }

  const selectable = selectableDescendantIds ?? descendantIds;

  if (isSelected) {
    return selectedIds.filter(id => id !== nodeId && !selectable.includes(id));
  }

  return [...new Set([...selectedIds, ...selectable])];
}

/**
 * Пересчитывает выбранные id после toggle узла с каскадом вниз и опциональным walk вверх.
 */
export function toggleHierarchicalSelection<TId extends string | number>(
  params: ToggleHierarchicalSelectionParams<TId>,
): TId[] {
  const isSelected = resolveIsSelected(params);

  if (params.includeParentsInValue) {
    return toggleWithParentsInValue({ ...params, isSelected });
  }

  return toggleWithoutParentsInValue({ ...params, isSelected });
}
