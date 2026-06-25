import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'project',
    title: 'Project Alpha',
    nested: [
      { id: 'overview.md', title: 'overview.md' },
      { id: 'changelog.md', title: 'changelog.md' },
    ],
  },
  { id: 'project-beta', title: 'Project Beta', nested: [{ id: 'todo.md', title: 'todo.md' }] },
];

export function WithActions() {
  const [expanded, setExpanded] = useState<string[]>(['project']);
  const [lastItemAction, setLastItemAction] = useState<string>('');

  const nodeActions = (node: TreeNodeProps) => [
    { id: 'rename', content: { option: `Rename ${node.id}` }, onClick: () => setLastItemAction(`rename ${node.id}`) },
    { id: 'delete', content: { option: 'Delete' }, onClick: () => setLastItemAction(`delete ${node.id}`) },
  ];

  return (
    <>
      <Tree data={DATA} expandedNodes={expanded} onExpand={setExpanded} nodeActions={nodeActions} showLines />
      <small>Last clicked item action: {lastItemAction || '—'}</small>
    </>
  );
}
