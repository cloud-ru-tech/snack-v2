import { TreeNodeProps } from '../types';

type NodeWithDepthAndTarget<T extends TreeNodeProps> = {
  node: T;
  depth: number;
  targetList: T[];
};

/**
 * Обходит дерево в ширину (BFS), передавая каждому узлу список,
 * в который должен быть добавлен его трансформированный результат.
 *
 * Очередь — массив с курсором `head`: `shift()` на массиве переиндексирует весь хвост,
 * а сдвиг курсора — O(1).
 *
 * @param nodes Корневые узлы дерева.
 * @param rootTargetList Корневой список-приемник для преобразованных узлов.
 * @param callback Функция обработки узла. Возвращает список для детей
 * или undefined, если вложенные узлы обходить не нужно.
 */
export const traverseWithTarget = <T extends TreeNodeProps>(
  nodes: T[],
  rootTargetList: T[],
  callback: (node: T, depth: number, targetList: T[]) => T[] | undefined,
) => {
  const queue: NodeWithDepthAndTarget<T>[] = nodes.map(node => ({ node, depth: 0, targetList: rootTargetList }));
  let head = 0;

  while (head < queue.length) {
    const { node, depth, targetList } = queue[head];
    head += 1;

    const childTargetList = callback(node, depth, targetList);

    if (childTargetList !== undefined && node.nested?.length) {
      for (const child of node.nested) {
        queue.push({ node: child as T, depth: depth + 1, targetList: childTargetList });
      }
    }
  }
};
