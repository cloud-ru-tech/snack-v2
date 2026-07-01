import { SheetHeaderProps } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { ArrowLeftSVG } from '@ds/icons';
import { Typography } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type DrawerHeaderProps = SheetHeaderProps & {
  /** Подзаголовок под заголовком. */
  subtitle?: ReactNode;
};

/** Header дровера (desktop). */
export function DrawerHeader({
  title,
  subtitle,
  className,
  onBackButtonClick,
  slotAfterHeadline,
  ...rest
}: DrawerHeaderProps) {
  const withBackButton = Boolean(onBackButtonClick);

  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)}>
      <div className={styles.headline} data-withbackbutton={withBackButton || undefined}>
        {onBackButtonClick && (
          <Button view='function' appearance='neutral' icon={<ArrowLeftSVG />} onClick={onBackButtonClick} />
        )}

        <div className={styles.headlineWrapper} data-withbackbutton={withBackButton || undefined}>
          <Typography variant='headline' size='s' className={styles.title} data-test-id={TEST_IDS.title}>
            {title}
          </Typography>

          {slotAfterHeadline}
        </div>
      </div>

      {subtitle && (
        <div className={styles.subtitleWrapper}>
          <Typography variant='body' size='m' className={styles.subtitle} data-test-id={TEST_IDS.subtitle}>
            {subtitle}
          </Typography>
        </div>
      )}
    </div>
  );
}
