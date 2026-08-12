import { MARKETPLACE_BANNER_DEMO, REFERRAL_BANNER_DEMO } from './constants';
import { MarketplaceBanner } from './helperComponents/MarketplaceBanner';
import { ReferralBanner } from './helperComponents/ReferralBanner';

/** Слот `rightTop` для MainMenu: ReferralBanner + MarketplaceBanner (раскладка контейнера — в Content). */
export function BannersSlot() {
  return (
    <>
      <ReferralBanner {...REFERRAL_BANNER_DEMO} />
      <MarketplaceBanner {...MARKETPLACE_BANNER_DEMO} />
    </>
  );
}
