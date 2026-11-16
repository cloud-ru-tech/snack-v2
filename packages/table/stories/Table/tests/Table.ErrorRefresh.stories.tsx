import { RowSelectionState, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';

const onRefresh = fn();
const onSelectionChange = fn();
const columns = buildUserColumns();

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Tests/ErrorRefresh',
  component: Table,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Table>;

function ErrorRefreshTable() {
  const [selection, setSelection] = useState<RowSelectionState>({ [SAMPLE_USERS[0].id]: true });

  return (
    <Table
      data={[]}
      columnDefinitions={columns}
      getRowId={user => user.id}
      rowSelection={{
        enable: true,
        state: selection,
        onChange: next => {
          setSelection(next);
          onSelectionChange(next);
        },
      }}
      dataError
      suppressToolbar
      suppressPagination
      onRefresh={onRefresh}
    />
  );
}

export const ErrorRefresh: Story = {
  tags: ['test', 'dev'],
  render: () => <ErrorRefreshTable />,
  play: async ({ canvasElement }) => {
    onRefresh.mockClear();
    onSelectionChange.mockClear();
    await userEvent.click(within(canvasElement).getByRole('button', { name: /обновить|refresh/i }));
    await waitFor(() => {
      expect(onSelectionChange).toHaveBeenLastCalledWith({});
      expect(onRefresh).toHaveBeenCalledTimes(1);
    });
  },
};

export const WithoutRefresh: Story = {
  tags: ['test', 'dev'],
  render: () => <Table data={[]} columnDefinitions={columns} dataError suppressToolbar suppressPagination />,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).queryByRole('button', { name: /обновить|refresh/i })).not.toBeInTheDocument();
  },
};
