import { CheckSVG, CrossSVG } from '@ds/icons';
import { Sun } from '@ds/loader';
import { Typography } from '@ds/typography';
import cn from 'classnames';
import { ReactNode, useMemo } from 'react';

import { STEP_STATE } from '../../constants';
import { StepState } from '../../types';
import styles from './styles.module.scss';

export type StepIconProps = {
  /** Состояние шага */
  state: StepState;
  /** Порядковый номер шага (1-based) */
  number: number;
  /** CSS-класс */
  className?: string;
};

function getContent(state: StepState, number: number): ReactNode {
  switch (state) {
    case STEP_STATE.Completed:
      return <CheckSVG size={16} />;
    case STEP_STATE.Rejected:
      return <CrossSVG size={16} />;
    case STEP_STATE.Loading:
      return <Sun size='s' />;
    default:
      return number;
  }
}

export function StepIcon({ state, number, className }: StepIconProps) {
  const content = useMemo(() => getContent(state, number), [number, state]);

  return (
    <div data-state={state} className={cn(styles.icon, className)}>
      {typeof content === 'number' ? (
        <Typography variant='label' size='l' as='span'>
          {content}
        </Typography>
      ) : (
        content
      )}
    </div>
  );
}
