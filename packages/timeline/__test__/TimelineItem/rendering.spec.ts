import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('TimelineItem — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.timelineItem.root).first()).toBeVisible();
    });

    test('opposite slot rendered when showOpposite=true', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ showOpposite: true }));

      await expect(page.locator(`[data-test-id="${TEST_IDS.timelineItem.opposite}"]`).first()).toBeVisible();
    });
  });
});
