import { ValueOf } from '@ds/utils';

export const FAVORITES_SEGMENT = {
  Favorites: 'favorites',
  Recent: 'recent',
} as const;

export type FavoritesSegment = ValueOf<typeof FAVORITES_SEGMENT>;

export const FAVORITES_TEST_IDS = {
  root: 'header__drawer-menu__favorites',
  header: 'header__drawer-menu__favorites-header',
  segmentControl: 'header__drawer-menu__favorites-segment',
  settingsButton: 'header__drawer-menu__favorites-settings',
  list: 'header__drawer-menu__favorites-list',
  emptyState: 'header__drawer-menu__favorites-empty',
  dropZone: 'header__drawer-menu__favorites-drop-zone',
} as const;
