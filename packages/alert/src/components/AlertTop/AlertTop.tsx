import { WithSupportProps } from '@ds/utils';

import { AlertBase, AlertSharedFieldProps } from '../AlertBase';

export type AlertTopProps = WithSupportProps<AlertSharedFieldProps>;

export function AlertTop(props: AlertTopProps) {
  return <AlertBase {...props} variant='top' />;
}
