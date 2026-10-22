import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiAttachment — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('props propagation', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    await test.step('type=image, state=loading', async () => {
      await setStoryArgs({ type: 'image', state: 'loading' });
      await expect(root).toHaveAttribute('data-type', 'image');
      await expect(root).toHaveAttribute('data-state', 'loading');
      await expect(getByTestId(TEST_IDS.loader)).toBeVisible();
    });

    await test.step('type=file, state=error shows retry', async () => {
      await setStoryArgs({ type: 'file', state: 'error' });
      await expect(root).toHaveAttribute('data-state', 'error');
      await expect(getByTestId(TEST_IDS.retry)).toBeVisible();
    });
  });
});
