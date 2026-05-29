import { SELECTION_MODE, Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'docs',
    title: 'Documents',
    nested: [
      { id: 'specs', title: 'Specs.pdf' },
      { id: 'budget', title: 'Budget.xlsx' },
      { id: 'roadmap', title: 'Roadmap.md' },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    nested: [
      { id: 'logo', title: 'Logo.svg' },
      { id: 'hero', title: 'Hero.png' },
    ],
  },
];

export function SingleSelect() {
  const [selected, setSelected] = useState<string | undefined>('specs');
  const [expanded, setExpanded] = useState<string[]>(['docs', 'media']);

  return (
    <Tree
      data={DATA}
      selectionMode={SELECTION_MODE.Single}
      selected={selected}
      onSelect={setSelected}
      expandedNodes={expanded}
      onExpand={setExpanded}
      showToggle
      showLines
    />
  );
}
