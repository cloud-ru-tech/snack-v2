import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiChainOfThoughts — rendering', () => {
  test('renders headline with shimmer label, duration and chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultOpened: false }));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.headline)).toBeVisible();
    // В активном рассуждении иконка giga живёт внутри shimmer-подписи (без отдельного test-id).
    await expect(getByTestId(TEST_IDS.headlineLabel)).toBeVisible();
    await expect(getByTestId(TEST_IDS.headlineDuration)).toBeVisible();
    await expect(getByTestId(TEST_IDS.headlineChevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);
  });

  test('opened reveals content and marks the root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultOpened: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-opened', 'true');
    await expect(getByTestId(TEST_IDS.content)).toBeVisible();
    await expect(getByTestId(TEST_IDS.headlineChevron)).toHaveAttribute('aria-expanded', 'true');
  });

  test('inProgress=false drops the giga icon', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ inProgress: false }));
    await expect(getByTestId(TEST_IDS.headline)).not.toHaveAttribute('data-in-progress', 'true');
    await expect(getByTestId(TEST_IDS.headlineIcon)).toHaveCount(0);
  });

  test('broken shows the message, hides duration, chevron and content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ broken: true, defaultOpened: true }));
    await expect(getByTestId(TEST_IDS.headline)).toHaveAttribute('data-broken', 'true');
    await expect(getByTestId(TEST_IDS.headlineMessage)).toBeVisible();
    await expect(getByTestId(TEST_IDS.headlineDuration)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.headlineChevron)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);
  });

  test('children=none renders no chevron and no content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultOpened: true, children: 'none' }));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.headlineChevron)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);
  });
});
