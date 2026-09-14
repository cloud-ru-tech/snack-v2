import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { AI_FIELD_REQUEST_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldRequest — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_REQUEST_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page, 'visual-matrix.png');
  });

  test('constrained height', async ({ gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_REQUEST_STORIES.constrainedHeight));
    await waitForFonts();
    await expect(getByTestId(TEST_IDS.constrainedParent)).toHaveScreenshot(
      'constrained-height.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test('primary action interaction states', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_REQUEST_STORIES.interactionTest));
    await waitForFonts();

    const root = page.getByTestId(TEST_IDS.root);
    const primary = page.getByTestId(TEST_IDS.primaryAction);
    await expect(root).toBeVisible();
    await expect(primary).toBeVisible();

    await assertInteractionStatesSnapshot(page, {
      target: root,
      hoverTarget: primary,
      pressedTarget: primary,
      includePressed: true,
      focusAction: async () => {
        await primary.focus();
      },
    });
  });
});
