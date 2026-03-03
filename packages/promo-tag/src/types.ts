import { ValueOf } from '@design-system/utils';

import { APPEARANCE, ROLE_APPEARANCE, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type RoleAppearance = ValueOf<typeof ROLE_APPEARANCE>;
