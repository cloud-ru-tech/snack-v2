import { ColumnDefinition, getRowActionsColumnDef, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { buildUserColumns, SAMPLE_USERS, User } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/RowActions',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

function TableWithRowActions() {
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS);

  const columns = useMemo<ColumnDefinition<User>[]>(
    () => [
      ...buildUserColumns({ withStatusColumn: true }),
      getRowActionsColumnDef<User>({
        pinned: true,
        actionsGenerator: cell =>
          cell.row.original.status === 'invited'
            ? []
            : [
                {
                  content: { label: 'Удалить' },
                  onClick: () => setUsers(prev => prev.filter(user => user.id !== cell.row.original.id)),
                },
              ],
      }),
    ],
    [],
  );

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={users}
      columnDefinitions={columns}
      getRowId={user => user.id}
      outline
    />
  );
}

export const RowActions: Story = {
  tags: ['dev', 'test'],
  render: () => <TableWithRowActions />,
};
