import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiChainOfThoughtsHeadline — rendering', () => {
  test('renders shimmer label, duration and chevron in progress', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-in-progress', 'true');
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
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

  test('collapsible=false renders no chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsible: false }));
    await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
  });

  test('broken adds the message and keeps shimmer label, duration and chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ broken: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-broken', 'true');
    await expect(getByTestId(TEST_IDS.message)).toBeVisible();
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.label)).toBeVisible();
    await expect(getByTestId(TEST_IDS.duration)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
  });
});
