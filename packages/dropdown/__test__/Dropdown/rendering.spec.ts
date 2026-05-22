import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Dropdown — rendering', () => {
  test('renders trigger', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  });

  test('opens dropdown content on trigger click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ trigger: 'click' }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });
});
