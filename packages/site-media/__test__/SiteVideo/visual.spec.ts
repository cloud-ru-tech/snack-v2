import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot, waitForImages } from '#playwright-tooling/utils';

import { buildStoryOptions, STORIES, TEST_IDS } from './helpers';

test.describe('SiteVideo — visual regression', () => {
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
  test('interaction-states', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await waitForImages(page);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: getByTestId(TEST_IDS.playButton),
      includePressed: false,
    });
  });
});
