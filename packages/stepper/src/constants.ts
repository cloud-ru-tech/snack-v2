export const STEP_STATE = {
  Completed: 'completed',
  Current: 'current',
  Loading: 'loading',
  Waiting: 'waiting',
  Rejected: 'rejected',
} as const;

export const LAYOUT_TYPE = {
  Desktop: 'desktop',
  Mobile: 'mobile',
} as const;

export const TEST_IDS = {
  root: 'stepper',
  stepSuffix: '_element-step',
  tailSuffix: '_element-tail',
} as const;

/** Сборка test-id'а конкретного шага по root testId и индексу. */
export function getStepTestId(rootTestId: string): string {
  return `${rootTestId}${TEST_IDS.stepSuffix}`;
}

/** Сборка test-id'а tail-линии по root testId. */
export function getTailTestId(rootTestId: string): string {
  return `${rootTestId}${TEST_IDS.tailSuffix}`;
}
