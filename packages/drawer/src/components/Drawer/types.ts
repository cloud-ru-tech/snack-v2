import { WithSupportProps } from '@ds/utils';
import { ReactElement, ReactNode } from 'react';

import { DrawerBodyProps, DrawerHeaderProps } from '../../helperComponents';
import { DrawerCustomProps } from '../DrawerCustom';

export type DrawerProps = WithSupportProps<
  Exclude<DrawerCustomProps, 'nestedDrawer' | 'push'> &
    DrawerHeaderProps &
    Pick<DrawerBodyProps, 'content'> & {
      /** CSS-класс */
      className?: string;
      /** Медиа-контент */
      media?: ReactNode;
      /** Футер */
      footer?: ReactNode;
      /** Вложенный Drawer */
      nestedDrawer?: ReactElement<DrawerProps>;
    }
>;
