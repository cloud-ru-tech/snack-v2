import { SegmentControl } from '@ds/segment-control';

export function Basic() {
  return (
    <SegmentControl
      defaultValue='overview'
      items={[
        { value: 'overview', label: 'Overview' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'reports', label: 'Reports' },
      ]}
    />
  );
}
