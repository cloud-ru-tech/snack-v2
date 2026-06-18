import { defineColumns, STATUS_APPEARANCE, statusColumn, Table } from '@ds/table';

type Task = { id: string; title: string; status: string };

const TASKS: Task[] = [
  { id: 't-1', title: 'Развернуть кластер', status: 'done' },
  { id: 't-2', title: 'Настроить мониторинг', status: 'progress' },
  { id: 't-3', title: 'Проверить бэкапы', status: 'todo' },
];

const mapStatus = (value: string | number) => {
  switch (String(value)) {
    case 'done':
      return STATUS_APPEARANCE.Green;
    case 'progress':
      return STATUS_APPEARANCE.Yellow;
    default:
      return STATUS_APPEARANCE.Neutral;
  }
};

const columnDefinitions = [
  statusColumn<Task>({ key: 'status', mapStatusToAppearance: mapStatus, header: 'Статус' }),
  ...defineColumns<Task>([{ key: 'title', header: 'Задача', sortable: true, width: 280 }]),
];

export function DefineColumnsWithStatus() {
  return <Table data={TASKS} columnDefinitions={columnDefinitions} getRowId={row => row.id} outline />;
}
