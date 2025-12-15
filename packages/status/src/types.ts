import { APPEARANCE, STATUS_INDICATOR_SIZE, STATUS_SIZE } from './constants';

export type Appearance = (typeof APPEARANCE)[keyof typeof APPEARANCE];
export type StatusIndicatorSize =
  (typeof STATUS_INDICATOR_SIZE)[keyof typeof STATUS_INDICATOR_SIZE];
export type StatusSize = (typeof STATUS_SIZE)[keyof typeof STATUS_SIZE];
