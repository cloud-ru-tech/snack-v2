import { InfiniteTable, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PRESET_USERS, presetUserColumns } from '../presetFixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof InfiniteTable> = {
  title: 'Components/Table/InfiniteTable',
  component: InfiniteTable,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof InfiniteTable>;

const baseProps = {
  data: PRESET_USERS,
  columns: presetUserColumns,
  getRowId: (user: (typeof PRESET_USERS)[number]) => user.id,
  hasMore: false,
  'data-test-id': TEST_IDS.table.root,
  outline: true,
} as const;

// Маленький набор данных — чтобы кнопка была видна в ограниченной scroll-area (height: 420px)
const FEW_USERS = PRESET_USERS.slice(0, 3);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        firstColumnHeader='Состояние'
        columnHeaders={['InfiniteTable']}
        cellAlign='start'
        rows={[
          {
            variantLabel: 'default',
            cells: [
              <div key='default' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} />
              </div>,
            ],
          },
          {
            variantLabel: 'loading',
            cells: [
              <div key='loading' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} loading />
              </div>,
            ],
          },
          {
            variantLabel: 'empty',
            cells: [
              <div key='empty' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} data={[]} />
              </div>,
            ],
          },
          {
            variantLabel: "loadMoreTrigger='button' + hasMore",
            cells: [
              <div key='load-more-button' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} data={FEW_USERS} loadMoreTrigger='button' hasMore />
              </div>,
            ],
          },
          {
            variantLabel: "loadMoreTrigger='button' + hasMore=false",
            cells: [
              <div key='load-more-button-no-more' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} data={FEW_USERS} loadMoreTrigger='button' hasMore={false} />
              </div>,
            ],
          },
          {
            variantLabel: "loadMoreTrigger='button' loading",
            cells: [
              <div key='load-more-button-loading' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} data={FEW_USERS} loadMoreTrigger='button' hasMore loading />
              </div>,
            ],
          },
          {
            variantLabel: "defaultView='cards'",
            cells: [
              <div key='cards' className={styles.scrollArea}>
                <InfiniteTable {...baseProps} defaultView={VIEW.Cards} headlineKey='name' />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
