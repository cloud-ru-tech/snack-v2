import { FieldSelect } from '@ds/fields';
import { ItemProps } from '@ds/list';

const options: ItemProps[] = [
  { id: 'm', content: { label: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { label: 'Large (4 vCPU, 8 GB)' } },
];

export function SelectReadonly() {
  return <FieldSelect label='Размер инстанса' readonly selection='single' items={options} defaultValue='l' />;
}
