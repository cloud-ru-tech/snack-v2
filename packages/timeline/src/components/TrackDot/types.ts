import { ValueOf } from '@ds/utils';

import { APPEARANCE, VARIANT } from './constants';

export type Variant = ValueOf<typeof VARIANT>;

export type Appearance = ValueOf<typeof APPEARANCE>;
