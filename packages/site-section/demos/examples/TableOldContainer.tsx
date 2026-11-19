import { SectionTable } from '@ds/site-section';
import { ColumnDefinition } from '@ds/table';

type Row = { service: string; status: string };

const COLUMN_DEFINITIONS: ColumnDefinition<Row>[] = [
  { id: 'service', accessorKey: 'service', header: 'Сервис', size: 280 },
  { id: 'status', accessorKey: 'status', header: 'Статус', size: 160 },
];

const DATA: Row[] = [
  { service: 'Compute', status: 'Доступен' },
  { service: 'Object Storage', status: 'Доступен' },
  { service: 'Managed Kubernetes', status: 'Доступен' },
];

export function TableOldContainer() {
  return <SectionTable container='old' title='Сервисы' columnDefinitions={COLUMN_DEFINITIONS} data={DATA} />;
}
