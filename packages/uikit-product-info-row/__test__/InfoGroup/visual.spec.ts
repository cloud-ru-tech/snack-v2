import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildInfoGroupStoryOptions, INFO_GROUP_STORIES } from './helpers';

test.describe('InfoGroup — visual', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, `Baselines are ${VISUAL_BASELINE_PROJECT}-only`);
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildInfoGroupStoryOptions(undefined, INFO_GROUP_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
