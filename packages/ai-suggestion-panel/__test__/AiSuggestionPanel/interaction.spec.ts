import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiSuggestionPanel — interaction', () => {
  test('viewport resize moves questions in and out of «+N»', async ({ page, gotoStory, getByTestId }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoStory(buildStoryOptions());
    const items = getByTestId(TEST_IDS.item);
    const more = getByTestId(TEST_IDS.more);

    await expect(items.first()).toBeVisible();
    const wideCount = await items.count();

    await page.setViewportSize({ width: 600, height: 900 });
    await expect.poll(() => items.count()).toBeLessThan(wideCount);
    const narrowCount = await items.count();
    await expect(more).toHaveText(new RegExp(`^\\+\\d+$`));
    expect(narrowCount).toBeGreaterThanOrEqual(1);

    await page.setViewportSize({ width: 1440, height: 900 });
    await expect.poll(() => items.count()).toBe(wideCount);
  });

  test('click outside closes the «+N» list', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.more).click();
    await expect(getByTestId(TEST_IDS.moreListItem).first()).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(getByTestId(TEST_IDS.moreListItem)).toHaveCount(0);
  });
});
