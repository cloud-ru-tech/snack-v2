import { ColumnDefinition, SortingState, Table } from '@ds/table';
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  amount: number;
};

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner', amount: 12990 },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin', amount: 8450 },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor', amount: 4300 },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', role: 'Viewer', amount: 0 },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor', amount: 990 },
  { id: 'u-6', name: 'Егор Морозов', email: 'egor.morozov@example.com', role: 'Admin', amount: 15600 },
];

const columns: ColumnDefinition<User>[] = [
  { accessorKey: 'name', header: 'Имя', enableSorting: true, size: 200 },
  { accessorKey: 'email', header: 'Email', enableSorting: true, size: 260 },
  { accessorKey: 'role', header: 'Роль', enableSorting: true, size: 140 },
  { accessorKey: 'amount', header: 'Баланс', align: 'right', headerAlign: 'right', enableSorting: true, size: 140 },
];

export function Sorting() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'amount', desc: true }]);

  return (
    <Table
      data={USERS}
      columnDefinitions={columns}
      sorting={{ state: sorting, onChange: setSorting }}
      suppressPagination
      outline
    />
  );
}
