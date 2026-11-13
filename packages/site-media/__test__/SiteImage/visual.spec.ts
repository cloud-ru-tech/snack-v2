import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForImages } from '#playwright-tooling/utils';

import { buildStoryOptions, STORIES } from './helpers';

test.describe('SiteImage — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, info) => {
    test.skip(info.project.name !== VISUAL_BASELINE_PROJECT, 'Chrome-only visual baselines');
  });
  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, STORIES.visualMatrix));
    await waitForFonts();
    await waitForImages(page);
    await assertVisualMatrixSnapshot(page);
  });
});
