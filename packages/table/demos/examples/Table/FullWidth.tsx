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

const tableProps = {
  data: USERS,
  columnDefinitions: columns,
  pageSize: 5,
  pagination: { options: [5, 10] },
  outline: true,
  suppressToolbar: true,
};

export function FullWidth() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 960 }}>
      <Table {...tableProps} />
      <Table {...tableProps} fullWidth={false} />
    </div>
  );
}
