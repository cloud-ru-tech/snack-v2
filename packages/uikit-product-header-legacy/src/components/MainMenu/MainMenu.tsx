import { Button } from '@ds/button';
import { MainMenuSVG } from '@ds/icons/interface/product';
import { extractSupportProps, useValueControl, WithSupportProps } from '@ds/utils';
import { ReactElement } from 'react';

import { useMobileLayout } from '../../hooks/useMobileLayout';
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
  sidebarBottomSlot,
  disabled,
  ...rest
}: WithSupportProps<MainMenuProps & { disabled?: boolean }>): ReactElement {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });
  const isMobile = useMobileLayout();
  const MenuComponent = isMobile ? MenuMobile : MenuDesktop;

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
        sidebarBottomSlot={sidebarBottomSlot}
      />
    </>
  );
}
