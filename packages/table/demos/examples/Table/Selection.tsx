import { TrashSVG } from '@ds/icons/interface/system';
import { ColumnDefinition, RowSelectionState, Table } from '@ds/table';
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const INITIAL_USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin' },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor' },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', role: 'Viewer' },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor' },
  { id: 'u-6', name: 'Егор Морозов', email: 'egor.morozov@example.com', role: 'Admin' },
];

const columns: ColumnDefinition<User>[] = [
  { accessorKey: 'name', header: 'Имя', size: 200 },
  { accessorKey: 'email', header: 'Email', size: 260 },
  { accessorKey: 'role', header: 'Роль', size: 140 },
];

export function Selection() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [selection, setSelection] = useState<RowSelectionState>({ 'u-2': true });

  return (
    <Table
      data={users}
      columnDefinitions={columns}
      getRowId={user => user.id}
      rowSelection={{ enable: true, multiRow: true, state: selection, onChange: setSelection }}
      bulkActions={[
        {
          label: 'Удалить выбранные',
          icon: TrashSVG,
          onClick: (selectionState, resetRowSelection) => {
            setUsers(prev => prev.filter(user => !selectionState[user.id]));
            setSelection({});
            resetRowSelection();
          },
        },
      ]}
      suppressPagination
      outline
    />
  );
}
