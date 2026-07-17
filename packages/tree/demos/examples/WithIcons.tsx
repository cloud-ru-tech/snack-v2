import { FileSVG, FolderOpenSVG, FolderSVG } from '@ds/icons/interface/system';
import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'src',
    title: 'src',
    expandedIcon: <FolderOpenSVG />,
    collapsedIcon: <FolderSVG />,
    nested: [
      { id: 'app.tsx', title: 'App.tsx', icon: <FileSVG /> },
      { id: 'main.tsx', title: 'main.tsx', icon: <FileSVG /> },
      {
        id: 'components',
        title: 'components',
        expandedIcon: <FolderOpenSVG />,
        collapsedIcon: <FolderSVG />,
        nested: [
          { id: 'button.tsx', title: 'Button.tsx', icon: <FileSVG /> },
          { id: 'tree.tsx', title: 'Tree.tsx', icon: <FileSVG /> },
        ],
      },
    ],
  },
];

export function WithIcons() {
  const [expanded, setExpanded] = useState<string[]>(['src', 'components']);

  return <Tree data={DATA} expandedNodes={expanded} onExpand={setExpanded} showLines />;
}
