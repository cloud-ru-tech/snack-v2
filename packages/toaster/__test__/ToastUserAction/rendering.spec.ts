import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, USER_ACTION_APPEARANCE_KEY_VALUES } from './helpers';

test.describe('ToastUserAction — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.userActionRoot)).toBeVisible();
  });

  test('renders label text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ label: 'Done' }));
    await expect(getByTestId(TEST_IDS.userActionRoot)).toContainText('Done');
  });

  // Параметризация по ключевой выборке appearance — по 1 представителю
  // neutral/success/error. Полный набор — в VisualMatrix.
  for (const appearance of USER_ACTION_APPEARANCE_KEY_VALUES) {
    test(`appearance=${appearance} propagates to data-appearance`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance }));
      await expect(getByTestId(TEST_IDS.userActionRoot)).toHaveAttribute('data-appearance', appearance);
    });
  }

  test('action slot is rendered when provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ action: 'labelOnly' }));
    await expect(getByTestId(TEST_IDS.userActionLink)).toBeVisible();
  });

  test('timer=true renders timer SVG ring', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ timer: true }));
    await expect(getByTestId(TEST_IDS.userActionTimer)).toBeVisible();
  });

  test('timer=false hides timer', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ timer: false }));
    await expect(getByTestId(TEST_IDS.userActionTimer)).toHaveCount(0);
  });
});
