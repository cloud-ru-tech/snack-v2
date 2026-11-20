import { Kbd } from '@ds/uikit-product-kbd';

export function KeyName() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd keyName='mod' />
      <Kbd keyName='ctrl' />
      <Kbd keyName='alt' />
      <Kbd keyName='meta' />
      <Kbd keyName='shift' />
      <Kbd keyName='up' />
      <Kbd keyName='down' />
      <Kbd keyName='enter' />
      <Kbd keyName='esc' />
    </div>
  );
}
