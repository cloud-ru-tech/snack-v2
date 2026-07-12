import { Typography } from '@ds/typography';
import cn from 'classnames';

import { STEP_STATE } from '../../constants';
import { StepViewData } from '../../types';
import { getTestIdBuilder } from '../../utils';
import { StepIcon } from '../StepIcon';
import styles from './styles.module.scss';

export type DesktopStepProps = {
  /** Скрыть хвост (соединительную линию) — для последнего шага */
  hideTailLine?: boolean;
  /** Данные шага для отображения */
  step: StepViewData;
  /** CSS-класс */
  className?: string;
  /** data-test-id */
  'data-test-id'?: string;
};

const getTailTestId = getTestIdBuilder('_element-tail');
const getStepTestId = getTestIdBuilder('_element-step');

export function DesktopStep({ step, className, 'data-test-id': testId, hideTailLine }: DesktopStepProps) {
  // hover/press state-layer есть только у кликабельных навигационных кружков —
  // completed (назад) и waiting (вперёд). Current/loading/rejected по макету не
  // реагируют на hover/press (активный/в процессе/ошибка — не цель навигации).
  // Focus-ring — у всех (это outline на кнопке, не зависит от state-layer).
  const hasStateLayer =
    step.state !== STEP_STATE.Current && step.state !== STEP_STATE.Rejected && step.state !== STEP_STATE.Loading;

  return (
    <div className={cn(styles.step, className)} data-state={step.state}>
      <div className={styles.track}>
        <button
          type='button'
          className={styles.statusContainer}
          onClick={step.onClick}
          disabled={!step.onClick}
          data-test-id={getStepTestId(testId)}
          data-state={step.state}
        >
          <span className={styles.stateLayer} data-state={hasStateLayer ? 'regularFilled' : undefined} aria-hidden />
          <StepIcon state={step.state} number={step.number} className={styles.icon} />
        </button>

        {!hideTailLine && (
          <div
            className={styles.tail}
            data-completed={step.state === STEP_STATE.Completed || undefined}
            data-test-id={getTailTestId(testId)}
          >
            <div className={styles.tailLine} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <Typography variant='body' size='m' as='div' className={styles.title}>
          {step.title}
        </Typography>

        {step.description && (
          <Typography variant='body' size='s' as='div' className={styles.description}>
            {step.description}
          </Typography>
        )}
      </div>
    </div>
  );
}
