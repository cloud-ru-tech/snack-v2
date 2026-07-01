import { HierarchicalAncestor } from '@ds/utils';
import { Row } from '@tanstack/react-table';

function collectSelectableDescendantRowIds<TData>(row: Row<TData>): string[] {
  const ids: string[] = [];
  const stack = [...row.subRows];

  while (stack.length) {
    const current = stack.pop();

    if (!current) {
      continue;
    }

    if (current.getCanSelect()) {
      ids.push(current.id);
    }

    if (current.subRows.length) {
      stack.push(...current.subRows);
    }
  }

  return ids;
}

function collectRowAncestors<TData>(row: Row<TData>): HierarchicalAncestor[] {
  const ancestors: HierarchicalAncestor[] = [];
  let parent = row.getParentRow();

  while (parent) {
    if (parent.subRows.length) {
      ancestors.push({
        id: parent.id,
        childIds: collectSelectableDescendantRowIds(parent),
      });
    }

    parent = parent.getParentRow();
  }

  return ancestors;
}

export function getRowHierarchicalSelectionContext<TData>(row: Row<TData>) {
  return {
    nodeId: row.id,
    descendantIds: collectSelectableDescendantRowIds(row),
    ancestors: collectRowAncestors(row),
  };
}
