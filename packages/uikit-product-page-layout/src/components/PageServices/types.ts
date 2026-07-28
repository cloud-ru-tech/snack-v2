import { WithSupportProps } from '@ds/utils';
import { PropsWithChildren } from 'react';

import { HeadlineProps } from '../Headline';
import { PageSidebarProps } from '../PageSidebar';

export type DesktopPageServicesProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'actions' | 'subtitle' | 'slotAfterTitle' | 'slotBeforeTitle' | 'truncateTitle'> & {
      className?: string;
      sidebar?: PageSidebarProps;
      autoHeight?: boolean;
      limitContentMaxWidth?: boolean;
    }
  >
>;
