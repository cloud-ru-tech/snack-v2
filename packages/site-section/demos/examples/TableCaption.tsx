import { SectionTable } from '@ds/site-section';
import { ColumnDefinition } from '@ds/table';

type Row = { name: string; region: string };

const COLUMN_DEFINITIONS: ColumnDefinition<Row>[] = [
  { id: 'name', accessorKey: 'name', header: 'Зона', size: 240 },
  { id: 'region', accessorKey: 'region', header: 'Регион', size: 200 },
];

const DATA: Row[] = [
  { name: 'ru-central1-a', region: 'Москва' },
  { name: 'ru-central1-b', region: 'Москва' },
  { name: 'ru-central2-a', region: 'Санкт-Петербург' },
];

export function TableCaption() {
  return (
    <SectionTable
      container='new'
      title='Зоны доступности'
      columnDefinitions={COLUMN_DEFINITIONS}
      data={DATA}
      caption='Список зон, в которых можно разместить ресурсы.'
    />
  );
}
