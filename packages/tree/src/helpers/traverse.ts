import { TreeNodeProps } from '../types';

type NodeWithDepth<T extends TreeNodeProps> = { node: T; depth: number };

/**
 * Обходит дерево в ширину (BFS) и вызывает callback для каждого узла.
 *
 * Очередь — массив с курсором `head`: `shift()` на массиве переиндексирует весь хвост,
 * а сдвиг курсора — O(1).
 *
 * @param nodes Корневые узлы дерева.
 * @param callback Функция, вызываемая для каждого найденного узла.
 */
export const traverse = <T extends TreeNodeProps>(nodes: T[], callback: (node: T, depth: number) => void) => {
  const queue: NodeWithDepth<T>[] = nodes.map(node => ({ node, depth: 0 }));
  let head = 0;

  while (head < queue.length) {
    const { node, depth } = queue[head];
    head += 1;

    callback(node, depth);

    for (const child of node.nested ?? []) {
      queue.push({ node: child as T, depth: depth + 1 });
    }
  }
};
