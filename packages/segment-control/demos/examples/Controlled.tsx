import { SegmentControl } from '@ds/segment-control';
import { useState } from 'react';

export function Controlled() {
  const [view, setView] = useState<'list' | 'grid' | 'kanban'>('list');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <SegmentControl
        value={view}
        onChange={setView}
        items={[
          { value: 'list', label: 'List' },
          { value: 'grid', label: 'Grid' },
          { value: 'kanban', label: 'Kanban' },
        ]}
      />
      <span>Selected: {view}</span>
    </div>
  );
}
