import { CONTROLS_VISIBILITY } from './constants';

export type ControlsVisibility = (typeof CONTROLS_VISIBILITY)[keyof typeof CONTROLS_VISIBILITY];
