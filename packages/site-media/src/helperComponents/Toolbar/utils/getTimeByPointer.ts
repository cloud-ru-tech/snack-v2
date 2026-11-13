import { TimelinePosition } from '../types';

export function getTimeByPointer(
  clientX: number,
  { left, width }: { left: number; width: number },
  duration: number,
): TimelinePosition {
  const ratio = width > 0 ? Math.min(1, Math.max(0, (clientX - left) / width)) : 0;

  return { time: ratio * duration, offset: ratio * width, width };
}
