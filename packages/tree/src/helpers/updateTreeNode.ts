import { TreeNodeProps } from '../types';
import { traverseWithTarget } from './traverseWithTarget';

type UpdateTreeNodeData<Node extends TreeNodeProps> = Partial<TreeNodeProps> & {
  nested?: Node[];
};

/**
 * Возвращает копию дерева, где у узла с указанным id обновляются переданные поля.
 *
 * @param tree Исходное дерево.
 * @param nodeId Идентификатор узла, который нужно обновить.
 * @param data Частичные данные узла, которые будут применены к найденному элементу.
 */
export const updateTreeNode = <Node extends TreeNodeProps>(
  tree: Node[],
  nodeId: string,
  data: UpdateTreeNodeData<Node>,
): Node[] => {
  const result: Node[] = [];

  traverseWithTarget(tree, result, (source, _depth, targetList) => {
    const isTarget = source.id === nodeId;
    const hasNested = Array.isArray(source.nested);

    let newNested: Node[] | undefined;

    if (isTarget) {
      newNested = data.nested;
    } else if (hasNested) {
      newNested = [];
    }

    const newNode = {
      ...source,
      ...(isTarget ? data : {}),
      ...(newNested !== undefined ? { nested: newNested } : {}),
    } as Node;

    targetList.push(newNode);

    return !isTarget && hasNested && source.nested?.length ? newNested : undefined;
  });

  return result;
};
