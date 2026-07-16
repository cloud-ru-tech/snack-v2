import { SELECTION_MODE, SIZE, Tree, TreeNodeProps } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SAMPLE_TREE } from './fixtures';
import styles from './stories.module.scss';

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree',
  component: Tree,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

const EXPANDED = ['fruits', 'vegetables', 'meat', 'citrus'];
const sizes = Object.values(SIZE);

const rowActions = () => [{ id: 'more', content: { label: 'Action' }, onClick: () => undefined }];

const DEEP_TREE: TreeNodeProps[] = [
  {
    id: 'root',
    title: 'Root',
    nested: [
      { id: 'leaf-1', title: 'Leaf 1' },
      { id: 'branch', title: 'Branch', nested: [{ id: 'leaf-2', title: 'Leaf 2' }] },
    ],
  },
];

const LONG_TITLE_TREE: TreeNodeProps[] = [
  {
    id: 'long-parent',
    title: 'Группа с очень длинным заголовком, который не помещается в одну строку',
    nested: [{ id: 'long-child', title: 'TimePickerDropdownWithAVeryLongComponentName' }],
  },
];

const titleMaxLinesVariants = [1, 2, 3];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Selection mode × selected state'
        firstColumnHeader='Mode'
        columnHeaders={['unselected', 'selected']}
        rows={[
          {
            variantLabel: 'single',
            cells: [
              <div key='single-u' className={styles.story}>
                <Tree data={SAMPLE_TREE} expandedNodes={EXPANDED} selectionMode={SELECTION_MODE.Single} />
              </div>,
              <div key='single-s' className={styles.story}>
                <Tree
                  data={SAMPLE_TREE}
                  expandedNodes={EXPANDED}
                  selectionMode={SELECTION_MODE.Single}
                  selected='apple'
                />
              </div>,
            ],
          },
          {
            variantLabel: 'multiple',
            cells: [
              <div key='multi-u' className={styles.story}>
                <Tree
                  data={SAMPLE_TREE}
                  expandedNodes={EXPANDED}
                  selectionMode={SELECTION_MODE.Multiple}
                  selected={[]}
                />
              </div>,
              <div key='multi-s' className={styles.story}>
                <Tree
                  data={SAMPLE_TREE}
                  expandedNodes={EXPANDED}
                  selectionMode={SELECTION_MODE.Multiple}
                  selected={['apple', 'orange']}
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Size'
        firstColumnHeader='Tree'
        columnHeaders={sizes}
        rows={[
          {
            variantLabel: '',
            cells: sizes.map(size => (
              <div key={size} className={styles.story}>
                <Tree data={SAMPLE_TREE} expandedNodes={EXPANDED} size={size} />
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Container flags'
        firstColumnHeader='Tree'
        columnHeaders={['showLines: false', 'showIcons: false']}
        rows={[
          {
            variantLabel: '',
            cells: [
              <div key='nolines' className={styles.story}>
                <Tree data={SAMPLE_TREE} expandedNodes={EXPANDED} showLines={false} />
              </div>,
              <div key='noicons' className={styles.story}>
                <Tree data={SAMPLE_TREE} expandedNodes={EXPANDED} showIcons={false} />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='States'
        firstColumnHeader='Tree'
        columnHeaders={['collapsed (default)', 'expanded', 'disabled parent']}
        rows={[
          {
            variantLabel: '',
            cells: [
              <div key='collapsed' className={styles.story}>
                <Tree data={SAMPLE_TREE} />
              </div>,
              <div key='expanded' className={styles.story}>
                <Tree data={SAMPLE_TREE} expandedNodes={EXPANDED} />
              </div>,
              <div key='disabled' className={styles.story}>
                <Tree data={SAMPLE_TREE} expandedNodes={['meat']} />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Row actions'
        firstColumnHeader='Slot'
        columnHeaders={['Tree']}
        rows={[
          {
            variantLabel: 'parentActions + nodeActions',
            cells: [
              <div key='actions' className={styles.story}>
                <Tree
                  data={DEEP_TREE}
                  expandedNodes={['root', 'branch']}
                  parentActions={rowActions}
                  nodeActions={rowActions}
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Title max lines (длинный заголовок в узкой колонке)'
        firstColumnHeader='titleMaxLines'
        columnHeaders={titleMaxLinesVariants.map(String)}
        rows={[
          {
            variantLabel: '',
            cells: titleMaxLinesVariants.map(lines => (
              <div key={lines} className={styles.storyNarrow}>
                <Tree data={LONG_TITLE_TREE} expandedNodes={['long-parent']} titleMaxLines={lines} />
              </div>
            )),
          },
        ]}
      />
    </div>
  ),
};
