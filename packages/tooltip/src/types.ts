import { PLACEMENT } from '@design-system/popover-private';
import { ValueOf } from '@design-system/utils';

import { SIZE } from './constants';

export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
export type Size = ValueOf<typeof SIZE>;
