import { AdminTable, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PRESET_ADMIN_USERS, presetAdminColumns, presetAdminStatusColumn } from '../presetFixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof AdminTable> = {
  title: 'Components/Table/AdminTable',
  component: AdminTable,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AdminTable>;

const baseProps = {
  data: PRESET_ADMIN_USERS,
  columns: presetAdminColumns,
  statusColumn: presetAdminStatusColumn,
  pageSize: 5,
  getRowId: (user: (typeof PRESET_ADMIN_USERS)[number]) => user.id,
  search: true,
  'data-test-id': TEST_IDS.table.root,
  outline: true,
} as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        firstColumnHeader='Состояние'
        columnHeaders={['AdminTable']}
        cellAlign='start'
        rows={[
          {
            variantLabel: 'default',
            cells: [<AdminTable key='default' {...baseProps} />],
          },
          {
            variantLabel: 'loading',
            cells: [<AdminTable key='loading' {...baseProps} loading />],
          },
          {
            variantLabel: 'empty',
            cells: [<AdminTable key='empty' {...baseProps} data={[]} />],
          },
          {
            variantLabel: 'selection',
            cells: [
              <AdminTable
                key='selection'
                {...baseProps}
                selection={{ multiRow: true, initialState: { 'u-1': true, 'u-2': true } }}
              />,
            ],
          },
          {
            variantLabel: 'cards',
            cells: [<AdminTable key='cards' {...baseProps} headlineKey='name' defaultView={VIEW.Cards} />],
          },
        ]}
      />
    </div>
  ),
};
