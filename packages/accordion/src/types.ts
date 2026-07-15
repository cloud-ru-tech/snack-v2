import { ValueOf } from '@ds/utils';

import { CHEVRON_POSITION, SELECTION_MODE, VIEW } from './constants';

export type View = ValueOf<typeof VIEW>;

export type ChevronPosition = ValueOf<typeof CHEVRON_POSITION>;

export type SelectionMode = ValueOf<typeof SELECTION_MODE>;
