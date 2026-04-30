import { InfoGroup } from '@ds/uikit-product-info-row';

type Order = { id: string; total: number; paid: boolean };

const data: Order = { id: 'A-1024', total: 12990, paid: true };

const formatRub = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;

export function InfoGroupCustomRender() {
  return (
    <InfoGroup
      data={data}
      items={[
        { label: 'Заказ', accessorKey: 'id' },
        { label: 'Сумма', render: order => <strong>{formatRub(order.total)}</strong> },
        { label: 'Оплачен', accessorKey: 'paid' },
      ]}
      formatBoolean={value => (value ? 'Да' : 'Нет')}
    />
  );
}
