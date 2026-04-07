import { APPEARANCE, CHEVRON, SELECTION_MODE, VIEW } from './constants';

export type View = (typeof VIEW)[keyof typeof VIEW];

export type Chevron = (typeof CHEVRON)[keyof typeof CHEVRON];

export type Appearance = (typeof APPEARANCE)[keyof typeof APPEARANCE];

export type SelectionMode = (typeof SELECTION_MODE)[keyof typeof SELECTION_MODE];
