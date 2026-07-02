import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, HEADLINE_STORIES, LONG_TITLE } from './helpers';

test.describe('Headline — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, HEADLINE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('truncateTitle clips long title within panel', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ truncateTitle: true, title: LONG_TITLE }));
    await waitForFonts();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('truncate-title.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
