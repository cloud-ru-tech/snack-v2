import { ExitSVG } from '@ds/icons/interface/product';
import { ListProps } from '@ds/list';
import { useMemo } from 'react';

import { headerLocale } from '../../../locale';

export function useLogoutItem({ onLogout }: { onLogout?(): void }): ListProps['items'] {
  const { t } = headerLocale.useTranslations();

  return useMemo<ListProps['items']>(
    () => [
      {
        beforeContent: <ExitSVG />,
        content: {
          label: t('logout'),
        },
        onClick: onLogout,
        'data-test-id': 'header__user-menu__logout',
      },
    ],
    [onLogout, t],
  );
}
