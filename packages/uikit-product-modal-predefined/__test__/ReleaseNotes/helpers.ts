import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const STORY_TEST_IDS = {
  triggerOpen: 'release-notes-story__trigger-open',
} as const;

export const RELEASE_NOTES_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const VM_TRIGGER_TEST_ID = (state: string) => `release-notes-vm__${state}`;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'modalpredefined',
  storyName: 'releasenotes',
  testId: TEST_IDS.releaseNotes,
});

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = RELEASE_NOTES_STORIES.playground,
  globals?: Record<string, unknown>,
) {
  return buildStoryOptionsBase(props ?? {}, story, globals);
}
