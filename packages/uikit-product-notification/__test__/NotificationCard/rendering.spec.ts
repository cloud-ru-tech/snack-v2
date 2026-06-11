import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('NotificationCard — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.card.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.card.title)).toBeVisible();
    await expect(getByTestId(TEST_IDS.card.date)).toBeVisible();
  });

  // Полный перебор appearance живёт в VisualMatrix; здесь — представительная пара,
  // чтобы подтвердить, что проп долетает до data-appearance.
  test('appearance propagates to data-appearance', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ appearance: APPEARANCE.Error }));
    await expect(getByTestId(TEST_IDS.card.root)).toHaveAttribute('data-appearance', APPEARANCE.Error);

    await gotoStory(buildStoryOptions({ appearance: APPEARANCE.Default }));
    await expect(getByTestId(TEST_IDS.card.root)).toHaveAttribute('data-appearance', APPEARANCE.Default);
  });

  test('unread=true → data-unread', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ unread: true }));
    await expect(getByTestId(TEST_IDS.card.root)).toHaveAttribute('data-unread', 'true');
    await expect(getByTestId(TEST_IDS.card.statusIndicator)).toBeVisible();
  });

  test('clickable → data-clickable and tabIndex=0', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.card.root);
    await expect(root).toHaveAttribute('data-clickable', 'true');
    await expect(root).toHaveAttribute('tabindex', '0');
  });
});
