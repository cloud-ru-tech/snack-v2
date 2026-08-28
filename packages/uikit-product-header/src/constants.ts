export const TEST_IDS = {
  headerLayout: {
    root: 'header-layout',
  },
  mainMenu: {
    root: 'header',
    drawerButton: 'header__drawer-menu-button',
    drawer: 'header__drawer-menu',
    drawerMobile: 'header__drawer-menu-mobile',
    search: 'header__drawer-menu__search',
    left: 'header__drawer-menu__left',
    right: 'header__drawer-menu__right',
    leftBottom: 'header__drawer-menu__left-bottom',
    leftBottomItems: 'header__drawer-menu__left-bottom-items',
  },
  userMenu: {
    root: 'header__user-menu',
    button: 'header__user-menu__button',
    mobile: 'header__user-menu-mobile',
    themeMode: 'header__user-menu__theme-mode',
    themeModeLight: 'header__user-menu__theme-mode__light-option',
    themeModeDark: 'header__user-menu__theme-mode__dark-option',
    themeModeSystem: 'header__user-menu__theme-mode__system-option',
  },
  breadcrumbs: {
    root: 'header__breadcrumbs',
  },
} as const;

// Только mobile: в мастере bottomSheet панель открывается на всю высоту экрана.
export const BOTTOM_SHEET_FULLSCREEN_SNAP_POINTS = [1];
