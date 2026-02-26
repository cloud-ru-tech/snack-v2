import { ValueOf } from '@design-system/utils';

import { ALIGN, SIZE, VARIANT } from './constants';

/** Роль типографики (соответствует anatomy в figma-variables) */
export type Variant = ValueOf<typeof VARIANT>;

/** Размер: s, m, l */
export type Size = ValueOf<typeof SIZE>;

/** Выравнивание: left, right */
export type Align = ValueOf<typeof ALIGN>;
