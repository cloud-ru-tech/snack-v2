import { MainMenuSVG } from '@ds/icons/interface/product';
import { useValueControl } from '@ds/utils';
import { useEffect } from 'react';

import { TEST_IDS } from '../../constants';
import { useMobileLayout } from '../../hooks/useMobileLayout';
import { headerLocale } from '../../locale';
import { HeaderButton } from '../HeaderButton';
import { MenuDesktop } from './helperComponents/MenuDesktop';
import { MenuMobile } from './helperComponents/MenuMobile';
import { MainMenuProps } from './types';

export function MainMenu({
  open: openProp,
  setOpen: setOpenProp,
  settingItems,
  platformGroups,
  logo,
  leftTop,
  rightTop,
  segments,
  segmentPrefs,
  activeSegmentId,
  onActiveSegmentChange,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  favorite,
  search,
  preferences,
  disabled,
  defaultWidth,
  onWidthChangeEnd,
  draggerTooltip,
  loading,
}: MainMenuProps) {
  const { t } = headerLocale.useTranslations();

  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  useEffect(() => {
    if (!open && search?.value) search?.onChange('');
  }, [open, search]);

  const isMobile = useMobileLayout();

  const MenuComponent = isMobile ? MenuMobile : MenuDesktop;

  return (
    <>
      <HeaderButton
        tooltip={open ? undefined : { tip: t('services') }}
        isMobile={isMobile}
        disabled={disabled}
        icon={<MainMenuSVG />}
        onClick={() => {
          setOpen(true);
        }}
        data-test-id={TEST_IDS.mainMenu.drawerButton}
      />

      <MenuComponent
        settingItems={settingItems}
        segments={segments}
        segmentPrefs={segmentPrefs}
        activeSegmentId={activeSegmentId}
        onActiveSegmentChange={onActiveSegmentChange}
        onSegmentOrderChange={onSegmentOrderChange}
        onSegmentExpandedChange={onSegmentExpandedChange}
        platformGroups={platformGroups}
        search={search}
        logo={logo}
        leftTop={leftTop}
        rightTop={rightTop}
        favorite={favorite}
        open={open}
        setOpen={setOpen}
        preferences={preferences}
        defaultWidth={defaultWidth}
        onWidthChangeEnd={onWidthChangeEnd}
        draggerTooltip={draggerTooltip}
        loading={loading}
      />
    </>
  );
}
