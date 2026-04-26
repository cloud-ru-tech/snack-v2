import { State } from '../../types';
import { Square } from '../Square';
import styles from './styles.module.scss';

type SquareProps = {
  state: State;
};

export function StateSquare({ state }: SquareProps) {
  return (
    <Square className={styles.withStateLayer}>
      <div className={styles.stateLayer} data-state={state} />
    </Square>
  );
}
