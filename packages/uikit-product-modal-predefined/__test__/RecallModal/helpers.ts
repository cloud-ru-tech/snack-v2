import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const STORY_TEST_IDS = {
  triggerOpen: 'recall-modal-story__trigger-open',
} as const;

export const RECALL_MODAL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const VM_TRIGGER_TEST_ID = (state: string) => `recall-modal-vm__${state}`;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'modalpredefined',
  storyName: 'recallmodal',
  testId: TEST_IDS.recallModal,
});

export function buildStoryOptions(props?: Record<string, unknown>, story: string = RECALL_MODAL_STORIES.playground) {
  return buildStoryOptionsBase(props ?? {}, story);
}
