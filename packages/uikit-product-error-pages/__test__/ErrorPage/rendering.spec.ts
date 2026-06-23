import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, ERROR_PAGE_TEST_ID, TEST_IDS } from './helpers';

test.describe('ErrorPage — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(ERROR_PAGE_TEST_ID)).toBeVisible();
  });

  test('PageNotFound propagates status code 404', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ errorType: 'PageNotFound' }));
    await expect(getByTestId(TEST_IDS.statusCode)).toHaveText('404');
  });

  test('PageUnavailable propagates status code 403', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ errorType: 'PageUnavailable' }));
    await expect(getByTestId(TEST_IDS.statusCode)).toHaveText('403');
  });

  test('Offline has no status code tag', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ errorType: 'Offline' }));
    await expect(getByTestId(ERROR_PAGE_TEST_ID)).toBeVisible();
    await expect(getByTestId(TEST_IDS.statusCode)).toHaveCount(0);
  });

  test('support button hidden when showSupport is off', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showSupport: false }));
    await expect(getByTestId(TEST_IDS.mainButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.supportButton)).toHaveCount(0);
  });

  test('main button hidden when showMainButton is off', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showMainButton: false }));
    await expect(getByTestId(ERROR_PAGE_TEST_ID)).toBeVisible();
    await expect(getByTestId(TEST_IDS.mainButton)).toHaveCount(0);
  });
});
