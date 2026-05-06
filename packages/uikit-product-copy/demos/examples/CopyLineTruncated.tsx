import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineTruncated() {
  return (
    <div style={{ width: 280 }}>
      <CopyLine content='very-long-identifier-1234567890-abcdefghijklmnop' />
    </div>
  );
}
