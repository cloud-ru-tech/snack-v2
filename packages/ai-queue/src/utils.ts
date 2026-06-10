import { AI_QUEUE_STEP_STATE } from './constants';
import { AiQueueStep, AiQueueSummary } from './types';

export function resolveStepState(state?: AiQueueStep['state']) {
  return state ?? AI_QUEUE_STEP_STATE.Planned;
}

export function calculateSummary(steps: AiQueueStep[]): Required<AiQueueSummary> {
  return steps.reduce<Required<AiQueueSummary>>(
    (acc, step) => {
      const state = resolveStepState(step.state);

      acc.total += 1;
      if (state === AI_QUEUE_STEP_STATE.Planned) {
        acc.planned += 1;
      }
      if (state === AI_QUEUE_STEP_STATE.Progress) {
        acc.progress += 1;
      }
      if (state === AI_QUEUE_STEP_STATE.Done) {
        acc.done += 1;
      }

      return acc;
    },
    {
      total: 0,
      planned: 0,
      progress: 0,
      done: 0,
    },
  );
}
