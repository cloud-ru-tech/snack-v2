import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button } from '@ds/button';
import { MainMenuSVG } from '@ds/icons/interface/product';
import { extractSupportProps, useValueControl, WithSupportProps } from '@ds/utils';
import { ReactElement } from 'react';

import { TEST_IDS } from './constants';
import { MenuDesktop } from './helperComponents/MenuDesktop';
import { MenuMobile } from './helperComponents/MenuMobile';
import { MainMenuProps } from './types';

/**
 * Legacy MainMenu: desktop — двухколоночный drawer; mobile — левый одноколоночный drawer.
 */
export function MainMenu({
  open: openProp,
  setOpen: setOpenProp,
  leftTop,
  rightTop,
  settingItems,
  serviceGroups,
  platformGroups,
  onLinkChange,
  favorite,
  search,
  isMobile,
  sidebarBottomSlot,
  disabled,
  ...rest
}: WithSupportProps<MainMenuProps & { disabled?: boolean }>): ReactElement {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });
  const { layoutType } = useAdaptiveLayout();
  const isMobileView = isMobile ?? isMobileLayout(layoutType);
  const MenuComponent = isMobileView ? MenuMobile : MenuDesktop;

  return (
    <>
      <Button
        {...extractSupportProps(rest)}
        appearance='neutral'
        view='simple'
        size='m'
        disabled={disabled}
        icon={<MainMenuSVG />}
        onClick={() => setOpen(true)}
        data-test-id={TEST_IDS.trigger}
      />

      <MenuComponent
        open={open}
        setOpen={setOpen}
        leftTop={leftTop}
        rightTop={rightTop}
        settingItems={settingItems}
        serviceGroups={serviceGroups}
        platformGroups={platformGroups}
        onLinkChange={onLinkChange}
        favorite={favorite}
        search={search}
        isMobile={isMobile}
        sidebarBottomSlot={sidebarBottomSlot}
      />
    </>
  );
}
