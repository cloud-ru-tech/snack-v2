import { Divider } from '@ds/divider';
import { DrawerCustom } from '@ds/drawer';
import { Scroll } from '@ds/scroll';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { useValueControl } from '@ds/utils';
import { MouseEvent, useCallback, useEffect } from 'react';

import { shouldBeOpenedInNewTab } from '../../../../utils/shouldBeOpenedInNewTab';
import { DEFAULT_DRAWER_WIDTH, TEST_IDS } from '../../constants';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MainMenuProps } from '../../types';
import { getLinkEmblem } from '../../utils';
import { Content } from '../Content';
import { NavigationSearch } from '../NavigationSearch';
import styles from './styles.module.scss';

export function MenuDesktop({
  open: openProp,
  setOpen: setOpenProp,
  settingItems,
  platformGroups,
  leftTop,
  rightTop,
  serviceGroups,
  favorite,
  search,
  onLinkChange,
  sidebarBottomSlot,
  isMobile,
}: MainMenuProps) {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const { navGroupItems, scrollRef, searchRef, resultItems } = useMenuItems({
    serviceGroups,
    search,
    favorite,
    settingItems,
    platformGroups,
  });

  const isInitialEmptyCards = serviceGroups.length === 0;
  const isNeedRightBlock = Boolean(rightTop) || !isInitialEmptyCards;

  useEffect(() => {
    if (!open || !search) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      const searchRoot = searchRef.current ?? document.querySelector(`[data-test-id="${TEST_IDS.search}"]`);
      const input = searchRoot?.querySelector('input');
      input?.focus();
    });

    return () => cancelAnimationFrame(frameId);
  }, [open, search, searchRef]);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const wrappedSettingClick = useCallback(
    (link: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void; id: string }) =>
      (e?: MouseEvent<HTMLElement>) => {
        if (link.disabled) {
          e?.preventDefault();
          return;
        }

        if (!shouldBeOpenedInNewTab()) {
          e?.preventDefault();
          handleCloseDrawer();
        }

        link.onClick?.(e);
        onLinkChange?.(link.id);
      },
    [handleCloseDrawer, onLinkChange],
  );

  const hasBottomItems = Boolean(settingItems?.items.length) || Boolean(sidebarBottomSlot);
  const searchValue = search?.searchValue;
  const showSearch = Boolean(search) && !isInitialEmptyCards && (resultItems.length > 0 || Boolean(searchValue));

  return (
    <DrawerCustom
      open={open}
      onClose={handleCloseDrawer}
      position='left'
      width={DEFAULT_DRAWER_WIDTH}
      showButtonClosed={false}
      className={styles.drawer}
      data-test-id={TEST_IDS.drawer}
    >
      <div className={styles.menu} data-test-id={TEST_IDS.content}>
        <div className={styles.left} data-test-id={TEST_IDS.left}>
          <div className={styles.leftTop} data-test-id={TEST_IDS.leftTop}>
            {leftTop}
          </div>

          {!isInitialEmptyCards ? (
            <div className={styles.leftMain}>
              <Scroll
                className={styles.leftMainScroll}
                overflow={{ x: 'hidden' }}
                barHideStrategy='never'
                data-test-id={TEST_IDS.leftNavList}
                size='s'
              >
                <div className={styles.items}>
                  {navGroupItems.map(item => (
                    <CardServiceLight
                      key={item.id}
                      as='button'
                      type='button'
                      title={item.label}
                      onClick={item.onClick}
                      truncate={{ title: 2 }}
                      className={styles.item}
                      data-test-id={TEST_IDS.navGroup(item.id)}
                    />
                  ))}
                </div>
              </Scroll>
            </div>
          ) : null}

          {!leftTop && isInitialEmptyCards ? <div /> : null}

          {hasBottomItems ? (
            <div className={styles.leftBottom} data-test-id={TEST_IDS.leftBottom}>
              <div className={styles.leftBottomDivider}>
                <Divider />
              </div>

              <div className={styles.leftBottomItems} data-test-id={TEST_IDS.leftBottomItems}>
                {settingItems?.items.map(item => (
                  <CardServiceLight
                    {...(item.href ? { href: item.href, as: 'a' } : { as: 'button', type: 'button' })}
                    key={item.id}
                    title={item.label}
                    icon={getLinkEmblem(item)}
                    onClick={wrappedSettingClick(item)}
                    disabled={item.disabled}
                    className={styles.leftBottomCard}
                    data-test-id={TEST_IDS.setting(item.id)}
                  />
                ))}

                {sidebarBottomSlot}
              </div>
            </div>
          ) : null}
        </div>

        {isNeedRightBlock ? (
          <>
            <Divider orientation='vertical' className={styles.divider} data-test-id={TEST_IDS.divider} />

            <div className={styles.right} data-test-id={TEST_IDS.right}>
              {/* Search вне Scroll: OverlayScrollbars ломает position:sticky, поэтому закрепляем структурно. */}
              {showSearch && search ? (
                <div className={styles.searchWrap} data-test-id={TEST_IDS.search}>
                  <NavigationSearch
                    ref={searchRef}
                    value={search.searchValue}
                    onChange={search.onSearchValueChange}
                    options={search.searchFunctions.map(fn => ({ id: fn.id, label: fn.label }))}
                    selectedOption={search.searchFn ?? search.searchFunctions[0]?.id ?? 'fuzzy'}
                    onSelectedOptionChange={search.onChangeSearchFn}
                  />
                </div>
              ) : null}

              <Scroll paddingAbsolute className={styles.scroll} ref={scrollRef} barHideStrategy='never'>
                {isInitialEmptyCards && rightTop ? <div className={styles.bannersWrap}>{rightTop}</div> : null}

                {!isInitialEmptyCards ? (
                  <Content
                    onClose={handleCloseDrawer}
                    className={styles.rightContent}
                    searchValue={searchValue}
                    banners={rightTop}
                    favorite={favorite}
                    serviceGroups={resultItems}
                    onLinkChange={onLinkChange}
                    isMobile={isMobile}
                  />
                ) : null}
              </Scroll>
            </div>
          </>
        ) : null}
      </div>
    </DrawerCustom>
  );
}
