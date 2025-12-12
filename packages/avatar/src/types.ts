import { APPEARANCE, SHAPE, SIZE } from './constants';

export type Appearance = (typeof APPEARANCE)[keyof typeof APPEARANCE];
export type Size = (typeof SIZE)[keyof typeof SIZE];
export type Shape = (typeof SHAPE)[keyof typeof SHAPE];


