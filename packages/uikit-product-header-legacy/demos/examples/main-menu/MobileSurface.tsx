import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { MainMenu, useSearch } from '@ds/uikit-product-header-legacy';
import { useState } from 'react';

import { MarketplaceBanner } from '../../../stories/MainMenu/helperComponents/MarketplaceBanner';
import { PlatformSelector } from '../../../stories/MainMenu/helperComponents/PlatformSelector';
import { ReferralBanner } from '../../../stories/MainMenu/helperComponents/ReferralBanner';
import {
  ADMINISTRATIVE_SECTION,
  DEFAULT_PLATFORM_OPTION,
  DEFAULT_PROJECT_OPTION,
  MARKETPLACE_BANNER,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  PROJECT_DESCRIPTION,
  PROJECT_OPTIONS_BY_ID,
  PROJECT_SELECTOR_ITEMS,
  REFERRAL_BANNER,
  SERVICE_GROUPS,
} from '../../fixtures';

/**
 * Mobile-поверхность MainMenu: `leftTop` — PlatformSelector (платформа) + PlatformSelector (проект с `avatarName`).
 * `sidebarBottomSlot` на mobile не рендерится.
 */
export function MobileSurface() {
  const [open, setOpen] = useState(false);
  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT_OPTION.id);
  const search = useSearch();

  const selectedPlatform = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;
  const selectedProject = PROJECT_OPTIONS_BY_ID[projectId] ?? DEFAULT_PROJECT_OPTION;

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <MainMenu
        open={open}
        setOpen={setOpen}
        leftTop={
          <>
            <PlatformSelector
              label={selectedPlatform.label}
              description={selectedPlatform.description}
              variant={selectedPlatform.variant}
              items={PLATFORM_SELECTOR_ITEMS}
              value={platformId}
              onChange={id => setPlatformId(String(id))}
            />
            <PlatformSelector
              label={selectedProject.label}
              description={PROJECT_DESCRIPTION}
              avatarName={selectedProject.label}
              items={PROJECT_SELECTOR_ITEMS}
              value={projectId}
              onChange={id => setProjectId(String(id))}
            />
          </>
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
      />
    </AdaptiveProvider>
  );
}
