import { Divider } from '@ds/divider';
import { DrawerCustom } from '@ds/drawer';
import { Scroll } from '@ds/scroll';
import { useValueControl } from '@ds/utils';
import { useCallback, useEffect, useMemo } from 'react';

import { TEST_IDS } from '../../../../constants';
import { MainMenuDndContext, useMainMenuDnd } from '../../hooks/useMainMenuDnd';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MainMenuProps } from '../../types';
import { Content } from '../Content';
import { Favorites } from '../Favorites';
import { MenuBottom } from '../MenuBottom';
import { MenuHeaderBrand } from '../MenuHeaderBrand';
import { MountAnimation } from '../MountAnimation';
import { Search } from '../Search';
import { MENU_WIDTH_MAX, MENU_WIDTH_MIN } from './constants';
import styles from './styles.module.scss';

export function MenuDesktop({
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
  preferences,
  logo,
  rightTop,
  leftTop,
  leftBottom,
  defaultWidth = MENU_WIDTH_MAX,
  onWidthChangeEnd,
  draggerTooltip,
  loading,
}: MainMenuProps) {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const { scrollRef, searchRef, resultItems } = useMenuItems({
    segments,
    search,
    platformGroups,
  });

  const hasSearch = Boolean(search);

  useEffect(() => {
    if (!open || !hasSearch) {
      return;
    }

    // Панель Drawer'а фокусирует себя сама при открытии (см. useDrawerFocusTrap) —
    // rAF нужен, чтобы наш фокус на поле поиска применился уже после этого.
    const frameId = requestAnimationFrame(() => {
      searchRef.current?.focus();
    });

    return () => cancelAnimationFrame(frameId);
  }, [open, hasSearch, searchRef]);

  const isNeedRightBlock = segments && segments.some(segment => segment.items.length > 0);
  const hasBottomItems = Boolean(settingItems?.length) || Boolean(leftBottom);

  const allServiceGroups = useMemo(() => segments?.flatMap(segment => segment.items) ?? [], [segments]);

  const mainMenuDnd = useMainMenuDnd({
    favorite,
    groups: allServiceGroups,
    showDescription: preferences?.showDescription.value ?? false,
  });

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const menu = (
    <div className={styles.menu}>
      <div className={styles.menuHeader}>
        <MenuHeaderBrand logo={logo} onClose={handleCloseDrawer} className={styles.menuHeaderBrand} />

        {isNeedRightBlock && search && (
          <>
            <Divider orientation='vertical' />
            <Search {...search} ref={searchRef} />
          </>
        )}
      </div>
      <Divider />

      <div className={styles.menuBody}>
        <MountAnimation className={styles.left} data-test-id={TEST_IDS.mainMenu.left} type='slide-right'>
          {leftTop && <div className={styles.leftTop}>{leftTop}</div>}
          {isNeedRightBlock && favorite && <Favorites favorite={favorite} allServiceGroups={allServiceGroups} />}

          {hasBottomItems && <MenuBottom settingItems={settingItems} leftBottom={leftBottom} />}
        </MountAnimation>

        {isNeedRightBlock && (
          <>
            <MountAnimation type='fade-in'>
              <Divider orientation='vertical' />
            </MountAnimation>

            <MountAnimation type='fade-slide-up-right' className={styles.right} data-test-id={TEST_IDS.mainMenu.right}>
              <Scroll
                paddingAbsolute
                className={styles.scroll}
                ref={scrollRef}
                barHideStrategy='never'
                overflow={{ x: 'hidden' }}
              >
                <Content
                  onClose={handleCloseDrawer}
                  className={styles.rightContent}
                  searchValue={search?.value}
                  rightTop={rightTop}
                  favorite={favorite}
                  segments={segments}
                  searchGroups={resultItems}
                  segmentPrefs={segmentPrefs}
                  activeSegmentId={activeSegmentId}
                  onActiveSegmentChange={onActiveSegmentChange}
                  onSegmentOrderChange={onSegmentOrderChange}
                  onSegmentExpandedChange={onSegmentExpandedChange}
                  preferences={preferences}
                  loading={loading}
                />
              </Scroll>
            </MountAnimation>
          </>
        )}
      </div>
    </div>
  );

  return (
    <DrawerCustom
      open={open}
      onClose={handleCloseDrawer}
      width={isNeedRightBlock ? 'm' : 's'}
      position='left'
      className={styles.drawer}
      rootClassName={styles.drawerRoot}
      data-test-id={TEST_IDS.mainMenu.drawer}
      data-small={!isNeedRightBlock || undefined}
      disableMotions
      showButtonClosed={false}
      resizable={
        isNeedRightBlock
          ? {
              min: MENU_WIDTH_MIN,
              max: MENU_WIDTH_MAX,
              default: Math.min(Math.max(defaultWidth, MENU_WIDTH_MIN), MENU_WIDTH_MAX),
              onResizeEnd: onWidthChangeEnd,
              draggerTooltip,
            }
          : undefined
      }
    >
      {isNeedRightBlock ? <MainMenuDndContext {...mainMenuDnd}>{menu}</MainMenuDndContext> : menu}
    </DrawerCustom>
  );
}
