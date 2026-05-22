import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TABS_STORIES, TEST_IDS } from './helpers';

test.describe('Tabs — keyboard navigation (roving tabindex)', () => {
  test('Tab focuses active tab; ArrowRight moves focus forward', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.tab.overview)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(TEST_IDS.tab.settings)).toBeFocused();
  });

  test('ArrowLeft moves focus back', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await expect(getByTestId(TEST_IDS.tab.overview)).toBeFocused();
  });

  test('ArrowRight reaches last tab; ArrowLeft returns to first', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(TEST_IDS.tab.billing)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(getByTestId(TEST_IDS.tab.overview)).toBeFocused();
  });
});
