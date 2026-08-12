export const TEST_IDS = {
  trigger: 'header__drawer-menu-button',
  drawer: 'header__drawer-menu',
  drawerMobile: 'header__drawer-menu-mobile',
  content: 'header__drawer-menu__content',
  left: 'header__drawer-menu__left',
  leftTop: 'header__drawer-menu__left-top',
  leftMain: 'header__drawer-menu__left-main',
  leftNavList: 'header__drawer-menu__left-nav-list',
  leftBottom: 'header__drawer-menu__left-bottom',
  leftBottomItems: 'header__drawer-menu__left-bottom-items',
  divider: 'header__drawer-menu__divider',
  right: 'header__drawer-menu__right',
  search: 'header__drawer-menu__search',
  banners: 'header__drawer-menu__banners',
  services: 'header__drawer-menu__services',
  noData: 'header__drawer-menu__no-data',
  noDataFound: 'header__drawer-menu__no-data-found',
  groupCard: (id: string) => `header__drawer-menu__group-card-${id}`,
  link: (id: string) => `header__drawer-menu__link-${id}`,
  navGroup: (id: string) => `header__drawer-menu__nav-group-${id}`,
  setting: (id: string) => `header__drawer-menu__setting-${id}`,
  servicesCategory: {
    root: 'services-category',
    title: 'services-category__title',
    services: 'services-category__services',
  },
  navigationSearch: {
    root: 'navigation-search',
    title: 'navigation-search__title',
    openSearchButton: 'navigation-search__open-search-button',
    search: 'navigation-search__search',
    settingsButton: 'navigation-search__settings-button',
    settings: 'navigation-search__settings',
    option: (id: string) => `navigation-search__option-${id}`,
  },
} as const;

/** Ширина drawer desktop (Figma `navigationOldDrawer` / window). */
export const DEFAULT_DRAWER_WIDTH = 1120;

/** Ширина левой колонки (Figma `navigationOldContent` / left). */
export const LEFT_COLUMN_WIDTH = 256;
