import { SimpleColumnDef, SimpleTable, VIEW } from '@ds/table';
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin' },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor' },
];

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', width: 140 },
];

export function SimpleTableCardView() {
  const [view, setView] = useState<typeof VIEW.Table | typeof VIEW.Cards>(VIEW.Cards);

  return (
    <SimpleTable
      data={USERS}
      columns={columns}
      pageSize={5}
      getRowId={user => user.id}
      headlineKey='name'
      view={view}
      onViewChange={setView}
      outline
    />
  );
}
