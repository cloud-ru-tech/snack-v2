import { HierarchicalSelectionHandlers } from '@ds/utils';

import { ParentNode, TreeNodeId, TreeNodeProps } from '../types';
import { collectHierarchicalAncestors } from './collectHierarchicalAncestors';
import { findAllChildNodeIds } from './findAllChildNodeIds';

/**
 * Пересчитывает выбранные узлы для режима мультивыбора в дереве.
 * Учитывает потомков текущего узла и корректирует состояние предков.
 *
 * @param params Параметры пересчета выделения.
 * @returns Обновленный список выбранных id.
 */
export function lookupTreeForSelectedNodes({
  node,
  selectedNodes,
  parentNode,
  toggleSelection,
}: {
  node: Pick<TreeNodeProps, 'id' | 'nested' | 'disabled'>;
  selectedNodes: TreeNodeId[];
  parentNode?: ParentNode;
  toggleSelection: HierarchicalSelectionHandlers['toggleSelection'];
}) {
  const descendantIds = node.nested?.length ? findAllChildNodeIds(node.nested) : [];

  return toggleSelection({
    nodeId: node.id,
    descendantIds,
    selectedIds: selectedNodes,
    ancestors: collectHierarchicalAncestors(parentNode),
  });
}
