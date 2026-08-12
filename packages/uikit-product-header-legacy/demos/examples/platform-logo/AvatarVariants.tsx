import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

export function AvatarVariants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PlatformLogo variant={VARIANT.Partner} />
      <PlatformLogo variant={VARIANT.Marketplace} />
    </div>
  );
}
