import { AdaptiveProvider, useAdaptiveLayout } from '@ds/adaptive';
import { Divider } from '@ds/divider';
import { ChildThemeProvider, DENSITY, useThemeClassnames } from '@ds/theme';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactElement, useCallback } from 'react';

import { headerLegacyLocale } from '../../../../locale';
import { shouldBeOpenedInNewTab } from '../../../../utils/shouldBeOpenedInNewTab';
import { TEST_IDS } from '../../constants';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MainMenuProps } from '../../types';
import { getLinkEmblem } from '../../utils';
import { Content } from '../Content';
import { NavigationSearch } from '../NavigationSearch';
import { DesktopDrawerCustom } from './desktopDrawer';
import styles from './styles.module.scss';

export function MenuMobile({
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
}: MainMenuProps): ReactElement {
  const { layoutType } = useAdaptiveLayout();
  const { t } = headerLegacyLocale.useTranslations();

  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const isInitialEmptyCards = serviceGroups.length === 0;

  const { searchRef, resultItems } = useMenuItems({
    serviceGroups,
    search,
    favorite,
    settingItems,
    platformGroups,
  });

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

        if (!shouldBeOpenedInNewTab(e)) {
          e?.preventDefault();
          handleCloseDrawer();
        }

        link.onClick?.(e);
        onLinkChange?.(link.id);
      },
    [handleCloseDrawer, onLinkChange],
  );

  const searchValue = search?.searchValue;
  const showSearch = Boolean(search) && !isInitialEmptyCards && (resultItems.length > 0 || Boolean(searchValue));
  const hasBottomItems = Boolean(settingItems?.items.length);

  // Временная фиксация comfort (см. `HeaderLayout`): `MainMenu` используется и отдельно от
  // `HeaderLayout`, поэтому объявляем плотность здесь же. Провайдер задаёт контекст (его читают
  // вложенные поверхности, которые переэмитят тему на своём корне), класс — сам дровер: он тему
  // из контекста не переэмитит и иначе остался бы с плотностью приложения.
  const comfortThemeClassName = useThemeClassnames({ density: DENSITY.Comfort });

  return (
    // Обёртка провайдера layout-прозрачная (`display: contents`) — меню рендерится порталом,
    // лишний бокс в строке шапки не нужен.
    <ChildThemeProvider value={{ density: DENSITY.Comfort }} className={styles.densityScope}>
      <DesktopDrawerCustom
        open={open}
        onClose={handleCloseDrawer}
        position='left'
        width='s'
        className={cn(styles.drawerMobile, comfortThemeClassName)}
        closeOnPopstate
        data-test-id={TEST_IDS.drawerMobile}
      >
        <AdaptiveProvider layoutType={layoutType}>
          <DesktopDrawerCustom.Header title={t('mainMenu.navigation')} className={styles.header} />

          <DesktopDrawerCustom.Body bodyPadding={false} className={styles.scrollBody}>
            <div className={styles.scrollMobile}>
              {leftTop ? <div className={styles.leftTop}>{leftTop}</div> : null}

              {!isInitialEmptyCards ? (
                <div className={styles.main}>
                  {showSearch && search ? (
                    <div className={styles.searchItem} data-test-id={TEST_IDS.search}>
                      <NavigationSearch
                        ref={searchRef}
                        value={search.searchValue}
                        onChange={search.onSearchValueChange}
                        onBlur={search.onBlur}
                        onFocus={search.onFocus}
                        options={search.searchFunctions.map(fn => ({ id: fn.id, label: fn.label }))}
                        selectedOption={search.searchFn ?? search.searchFunctions[0]?.id ?? 'fuzzy'}
                        onSelectedOptionChange={search.onChangeSearchFn}
                      />
                    </div>
                  ) : null}

                  <Content
                    isMobile
                    onClose={handleCloseDrawer}
                    onLinkChange={onLinkChange}
                    className={styles.content}
                    searchValue={searchValue}
                    banners={rightTop}
                    favorite={favorite}
                    serviceGroups={resultItems}
                  />
                </div>
              ) : null}

              {isInitialEmptyCards && rightTop ? <div className={styles.bannersWrap}>{rightTop}</div> : null}

              {hasBottomItems ? (
                <div className={styles.bottom} data-test-id={TEST_IDS.leftBottom}>
                  <div className={styles.bottomDivider}>
                    <Divider />
                  </div>

                  <div className={styles.bottomItems} data-test-id={TEST_IDS.leftBottomItems}>
                    {settingItems?.items.map(item => (
                      <CardServiceLight
                        {...(item.href ? { href: item.href, as: 'a' } : { as: 'button', type: 'button' })}
                        key={item.id}
                        title={item.label}
                        icon={getLinkEmblem(item)}
                        onClick={wrappedSettingClick(item)}
                        disabled={item.disabled}
                        className={styles.bottomCard}
                        data-test-id={TEST_IDS.setting(item.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </DesktopDrawerCustom.Body>
        </AdaptiveProvider>
      </DesktopDrawerCustom>
    </ChildThemeProvider>
  );
}
