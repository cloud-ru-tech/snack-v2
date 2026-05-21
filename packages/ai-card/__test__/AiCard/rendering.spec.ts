import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiCard — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders title and content text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ title: 'Hello world', children: 'Body text' }));
    const card = getByTestId(TEST_IDS.root);
    await expect(card).toContainText('Hello world');
    await expect(card).toContainText('Body text');
  });

  test('omits title slot when title is empty string, content survives', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ title: '', children: 'Body text' }));
    await expect(getByTestId(TEST_IDS.title)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.content)).toHaveText('Body text');
  });

  test('checked → data-checked + aria-pressed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ checked: true }));
    const card = getByTestId(TEST_IDS.root);
    await expect(card).toHaveAttribute('data-checked', 'true');
    await expect(card).toHaveAttribute('aria-pressed', 'true');
  });

  test('disabled → native disabled + data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    const card = getByTestId(TEST_IDS.root);
    await expect(card).toBeDisabled();
    await expect(card).toHaveAttribute('data-disabled', 'true');
  });
});
