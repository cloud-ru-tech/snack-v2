import { TabsSegmented } from '@ds/site-tabs-segmented';
import { useState } from 'react';

const ITEMS = [
  { value: 'month', label: 'Месяц' },
  { value: 'quarter', label: 'Квартал' },
  { value: 'year', label: 'Год' },
  { value: 'archive', label: 'Архив', disabled: true },
];

export function Controlled() {
  const [period, setPeriod] = useState('quarter');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <TabsSegmented items={ITEMS} value={period} onChange={setPeriod} />
      <span>Период: {period}</span>
    </div>
  );
}
