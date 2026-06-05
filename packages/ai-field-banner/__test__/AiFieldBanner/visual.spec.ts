import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { AI_FIELD_BANNER_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldBanner — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix — type × size', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_BANNER_STORIES.visualMatrixTypeSize));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page, 'visual-matrix-type-size.png');
  });

  test('visual matrix — slots', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_BANNER_STORIES.visualMatrixSlots));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page, 'visual-matrix-slots.png');
  });

  test('action interaction states (default × hover × focus × pressed)', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_BANNER_STORIES.interactionTest));
    await waitForFonts();

    const root = page.getByTestId(TEST_IDS.root);
    const action = page.getByTestId(TEST_IDS.action);
    await expect(root).toBeVisible();
    await expect(action).toBeVisible();

    await assertInteractionStatesSnapshot(page, {
      target: root,
      hoverTarget: action,
      pressedTarget: action,
      includePressed: true,
      focusAction: async () => {
        await action.focus();
      },
    });
  });
});
