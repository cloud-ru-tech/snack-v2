import { Button } from '@ds/button';

export function Appearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button appearance='primary' label='Primary' />
      <Button appearance='neutral' label='Neutral' />
      <Button appearance='critical' label='Critical' />
    </div>
  );
}
