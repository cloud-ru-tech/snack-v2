import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const STORY_TEST_IDS = {
  triggerOpen: 'release-notes-modal-story__trigger-open',
} as const;

export const RELEASE_NOTES_MODAL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const VM_TRIGGER_TEST_ID = (state: string) => `release-notes-modal-vm__${state}`;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'modalpredefined',
  storyName: 'releasenotesmodal',
  testId: TEST_IDS.releaseNotesModal,
});

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = RELEASE_NOTES_MODAL_STORIES.playground,
) {
  return buildStoryOptionsBase(props ?? {}, story);
}
