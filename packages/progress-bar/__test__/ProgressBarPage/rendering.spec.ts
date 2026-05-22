import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PROGRESS_BAR_PAGE_KEY_APPEARANCES, PROGRESS_BAR_PAGE_TEST_ID } from './helpers';

test.describe('ProgressBarPage — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(PROGRESS_BAR_PAGE_TEST_ID)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const appearance of PROGRESS_BAR_PAGE_KEY_APPEARANCES) {
      test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));

        const filler = getByTestId(PROGRESS_BAR_PAGE_TEST_ID).locator('[data-appearance]').first();
        await expect(filler).toHaveAttribute('data-appearance', appearance);
      });
    }
  });
});
