import { ValueOf } from '@ds/utils';

import { APPEARANCE, ORIENTATION, VARIANT } from './constants';

export type DividerAppearance = ValueOf<typeof APPEARANCE>;

export type DividerVariant = ValueOf<typeof VARIANT>;

export type DividerOrientation = ValueOf<typeof ORIENTATION>;
