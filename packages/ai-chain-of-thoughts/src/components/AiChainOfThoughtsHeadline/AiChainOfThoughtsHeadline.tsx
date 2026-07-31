import { AiButtonChevron } from '@ds/ai-button-chevron';
import { AiIconGiga, GIGA_MASK_IMAGE } from '@ds/ai-icon-giga';
import { AiShimmer } from '@ds/ai-shimmer';
import cn from 'classnames';
import { ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { aiChainOfThoughtsLocale } from '../../locale';
import { AiChainOfThoughtsHeadlineProps } from '../../types';
import { DurationUnit, formatDuration } from '../../utils/duration';
import styles from './styles.module.scss';

/** Семантическая единица длительности → ключ словаря для локализованной подписи. */
const DURATION_UNIT_MESSAGE = {
  days: 'durationDays',
  hours: 'durationHours',
  minutes: 'durationMinutes',
  seconds: 'durationSeconds',
} as const satisfies Record<DurationUnit, string>;

export function AiChainOfThoughtsHeadline({
  inProgress = true,
  broken = false,
  duration,
  label,
  brokenMessage,
  collapsible = false,
  opened = false,
  onToggle,
  className,
  'aria-controls': ariaControls,
  'data-test-id': dataTestId = TEST_IDS.headline,
  ...rest
}: AiChainOfThoughtsHeadlineProps): ReactElement {
  const { t } = aiChainOfThoughtsLocale.useTranslations();
  const active = inProgress || broken;
  const resolvedLabel = label ?? t(active ? 'inProgress' : 'done');
  const resolvedBrokenMessage = brokenMessage ?? t('broken');
  const durationSegments = duration != null ? formatDuration(duration) : [];
  const showChevron = collapsible && Boolean(onToggle);
  const shimmerText = active && typeof resolvedLabel === 'string' ? resolvedLabel : null;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-in-progress={inProgress || undefined}
      data-broken={broken || undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.status}>
        {shimmerText !== null ? (
          <span className={styles.shimmer}>
            <AiShimmer
              text={shimmerText}
              iconMask={GIGA_MASK_IMAGE}
              iconSize={16}
              variant='body'
              size='s'
              weight='regular'
              data-test-id={TEST_IDS.headlineLabel}
            />
          </span>
        ) : (
          <span className={styles.lead}>
            {active && <AiIconGiga className={styles.icon} size={16} data-test-id={TEST_IDS.headlineIcon} />}
            <span className={styles.label} data-test-id={TEST_IDS.headlineLabel}>
              {resolvedLabel}
            </span>
          </span>
        )}
        {durationSegments.length > 0 && (
          <span className={styles.duration} data-test-id={TEST_IDS.headlineDuration}>
            {durationSegments.map(segment => (
              <span key={segment.unit} className={styles.durationSegment}>
                <span>{segment.value}</span>
                <span>{t(DURATION_UNIT_MESSAGE[segment.unit])}</span>
              </span>
            ))}
          </span>
        )}
        {showChevron && (
          <AiButtonChevron
            className={styles.chevron}
            opened={opened}
            aria-controls={ariaControls}
            onClick={() => onToggle?.(!opened)}
            data-test-id={TEST_IDS.headlineChevron}
          />
        )}
      </div>
      {broken && (
        <p className={styles.message} data-test-id={TEST_IDS.headlineMessage}>
          {resolvedBrokenMessage}
        </p>
      )}
    </div>
  );
}
