import { WithSupportProps } from '@design-system/utils';

import { AlertBase, type AlertSharedFieldProps } from '../AlertBase';

export type AlertTopProps = WithSupportProps<AlertSharedFieldProps>;

export function AlertTop(props: AlertTopProps) {
  return <AlertBase {...props} variant='top' />;
}
