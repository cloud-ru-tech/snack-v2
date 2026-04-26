import { ValueOf } from '@ds/utils';

import { APPEARANCE, CHEVRON, SELECTION_MODE, VIEW } from './constants';

export type View = ValueOf<typeof VIEW>;

export type Chevron = ValueOf<typeof CHEVRON>;

export type Appearance = ValueOf<typeof APPEARANCE>;

export type SelectionMode = ValueOf<typeof SELECTION_MODE>;
