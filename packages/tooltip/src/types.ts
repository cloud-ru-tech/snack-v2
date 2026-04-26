import { PLACEMENT } from '@ds/popover-private';

export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
