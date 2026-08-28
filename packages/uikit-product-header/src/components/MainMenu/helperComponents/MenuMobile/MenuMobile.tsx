import { useValueControl } from '@ds/utils';
import { useCallback, useMemo } from 'react';

import { TEST_IDS } from '../../../../constants';
import { MobileDrawerCustom } from '../../../../mobileOverlays';
import { MainMenuDndContext } from '../../hooks/useMainMenuDnd';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MainMenuProps } from '../../types';
import { Content } from '../Content';
import { Favorites } from '../Favorites';
import { MenuBottom } from '../MenuBottom';
import { MenuHeaderBrand } from '../MenuHeaderBrand';
import { MountAnimation } from '../MountAnimation';
import { ScrollWithAnimatedStickyPanel } from '../ScrollWithAnimatedStickyPanel';
import { Search } from '../Search';
import styles from './styles.module.scss';

const SNAP_POINTS = [1];

export function MenuMobile({
  open: openProp,
  setOpen: setOpenProp,
  settingItems,
  platformGroups,
  segments,
  segmentPrefs,
  activeSegmentId,
  onActiveSegmentChange,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  favorite,
  search,
  logo,
  rightTop,
  leftTop,
  leftBottom,
  loading,
}: MainMenuProps) {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const hasSegments = segments && segments.some(segment => segment.items.length > 0);
  const hasBottomItems = Boolean(settingItems?.length) || Boolean(leftBottom);

  const isSearching = Boolean(search?.value);

  const { searchRef, resultItems } = useMenuItems({
    segments,
    search,
    platformGroups,
  });

  const allServiceGroups = useMemo(() => segments?.flatMap(segment => segment.items) ?? [], [segments]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MobileDrawerCustom
      open={open}
      onClose={handleClose}
      position='bottom'
      className={styles.drawerMobile}
      swipeEnabled={false}
      data-test-id={TEST_IDS.mainMenu.drawerMobile}
      closeOnPopstate
      snapPoints={SNAP_POINTS}
      disableMotions={true}
    >
      <ScrollWithAnimatedStickyPanel
        panel={<MenuHeaderBrand logo={logo} onClose={handleClose} className={styles.menuHeader} />}
      >
        <MountAnimation className={styles.scrollMobile} type='fade-slide-up'>
          {leftTop && <div className={styles.rightContent}>{leftTop}</div>}
          {search && <Search {...search} ref={searchRef} isMobile />}
          {favorite && <Favorites favorite={favorite} allServiceGroups={allServiceGroups} isMobile />}

          {hasSegments && (
            <MainMenuDndContext>
              <Content
                isMobile
                onClose={handleClose}
                className={styles.rightContent}
                searchValue={search && search.value}
                rightTop={rightTop}
                favorite={favorite}
                segments={segments}
                searchGroups={resultItems}
                segmentPrefs={segmentPrefs}
                activeSegmentId={activeSegmentId}
                onActiveSegmentChange={onActiveSegmentChange}
                onSegmentOrderChange={onSegmentOrderChange}
                onSegmentExpandedChange={onSegmentExpandedChange}
                loading={loading}
              />
            </MainMenuDndContext>
          )}

          {!isSearching && hasBottomItems && <MenuBottom settingItems={settingItems} leftBottom={leftBottom} />}
        </MountAnimation>
      </ScrollWithAnimatedStickyPanel>
    </MobileDrawerCustom>
  );
}
