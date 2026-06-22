import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { AI_FIELD_NOTICE_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldNotice — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix — scenario × size', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_NOTICE_STORIES.visualMatrixScenarioSize));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page, 'visual-matrix-scenario-size.png');
  });

  test('action interaction states (default × hover × focus × pressed)', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_NOTICE_STORIES.interactionTest));
    await waitForFonts();

    const root = page.getByTestId(TEST_IDS.banner);
    const action = page.getByTestId(TEST_IDS.bannerAction);
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
