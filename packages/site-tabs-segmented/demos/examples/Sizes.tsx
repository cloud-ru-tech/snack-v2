import { TabsSegmented } from '@ds/site-tabs-segmented';

const ITEMS = [
  { value: 'infrastructure', label: 'Инфраструктура' },
  { value: 'data', label: 'Данные' },
  { value: 'ai', label: 'AI' },
];

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <TabsSegmented items={ITEMS} size='s' />
      <TabsSegmented items={ITEMS} size='m' />
      <TabsSegmented items={ITEMS} size='l' />
    </div>
  );
}
