import { PLACEMENT } from '@design-system/popover-private';

export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
