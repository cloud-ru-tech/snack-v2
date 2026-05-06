import { Avatar, AvatarProps } from '@ds/avatar';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';

import { TEST_IDS } from '../../constants';
import styles from '../TitleClickable/styles.module.scss';

export type TitleClickableAvatarProps = AvatarProps & {
  /** Подпись под именем (e-mail, роль и т.п.). */
  subtitle: string;
};

export function TitleClickableAvatar({ subtitle, ...avatarProps }: TitleClickableAvatarProps) {
  return (
    <>
      <Avatar {...avatarProps} data-test-id={TEST_IDS.avatar} />
      <div className={styles.avatarWrapper}>
        <Typography variant='label' size='l' as='span' data-test-id={TEST_IDS.avatarLabel}>
          <TruncateString text={avatarProps.name} maxLines={1} variant='end' />
        </Typography>
        <Typography
          variant='body'
          size='s'
          as='span'
          className={styles.avatarSubtitle}
          data-test-id={TEST_IDS.avatarSubtitle}
        >
          <TruncateString text={subtitle} maxLines={1} variant='end' />
        </Typography>
      </div>
    </>
  );
}
