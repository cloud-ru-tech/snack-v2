import { PieChart } from '@ds/uikit-product-charts';
import { useState } from 'react';

const DATA = [
  { id: 'compute', label: 'Compute', value: 420 },
  { id: 'storage', label: 'Object Storage', value: 310 },
  { id: 'network', label: 'Network', value: 180 },
  { id: 'kubernetes', label: 'Managed Kubernetes', value: 150 },
  { id: 'databases', label: 'Databases', value: 95 },
  { id: 'other', label: 'Other services', value: 45 },
];

const GROUPS = [
  { id: 'infrastructure', label: 'Infrastructure', value: 910 },
  { id: 'platform', label: 'Platform', value: 245 },
  { id: 'other', label: 'Other', value: 45 },
];

type GroupItem = { label: string | number };

export function AggregatedLegend() {
  const [group, setGroup] = useState<GroupItem>();

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PieChart
        data={DATA}
        options={{ title: 'Расходы за месяц', legendTitle: 'Сервисы', typographySize: 'm', width: 640, height: 260 }}
        aggregatedLegend={{ title: 'Группы', data: GROUPS, onAggregatedLegendItemClick: setGroup }}
      />
      <span>Группа: {group ? group.label : 'не выбрана'}</span>
    </div>
  );
}
