import { Avatar } from '@ds/avatar';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar size='s' name='АС' />
      <Avatar size='m' name='АС' />
      <Avatar size='l' name='АС' />
    </div>
  );
}
