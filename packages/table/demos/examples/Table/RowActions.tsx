import { ColumnDefinition, getRowActionsColumnDef, Table } from '@ds/table';
import { useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'blocked';
};

const INITIAL_USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', status: 'active' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', status: 'active' },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', status: 'blocked' },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', status: 'active' },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', status: 'blocked' },
];

export function RowActions() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const columns = useMemo<ColumnDefinition<User>[]>(
    () => [
      { accessorKey: 'name', header: 'Имя', size: 200 },
      { accessorKey: 'email', header: 'Email', size: 260 },
      {
        accessorKey: 'status',
        header: 'Статус',
        size: 160,
        cell: ctx => (ctx.getValue() === 'blocked' ? 'Заблокирован' : 'Активен'),
      },
      getRowActionsColumnDef<User>({
        pinned: true,
        actionsGenerator: cell => {
          const user = cell.row.original;

          return [
            {
              content: { option: user.status === 'blocked' ? 'Активировать' : 'Заблокировать' },
              onClick: () =>
                setUsers(prev =>
                  prev.map(item =>
                    item.id === user.id ? { ...item, status: item.status === 'blocked' ? 'active' : 'blocked' } : item,
                  ),
                ),
            },
            {
              content: { option: 'Удалить' },
              onClick: () => setUsers(prev => prev.filter(item => item.id !== user.id)),
            },
          ];
        },
      }),
    ],
    [],
  );

  return <Table data={users} columnDefinitions={columns} getRowId={user => user.id} suppressPagination outline />;
}
