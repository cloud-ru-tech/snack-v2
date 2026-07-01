import { HierarchicalAncestor } from '@ds/utils';

import { ParentNode } from '../types';
import { findAllChildNodeIds } from './findAllChildNodeIds';

export function collectHierarchicalAncestors(parentNode?: ParentNode): HierarchicalAncestor[] {
  const ancestors: HierarchicalAncestor[] = [];
  let parent: ParentNode | undefined = parentNode;

  while (parent) {
    if (parent.nested?.length) {
      ancestors.push({
        id: parent.id,
        childIds: findAllChildNodeIds(parent.nested),
      });
    }

    parent = parent.parentNode;
  }

  return ancestors;
}
