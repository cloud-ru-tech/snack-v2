import { ValueOf } from '@ds/utils';

import { SIZE, VALIDATION_STATE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type ValidationState = ValueOf<typeof VALIDATION_STATE>;
