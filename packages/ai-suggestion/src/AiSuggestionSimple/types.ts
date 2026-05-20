import { ValueOf } from '@ds/utils';

import { APPEARANCE, LAYER_STATE, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;
export type Appearance = ValueOf<typeof APPEARANCE>;
export type LayerState = ValueOf<typeof LAYER_STATE>;
