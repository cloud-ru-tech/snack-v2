import { ColumnDefinition } from '@ds/table';

export const TITLE = 'Тарифы';
export const DESCRIPTION = 'Сравнение конфигураций виртуальных машин.';
export const CAPTION = 'Цены указаны в месяц, без НДС.';

export type TariffRow = {
  name: string;
  cpu: string;
  ram: string;
  price: string;
};

export const COLUMN_DEFINITIONS: ColumnDefinition<TariffRow>[] = [
  { id: 'name', accessorKey: 'name', header: 'Конфигурация', size: 220 },
  { id: 'cpu', accessorKey: 'cpu', header: 'vCPU', size: 160 },
  { id: 'ram', accessorKey: 'ram', header: 'RAM', size: 160 },
  { id: 'price', accessorKey: 'price', header: 'Цена', size: 180, align: 'right', headerAlign: 'right' },
];

export const ROWS: TariffRow[] = [
  { name: 'Standard-1', cpu: '2', ram: '4 ГБ', price: '1 200 ₽' },
  { name: 'Standard-2', cpu: '4', ram: '8 ГБ', price: '2 400 ₽' },
  { name: 'Standard-4', cpu: '8', ram: '16 ГБ', price: '4 800 ₽' },
  { name: 'Memory-2', cpu: '2', ram: '16 ГБ', price: '3 100 ₽' },
  { name: 'Memory-4', cpu: '4', ram: '32 ГБ', price: '6 200 ₽' },
  { name: 'Compute-8', cpu: '16', ram: '32 ГБ', price: '9 600 ₽' },
];
