import { checkGroupSelection } from '@ds/utils';

import { TreeNodeId, TreeNodeProps } from '../types';
import { findAllChildNodeIds } from './findAllChildNodeIds';

/**
 * Проверяет состояние выбора дочерних узлов:
 * выбраны ли все, выбраны ли некоторые.
 *
 * @param nodes Дочерние узлы для проверки.
 * @param selectedKeys Текущий список выбранных id.
 */
export function checkNestedNodesSelection(nodes: TreeNodeProps[], selectedKeys: TreeNodeId[]) {
  return checkGroupSelection(findAllChildNodeIds(nodes), selectedKeys);
}
