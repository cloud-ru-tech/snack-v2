import {
  ColumnDefinition,
  getStatusColumnDef,
  MapStatusToAppearanceFnType,
  STATUS_APPEARANCE,
  Table,
  TABLE_ROW_COLOR,
} from '@ds/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner', status: 'active' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin', status: 'pending' },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor', status: 'blocked' },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', role: 'Viewer', status: 'invited' },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor', status: 'active' },
  { id: 'u-6', name: 'Егор Морозов', email: 'egor.morozov@example.com', role: 'Admin', status: 'blocked' },
];

const STATUS_LABELS: Record<string, string> = {
  active: 'Активен',
  pending: 'Ожидание',
  blocked: 'Заблокирован',
  invited: 'Приглашён',
};

const mapStatusToAppearance: MapStatusToAppearanceFnType = value => {
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
};

const columns: ColumnDefinition<User>[] = [
  getStatusColumnDef<User>({
    accessorKey: 'status',
    mapStatusToAppearance,
    renderDescription: value => STATUS_LABELS[value] ?? value,
    header: 'Статус',
    size: 160,
  }),
  { accessorKey: 'name', header: 'Имя', size: 200 },
  { accessorKey: 'email', header: 'Email', size: 260 },
  { accessorKey: 'role', header: 'Роль', size: 140 },
];

export function StatusColumn() {
  return (
    <Table
      data={USERS}
      columnDefinitions={columns}
      getRowBackgroundColor={user => (user.status === 'blocked' ? TABLE_ROW_COLOR.Red : undefined)}
      suppressPagination
      outline
    />
  );
}
