import { SegmentControl } from '@ds/segment-control';

export function WithCounter() {
  return (
    <SegmentControl
      defaultValue='inbox'
      items={[
        { value: 'inbox', label: 'Inbox', counter: { value: 12 } },
        { value: 'drafts', label: 'Drafts', counter: { value: 3 } },
        { value: 'archive', label: 'Archive' },
      ]}
    />
  );
}
