import { ValueOf } from '@design-system/utils';

import { PAGINATION_SIZE, PAGINATION_SLIDER_SIZE, VARIANT } from './constants';

export type PaginationSize = ValueOf<typeof PAGINATION_SIZE>;
export type PaginationSliderSize = ValueOf<typeof PAGINATION_SLIDER_SIZE>;
export type Variant = ValueOf<typeof VARIANT>;
