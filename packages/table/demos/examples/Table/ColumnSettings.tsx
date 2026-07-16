import { COLUMN_SETTINGS_MODE, ColumnDefinition, Table } from '@ds/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner', createdAt: '12.01.2026' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin', createdAt: '03.02.2026' },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor', createdAt: '18.03.2026' },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', role: 'Viewer', createdAt: '27.04.2026' },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor', createdAt: '09.05.2026' },
];

const columns: ColumnDefinition<User>[] = [
  // `mode: Hidden` — колонка не показывается в меню настроек и видна всегда.
  {
    accessorKey: 'name',
    header: 'Имя',
    size: 200,
    columnSettings: { label: 'Имя', mode: COLUMN_SETTINGS_MODE.Locked },
  },
  { accessorKey: 'email', header: 'Email', size: 240, columnSettings: { label: 'Email' } },
  { accessorKey: 'role', header: 'Роль', size: 140, columnSettings: { label: 'Роль' } },
  // `mode: DefaultFalse` — колонка скрыта по умолчанию, включается из меню настроек.
  {
    accessorKey: 'createdAt',
    header: 'Создан',
    size: 160,
    columnSettings: { label: 'Дата создания', mode: COLUMN_SETTINGS_MODE.DefaultHidden },
  },
];

export function ColumnSettings() {
  return (
    <Table
      data={USERS}
      columnDefinitions={columns}
      columnsSettings={{ enableDrag: true, enableSettingsMenu: true }}
      suppressPagination
      outline
    />
  );
}
