/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- jsdom regression test. */
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { useSearchableTree } from '../src/hooks/useSearchableTree';
import { TreeNodeProps } from '../src/types';

const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

describe('useSearchableTree', () => {
  it('should render expanded nodes and asynchronously loaded children without an external update', async () => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;
    const container = document.createElement('div');
    const root = createRoot(container);
    const parent: TreeNodeProps = { id: 'product', title: 'Product', nested: [] };
    const child: TreeNodeProps = { id: 'action', title: 'Action' };
    const params = {
      initTree: [parent],
      onPreloadNode: vi.fn(async () => [child]),
      onPreloadNodes: vi.fn(async () => ({})),
      onSearch: vi.fn(async () => ({ tree: [parent], needPreloadNodes: [] })),
      mapNodeToRecordItem: (node: TreeNodeProps) => node.id,
    };
    let controls: ReturnType<typeof useSearchableTree<string, TreeNodeProps>>;

    function Probe() {
      controls = useSearchableTree(params);
      return <>{JSON.stringify({ tree: controls.tree.current, expanded: controls.expandedNodes.current })}</>;
    }

    try {
      await act(async () => root.render(<Probe />));
      await act(async () => controls.onExpand(['product']));
      expect(JSON.parse(container.textContent ?? '{}').expanded).toEqual(['product']);

      await act(async () => {
        await controls.onDataLoad(parent);
      });
      expect(JSON.parse(container.textContent ?? '{}').tree[0].nested).toEqual([child]);

      await act(async () => controls.onExpand([]));
      expect(JSON.parse(container.textContent ?? '{}').expanded).toEqual([]);
    } finally {
      await act(async () => root.unmount());
    }
  });
});
