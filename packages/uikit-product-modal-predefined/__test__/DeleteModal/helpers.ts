import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const STORY_TEST_IDS = {
  triggerOpen: 'delete-modal-story__trigger-open',
} as const;

export const DELETE_MODAL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const VM_TRIGGER_TEST_ID = (state: string) => `delete-modal-vm__${state}`;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'modalpredefined',
  storyName: 'deletemodal',
  testId: TEST_IDS.deleteModal,
});

export function buildStoryOptions(props?: Record<string, unknown>, story: string = DELETE_MODAL_STORIES.playground) {
  return buildStoryOptionsBase(props ?? {}, story);
}
