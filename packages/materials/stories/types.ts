import type { ValueOf } from '@ds/utils';

import { APPEARANCE, LEVEL, STATE } from './constants';

export type { BackgroundPredefinedFill } from '../src';
export type Appearance = ValueOf<typeof APPEARANCE>;
export type Level = ValueOf<typeof LEVEL>;
export type State = ValueOf<typeof STATE>;
