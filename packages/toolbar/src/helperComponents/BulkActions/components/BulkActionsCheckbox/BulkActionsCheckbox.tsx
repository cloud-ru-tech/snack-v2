import { Checkbox } from '@ds/toggles';
import cn from 'classnames';

import { TEST_IDS } from '../../../../testIds';
import styles from './styles.module.scss';

type BulkActionsCheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  onCheck?(): void;
  className?: string;
};

function getCheckboxAriaChecked(checked?: boolean, indeterminate?: boolean): boolean | 'mixed' {
  if (indeterminate) {
    return 'mixed';
  }

  return Boolean(checked);
}

export function BulkActionsCheckbox({ checked, indeterminate, onCheck, className }: BulkActionsCheckboxProps) {
  return (
    <Checkbox
      size='xs'
      checked={checked}
      indeterminate={indeterminate}
      tabIndex={-1}
      data-test-id={TEST_IDS.checkbox}
      className={cn(styles.checkbox, className)}
      onClick={onCheck}
      aria-checked={getCheckboxAriaChecked(checked, indeterminate)}
    />
  );
}
