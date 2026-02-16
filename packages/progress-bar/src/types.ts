import { ValueOf } from '@design-system/utils';

import { APPEARANCE, PROGRESS_BAR_CIRCLE_SIZE, PROGRESS_BAR_SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type ProgressBarSize = ValueOf<typeof PROGRESS_BAR_SIZE>;

export type ProgressBarCircleSize = ValueOf<typeof PROGRESS_BAR_CIRCLE_SIZE>;
