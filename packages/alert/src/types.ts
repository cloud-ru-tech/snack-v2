import type { ValueOf } from '@design-system/utils';

import { ALIGN, APPEARANCE, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;
export type Align = ValueOf<typeof ALIGN>;
