import type { ValueOf } from '@design-system/utils';

import { APPEARANCE, VARIANT } from './constants';

export type Variant = ValueOf<typeof VARIANT>;

export type Appearance = ValueOf<typeof APPEARANCE>;
