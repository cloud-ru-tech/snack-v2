import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../../../constants';
import styles from './styles.module.scss';

export type NotificationPanelGroupProps = WithSupportProps<{
  /** Заголовок группы */
  title: string;
  /** Содержимое группы */
  children: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

/** Группа уведомлений с заголовком внутри панели */
export function NotificationPanelGroup({ title, children, className, ...rest }: NotificationPanelGroupProps) {
  return (
    <div className={cn(styles.root, className)} data-test-id={TEST_IDS.panel.group.root} {...extractSupportProps(rest)}>
      <div className={styles.title} data-test-id={TEST_IDS.panel.group.title}>
        <Typography variant='label' size='s' weight='thin' as='span' className={styles.text}>
          <TruncateString text={title} />
        </Typography>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
