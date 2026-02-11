export function clamp(min: number, value: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}

export function getProgressBarAriaAttributes(progress: number) {
  return {
    role: 'progressbar',
    'aria-valuenow': progress,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
  };
}
