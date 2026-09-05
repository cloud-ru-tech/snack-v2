import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiChainOfThoughtsHeadline — rendering', () => {
  test('renders integrated shimmer label, duration and chevron in progress', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-in-progress', 'true');
    // Иконка по умолчанию живёт внутри маски AiShimmer: в DOM есть, отдельным боксом не видна.
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(1);
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
    await expect(getByTestId(TEST_IDS.duration)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
  });

  test('inProgress=false drops the icon and keeps the label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ inProgress: false }));
    await expect(getByTestId(TEST_IDS.root)).not.toHaveAttribute('data-in-progress', 'true');
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
  });

  test('shimmer=false shows the default icon in the aligned icon slot', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ shimmer: false }));
    await expect(getByTestId(TEST_IDS.icon)).toBeVisible();
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
    await expect(getByTestId(TEST_IDS.duration)).toBeVisible();
  });

  test('collapsible=false renders no chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsible: false }));
    await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
  });

  test('broken adds the message and keeps integrated shimmer, duration and chevron', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ broken: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-broken', 'true');
    await expect(getByTestId(TEST_IDS.message)).toBeVisible();
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(1);
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
    await expect(getByTestId(TEST_IDS.duration)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
  });
});
