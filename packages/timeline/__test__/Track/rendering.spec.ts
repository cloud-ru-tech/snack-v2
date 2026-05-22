import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Track — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.track.root).first()).toBeVisible();
    });

    test('renders dot', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions());

      await expect(page.locator(`[data-test-id="${TEST_IDS.track.dot}"]`).first()).toBeVisible();
    });
  });
});
