import { SectionTable } from '@ds/site-section';
import { ColumnDefinition } from '@ds/table';

type Row = { name: string; cpu: string; price: string };

const COLUMN_DEFINITIONS: ColumnDefinition<Row>[] = [
  { id: 'name', accessorKey: 'name', header: 'Конфигурация', size: 220 },
  { id: 'cpu', accessorKey: 'cpu', header: 'vCPU', size: 120 },
  { id: 'price', accessorKey: 'price', header: 'Цена', size: 140, align: 'right', headerAlign: 'right' },
];

const DATA: Row[] = [
  { name: 'Standard-2', cpu: '4', price: '2 400 ₽' },
  { name: 'Standard-4', cpu: '8', price: '4 800 ₽' },
  { name: 'Memory-4', cpu: '4', price: '6 200 ₽' },
];

export function TableWithTitle() {
  return (
    <SectionTable
      container='new'
      title='Тарифы'
      description='Сравнение конфигураций виртуальных машин.'
      columnDefinitions={COLUMN_DEFINITIONS}
      data={DATA}
    />
  );
}
