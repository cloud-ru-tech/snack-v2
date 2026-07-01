import { InfoBlock, InfoBlockProps } from '@ds/info-block';
import cn from 'classnames';

import { TEST_IDS } from '../../../../constants';
import styles from './styles.module.scss';

export type NotificationPanelBlankProps = Omit<InfoBlockProps, 'footer' | 'align' | 'size'>;

/** Заглушка вместо карточек в панели */
export function NotificationPanelBlank({ icon, className, ...props }: NotificationPanelBlankProps) {
  return (
    <InfoBlock
      {...props}
      icon={icon ? { ...icon, appearance: icon.appearance ?? 'neutral' } : undefined}
      size='l'
      align='vertical'
      className={cn(styles.notificationPanelBlank, className)}
      data-test-id={props['data-test-id'] ?? TEST_IDS.panel.blank}
    />
  );
}
