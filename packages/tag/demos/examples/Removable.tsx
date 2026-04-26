import { Tag } from '@ds/tag';

export function Removable() {
  return <Tag label='React' appearance='blue' onDelete={() => alert('remove')} />;
}
