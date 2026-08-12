import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {Object.values(VARIANT).map(variant => (
        <PlatformLogo key={variant} variant={variant} />
      ))}
    </div>
  );
}
