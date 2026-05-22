import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CRUMB_CLICK_HOLDER, TEST_IDS } from './helpers';

test.describe('Breadcrumbs — interaction', () => {
  test('handles clicks on intermediate crumbs', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ storyOnClick: true }));

    const crumbs = getByTestId(TEST_IDS.crumb);
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('');

    await crumbs.nth(0).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Литература');

    await crumbs.nth(1).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Стихи');

    await crumbs.nth(2).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Золотой век русской поэзии');
  });

  test('handles click on last item by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ storyOnClick: true }));

    await getByTestId(TEST_IDS.crumb).nth(5).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Парус');
  });

  test('inactiveLastItem disables last-item click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ storyOnClick: true, inactiveLastItem: true }));

    await getByTestId(TEST_IDS.crumb).nth(5).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('');
  });
});
