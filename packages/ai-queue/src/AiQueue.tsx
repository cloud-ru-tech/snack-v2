import { AiButtonChevron } from '@ds/ai-button-chevron';
import { Scroll } from '@ds/scroll';
import { useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { ReactElement, useMemo } from 'react';

import { AiQueueStepStatus } from './AiQueueStepStatus';
import { DEFAULT_LABELS, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { AiQueueProps } from './types';
import { calculateSummary, resolveStepState } from './utils';

export function AiQueue({
  className,
  steps = [],
  summary,
  labels,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiQueueProps): ReactElement {
  const [open, setOpen] = useUncontrolledProp(openProp, defaultOpen, onOpenChange);

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const derivedSummary = useMemo(() => calculateSummary(steps), [steps]);
  const total = summary?.total ?? derivedSummary.total;
  const planned = summary?.planned ?? derivedSummary.planned;
  const progress = summary?.progress ?? derivedSummary.progress;
  const done = summary?.done ?? derivedSummary.done;

  return (
    <div {...rest} className={cn(styles.root, className)} data-open={open || undefined} data-test-id={dataTestId}>
      <button
        type='button'
        className={styles.trigger}
        aria-expanded={open}
        data-test-id={TEST_IDS.trigger}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.summary} data-test-id={TEST_IDS.summary}>
          <span>{total}</span>
          <span>{mergedLabels.tasks}</span>
          <span>(</span>
          <span>{planned}</span>
          <span>{mergedLabels.planned}</span>
          <span>/</span>
          <span>{progress}</span>
          <span>{mergedLabels.inProgress}</span>
          <span>/</span>
          <span>{done}</span>
          <span>{mergedLabels.done}</span>
          <span>)</span>
        </span>
        <AiButtonChevron opened={open} interactive={false} className={styles.chevron} />
      </button>

      {open && steps.length > 0 && (
        <Scroll size='s' barHideStrategy='leave' className={styles.content} data-test-id={TEST_IDS.content}>
          <div className={styles.steps}>
            {steps.map((step, index) => {
              const state = resolveStepState(step.state);

              return (
                <div
                  key={step.id ?? `${index}-${step.label}`}
                  className={styles.step}
                  data-state={state}
                  data-test-id={`${TEST_IDS.step}-${index}`}
                >
                  <span className={styles.stepStatus} aria-hidden>
                    <AiQueueStepStatus state={state} />
                  </span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </Scroll>
      )}
    </div>
  );
}
