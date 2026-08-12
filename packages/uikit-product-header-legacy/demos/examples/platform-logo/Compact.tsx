import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

export function Compact() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PlatformLogo variant={VARIANT.Evolution} compact />
      <PlatformLogo variant={VARIANT.Partner} compact />
    </div>
  );
}
