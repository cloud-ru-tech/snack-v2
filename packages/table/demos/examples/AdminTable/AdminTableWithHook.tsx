import { SimpleColumnDef, STATUS_APPEARANCE, Table, useAdminTableProps } from '@ds/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  amount: number;
};

const USERS: User[] = [
  {
    id: 'u-1',
    name: 'Анна Иванова',
    email: 'anna.ivanova@example.com',
    role: 'Owner',
    status: 'active',
    amount: 12990,
  },
  {
    id: 'u-2',
    name: 'Борис Петров',
    email: 'boris.petrov@example.com',
    role: 'Admin',
    status: 'pending',
    amount: 8450,
  },
  {
    id: 'u-3',
    name: 'Вера Сидорова',
    email: 'vera.sidorova@example.com',
    role: 'Editor',
    status: 'blocked',
    amount: 4300,
  },
];

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', sortable: true, width: 140 },
];

export function AdminTableWithHook() {
  const tableProps = useAdminTableProps({
    data: USERS,
    columns,
    statusColumn: {
      key: 'status',
      mapStatusToAppearance: value => (value === 'active' ? STATUS_APPEARANCE.Green : STATUS_APPEARANCE.Yellow),
      renderDescription: status => (status === 'active' ? 'Активен' : 'Ожидание'),
    },
    pageSize: 5,
    getRowId: user => user.id,
    search: true,
  });

  return <Table {...tableProps} outline />;
}
