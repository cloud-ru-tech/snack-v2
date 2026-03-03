import { Appearance, Level } from '../../types';
import { Square } from '../Square';
import styles from './styles.module.scss';

type SquareProps = {
  appearance: Appearance;
  level: Level;
};

export function MaterialSquare({ appearance, level }: SquareProps) {
  return (
    <Square className={styles.withAcrylic} data-acrylic-appearance={appearance} data-acrylic-level={level}>
      {/*<div data-acrylic-effect />*/}
      <div data-acrylic-background />
    </Square>
  );
}
