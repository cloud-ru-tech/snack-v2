import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiButtonClose — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const button = getByTestId(TEST_IDS.root);
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('data-size', 's');
    await expect(button).not.toHaveAttribute('data-outline');
  });

  test('props propagation', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const button = getByTestId(TEST_IDS.root);

    await test.step('size=xs + outline', async () => {
      await setStoryArgs({ size: 'xs', outline: true });
      await expect(button).toHaveAttribute('data-size', 'xs');
      await expect(button).toHaveAttribute('data-outline', 'true');
    });

    await test.step('size=m without outline', async () => {
      await setStoryArgs({ size: 'm', outline: false });
      await expect(button).toHaveAttribute('data-size', 'm');
      await expect(button).not.toHaveAttribute('data-outline');
    });

    await test.step('disabled', async () => {
      await setStoryArgs({ disabled: true });
      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute('data-disabled', 'true');
    });
  });
});
