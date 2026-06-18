import { ColumnDefinition, Table } from '@ds/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  balance: number;
};

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner', balance: 12990 },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin', balance: 8450 },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor', balance: 4300 },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', role: 'Viewer', balance: 0 },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor', balance: 990 },
  { id: 'u-6', name: 'Егор Морозов', email: 'egor.morozov@example.com', role: 'Admin', balance: 15600 },
  { id: 'u-7', name: 'Жанна Волкова', email: 'zhanna.volkova@example.com', role: 'Viewer', balance: 2100 },
  { id: 'u-8', name: 'Захар Соколов', email: 'zakhar.sokolov@example.com', role: 'Editor', balance: 7800 },
];

const balanceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const columns: ColumnDefinition<User>[] = [
  { accessorKey: 'name', header: 'Имя', enableSorting: true, size: 200 },
  { accessorKey: 'email', header: 'Email', size: 240 },
  { accessorKey: 'role', header: 'Роль', enableSorting: true, size: 140 },
  {
    accessorKey: 'balance',
    header: 'Баланс',
    align: 'right',
    headerAlign: 'right',
    enableSorting: true,
    size: 140,
    cell: ctx => balanceFormatter.format(Number(ctx.getValue() ?? 0)),
  },
];

export function Basic() {
  return <Table data={USERS} columnDefinitions={columns} pageSize={5} pagination={{ options: [5, 10] }} outline />;
}
