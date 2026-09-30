import { ExitSVG } from '@ds/icons/interface/product';
import { BaseItem } from '@ds/list';
import { useMemo } from 'react';

import { headerLocale } from '../../../locale';
import styles from '../styles.module.scss';

export function useLogoutItem({ onLogout }: { onLogout?(): void }): BaseItem {
  const { t } = headerLocale.useTranslations();

  return useMemo<BaseItem>(
    () => ({
      beforeContent: <ExitSVG />,
      content: {
        label: t('logout'),
      },
      className: styles.logoutItem,
      onClick: onLogout,
      'data-test-id': 'header__user-menu__logout',
    }),
    [onLogout, t],
  );
}
