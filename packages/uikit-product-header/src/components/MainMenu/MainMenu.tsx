import { MainMenuSVG } from '@ds/icons/interface/product';
import { useValueControl } from '@ds/utils';
import { useCallback, useEffect } from 'react';

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
  leftBottom,
  rightTop,
  segments,
  segmentPrefs,
  activeSegmentId,
  onActiveSegmentChange,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  onToggleAllGroupsExpanded,
  onSegmentServiceClick,
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

  const searchValue = search?.value;
  const onSearchChange = search?.onChange;

  useEffect(() => {
    if (!open && searchValue) onSearchChange?.('');
  }, [open, searchValue, onSearchChange]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const isMobile = useMobileLayout();

  const MenuComponent = isMobile ? MenuMobile : MenuDesktop;

  return (
    <>
      <HeaderButton
        tooltip={open ? undefined : { tip: t('services') }}
        isMobile={isMobile}
        disabled={disabled}
        icon={<MainMenuSVG />}
        onClick={handleOpen}
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
        onSegmentServiceClick={onSegmentServiceClick}
        onToggleAllGroupsExpanded={onToggleAllGroupsExpanded}
        platformGroups={platformGroups}
        search={search}
        logo={logo}
        leftTop={leftTop}
        leftBottom={leftBottom}
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
