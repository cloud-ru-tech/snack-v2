import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { BLOCK_PREDEFINED_SIMPLE_STORIES, buildStoryOptions } from './helpers';

test.describe('BlockPredefinedSimple — visual regression', () => {
  test('visual matrix', async ({ page, gotoStory, waitForFonts }, testInfo) => {
    test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoStory(buildStoryOptions(undefined, BLOCK_PREDEFINED_SIMPLE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
