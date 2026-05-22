import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, DROPDOWN_STORIES } from './helpers';

test.describe('Dropdown — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Dropdown — портал, контент рендерится вне #storybook-root. Снимаем всю страницу,
  // чтобы захватить panels с placement/states/content-shape — все они теперь живут в
  // VisualMatrix как StoryTable секции.
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, DROPDOWN_STORIES.visualMatrix));
    await waitForFonts();
    await expect(page).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
