import { ValueOf } from '@ds/utils';

import { ALIGN, APPEARANCE, BUTTON_SIZE, BUTTON_VARIANT, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;
export type Align = ValueOf<typeof ALIGN>;

export type ButtonSize = ValueOf<typeof BUTTON_SIZE>;
export type ButtonVariant = ValueOf<typeof BUTTON_VARIANT>;
