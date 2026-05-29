import { TreeNodeProps } from '../types';
import { traverse } from './traverse';

/**
 * Возвращает раскрытые узлы, у которых `nested` уже существует, но пока пустой.
 * Используется для определения узлов, требующих дополнительной подгрузки детей.
 *
 * @param nodes Узлы дерева для проверки.
 * @param expandedIds Множество id раскрытых узлов.
 */
export function collectEmptyNestedNodesInExpanded<Node extends TreeNodeProps>(
  nodes: Node[],
  expandedIds: Set<string>,
): Node[] {
  const result: Node[] = [];
  traverse(nodes, node => {
    const hasEmptyNested = Array.isArray(node.nested) && node.nested.length === 0;
    if (hasEmptyNested && expandedIds.has(node.id)) {
      result.push(node);
    }
  });
  return result;
}
