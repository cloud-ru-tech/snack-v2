import { ServerAdminTable as ServerAdminTableComponent, ServerAdminTableInput } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useCallback, useEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';

import { PRESET_ADMIN_USERS, presetAdminColumns, presetAdminStatusColumn } from '../../presetFixtures';
import { TEST_IDS } from '../../testIds';

type StoryArgs = ServerAdminTableInput<(typeof PRESET_ADMIN_USERS)[number]>;

function ServerAdminTableExample(args: StoryArgs) {
  const [items, setItems] = useState<(typeof PRESET_ADMIN_USERS)[number][]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(args.pageSize ?? 5);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const requestId = useRef(0);

  const load = useCallback((nextOffset: number, nextLimit: number, query: string) => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    window.setTimeout(() => {
      if (currentRequest !== requestId.current) {
        return;
      }
      const filtered = query
        ? PRESET_ADMIN_USERS.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : PRESET_ADMIN_USERS;
      setItems(filtered.slice(nextOffset, nextOffset + nextLimit));
      setTotal(filtered.length);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    load(offset, limit, search);
  }, [load, offset, limit, search]);

  return (
    <ServerAdminTableComponent
      {...args}
      items={items}
      total={total}
      offset={offset}
      limit={limit}
      loading={loading}
      search={{ state: search, onChange: setSearch, placeholder: 'Поиск по имени' }}
      onChangePage={(nextOffset, nextLimit) => {
        setOffset(nextOffset);
        setLimit(nextLimit);
      }}
    />
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/ServerTable/Examples/ServerAdminTable',
  component: ServerAdminTableComponent as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  args: {
    columns: presetAdminColumns,
    statusColumn: presetAdminStatusColumn,
    pageSize: 5,
    getRowId: user => user.id,
    'data-test-id': TEST_IDS.serverTable.root,
  },
  argTypes: {
    columns: { table: { disable: true } },
    statusColumn: { table: { disable: true } },
    items: { table: { disable: true } },
    total: { table: { disable: true } },
    offset: { table: { disable: true } },
    limit: { table: { disable: true } },
    search: { table: { disable: true } },
    onChangePage: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    rowActions: { table: { disable: true } },
    filters: { table: { disable: true } },
    selection: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const ServerAdminTable: Story = {
  tags: ['dev', 'test'],
  render: args => <ServerAdminTableExample {...args} outline />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
  },
};
