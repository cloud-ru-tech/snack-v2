import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, QUOTA_WIDGET_CARD_STORIES, QUOTA_WIDGET_CARD_TEST_ID } from './helpers';

test.describe('QuotaWidgetCard — rendering', () => {
  test('renders quota name', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());
    await expect(page.getByTestId(QUOTA_WIDGET_CARD_TEST_ID)).toBeVisible();
  });

  test('data-exhausted when quota is exceeded (remains <= 0)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, QUOTA_WIDGET_CARD_STORIES.exhausted));
    await expect(getByTestId(QUOTA_WIDGET_CARD_TEST_ID)).toHaveAttribute('data-exhausted', 'true');

    await gotoStory(buildStoryOptions(undefined, QUOTA_WIDGET_CARD_STORIES.overuse));
    await expect(getByTestId(QUOTA_WIDGET_CARD_TEST_ID)).toHaveAttribute('data-exhausted', 'true');
  });
});
