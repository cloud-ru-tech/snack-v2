import { CopyButton } from '@ds/uikit-product-copy';

export function CopyButtonSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <CopyButton size='s' valueToCopy='small' />
      <CopyButton size='m' valueToCopy='medium' />
      <CopyButton size='l' valueToCopy='large' />
    </div>
  );
}
