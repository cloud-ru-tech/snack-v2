import { CheckSVG, CrossSVG } from '@ds/icons';
import { Sun } from '@ds/loader';
import { ReactNode } from 'react';

import { STEP_STATE } from '../../constants';
import { StepState, StepViewData } from '../../types';
import { getTestIdBuilder } from '../../utils';
import styles from './styles.module.scss';

export type MobileStepProps = {
  /** Данные шага для отображения */
  step: StepViewData;
  /** data-test-id */
  'data-test-id'?: string;
};

const getStepTestId = getTestIdBuilder('_element-step');

function getContent(state: StepState): ReactNode {
  switch (state) {
    case STEP_STATE.Completed:
      return <CheckSVG size={16} />;
    case STEP_STATE.Rejected:
      return <CrossSVG size={16} />;
    case STEP_STATE.Loading:
      return <Sun size='s' />;
    default:
      return null;
  }
}

export function MobileStep({ step, 'data-test-id': testId }: MobileStepProps) {
  return (
    <button
      type='button'
      className={styles.step}
      onClick={step.onClick}
      disabled={!step.onClick}
      data-test-id={getStepTestId(testId)}
      data-state={step.state}
    >
      <div className={styles.track} />
      <div className={styles.status}>{getContent(step.state)}</div>
    </button>
  );
}
