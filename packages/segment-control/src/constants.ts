export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const WIDTH = {
  Auto: 'auto',
  Full: 'full',
} as const;

export const ICON_POSITION = {
  Before: 'before',
  After: 'after',
} as const;

export const TEST_IDS = {
  root: 'segment-control',
} as const;

export function segmentTestId(value: string | number): string {
  return `section-${value}`;
}
