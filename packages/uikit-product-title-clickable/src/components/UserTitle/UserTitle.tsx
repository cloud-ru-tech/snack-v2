import { Avatar, AvatarProps } from '@ds/avatar';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { excludeSupportProps, extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type UserTitleProps = Omit<AvatarProps, 'children'> & {
  /** Подпись под именем пользователя. */
  subtitle?: string;
};

export function UserTitle({ subtitle, className, size = 'm', name, ...avatarProps }: UserTitleProps) {
  return (
    <div className={cn(styles.userTitle, className)} {...extractSupportProps(avatarProps)}>
      <Avatar
        {...excludeSupportProps(avatarProps)}
        name={name}
        size={size}
        className={styles.avatar}
        data-test-id={TEST_IDS.avatar}
      />
      <div className={styles.text}>
        <Typography variant='label' size='l' as='span' data-test-id={TEST_IDS.avatarLabel} className={styles.line}>
          <TruncateString text={name} maxLines={1} variant='end' />
        </Typography>
        {subtitle && (
          <Typography
            variant='body'
            size='s'
            as='span'
            className={cn(styles.line, styles.subtitle)}
            data-test-id={TEST_IDS.avatarSubtitle}
          >
            <TruncateString text={subtitle} maxLines={1} variant='end' />
          </Typography>
        )}
      </div>
    </div>
  );
}
