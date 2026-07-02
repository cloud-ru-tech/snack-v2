import { ValueOf } from '@ds/utils';

import {
  BUTTON_PRIMARY_VARIANT,
  BUTTON_SECONDARY_VARIANT,
  SIDEBAR_HEADER_TYPE,
  SIDEBAR_ITEM_TYPE,
  TREE_NAVIGATION_MODE,
} from './constants';

export type ButtonPrimaryVariant = ValueOf<typeof BUTTON_PRIMARY_VARIANT>;
export type ButtonSecondaryVariant = ValueOf<typeof BUTTON_SECONDARY_VARIANT>;
export type TreeNavigationMode = ValueOf<typeof TREE_NAVIGATION_MODE>;
export type SidebarItemType = ValueOf<typeof SIDEBAR_ITEM_TYPE>;
export type SidebarHeaderType = ValueOf<typeof SIDEBAR_HEADER_TYPE>;
