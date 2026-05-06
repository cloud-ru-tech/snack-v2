import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';

import { TEST_IDS } from '../../constants';
import { TitleClickableProps } from '../../types';
import { TitleClickableAvatar } from '../TitleClickableAvatar';
import { TitleClickableIcon } from '../TitleClickableIcon';
import styles from './styles.module.scss';

type TitleClickableContentProps = Pick<
  TitleClickableProps,
  'title' | 'before' | 'icon' | 'children' | 'titleTag' | 'avatar' | 'fullWidth'
>;

export function TitleClickableContent({
  title,
  before,
  icon,
  children,
  titleTag,
  avatar,
  fullWidth,
}: TitleClickableContentProps) {
  const beforeNode =
    before ??
    (icon ? <TitleClickableIcon icon={icon} /> : null) ??
    (avatar ? <TitleClickableAvatar {...avatar} /> : null);

  return (
    <div data-test-id={TEST_IDS.content} className={styles.contentWrapper} data-full-width={fullWidth || undefined}>
      {beforeNode}

      {title && (
        <Typography variant='title' size='m' as={titleTag} data-test-id={TEST_IDS.title} className={styles.title}>
          <TruncateString text={title} maxLines={1} variant='end' />
        </Typography>
      )}

      {children}
    </div>
  );
}
