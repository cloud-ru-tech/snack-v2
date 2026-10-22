import { CONTEXT_PROGRESS, CONTEXT_PROGRESS_THRESHOLDS } from '../constants';
import { ContextProgress } from '../types';

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

export function resolveContextProgress(value: number): ContextProgress {
  const percent = clampPercent(value);

  if (percent > CONTEXT_PROGRESS_THRESHOLDS.red) {
    return CONTEXT_PROGRESS.Red;
  }

  if (percent >= CONTEXT_PROGRESS_THRESHOLDS.orange) {
    return CONTEXT_PROGRESS.Orange;
  }

  return CONTEXT_PROGRESS.Green;
}
