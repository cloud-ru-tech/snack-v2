import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CRUMB_CLICK_HOLDER, TEST_IDS } from './helpers';

test.describe('Breadcrumbs — keyboard', () => {
  test('Tab focuses first interactive crumb when rendered as links', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ storyUrl: true }));

    await page.keyboard.press('Tab');
    const firstCrumbAnchor = getByTestId(TEST_IDS.crumb).nth(0).locator('a');
    await expect(firstCrumbAnchor).toBeFocused();
  });

  test('Enter activates focused crumb onClick handler', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ storyOnClick: true, storyUrl: true }));

    // Prevent the anchor's default navigation so we can assert the onClick handler ran.
    await page.evaluate(() => {
      document.addEventListener('click', event => event.preventDefault(), true);
    });

    const firstCrumbAnchor = getByTestId(TEST_IDS.crumb).nth(0).locator('a');
    await firstCrumbAnchor.focus();
    await page.keyboard.press('Enter');
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Литература');
  });
});
