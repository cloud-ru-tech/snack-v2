import { ColumnDefinition, Table, VIEW } from '@ds/table';

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
];

const columns: ColumnDefinition<User>[] = [
  { accessorKey: 'name', header: 'Имя', enableSorting: true, size: 200 },
  { accessorKey: 'email', header: 'Email', size: 240 },
  { accessorKey: 'role', header: 'Роль', size: 140 },
  { accessorKey: 'balance', header: 'Баланс', enableSorting: true, size: 140 },
];

export function CardView() {
  return (
    <Table
      data={USERS}
      columnDefinitions={columns}
      // Стартовый вид — карточки; `showDataView` включает переключатель table/cards
      // в тулбаре (по умолчанию его нет). `headlineId` задаёт заголовок карточки.
      defaultView={VIEW.Cards}
      showDataView
      headlineId='name'
      getRowId={user => user.id}
      rowSelection={{ enable: true, multiRow: true }}
      sorting={{ initialState: [{ id: 'name', desc: false }] }}
      outline
    />
  );
}
