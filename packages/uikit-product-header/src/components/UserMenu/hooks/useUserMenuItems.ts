import { BaseItemProps, GroupItemProps, isBaseItemProps, ListProps } from '@ds/list';
import { MouseEvent, useMemo } from 'react';

import { EMPTY_ARRAY } from '../../../utils/emptyArray';
import { shouldBeOpenedInNewTab } from '../../../utils/shouldBeOpenedInNewTab';
import { ThemeProps, UserProfileProps } from '../types';
import { useLogoutItem } from './useLogoutItem';
import { useProfileItem } from './useProfileItem';
import { useThemeItem } from './useThemeItem';

type UseMenuItems = {
  profile: UserProfileProps;

  theme?: ThemeProps;

  topItems?: ListProps['items'];

  organizationItems?: ListProps['items'];

  bottomItems?: ListProps['items'];

  settingItems?: BaseItemProps[];

  onLogout?(): void;

  onClose?(): void;

  isMobile?: boolean;
};

type UserMenuSections = Required<Pick<ListProps, 'pinTop' | 'items' | 'pinBottom'>>;

const DIVIDER_ITEM: GroupItemProps = {
  type: 'group',
  divider: true,
  items: [],
};

export function useUserMenuItems({
  profile,
  theme,
  onLogout,
  topItems = EMPTY_ARRAY,
  organizationItems = EMPTY_ARRAY,
  bottomItems = EMPTY_ARRAY,
  isMobile,
  onClose,
  settingItems = EMPTY_ARRAY,
}: UseMenuItems): UserMenuSections {
  const profileItem = useProfileItem(profile);
  const themeItem = useThemeItem({ ...(theme || {}), isMobile, onClose });
  const logoutItem = useLogoutItem({ onLogout });

  return useMemo(() => {
    const withClose = (list: ListProps['items']): ListProps['items'] =>
      list.map(item => {
        if (isBaseItemProps(item)) {
          return {
            ...item,
            onClick: (e: MouseEvent<HTMLElement>) => {
              item.onClick?.(e);

              if (!shouldBeOpenedInNewTab(e)) {
                onClose?.();
              }
            },
          };
        }
        return item;
      });

    let pinTop: ListProps['items'] = [profileItem];

    if (themeItem) {
      pinTop = pinTop.concat([DIVIDER_ITEM, themeItem]);
    }

    pinTop = pinTop.concat(topItems);

    let pinBottom = bottomItems.concat(logoutItem);

    // В шторке прокручивается всё меню, закреплять части незачем; разделитель над организациями добавляем сами
    if (isMobile) {
      if (settingItems?.length) {
        pinBottom = [...bottomItems, ...settingItems, DIVIDER_ITEM, logoutItem];
      }

      return {
        pinTop: [],
        items: withClose([...pinTop, DIVIDER_ITEM, ...organizationItems, ...pinBottom]),
        pinBottom: [],
      };
    }

    // Без организаций прокручивать нечего: пустой `items` показал бы заглушку «Нет данных»
    if (!organizationItems.length) {
      return { pinTop: [], items: withClose([...pinTop, DIVIDER_ITEM, ...pinBottom]), pinBottom: [] };
    }

    return { pinTop: withClose(pinTop), items: withClose(organizationItems), pinBottom: withClose(pinBottom) };
  }, [bottomItems, isMobile, logoutItem, onClose, organizationItems, profileItem, settingItems, themeItem, topItems]);
}
