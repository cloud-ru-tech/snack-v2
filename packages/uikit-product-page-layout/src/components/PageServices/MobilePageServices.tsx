import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { ActionsProps, MobileActions } from '../Actions';
import { Headline, HeadlineProps } from '../Headline';
import { SidebarSelect, SidebarSelectProps } from '../PageSidebar';
import styles from './mobileStyles.module.scss';

export type MobilePageServicesProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'slotBeforeTitle' | 'subtitle' | 'slotAfterTitle'> & {
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
  ...rest
}: MobilePageServicesProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      {/* Триггер-селект «Информация» — full-bleed строка с разделителем снизу (Figma 3334:63034). */}
      {sidebar && <SidebarSelect {...sidebar} className={styles.sidebarSelect} />}

      <div className={styles.body}>
        <Headline title={title} slotBeforeTitle={slotBeforeTitle} slotAfterTitle={slotAfterTitle} subtitle={subtitle} />

        {actions.length > 0 && <MobileActions items={actions} maxVisibleItems={maxVisibleActionsItems} />}

        <div className={styles.childWrapper}>{children}</div>
      </div>
    </div>
  );
}
