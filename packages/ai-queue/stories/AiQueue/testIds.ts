import { TEST_IDS as COMPONENT_TEST_IDS } from '@ds/ai-queue';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  trigger: COMPONENT_TEST_IDS.trigger,
  summary: COMPONENT_TEST_IDS.summary,
  content: COMPONENT_TEST_IDS.content,
  step: COMPONENT_TEST_IDS.step,
} as const;

export function matrixCellTestId(state: string, variant: string) {
  return `${TEST_IDS.root}--${state}-${variant}`;
}
