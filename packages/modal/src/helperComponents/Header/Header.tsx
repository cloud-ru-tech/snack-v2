import { Button } from '@design-system/button';
import { ArrowLeftSVG } from '@design-system/icons';
import { TruncateString } from '@design-system/truncate-string';
import { Typography } from '@design-system/typography';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { type ReactNode, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<{
  /** Заголовок */
  title?: string;
  /** id для aria-labelledby */
  titleId?: string;
  /** Слот после заголовка */
  slotAfterHeadline?: ReactNode;
  /** Подзаголовок */
  subtitle?: ReactNode;
  /**
   * Максимальное число строк перед обрезкой (`TruncateString`).
   * Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется.
   * @default title: 1; subtitle (string): 2
   */
  truncate?: {
    title?: number;
    subtitle?: number;
  };
  /** CSS-класс */
  className?: string;
  /** Действие при клике по кнопке «назад». Отсутствие скрывает кнопку */
  onBackButtonClick?(): void;
}>;

export function Header({
  title,
  titleId,
  subtitle,
  className,
  onBackButtonClick,
  slotAfterHeadline,
  truncate,
  ...rest
}: HeaderProps) {
  const withBackButton = Boolean(onBackButtonClick);

  const hasTitle = Boolean(title || slotAfterHeadline);
  const hasHeadline = Boolean(onBackButtonClick || hasTitle);
  const hasHeader = Boolean(hasHeadline || subtitle);

  const titleContent = useMemo(() => {
    if (!title) {
      return undefined;
    }

    return <TruncateString maxLines={truncate?.title ?? 1} text={title} />;
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
