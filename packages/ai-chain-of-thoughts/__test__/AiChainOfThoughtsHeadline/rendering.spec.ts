import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiChainOfThoughtsHeadline — rendering', () => {
  test('renders shimmer label, duration and chevron in progress', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-in-progress', 'true');
    // В активном рассуждении иконка и подпись отрисованы через `AiShimmer` (giga —
    // силуэт-маска без собственного test-id), отдельного `headlineIcon` нет.
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
    await expect(getByTestId(TEST_IDS.duration)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
  });

  test('broken shows static giga icon (no shimmer) with the label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ broken: true }));
    // Прерванный поток статичен: иконка giga рендерится напрямую (с test-id), без shimmer.
    await expect(getByTestId(TEST_IDS.icon)).toBeVisible();
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
  });

  test('inProgress=false drops the icon and keeps the label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ inProgress: false }));
    await expect(getByTestId(TEST_IDS.root)).not.toHaveAttribute('data-in-progress', 'true');
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
  });

  test('collapsible=false renders no chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsible: false }));
    await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
  });

  test('broken shows the message, hides duration and chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ broken: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-broken', 'true');
    await expect(getByTestId(TEST_IDS.message)).toBeVisible();
    await expect(getByTestId(TEST_IDS.duration)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
  });
});
