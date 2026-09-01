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
  customMobileMenu,
  disabled,
  ...rest
}: WithSupportProps<MainMenuProps & { disabled?: boolean }>): ReactElement {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });
  const isMobile = useMobileLayout();

  const menuProps = {
    open,
    setOpen,
    leftTop,
    rightTop,
    settingItems,
    serviceGroups,
    platformGroups,
    onLinkChange,
    favorite,
    search,
    sidebarBottomSlot,
  };

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

      {isMobile ? (customMobileMenu ?? <MenuMobile {...menuProps} />) : <MenuDesktop {...menuProps} />}
    </>
  );
}
