import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  TITLE_CLICKABLE_INTERACTION_VISUAL_CASES,
  TITLE_CLICKABLE_STORIES,
  TITLE_CLICKABLE_TEST_ID,
} from './helpers';

test.describe('TitleClickable — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test.describe('interaction states', () => {
    for (const { name, action } of TITLE_CLICKABLE_INTERACTION_VISUAL_CASES) {
      test(`interaction — ${name}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions());
        await waitForFonts(page);

        const root = getByTestId(TITLE_CLICKABLE_TEST_ID);

        if (action === 'hover') {
          await root.hover();
        } else if (action === 'focus') {
          await page.keyboard.press('Tab');
          await expect(root).toBeFocused();
        }

        await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(name, SCREENSHOT_DEFAULT_OPTS);
      });
    }
  });
});
