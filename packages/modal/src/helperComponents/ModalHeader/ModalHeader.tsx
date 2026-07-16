import { SheetHeaderProps } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { ArrowLeftSVG } from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalHeaderProps = SheetHeaderProps & {
  /** Подзаголовок под заголовком. */
  subtitle?: ReactNode;
  /** Усечение `title`/`subtitle` (TruncateString). */
  truncate?: {
    title?: number;
    subtitle?: number;
  };
};

/** Header модалки (desktop). */
export function ModalHeader({
  title,
  titleId,
  subtitle,
  className,
  onBackButtonClick,
  slotAfterHeadline,
  truncate,
  ...rest
}: ModalHeaderProps) {
  const withBackButton = Boolean(onBackButtonClick);
  const hasTitle = Boolean(title || slotAfterHeadline);
  const hasHeadline = Boolean(onBackButtonClick || hasTitle);
  const hasHeader = Boolean(hasHeadline || subtitle);

  const titleContent = useMemo(() => {
    if (!title) {
      return undefined;
    }
    return typeof title === 'string' ? <TruncateString maxLines={truncate?.title ?? 1} text={title} /> : title;
  }, [title, truncate?.title]);

  const subtitleContent = useMemo((): ReactNode | undefined => {
    if (!subtitle) {
      return undefined;
    }
    if (typeof subtitle === 'string') {
      return <TruncateString maxLines={truncate?.subtitle ?? 2} text={subtitle} />;
    }
    return subtitle;
  }, [subtitle, truncate?.subtitle]);

  if (!hasHeader) {
    return <div className={styles.safeAreaTop} />;
  }

  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)}>
      {hasHeadline && (
        <div className={styles.headline} data-withbackbutton={withBackButton || undefined}>
          {onBackButtonClick && (
            <Button
              view='function'
              appearance='neutral'
              icon={<ArrowLeftSVG />}
              onClick={onBackButtonClick}
              data-test-id={TEST_IDS.backButton}
            />
          )}

          {hasTitle && (
            <div className={styles.headlineWrapper} data-withbackbutton={withBackButton || undefined}>
              <Typography
                variant='headline'
                size='s'
                className={styles.title}
                id={titleId}
                data-test-id={TEST_IDS.title}
              >
                {titleContent}
              </Typography>

              {slotAfterHeadline && (
                <div className={styles.slotAfterHeadline} data-test-id={TEST_IDS.slotAfterHeadline}>
                  {slotAfterHeadline}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {subtitle && (
        <div className={styles.subtitleWrapper}>
          <Typography variant='body' size='m' className={styles.subtitle} data-test-id={TEST_IDS.subtitle}>
            {subtitleContent}
          </Typography>
        </div>
      )}
    </div>
  );
}
