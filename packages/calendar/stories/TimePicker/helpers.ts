import { TimeValue } from '../../src';

export function parseTimeFromStoryParts(
  h: number | undefined,
  m: number | undefined,
  s: number | undefined,
): TimeValue | undefined {
  if ([h, m, s].every(v => v === undefined)) {
    return undefined;
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
}
