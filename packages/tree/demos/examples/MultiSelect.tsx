import { SELECTION_MODE, Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'compute',
    title: 'Compute',
    nested: [
      { id: 'vm', title: 'Virtual machines' },
      { id: 'k8s', title: 'Kubernetes' },
      { id: 'serverless', title: 'Serverless' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    nested: [
      { id: 's3', title: 'Object storage' },
      { id: 'block', title: 'Block storage' },
    ],
  },
];

export function MultiSelect() {
  const [selected, setSelected] = useState<string[]>(['vm', 's3']);
  const [expanded, setExpanded] = useState<string[]>(['compute', 'storage']);

  return (
    <Tree
      data={DATA}
      selectionMode={SELECTION_MODE.Multiple}
      selected={selected}
      onSelect={setSelected}
      expandedNodes={expanded}
      onExpand={setExpanded}
      showLines
    />
  );
}
