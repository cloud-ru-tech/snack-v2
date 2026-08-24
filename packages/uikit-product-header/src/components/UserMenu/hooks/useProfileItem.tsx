import { Avatar } from '@ds/avatar';
import { SettingsSVG } from '@ds/icons/interface/system';
import { BaseItemProps } from '@ds/list';
import { useMemo } from 'react';

import { UserProfileProps } from '../types';

export function useProfileItem({
  fullName = '',
  email = '',
  itemWrapRender,
  onClick,
}: UserProfileProps): BaseItemProps {
  return useMemo(
    () => ({
      content: {
        label: fullName,
        description: email,
        truncate: {
          description: 1,
        },
      },
      onClick,
      beforeContent: <Avatar appearance='red' size='s' name={fullName} showTwoSymbols />,
      afterContent: <SettingsSVG />,
      itemWrapRender,

      id: 'header__user-menu__button',
      'data-test-id': 'header__user-menu__manage-profile',
    }),
    [email, fullName, itemWrapRender, onClick],
  );
}
