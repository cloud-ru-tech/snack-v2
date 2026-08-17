import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiTool — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.status)).toBeVisible();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.connector)).toHaveCount(0);
  });

  test('state=loading propagates to data-state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ state: 'loading' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-state', 'loading');
    await expect(getByTestId(TEST_IDS.status)).toHaveAttribute('data-state', 'loading');
  });

  test('open=true reveals call and result details', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ open: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-open', 'true');
    await expect(getByTestId(TEST_IDS.call)).toBeVisible();
    await expect(getByTestId(TEST_IDS.result)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toHaveAttribute('aria-expanded', 'true');
  });

  test('state=error marks result details as error', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ state: 'error', open: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-state', 'error');
    await expect(getByTestId(TEST_IDS.status)).toHaveAttribute('data-state', 'error');
    await expect(getByTestId(TEST_IDS.result)).toHaveAttribute('data-state', 'error');
    await expect(getByTestId(TEST_IDS.call)).toHaveAttribute('data-state', 'default');
  });

  test('falsy call/result render no details blocks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ open: true, call: false, result: '' }));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.call)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.result)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
  });

  test('connector renders when requested', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ connector: true }));
    await expect(getByTestId(TEST_IDS.connector)).toHaveCount(1);
  });
});
