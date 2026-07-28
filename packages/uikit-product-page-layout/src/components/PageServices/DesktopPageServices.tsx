import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { Headline } from '../Headline';
import { PageSidebar } from '../PageSidebar';
import { usePageHeight } from './hooks';
import styles from './styles.module.scss';
import { DesktopPageServicesProps } from './types';

export function DesktopPageServices({
  children,
  title,
  actions,
  className,
  sidebar,
  slotBeforeTitle,
  subtitle,
  slotAfterTitle,
  truncateTitle,
  autoHeight,
  limitContentMaxWidth,
  ...rest
}: DesktopPageServicesProps) {
  const height = usePageHeight(autoHeight);

  return (
    <div
      className={cn(styles.wrapper, className)}
      {...(!autoHeight && { style: { height } })}
      {...extractSupportProps(rest)}
    >
      <div className={styles.tempContainer}>
        <div className={styles.container} data-limited={limitContentMaxWidth}>
          <Headline
            title={title}
            actions={actions}
            slotBeforeTitle={slotBeforeTitle}
            slotAfterTitle={slotAfterTitle}
            subtitle={subtitle}
            truncateTitle={truncateTitle}
          />

          <div className={styles.childWrapper}>{children}</div>
        </div>
      </div>
      {sidebar && (
        <div className={styles.sidebar}>
          <PageSidebar {...sidebar} />
        </div>
      )}
    </div>
  );
}

DesktopPageServices.displayName = 'DesktopPageServices';
