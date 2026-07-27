import { ValueOf } from '@ds/utils';

import { APPEARANCE, FOCUS_APPEARANCE, FOCUS_POSITION, LEVEL, STATE } from './constants';

export type { BackgroundPredefinedFill } from '../src';
export type Appearance = ValueOf<typeof APPEARANCE>;
export type FocusAppearance = ValueOf<typeof FOCUS_APPEARANCE>;
export type FocusPosition = ValueOf<typeof FOCUS_POSITION>;
export type Level = ValueOf<typeof LEVEL>;
export type State = ValueOf<typeof STATE>;
