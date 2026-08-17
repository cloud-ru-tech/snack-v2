import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';

import { TEST_IDS } from '../../constants';
import { TitleClickableProps } from '../../types';
import { TitleClickableAvatar } from '../TitleClickableAvatar';
import { TitleClickableIcon } from '../TitleClickableIcon';
import styles from './styles.module.scss';

type TitleClickableContentProps = Pick<
  TitleClickableProps,
  'title' | 'icon' | 'children' | 'titleTag' | 'avatar' | 'fullWidth'
>;

export function TitleClickableContent({
  title,
  icon,
  children,
  titleTag,
  avatar,
  fullWidth,
}: TitleClickableContentProps) {
  const afterTitleNode = children ?? (avatar ? <TitleClickableAvatar {...avatar} /> : null);

  return (
    <div data-test-id={TEST_IDS.content} className={styles.contentWrapper} data-full-width={fullWidth || undefined}>
      {icon ? <TitleClickableIcon icon={icon} /> : null}

      {title && (
        <Typography variant='title' size='m' as={titleTag} data-test-id={TEST_IDS.title} className={styles.title}>
          <TruncateString text={title} maxLines={1} variant='end' />
        </Typography>
      )}

      {afterTitleNode}
    </div>
  );
}
