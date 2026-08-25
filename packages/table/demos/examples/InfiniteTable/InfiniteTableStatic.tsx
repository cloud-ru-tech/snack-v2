import { defineColumns, InfiniteTable, SimpleColumnDef } from '@ds/table';

type User = { id: string; name: string; email: string };

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna@example.com' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris@example.com' },
];

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', width: 200 },
  { key: 'email', header: 'Email', width: 240 },
];

export function InfiniteTableStatic() {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'minmax(0, 1fr)', height: 280 }}>
      <InfiniteTable data={USERS} columns={defineColumns(columns)} getRowId={user => user.id} hasMore={false} outline />
    </div>
  );
}
