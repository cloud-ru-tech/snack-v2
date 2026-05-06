import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, CARD_INTERACTION_VISUAL_CASES, CARD_STORIES, CARD_TEST_ID } from './helpers';

test.describe('Card — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('visual background-predefined', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_STORIES.visualBackgroundPredefined));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'visual-background-predefined.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test.describe('interaction (Playground)', () => {
    for (const { name, action } of CARD_INTERACTION_VISUAL_CASES) {
      test(action, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ children: 'Card' }));
        await waitForFonts(page);

        const card = getByTestId(CARD_TEST_ID);

        if (action === 'hover') {
          await card.hover();
        } else {
          await card.focus();
        }

        await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(name, SCREENSHOT_DEFAULT_OPTS);
      });
    }
  });
});
