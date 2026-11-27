import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { ACTIONS_STORIES, buildStoryOptions } from './helpers';

test('Actions visual matrix', async ({ page, gotoStory, waitForFonts }, testInfo) => {
  test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT);
  await gotoStory(buildStoryOptions(undefined, ACTIONS_STORIES.visualMatrix));
  await waitForFonts();
  await assertVisualMatrixSnapshot(page);
});
