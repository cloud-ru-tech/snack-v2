import { CrossCircleSVG } from '@ds/icons/interface/system';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { useAttachmentContext } from '../../context';
import { AttachmentProps } from '../../types';
import { Text } from '../Text';
import styles from './styles.module.scss';

export type TextBlockProps = Pick<AttachmentProps, 'title' | 'description' | 'error' | 'className'> & {
  align?: 'center' | 'left';
};

export function TextBlock({ title, description, error, className, align = 'left' }: TextBlockProps) {
  const { size = 's', truncate = {} } = useAttachmentContext();

  return (
    <div className={cn(styles.content, className)} data-size={size} data-align={align}>
      <Text
        className={styles.title}
        text={title}
        data-test-id={TEST_IDS.title}
        maxLines={truncate?.title}
        data-size={size}
      />
      <Text
        className={styles.description}
        text={description}
        data-test-id={TEST_IDS.description}
        maxLines={truncate?.description}
        data-size={size}
      />
      {error && (
        <div className={styles.error} data-size={size}>
          <CrossCircleSVG size={16} className={styles.errorIcon} />
          <Text text={error} data-test-id={TEST_IDS.error} maxLines={truncate?.error} />
        </div>
      )}
    </div>
  );
}
