import { DATE_MODE } from './constants';
import { FieldDateProps, FieldDateRangeProps } from './types';

/** Type-guard: режим выбора периода (range) против одиночной даты/даты-времени. */
export function isRange(props: FieldDateProps): props is FieldDateRangeProps {
  return props.mode === DATE_MODE.DateRange;
}
