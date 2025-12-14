import { APPEARANCE, SIZE, VARIANT } from './constants';

export type Appearance = (typeof APPEARANCE)[keyof typeof APPEARANCE];
export type Size = (typeof SIZE)[keyof typeof SIZE];
export type Variant = (typeof VARIANT)[keyof typeof VARIANT];
