import { BagelChart } from '@ds/uikit-product-charts';

const QUOTAS = [
  { title: 'vCPU', value: 32, total: 128 },
  { title: 'RAM, GB', value: 180, total: 256 },
  { title: 'SSD, GB', value: 920, total: 1000 },
];

export function QuotaUsage() {
  return (
    // Кольцо заполняет ширину контейнера: колонки сетки задают его размер.
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: 12 }}>
      {QUOTAS.map(quota => (
        <BagelChart key={quota.title} title={quota.title} value={quota.value} total={quota.total} />
      ))}
    </div>
  );
}
