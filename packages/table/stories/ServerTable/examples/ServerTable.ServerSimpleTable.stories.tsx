import { ServerSimpleTable as ServerSimpleTableComponent, ServerSimpleTableInput } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useCallback, useEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';

import { PRESET_USERS, presetUserColumns } from '../../presetFixtures';
import { TEST_IDS } from '../../testIds';

type StoryArgs = ServerSimpleTableInput<(typeof PRESET_USERS)[number]>;

function ServerSimpleTableExample(args: StoryArgs) {
  const [items, setItems] = useState<(typeof PRESET_USERS)[number][]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(args.pageSize ?? 5);
  const [loading, setLoading] = useState(true);
  const requestId = useRef(0);

  const load = useCallback((nextOffset: number, nextLimit: number) => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    window.setTimeout(() => {
      if (currentRequest !== requestId.current) {
        return;
      }
      setItems(PRESET_USERS.slice(nextOffset, nextOffset + nextLimit));
      setTotal(PRESET_USERS.length);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    load(offset, limit);
  }, [load, offset, limit]);

  return (
    <ServerSimpleTableComponent
      {...args}
      items={items}
      total={total}
      offset={offset}
      limit={limit}
      loading={loading}
      onChangePage={(nextOffset, nextLimit) => {
        setOffset(nextOffset);
        setLimit(nextLimit);
      }}
    />
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/ServerTable/Examples/ServerSimpleTable',
  component: ServerSimpleTableComponent as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  args: {
    columns: presetUserColumns,
    pageSize: 5,
    getRowId: user => user.id,
    'data-test-id': TEST_IDS.serverTable.root,
  },
  argTypes: {
    columns: { table: { disable: true } },
    items: { table: { disable: true } },
    total: { table: { disable: true } },
    offset: { table: { disable: true } },
    limit: { table: { disable: true } },
    onChangePage: { table: { disable: true } },
    getRowId: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const ServerSimpleTable: Story = {
  tags: ['dev', 'test'],
  render: args => <ServerSimpleTableExample {...args} outline />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
  },
};
