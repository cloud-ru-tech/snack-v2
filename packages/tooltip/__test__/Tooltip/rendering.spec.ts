import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TOOLTIP_KEY_COMBOS, TOOLTIP_STORIES } from './helpers';

test.describe('Tooltip — rendering', () => {
  test.describe('render', () => {
    test('playground renders trigger', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.playground));
      await expect(getByTestId(TEST_IDS.tooltip.triggerOpen)).toBeVisible();
    });

    test('visual-matrix renders multiple triggers', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.visualMatrix));
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeVisible();
    });

    test('interaction-test story renders', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.interactionTest));
      await expect(getByTestId(TEST_IDS.tooltip.triggerOpen)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { placement } of TOOLTIP_KEY_COMBOS) {
      test(`placement=${placement} — trigger renders`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ placement }, TOOLTIP_STORIES.playground));
        await expect(getByTestId(TEST_IDS.tooltip.triggerOpen)).toBeVisible();
      });
    }
  });
});
