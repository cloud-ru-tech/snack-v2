import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiButtonChevron — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('closed by default → no data-opened, aria-expanded false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const button = getByTestId(TEST_IDS.root);
    await expect(button).not.toHaveAttribute('data-opened');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('opened → data-opened + aria-expanded true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ opened: true }));
    const button = getByTestId(TEST_IDS.root);
    await expect(button).toHaveAttribute('data-opened', 'true');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('disabled → native disabled + data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    const button = getByTestId(TEST_IDS.root);
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('data-disabled', 'true');
  });
});
