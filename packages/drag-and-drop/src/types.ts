import { ValueOf } from '@ds/utils';

import { DRAG_MODE, ORIENTATION, PLACEMENT } from './constants';

export type DragMode = ValueOf<typeof DRAG_MODE>;

export type Orientation = ValueOf<typeof ORIENTATION>;

export type Placement = ValueOf<typeof PLACEMENT>;
