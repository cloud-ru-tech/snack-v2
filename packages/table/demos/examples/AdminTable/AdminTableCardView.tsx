import { AdminTable, SimpleColumnDef, VIEW } from '@ds/table';
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
];

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', sortable: true, width: 140 },
];

export function AdminTableCardView() {
  const [view, setView] = useState<typeof VIEW.Table | typeof VIEW.Cards>(VIEW.Cards);

  return (
    <AdminTable
      data={USERS}
      columns={columns}
      pageSize={5}
      getRowId={user => user.id}
      search
      headlineKey='name'
      view={view}
      onViewChange={setView}
      outline
    />
  );
}
