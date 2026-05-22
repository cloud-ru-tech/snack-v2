import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TOOLTIP_STORIES } from './helpers';

test.describe('Tooltip — interaction', () => {
  test('hover trigger opens tooltip', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.playground));
    await getByTestId(TEST_IDS.tooltip.triggerOpen).hover();
    await expect(getByTestId(TEST_IDS.tooltip.content)).toBeVisible();
  });

  test('moving mouse away hides tooltip', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.playground));
    const trigger = getByTestId(TEST_IDS.tooltip.triggerOpen);
    await trigger.hover();
    await expect(getByTestId(TEST_IDS.tooltip.content)).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(getByTestId(TEST_IDS.tooltip.content)).toBeHidden();
  });
});
