import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { AI_BUTTON_CHEVRON_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiButtonChevron — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_BUTTON_CHEVRON_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    const target = page.getByTestId(TEST_IDS.root);
    await expect(target).toBeVisible();
    await assertInteractionStatesSnapshot(page, { target });
  });
});
