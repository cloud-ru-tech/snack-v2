import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE, LEVEL, STATE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;
export type Level = ValueOf<typeof LEVEL>;
export type State = ValueOf<typeof STATE>;
