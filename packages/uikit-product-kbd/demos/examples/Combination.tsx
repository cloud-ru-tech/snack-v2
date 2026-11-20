import { KbdShortcut } from '@ds/uikit-product-kbd';

export function Combination() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <KbdShortcut keys={['mod', 'K']} />
      <KbdShortcut keys={['mod', 'shift', 'P']} />
      <KbdShortcut keys={['ctrl', 'alt', 'Delete']} />
    </div>
  );
}
