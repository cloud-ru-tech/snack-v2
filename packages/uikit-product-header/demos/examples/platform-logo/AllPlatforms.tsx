import {
  AdvancedPlatformLogo,
  EnterprisePlatformLogo,
  EvolutionPlatformLogo,
  MarketplacePlatformLogo,
  MLSpacePlatformLogo,
  PartnerPlatformLogo,
} from '@ds/uikit-product-header';

export function AllPlatforms() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AdvancedPlatformLogo data-test-id='platform-logo-advanced' />
      <EnterprisePlatformLogo data-test-id='platform-logo-enterprise' />
      <EvolutionPlatformLogo data-test-id='platform-logo-evolution' />
      <MLSpacePlatformLogo data-test-id='platform-logo-mlspace' />
      <PartnerPlatformLogo data-test-id='platform-logo-partner' />
      <MarketplacePlatformLogo data-test-id='platform-logo-marketplace' />
    </div>
  );
}
