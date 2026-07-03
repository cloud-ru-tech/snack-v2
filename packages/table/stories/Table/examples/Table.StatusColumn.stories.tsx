import { ColumnDefinition, CopyCell, getStatusColumnDef, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { mapUserStatusToAppearance, SAMPLE_USERS, User, userStatusLabel } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/StatusColumn',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns: ColumnDefinition<User>[] = [
  getStatusColumnDef<User>({
    accessorKey: 'status',
    mapStatusToAppearance: mapUserStatusToAppearance,
    renderDescription: value => userStatusLabel(value),
    header: 'Статус',
    size: 160,
  }),
  { accessorKey: 'name', header: 'Имя', size: 200 },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 260,
    cell: ctx => <CopyCell value={String(ctx.getValue() ?? '')} />,
  },
  { accessorKey: 'role', header: 'Роль', size: 140 },
];

export const StatusColumn: Story = {
  tags: ['dev', 'test'],
  render: () => <Table data-test-id={TEST_IDS.table.root} data={SAMPLE_USERS} columnDefinitions={columns} outline />,
};
