import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { ActionsProps, MobileActions } from '../Actions';
import { Headline, HeadlineProps } from '../Headline';
import { SidebarSelect, SidebarSelectProps } from '../PageSidebar';
import styles from './mobileStyles.module.scss';

export type MobilePageServicesProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'slotBeforeTitle' | 'subtitle' | 'slotAfterTitle' | 'truncateTitle'> & {
      className?: string;
      sidebar?: SidebarSelectProps;
      actions?: ActionsProps['items'];
      maxVisibleActionsItems?: ActionsProps['maxVisibleItems'];
    }
  >
>;

export function MobilePageServices({
  children,
  title,
  actions = [],
  className,
  sidebar,
  slotAfterTitle,
  subtitle,
  slotBeforeTitle,
  maxVisibleActionsItems,
  truncateTitle,
  ...rest
}: MobilePageServicesProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <div className={styles.body}>
        <div className={styles.headlineWrapper}>
          <Headline
            title={title}
            truncateTitle={truncateTitle}
            slotBeforeTitle={slotBeforeTitle}
            slotAfterTitle={slotAfterTitle}
            subtitle={subtitle}
          />

          {sidebar && <SidebarSelect {...sidebar} />}

          {actions.length > 0 && <MobileActions items={actions} maxVisibleItems={maxVisibleActionsItems} />}
        </div>

        <div className={styles.childWrapper}>{children}</div>
      </div>
    </div>
  );
}
