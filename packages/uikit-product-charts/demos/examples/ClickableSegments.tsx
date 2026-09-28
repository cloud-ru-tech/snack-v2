import { PieChart } from '@ds/uikit-product-charts';
import { useState } from 'react';

const DATA = [
  { id: 'compute', label: 'Compute', value: 420 },
  { id: 'storage', label: 'Object Storage', value: 310 },
  { id: 'network', label: 'Network', value: 180 },
  { id: 'kubernetes', label: 'Managed Kubernetes', value: 150 },
  { id: 'databases', label: 'Databases', value: 95 },
];

type SelectedItem = { label: string | number; value: string | number };

export function ClickableSegments() {
  const [selected, setSelected] = useState<SelectedItem>();

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PieChart
        data={DATA}
        options={{ title: 'Расходы по сервисам', legendTitle: 'Сервисы', width: 480, height: 240 }}
        onPieSegmentClick={setSelected}
        onLegendItemClick={setSelected}
      />
      <span>Выбрано: {selected ? `${selected.label} — ${selected.value}` : 'ничего'}</span>
    </div>
  );
}
