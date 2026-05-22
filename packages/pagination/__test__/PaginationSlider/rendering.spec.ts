import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PAGINATION_SLIDER_TEST_ID } from './helpers';

test.describe('PaginationSlider — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(PAGINATION_SLIDER_TEST_ID)).toBeVisible();
  });
});
