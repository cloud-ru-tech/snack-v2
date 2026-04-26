import { Button } from '@ds/button';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size='s' label='Small' />
      <Button size='m' label='Medium' />
      <Button size='l' label='Large' />
    </div>
  );
}
