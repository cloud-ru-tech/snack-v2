import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ElementType, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type SimpleTitleProps = WithSupportProps<{
  /** Текст заголовка. */
  title: string;
  /** Иконка слева, 24×24. */
  icon?: ReactNode;
  /** Семантический тег заголовка. */
  titleTag?: ElementType;
  /** CSS-класс корневого контейнера. */
  className?: string;
}>;

export function SimpleTitle({ title, icon, titleTag, className, ...rest }: SimpleTitleProps) {
  return (
    <div className={cn(styles.simpleTitle, className)} {...extractSupportProps(rest)}>
      {icon && (
        <span className={styles.icon} data-test-id={TEST_IDS.icon} aria-hidden>
          {icon}
        </span>
      )}
      <Typography variant='title' size='m' as={titleTag} className={styles.title} data-test-id={TEST_IDS.title}>
        <TruncateString text={title} maxLines={1} variant='end' />
      </Typography>
    </div>
  );
}
