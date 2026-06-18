import { SimpleTable, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PRESET_USERS, presetUserColumns } from '../presetFixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof SimpleTable> = {
  title: 'Components/Table/SimpleTable',
  component: SimpleTable,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof SimpleTable>;

const baseProps = {
  data: PRESET_USERS,
  columns: presetUserColumns,
  pageSize: 5,
  getRowId: (user: (typeof PRESET_USERS)[number]) => user.id,
  'data-test-id': TEST_IDS.table.root,
  outline: true,
} as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        firstColumnHeader='Состояние'
        columnHeaders={['SimpleTable']}
        cellAlign='start'
        rows={[
          {
            variantLabel: 'default',
            cells: [<SimpleTable key='default' {...baseProps} />],
          },
          {
            variantLabel: 'loading',
            cells: [<SimpleTable key='loading' {...baseProps} loading />],
          },
          {
            variantLabel: 'empty',
            cells: [<SimpleTable key='empty' {...baseProps} data={[]} />],
          },
          {
            variantLabel: 'cards',
            cells: [<SimpleTable key='cards' {...baseProps} headlineKey='name' defaultView={VIEW.Cards} />],
          },
        ]}
      />
    </div>
  ),
};
