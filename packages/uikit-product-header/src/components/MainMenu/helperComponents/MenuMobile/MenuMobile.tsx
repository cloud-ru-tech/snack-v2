import { Divider } from '@ds/divider';
import { SNAP_POINTS_PRESET } from '@ds/list';
import { useCallback, useMemo } from 'react';

import { TEST_IDS } from '../../../../constants';
import { MobileDrawerCustom } from '../../../../mobileOverlays';
import { MainMenuDndContext } from '../../hooks/useMainMenuDnd';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MainMenuProps } from '../../types';
import { buildServicesById } from '../../utils';
import { Content } from '../Content';
import { Favorites } from '../Favorites';
import { MenuBottom } from '../MenuBottom';
import { MenuHeaderBrand } from '../MenuHeaderBrand';
import { MountAnimation } from '../MountAnimation';
import { ScrollWithAnimatedStickyPanel } from '../ScrollWithAnimatedStickyPanel';
import { Search } from '../Search';
import styles from './styles.module.scss';

export function MenuMobile({
  open = false,
  setOpen,
  settingItems,
  platformGroups,
  segments,
  segmentPrefs,
  activeSegmentId,
  onActiveSegmentChange,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  onSegmentServiceClick,
  favorite,
  search,
  logo,
  rightTop,
  leftTop,
  leftBottom,
  loading,
}: MainMenuProps) {
  // `segments !== undefined` — сигнал «каталог вообще используется» (консьюмер без сегментов
  // никогда не передаёт проп, и `loading` в этом случае к правой панели не относится). Пока
  // сегменты используются, `loading` держит панель смонтированной на время ответа бэка — иначе
  // `Content` не успевает показать свой skeleton (он монтируется только когда данные уже пришли),
  // и между "ничего" и карточками на кадр проскакивает пустое состояние «нет данных».
  const hasSegments = segments !== undefined && (loading || segments.some(segment => segment.items.length > 0));
  const hasBottomItems = Boolean(settingItems?.length) || Boolean(leftBottom);

  const isSearching = Boolean(search?.value);

  const { searchRef, resultItems } = useMenuItems({
    segments,
    search,
    platformGroups,
  });

  const servicesById = useMemo(() => buildServicesById(segments?.flatMap(segment => segment.items)), [segments]);

  const handleClose = useCallback(() => {
    setOpen?.(false);
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
      snapPoints={SNAP_POINTS_PRESET.full}
      disableMotions={true}
    >
      <ScrollWithAnimatedStickyPanel
        panel={
          <>
            <MenuHeaderBrand logo={logo} onClose={handleClose} className={styles.menuHeader} isMobile />
            <Divider orientation='horizontal' />
          </>
        }
      >
        <MountAnimation className={styles.scrollMobile} type='fade-slide-up'>
          {leftTop}
          {search && <Search {...search} ref={searchRef} isMobile />}
          {!isSearching && favorite && <Favorites favorite={favorite} servicesById={servicesById} isMobile />}

          {hasSegments && (
            <MainMenuDndContext>
              <Content
                isMobile
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
                onSegmentServiceClick={onSegmentServiceClick}
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
