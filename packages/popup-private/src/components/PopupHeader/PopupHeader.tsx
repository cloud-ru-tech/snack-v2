import { Button } from '@ds/button';
import { ArrowLeftSVG } from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { OVERLAY_SURFACE, useOverlaySurface, useSurfaceTokenSegment } from '../../context/overlaySurface';
import { PopupHeaderProps } from '../../types';
import styles from './styles.module.scss';

/** Header overlay'я: back-button + title + slotAfterTitle + actionButton + subtitle + slotSecondTitle. */
export function PopupHeader({
  title,
  titleId,
  slotAfterTitle,
  subtitle,
  slotSecondTitle,
  onBackButtonClick,
  actionButton,
  truncate,
  testIds,
  className,
  ...rest
}: PopupHeaderProps) {
  const surface = useSurfaceTokenSegment();
  // `slotSecondTitle` (search/segment) есть только в мастере bottomSheet — на window/modal/drawer игнор.
  const isSheet = useOverlaySurface() === OVERLAY_SURFACE.Sheet;
  const hasHeadline = Boolean(title || onBackButtonClick || actionButton || slotAfterTitle);

  // Мобильный sheet — крупный `title-l`; desktop window (modal/drawer) — `headline-s`.
  const titleContent =
    truncate?.title !== undefined && typeof title === 'string' ? (
      <TruncateString maxLines={truncate.title} text={title} />
    ) : (
      title
    );
  const subtitleContent =
    truncate?.subtitle !== undefined && typeof subtitle === 'string' ? (
      <TruncateString maxLines={truncate.subtitle} text={subtitle} />
    ) : (
      subtitle
    );

  // Потребитель-обёртка может переопределить id слотов; пропущенные берём из `TEST_IDS`.
  const ids = {
    header: testIds?.header ?? TEST_IDS.header,
    title: testIds?.title ?? TEST_IDS.title,
    slotAfterTitle: testIds?.slotAfterTitle ?? TEST_IDS.slotAfterTitle,
    subtitle: testIds?.subtitle ?? TEST_IDS.subtitle,
    slotSecondTitle: testIds?.slotSecondTitle ?? TEST_IDS.slotSecondTitle,
    backButton: testIds?.backButton ?? TEST_IDS.backButton,
    actionButton: testIds?.actionButton ?? TEST_IDS.actionButton,
  };

  return (
    <div
      className={cn(styles.root, className)}
      data-surface={surface}
      {...extractSupportProps(rest)}
      data-test-id={ids.header}
    >
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
              data-test-id={ids.backButton}
            />
          )}

          <div className={styles.headline}>
            {title && (
              <Typography
                variant={isSheet ? 'title' : 'headline'}
                size={isSheet ? 'l' : 's'}
                id={titleId}
                className={styles.title}
                data-test-id={ids.title}
              >
                {titleContent}
              </Typography>
            )}
            {slotAfterTitle && (
              <span className={styles.slotAfterHeadline} data-test-id={ids.slotAfterTitle}>
                {slotAfterTitle}
              </span>
            )}
          </div>

          {actionButton && (
            <span className={styles.actionButton} data-test-id={ids.actionButton}>
              {actionButton}
            </span>
          )}
        </div>
      )}

      {subtitle && (
        <div className={styles.subtitleWrapper} data-test-id={ids.subtitle}>
          <Typography variant='body' size='m' className={styles.subtitle}>
            {subtitleContent}
          </Typography>
        </div>
      )}

      {isSheet && slotSecondTitle && (
        <div className={styles.secondWrapper} data-test-id={ids.slotSecondTitle}>
          {slotSecondTitle}
        </div>
      )}
    </div>
  );
}
