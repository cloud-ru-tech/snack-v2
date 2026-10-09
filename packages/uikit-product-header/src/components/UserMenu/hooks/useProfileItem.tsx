import { Avatar } from '@ds/avatar';
import { SettingsSVG } from '@ds/icons/interface/system';
import { BaseItemProps } from '@ds/list';
import { TruncateString } from '@ds/truncate-string';
import { useMemo } from 'react';

import styles from '../styles.module.scss';
import { UserProfileProps } from '../types';

export function useProfileItem({
  fullName = '',
  email = '',
  itemWrapRender,
  onClick,
  isMobile,
}: UserProfileProps & { isMobile?: boolean }): BaseItemProps {
  return useMemo(
    () => ({
      // Desktop + ListCustom: ReactNode — иначе ContentWrapperCustom рисует label с
      // `regular-body-s`, а `className` айтема на `.label` не действует.
      // Mobile (size=m, без ListCustom): структурный content → дефолтный ItemContent.
      content: isMobile ? (
        {
          label: fullName,
          description: email,
          truncate: {
            description: 1,
          },
        }
      ) : (
        <div className={styles.userItemContent}>
          <div className={styles.userItemHeadline}>
            <TruncateString className={styles.userItemLabel} text={fullName} maxLines={1} />
          </div>
          {email ? <TruncateString className={styles.userItemDescription} text={email} maxLines={1} /> : null}
        </div>
      ),
      onClick,
      beforeContent: <Avatar appearance='red' size='s' name={fullName} showTwoSymbols />,
      afterContent: <SettingsSVG className={styles.profileSettingsIcon} />,
      itemWrapRender,

      id: 'header__user-menu__button',
      'data-test-id': 'header__user-menu__manage-profile',
    }),
    [email, fullName, isMobile, itemWrapRender, onClick],
  );
}
