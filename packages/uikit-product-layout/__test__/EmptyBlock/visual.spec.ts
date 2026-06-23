import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildEmptyBlockStoryOptions, EMPTY_BLOCK_STORIES } from './helpers';

test.describe('EmptyBlock — visual', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, `Baselines are ${VISUAL_BASELINE_PROJECT}-only`);
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildEmptyBlockStoryOptions(undefined, EMPTY_BLOCK_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
