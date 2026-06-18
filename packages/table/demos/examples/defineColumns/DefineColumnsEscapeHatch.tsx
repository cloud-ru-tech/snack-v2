import { ColumnDefinition, defineColumns, Table } from '@ds/table';

type Row = { id: string; name: string; note: string };

const ROWS: Row[] = [
  { id: '1', name: 'Alpha', note: 'Первая запись' },
  { id: '2', name: 'Beta', note: 'Вторая запись' },
];

const customNoteColumn: ColumnDefinition<Row> = {
  id: 'note',
  accessorKey: 'note',
  header: 'Примечание',
  size: 200,
  cell: ctx => <strong>{String(ctx.getValue())}</strong>,
};

const columnDefinitions = defineColumns<Row>([
  { key: 'name', header: 'Имя', sortable: true, width: 160 },
  { key: 'note', header: 'Примечание', column: customNoteColumn },
]);

export function DefineColumnsEscapeHatch() {
  return <Table data={ROWS} columnDefinitions={columnDefinitions} getRowId={row => row.id} outline />;
}
