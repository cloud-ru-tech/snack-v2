import { SegmentControl } from '@ds/segment-control';

export function FullWidth() {
  return (
    <div style={{ width: 480, maxWidth: '100%' }}>
      <SegmentControl
        width='full'
        outline
        defaultValue='day'
        items={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
      />
    </div>
  );
}
