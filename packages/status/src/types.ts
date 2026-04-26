import { ValueOf } from '@ds/utils';

import { APPEARANCE, STATUS_INDICATOR_SIZE, STATUS_SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type StatusIndicatorSize = ValueOf<typeof STATUS_INDICATOR_SIZE>;

export type StatusSize = ValueOf<typeof STATUS_SIZE>;
