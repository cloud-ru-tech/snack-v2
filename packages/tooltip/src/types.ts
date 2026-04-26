import { PLACEMENT } from '@ds/popover-private';
import { ValueOf } from '@ds/utils';

import { SIZE } from './constants';

export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
export type Size = ValueOf<typeof SIZE>;
