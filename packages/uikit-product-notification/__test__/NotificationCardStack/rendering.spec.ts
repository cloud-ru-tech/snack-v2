import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('NotificationCardStack — rendering', () => {
  test('renders title, open button, and first card', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.panel.cardStack.title)).toBeVisible();
    await expect(getByTestId(TEST_IDS.panel.cardStack.openButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.card.title).first()).toBeVisible();
  });

  test('title button has aria-expanded=false by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.panel.cardStack.openButton)).toHaveAttribute('aria-expanded', 'false');
  });

  test('defaultOpen=true → aria-expanded=true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultOpen: true }));
    await expect(getByTestId(TEST_IDS.panel.cardStack.openButton)).toHaveAttribute('aria-expanded', 'true');
  });
});
