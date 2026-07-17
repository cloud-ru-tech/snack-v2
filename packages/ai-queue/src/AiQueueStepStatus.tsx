import { CheckSVG, CrossSVG } from '@ds/icons/interface/system';
import { Sun, SUN_SIZE } from '@ds/loader';
import cn from 'classnames';
import { ReactElement } from 'react';

import { AI_QUEUE_STEP_STATE } from './constants';
import styles from './styles.module.scss';
import { AiQueueStepState } from './types';

const STEP_STATUS_ICON_SIZE = 16;

type AiQueueStepStatusProps = {
  state: AiQueueStepState;
};

export function AiQueueStepStatus({ state }: AiQueueStepStatusProps): ReactElement {
  switch (state) {
    case AI_QUEUE_STEP_STATE.Done:
      return <CheckSVG size={STEP_STATUS_ICON_SIZE} className={cn(styles.stepStatusIcon, styles.stepStatusSuccess)} />;
    case AI_QUEUE_STEP_STATE.Error:
      return <CrossSVG size={STEP_STATUS_ICON_SIZE} className={cn(styles.stepStatusIcon, styles.stepStatusError)} />;
    case AI_QUEUE_STEP_STATE.Progress:
      return <Sun size={SUN_SIZE.XS} className={cn(styles.stepStatusIcon, styles.stepStatusProgress)} />;
    default:
      return <span className={styles.stepStatusPending} />;
  }
}
