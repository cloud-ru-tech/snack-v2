import { defineColumns, InfiniteTable } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { expect, within } from 'storybook/test';

import { makeUsers, User } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof InfiniteTable> = {
  title: 'Components/Table/InfiniteTable/Examples/LoadMoreButton',
  component: InfiniteTable,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof InfiniteTable>;

const ALL_USERS = makeUsers(45);
const PAGE_LENGTH = 15;
const LOAD_DELAY_MS = 400;

const columns = defineColumns<User>([
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', width: 140 },
  { key: 'amount', header: 'Сумма', align: 'right', width: 140, format: 'currency' },
]);

function LoadMoreButtonTable() {
  const [items, setItems] = useState<User[]>(() => ALL_USERS.slice(0, PAGE_LENGTH));
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < ALL_USERS.length;

  const onLoadMore = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setItems(prev => ALL_USERS.slice(0, Math.min(prev.length + PAGE_LENGTH, ALL_USERS.length)));
      setLoading(false);
    }, LOAD_DELAY_MS);
  }, []);

  return (
    <div className={styles.scrollArea}>
      <InfiniteTable
        data-test-id={TEST_IDS.table.root}
        data={items}
        columns={columns}
        getRowId={(user: User) => user.id}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        loadMoreTrigger='button'
        outline
      />
    </div>
  );
}

export const LoadMoreButton: Story = {
  tags: ['dev', 'test'],
  render: () => <LoadMoreButtonTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);
    await expect(root).toBeVisible();

    // кнопка «Загрузить ещё» видна, т.к. hasMore=true
    const btn = canvas.getByTestId(TEST_IDS.component.loadMoreButton);
    await expect(btn).toBeVisible();
  },
};
