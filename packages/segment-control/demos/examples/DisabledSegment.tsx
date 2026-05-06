import { SegmentControl } from '@ds/segment-control';

export function DisabledSegment() {
  return (
    <SegmentControl
      defaultValue='one'
      items={[
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two', disabled: true },
        { value: 'three', label: 'Three' },
      ]}
    />
  );
}
