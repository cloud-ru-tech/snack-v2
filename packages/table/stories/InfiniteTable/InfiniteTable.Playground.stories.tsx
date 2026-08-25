import { defineColumns, InfiniteTable, InfiniteTableInput, LoadMoreTrigger, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useCallback, useState } from 'react';

import { withTableStorySurface } from '../decorators';
import { makeUsers, User } from '../fixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const ALL_USERS = makeUsers(60);
const PAGE_LENGTH = 15;
const LOAD_DELAY_MS = 400;

const infiniteColumns = defineColumns<User>([
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', sortable: true, width: 140 },
  { key: 'amount', header: 'Сумма', sortable: true, align: 'right', width: 140, format: 'currency' },
]);

type StoryArgs = Omit<InfiniteTableInput<User>, 'data' | 'columns' | 'getRowId' | 'onLoadMore' | 'hasMore' | 'loading'>;

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/InfiniteTable',
  component: InfiniteTable as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    headlineKey: 'name',
    defaultView: VIEW.Table,
    outline: true,
    loadMoreTrigger: 'scroll',
    'data-test-id': TEST_IDS.table.root,
  },
  argTypes: {
    loadMoreTrigger: {
      control: 'radio',
      options: ['scroll', 'button'] satisfies LoadMoreTrigger[],
      description: 'Механизм дозагрузки: scroll-observer или кнопка «Загрузить ещё».',
    },
    headlineKey: { if: { arg: 'defaultView', eq: VIEW.Cards } },
    view: { table: { disable: true } },
    onViewChange: { table: { disable: true } },

    renderCard: { table: { disable: true } },
    sorting: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    rowSelection: { table: { disable: true } },
    columnsSettings: { table: { disable: true } },
    bulkActions: { table: { disable: true } },
    savedState: { table: { disable: true } },
    moreActions: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    search: { table: { disable: true } },
    expanding: { table: { disable: true } },
    rowPinning: { table: { disable: true } },
    getRowBackgroundColor: { control: false, table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

function InfiniteTablePlayground(args: StoryArgs) {
  const [items, setItems] = useState(() => ALL_USERS.slice(0, PAGE_LENGTH));
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < ALL_USERS.length;

  const onLoadMore = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setItems(ALL_USERS.slice(0, Math.min(items.length + PAGE_LENGTH, ALL_USERS.length)));
      setLoading(false);
    }, LOAD_DELAY_MS);
  }, [items.length]);

  return (
    <div className={styles.scrollArea}>
      <InfiniteTable
        {...args}
        data={items}
        columns={infiniteColumns}
        getRowId={user => user.id}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <InfiniteTablePlayground {...args} />,
};
