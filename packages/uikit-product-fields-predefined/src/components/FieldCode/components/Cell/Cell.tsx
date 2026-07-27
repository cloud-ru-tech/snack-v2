import { FieldCombo, FieldComboProps } from '@ds/fields';
import cn from 'classnames';
import { forwardRef } from 'react';

import { TEST_IDS } from '../../../../constants';
import { ZERO_WIDTH_SPACE } from '../../constants';
import styles from './styles.module.scss';

type CellProps = {
  /** CSS-класс ячейки кода */
  className?: string;
  /** Растягивать ячейку на всю доступную ширину */
  stretchCells?: boolean;
} & Pick<
  FieldComboProps,
  'size' | 'disabled' | 'value' | 'autoComplete' | 'onKeyDown' | 'onPaste' | 'onChange' | 'validationState'
>;

export const Cell = forwardRef<HTMLInputElement, CellProps>(function Cell(props, ref) {
  const { className, size, stretchCells, value, ...fieldCellProps } = props;

  return (
    <FieldCombo
      inputMode='numeric'
      ref={ref}
      className={cn(styles.cell, stretchCells && styles.stretch, className)}
      data-size={size}
      data-test-id={TEST_IDS.fieldCodeCell}
      showClearButton={false}
      value={value === ZERO_WIDTH_SPACE ? '' : value}
      size={size}
      {...fieldCellProps}
    />
  );
});
