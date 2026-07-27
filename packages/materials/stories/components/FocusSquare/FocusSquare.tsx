import { ButtonHTMLAttributes } from 'react';

import { FocusAppearance, FocusPosition } from '../../types';
import styles from './styles.module.scss';

export type FocusSquareProps = {
  appearance: FocusAppearance;
  position: FocusPosition;
  /** Показать рамку без клавиатурного фокуса — для визуальной матрицы. */
  static?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function FocusSquare({ appearance, position, static: isStatic, ...rest }: FocusSquareProps) {
  return (
    <button
      className={styles.focusSquare}
      data-focus-appearance={appearance}
      data-focus-position={position}
      data-static={isStatic || undefined}
      type='button'
      {...rest}
    />
  );
}
