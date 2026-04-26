import { WithSupportProps } from '@ds/utils';

import { AlertBase, AlertSharedFieldProps } from '../AlertBase';

export type AlertProps = WithSupportProps<
  AlertSharedFieldProps & {
    /** Внешний бордер */
    outline?: boolean;
  }
>;

export function Alert({ outline, ...props }: AlertProps) {
  return <AlertBase {...props} outline={outline} variant='inline' />;
}
