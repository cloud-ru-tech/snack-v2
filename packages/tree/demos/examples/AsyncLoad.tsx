import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const INITIAL: TreeNodeProps[] = [
  { id: 'region-eu', title: 'EU region', nested: [] },
  { id: 'region-ru', title: 'RU region', nested: [] },
];

export function AsyncLoad() {
  const [data, setData] = useState(INITIAL);
  const [expanded, setExpanded] = useState<string[]>([]);

  const onDataLoad = async (node: TreeNodeProps) => {
    await new Promise(r => setTimeout(r, 600));
    setData(prev =>
      prev.map((item): TreeNodeProps => {
        if (item.id !== node.id) return item;
        return {
          id: item.id,
          title: item.title as string,
          nested: [
            { id: `${item.id}-vm1`, title: 'vm-prod-01' },
            { id: `${item.id}-vm2`, title: 'vm-prod-02' },
            { id: `${item.id}-vm3`, title: 'vm-staging-01' },
          ],
        };
      }),
    );
  };

  return <Tree data={data} expandedNodes={expanded} onExpand={setExpanded} onDataLoad={onDataLoad} showLines />;
}
