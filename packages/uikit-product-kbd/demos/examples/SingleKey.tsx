import { Kbd } from '@ds/uikit-product-kbd';

export function SingleKey() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd>K</Kbd>
      <Kbd>/</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Backspace</Kbd>
      <Kbd>F12</Kbd>
    </div>
  );
}
