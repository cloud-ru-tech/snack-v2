import { ValueOf } from '@ds/utils';

import { APPEARANCE, ROLE_APPEARANCE, SIZE, VARIANT } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;
export type Size = ValueOf<typeof SIZE>;
export type Variant = ValueOf<typeof VARIANT>;
export type RoleAppearance = ValueOf<typeof ROLE_APPEARANCE>;
