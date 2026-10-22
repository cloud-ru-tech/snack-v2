import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiButtonControls — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const button = getByTestId(TEST_IDS.root);
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('data-direction', 'down');
  });

  test('props propagation', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const button = getByTestId(TEST_IDS.root);

    for (const direction of ['left', 'right'] as const) {
      await test.step(`direction=${direction}`, async () => {
        await setStoryArgs({ direction });
        await expect(button).toHaveAttribute('data-direction', direction);
      });
    }

    await test.step('disabled', async () => {
      await setStoryArgs({ disabled: true });
      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute('data-disabled', 'true');
    });
  });
});
