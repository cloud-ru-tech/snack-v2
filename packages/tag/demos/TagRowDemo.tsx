import { TagRow } from '@ds/tag';

export function TagRowDemo() {
  return (
    <TagRow
      items={[
        { id: '1', label: 'Frontend', appearance: 'blue' },
        { id: '2', label: 'Backend', appearance: 'green' },
        { id: '3', label: 'Design', appearance: 'violet' },
        { id: '4', label: 'DevOps', appearance: 'orange' },
      ]}
    />
  );
}
