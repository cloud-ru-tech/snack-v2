import { WithSupportProps } from '@ds/utils';

import { ALIGN } from '../../constants';
import { AlertBase, AlertSharedFieldProps } from '../AlertBase';

export type AlertTopProps = WithSupportProps<AlertSharedFieldProps>;

export function AlertTop({ align: alignProp = ALIGN.Vertical, ...props }: AlertTopProps) {
  return <AlertBase {...props} align={alignProp} variant='top' />;
}
