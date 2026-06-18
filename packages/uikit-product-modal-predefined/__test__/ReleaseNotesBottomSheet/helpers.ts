import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const STORY_TEST_IDS = {
  triggerOpen: 'release-notes-bottom-sheet-story__trigger-open',
} as const;

export const RELEASE_NOTES_BOTTOM_SHEET_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const VM_TRIGGER_TEST_ID = (state: string) => `release-notes-bottom-sheet-vm__${state}`;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'modalpredefined',
  storyName: 'releasenotesbottomsheet',
  testId: TEST_IDS.releaseNotesBottomSheet,
});

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = RELEASE_NOTES_BOTTOM_SHEET_STORIES.playground,
) {
  return buildStoryOptionsBase(props ?? {}, story);
}
