import { MainMenu, useSearch } from '@ds/uikit-product-header-legacy';
import { useState } from 'react';

import { BannersSlot } from '../stories/MainMenu/BannersSlot';
import { ADMINISTRATIVE_SECTION, NEW_NAVIGATION_BANNER_DEMO, SERVICE_GROUPS } from '../stories/MainMenu/constants';
import { NewNavigationBanner } from '../stories/MainMenu/helperComponents/NewNavigationBanner';
import { PlatformSelector } from '../stories/MainMenu/helperComponents/PlatformSelector';
import {
  DEFAULT_PLATFORM_OPTION,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
} from '../stories/MainMenu/helperComponents/PlatformSelector/demoData';
import styles from '../stories/MainMenu/styles.module.scss';

export function MainMenuDemo() {
  const [open, setOpen] = useState(false);
  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const search = useSearch();
  const selectedPlatform = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;

  return (
    <div className={styles.sceneCompact}>
      <MainMenu
        open={open}
        setOpen={setOpen}
        leftTop={
          <PlatformSelector
            description={selectedPlatform.description}
            label={selectedPlatform.label}
            variant={selectedPlatform.variant}
            items={PLATFORM_SELECTOR_ITEMS}
            value={platformId}
            onChange={id => setPlatformId(String(id))}
          />
        }
        rightTop={<BannersSlot />}
        search={search}
        settingItems={ADMINISTRATIVE_SECTION}
        serviceGroups={SERVICE_GROUPS}
        sidebarBottomSlot={<NewNavigationBanner {...NEW_NAVIGATION_BANNER_DEMO} />}
      />
    </div>
  );
}
