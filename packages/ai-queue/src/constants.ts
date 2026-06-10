import type { AiQueueLabels } from './types';

export const AI_QUEUE_STEP_STATE = {
  Planned: 'planned',
  Progress: 'progress',
  Done: 'done',
  Error: 'error',
} as const;

export const DEFAULT_LABELS: AiQueueLabels = {
  tasks: 'задач',
  planned: 'запланировано',
  inProgress: 'в процессе',
  done: 'готово',
};

export const TEST_IDS = {
  root: 'ai-queue',
  trigger: 'ai-queue__trigger',
  summary: 'ai-queue__summary',
  content: 'ai-queue__content',
  step: 'ai-queue__step',
} as const;
