import { AiButtonChevron } from '@ds/ai-button-chevron';
import { AiShimmer } from '@ds/ai-shimmer';
import cn from 'classnames';
import { ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { aiChainOfThoughtsLocale } from '../../locale';
import { AiChainOfThoughtsHeadlineProps } from '../../types';
import { DurationUnit, formatDuration } from '../../utils/duration';
import { HEADLINE_ICON_SIZE, resolveHeadlineIcon } from '../../utils/headlineIcon';
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
  icon,
  shimmer = true,
  brokenMessage,
  collapsible = false,
  open = false,
  onOpenChange,
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
  const showChevron = collapsible && Boolean(onOpenChange);
  const resolvedIcon = resolveHeadlineIcon(active, icon, styles.icon);
  const shimmerText = shimmer && active && typeof resolvedLabel === 'string' ? resolvedLabel : null;

  const durationNode =
    durationSegments.length > 0 ? (
      <span
        className={cn(styles.duration, shimmerText !== null && styles.durationInWave)}
        data-test-id={TEST_IDS.headlineDuration}
      >
        {durationSegments.map(segment => (
          <span key={segment.unit} className={styles.durationSegment}>
            <span>{segment.value}</span>
            <span>{t(DURATION_UNIT_MESSAGE[segment.unit])}</span>
          </span>
        ))}
      </span>
    ) : null;

  let statusLead: ReactNode;
  if (shimmerText !== null) {
    statusLead = (
      <>
        <AiShimmer
          className={styles.shimmer}
          text={shimmerText}
          icon={resolvedIcon}
          iconSize={HEADLINE_ICON_SIZE}
          slotAfter={durationNode}
          variant='body'
          size='s'
          weight='regular'
          data-test-id={TEST_IDS.headlineLabel}
        />
      </>
    );
  } else {
    statusLead = (
      <>
        {resolvedIcon != null && <span className={styles.iconSlot}>{resolvedIcon}</span>}
        <span className={styles.label} data-test-id={TEST_IDS.headlineLabel}>
          {resolvedLabel}
        </span>
        {durationNode}
      </>
    );
  }

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-in-progress={inProgress || undefined}
      data-broken={broken || undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.status}>
        {statusLead}
        {showChevron && (
          <AiButtonChevron
            className={styles.chevron}
            open={open}
            aria-controls={ariaControls}
            onClick={() => onOpenChange?.(!open)}
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
