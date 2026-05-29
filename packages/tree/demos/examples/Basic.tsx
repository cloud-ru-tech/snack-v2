import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'fruits',
    title: 'Fruits',
    nested: [
      { id: 'apple', title: 'Apple' },
      { id: 'banana', title: 'Banana' },
      {
        id: 'citrus',
        title: 'Citrus',
        nested: [
          { id: 'orange', title: 'Orange' },
          { id: 'lemon', title: 'Lemon' },
        ],
      },
    ],
  },
  {
    id: 'vegetables',
    title: 'Vegetables',
    nested: [
      { id: 'carrot', title: 'Carrot' },
      { id: 'potato', title: 'Potato' },
    ],
  },
];

export function Basic() {
  const [expanded, setExpanded] = useState<string[]>(['fruits']);

  return <Tree data={DATA} expandedNodes={expanded} onExpand={setExpanded} showLines />;
}
