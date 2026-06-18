import { AdminTable, SimpleColumnDef, STATUS_APPEARANCE } from '@ds/table';

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
  {
    id: 'u-4',
    name: 'Глеб Кузнецов',
    email: 'gleb.kuznetsov@example.com',
    role: 'Viewer',
    status: 'invited',
    amount: 0,
  },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor', status: 'active', amount: 990 },
];

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', sortable: true, width: 140 },
  { key: 'amount', header: 'Сумма', sortable: true, align: 'right', width: 140, format: 'currency' },
];

const statusLabels: Record<string, string> = {
  active: 'Активен',
  pending: 'Ожидание',
  blocked: 'Заблокирован',
  invited: 'Приглашён',
};

export function AdminTableBasic() {
  return (
    <AdminTable
      data={USERS}
      columns={columns}
      statusColumn={{
        key: 'status',
        mapStatusToAppearance: value => {
          switch (value) {
            case 'active':
              return STATUS_APPEARANCE.Green;
            case 'pending':
              return STATUS_APPEARANCE.Yellow;
            case 'blocked':
              return STATUS_APPEARANCE.Red;
            case 'invited':
              return STATUS_APPEARANCE.Blue;
            default:
              return STATUS_APPEARANCE.Neutral;
          }
        },
        renderDescription: status => statusLabels[status] ?? status,
      }}
      pageSize={5}
      getRowId={user => user.id}
      search
      outline
    />
  );
}
