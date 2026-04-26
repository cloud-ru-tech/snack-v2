import { TagRow } from '@ds/tag';

export function RowTruncated() {
  return (
    <TagRow
      rowLimit={1}
      items={[
        { id: '1', label: 'Frontend', appearance: 'blue' },
        { id: '2', label: 'Backend', appearance: 'green' },
        { id: '3', label: 'Design', appearance: 'violet' },
        { id: '4', label: 'DevOps', appearance: 'orange' },
        { id: '5', label: 'Data', appearance: 'yellow' },
      ]}
    />
  );
}
