import { TreeTable } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import { getUserSubRows, TREE_USERS } from '../fixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof TreeTable> = {
  title: 'Components/Table/TreeTable',
  component: TreeTable,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof TreeTable>;

const baseProps = {
  data: TREE_USERS,
  getChildren: getUserSubRows,
  primaryColumn: { key: 'name' as const, header: 'Подразделение' },
  secondaryColumns: [
    { key: 'role' as const, header: 'Тип', width: 160 },
    { key: 'email' as const, header: 'Email', width: 260 },
  ],
  getRowId: (user: (typeof TREE_USERS)[number]) => user.id,
  expandingInitialState: { 'org-cloud': true },
  'data-test-id': TEST_IDS.table.root,
  outline: true,
};

const treeSelectionState: RowSelectionState = {
  'team-compute': true,
  't-compute-1': true,
  't-compute-2': true,
};

function TreeTableSelectionExample() {
  const [selection, setSelection] = useState<RowSelectionState>({ ...treeSelectionState });

  return (
    <TreeTable
      {...baseProps}
      suppressSearch
      selection={{ multiRow: true, state: selection, onChange: setSelection }}
      expandingInitialState={{ 'org-cloud': true, 'team-compute': true }}
    />
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        firstColumnHeader='Состояние'
        columnHeaders={['TreeTable']}
        cellAlign='start'
        rows={[
          {
            variantLabel: 'default',
            cells: [<TreeTable key='default' {...baseProps} suppressSearch />],
          },
          {
            variantLabel: 'showLines: false',
            cells: [
              <TreeTable
                key='show-lines-false'
                {...baseProps}
                primaryColumn={{ ...baseProps.primaryColumn, showLines: false }}
                suppressSearch
              />,
            ],
          },
          {
            variantLabel: 'loading',
            cells: [<TreeTable key='loading' {...baseProps} loading suppressSearch />],
          },
          {
            variantLabel: 'empty',
            cells: [<TreeTable key='empty' {...baseProps} data={[]} suppressSearch />],
          },
          {
            variantLabel: 'selection',
            cells: [<TreeTableSelectionExample key='selection' />],
          },
        ]}
      />
    </div>
  ),
};
