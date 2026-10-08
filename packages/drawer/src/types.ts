import { ValueOf } from '@ds/utils';

import { POSITION, RESIZABLE_MAX_FULL, WIDTH } from './constants';

export type Width = ValueOf<typeof WIDTH>;
export type Position = ValueOf<typeof POSITION>;
export type ResizableMax = number | typeof RESIZABLE_MAX_FULL;
