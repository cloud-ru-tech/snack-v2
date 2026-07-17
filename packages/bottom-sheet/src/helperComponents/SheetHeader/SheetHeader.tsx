import { Button } from '@ds/button';
import { ArrowLeftSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { BottomSheetHeaderProps } from '../../types';
import styles from './styles.module.scss';

export type SheetHeaderProps = BottomSheetHeaderProps;

/** Header bottom-sheet'а: back-button + title + slotAfterTitle + actionButton + subtitle. */
export function SheetHeader({
  title,
  titleId,
  slotAfterTitle,
  subtitle,
  onBackButtonClick,
  actionButton,
  className,
  ...rest
}: SheetHeaderProps) {
  const hasHeadline = Boolean(title || onBackButtonClick || actionButton || slotAfterTitle);

  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.header}>
      {hasHeadline && (
        <div
          className={styles.headlineWrapper}
          data-with-before={Boolean(onBackButtonClick) || undefined}
          data-with-after={Boolean(actionButton) || undefined}
        >
          {onBackButtonClick && (
            <Button
              view='function'
              appearance='neutral'
              size='m'
              icon={<ArrowLeftSVG />}
              aria-label='Назад'
              onClick={onBackButtonClick}
              data-test-id={TEST_IDS.backButton}
            />
          )}

          <div className={styles.headline}>
            {title && (
              <Typography variant='title' size='l' id={titleId} className={styles.title} data-test-id={TEST_IDS.title}>
                {title}
              </Typography>
            )}
            {slotAfterTitle && (
              <span className={styles.slotAfterTitle} data-test-id={TEST_IDS.slotAfterTitle}>
                {slotAfterTitle}
              </span>
            )}
          </div>

          {actionButton && (
            <span className={styles.actionButton} data-test-id={TEST_IDS.actionButton}>
              {actionButton}
            </span>
          )}
        </div>
      )}

      {subtitle && (
        <div className={styles.subHeadlineWrapper} data-test-id={TEST_IDS.subtitle}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
