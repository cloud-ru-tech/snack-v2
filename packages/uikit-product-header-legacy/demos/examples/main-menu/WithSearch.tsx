import { MainMenu, useSearch } from '@ds/uikit-product-header-legacy';
import { useState } from 'react';

import { MarketplaceBanner } from '../../../stories/MainMenu/helperComponents/MarketplaceBanner';
import { NewNavigationBanner } from '../../../stories/MainMenu/helperComponents/NewNavigationBanner';
import { PlatformSelector } from '../../../stories/MainMenu/helperComponents/PlatformSelector';
import { ReferralBanner } from '../../../stories/MainMenu/helperComponents/ReferralBanner';
import {
  ADMINISTRATIVE_SECTION,
  DEFAULT_PLATFORM_OPTION,
  MARKETPLACE_BANNER,
  NEW_NAVIGATION_BANNER,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  REFERRAL_BANNER,
  SERVICE_GROUPS,
} from '../../fixtures';

export function WithSearch() {
  const [open, setOpen] = useState(false);
  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const search = useSearch();
  const selected = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;

  return (
    <MainMenu
      open={open}
      setOpen={setOpen}
      leftTop={
        <PlatformSelector
          label={selected.label}
          description={selected.description}
          variant={selected.variant}
          items={PLATFORM_SELECTOR_ITEMS}
          value={platformId}
          onChange={id => setPlatformId(String(id))}
        />
      }
      rightTop={
        <>
          <ReferralBanner {...REFERRAL_BANNER} href='#' />
          <MarketplaceBanner {...MARKETPLACE_BANNER} href='#' />
        </>
      }
      search={search}
      settingItems={ADMINISTRATIVE_SECTION}
      serviceGroups={SERVICE_GROUPS}
      sidebarBottomSlot={<NewNavigationBanner {...NEW_NAVIGATION_BANNER} />}
    />
  );
}
