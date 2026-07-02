import { TreeNodeProps } from '@ds/tree';

/**
 * Рекурсивно собирает все ID узлов дерева для их разворачивания
 * @param nodes - Массив узлов дерева
 * @returns Массив ID всех узлов (включая вложенные)
 */
export const getExpandedNodes = (nodes: TreeNodeProps[]): string[] => {
  if (!nodes || nodes.length === 0) {
    return [];
  }

  const ids: string[] = [];

  nodes.forEach(el => {
    const children = 'nested' in el && el.nested ? getExpandedNodes(el.nested) : [];

    ids.push(el.id, ...children);
  });

  return ids;
};
