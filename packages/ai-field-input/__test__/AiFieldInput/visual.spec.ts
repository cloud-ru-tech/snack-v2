import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { AI_FIELD_INPUT_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldInput — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_INPUT_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, { target: getByTestId(TEST_IDS.model) });
  });

  test('open slash commands', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAttachments: false, showScrollButton: false }));
    await waitForFonts();
    await getByTestId(TEST_IDS.editor).click();
    await page.keyboard.type('/');
    await expect(getByTestId(TEST_IDS.actionList)).toBeVisible();
    await page.mouse.move(0, 0);

    const png = await screenshotRegion(
      page,
      [getByTestId(TEST_IDS.root), getByTestId(TEST_IDS.actionList)],
      16,
      SCREENSHOT_DEFAULT_OPTS,
    );
    expect(png).toMatchSnapshot('open-slash-commands.png');
  });
});
