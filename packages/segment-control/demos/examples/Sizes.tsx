import { SegmentControl } from '@ds/segment-control';

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <SegmentControl size='s' defaultValue='one' items={items} />
      <SegmentControl size='m' defaultValue='one' items={items} />
      <SegmentControl size='l' defaultValue='one' items={items} />
    </div>
  );
}
