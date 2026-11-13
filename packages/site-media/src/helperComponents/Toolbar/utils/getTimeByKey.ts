import { SEEK_STEP } from '../../../constants';

export function getTimeByKey(key: string, currentTime: number, duration: number) {
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      return Math.max(0, currentTime - SEEK_STEP);
    case 'ArrowRight':
    case 'ArrowUp':
      return Math.min(duration, currentTime + SEEK_STEP);
    case 'Home':
      return 0;
    case 'End':
      return duration;
    default:
      return undefined;
  }
}
