import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

/**
 * Единый объект stories-level test-id для пакета tree.
 *
 * `TEST_IDS.tree.root` — корень Tree-компонента (через `data-test-id` пропс).
 * `TEST_IDS.tree.search` / `vmHit` — story-level элементы (search input,
 * статусная нода) в examples-сторях `Searchable` / `LocalSearch`.
 * `TEST_IDS.tree.nodes.*` — `data-test-id` отдельных fixture-узлов,
 * прокидывается в `TreeNodeProps['data-test-id']` в `SAMPLE_TREE` и в
 * сценарных fixture'ах examples-сторей.
 * `TEST_IDS.treeNode` — реэкспорт `TEST_IDS` из `src/constants.ts`
 * (`node`, `item`, `chevron`, `checkbox`, `radio`, `droplistTrigger` и т.д.).
 */
export const TEST_IDS = {
  tree: {
    root: 'tree',
    search: 'tree-search-input',
    vmHit: 'tree-vm-hit',
    nodes: {
      // SAMPLE_TREE fixture (используется в Playground/VisualMatrix/Interaction)
      fruits: 'tree-node-fruits',
      apple: 'tree-node-apple',
      banana: 'tree-node-banana',
      citrus: 'tree-node-citrus',
      orange: 'tree-node-orange',
      lemon: 'tree-node-lemon',
      vegetables: 'tree-node-vegetables',
      carrot: 'tree-node-carrot',
      potato: 'tree-node-potato',
      meat: 'tree-node-meat',
      beef: 'tree-node-beef',
      // examples/ fixtures
      compute: 'tree-node-compute',
      storage: 'tree-node-storage',
      vm: 'tree-node-vm',
      k8s: 'tree-node-k8s',
      s3: 'tree-node-s3',
      block: 'tree-node-block',
      regionEu: 'tree-node-region-eu',
      regionRu: 'tree-node-region-ru',
      regionEuVm1: 'tree-node-region-eu-vm1',
      loaded1: 'tree-node-loaded-1',
    },
  },
  treeNode: COMPONENT_TEST_IDS,
} as const;
