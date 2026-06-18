import { SimpleTable } from '@ds/table';

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  createdAt: string;
};

const PRODUCTS: Product[] = [
  { id: 'p-1', name: 'Облачный сервер', sku: 'VM-001', price: 4990, createdAt: '2024-03-12T09:15:00Z' },
  { id: 'p-2', name: 'Балансировщик', sku: 'LB-010', price: 2490, createdAt: '2024-01-18T16:30:00Z' },
  { id: 'p-3', name: 'Хранилище S3', sku: 'S3-100', price: 990, createdAt: '2023-11-02T14:40:00Z' },
];

const columns = [
  { key: 'name', header: 'Название', sortable: true, width: 220 },
  { key: 'sku', header: 'Артикул', width: 120 },
  { key: 'price', header: 'Цена', sortable: true, align: 'right', width: 140, format: 'currency' },
  { key: 'createdAt', header: 'Создан', sortable: true, width: 120, format: 'date' },
] as const;

export function DefineColumnsBasic() {
  return <SimpleTable data={PRODUCTS} columns={[...columns]} pageSize={5} getRowId={row => row.id} outline />;
}
