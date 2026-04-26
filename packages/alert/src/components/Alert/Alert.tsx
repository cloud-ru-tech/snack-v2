import { WithSupportProps } from '@ds/utils';

import { ALIGN } from '../../constants';
import { AlertBase, AlertSharedFieldProps } from '../AlertBase';

export type AlertProps = WithSupportProps<
  AlertSharedFieldProps & {
    /** Внешний бордер */
    outline?: boolean;
  }
>;

export function Alert({ outline, align: alignProp = ALIGN.Vertical, ...props }: AlertProps) {
  return <AlertBase {...props} align={alignProp} outline={outline} variant='inline' />;
}
