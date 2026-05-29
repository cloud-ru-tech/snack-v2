import { TreeNodeProps } from '@ds/tree';

import { TEST_IDS } from './testIds';

export const SAMPLE_TREE: TreeNodeProps[] = [
  {
    id: 'fruits',
    title: 'Fruits',
    'data-test-id': TEST_IDS.tree.nodes.fruits,
    nested: [
      { id: 'apple', title: 'Apple', 'data-test-id': TEST_IDS.tree.nodes.apple },
      { id: 'banana', title: 'Banana', 'data-test-id': TEST_IDS.tree.nodes.banana },
      {
        id: 'citrus',
        title: 'Citrus',
        'data-test-id': TEST_IDS.tree.nodes.citrus,
        nested: [
          { id: 'orange', title: 'Orange', 'data-test-id': TEST_IDS.tree.nodes.orange },
          { id: 'lemon', title: 'Lemon', 'data-test-id': TEST_IDS.tree.nodes.lemon },
        ],
      },
    ],
  },
  {
    id: 'vegetables',
    title: 'Vegetables',
    'data-test-id': TEST_IDS.tree.nodes.vegetables,
    nested: [
      { id: 'carrot', title: 'Carrot', 'data-test-id': TEST_IDS.tree.nodes.carrot },
      { id: 'potato', title: 'Potato', 'data-test-id': TEST_IDS.tree.nodes.potato },
    ],
  },
  {
    id: 'meat',
    title: 'Meat',
    disabled: true,
    'data-test-id': TEST_IDS.tree.nodes.meat,
    nested: [{ id: 'beef', title: 'Beef', 'data-test-id': TEST_IDS.tree.nodes.beef }],
  },
];
