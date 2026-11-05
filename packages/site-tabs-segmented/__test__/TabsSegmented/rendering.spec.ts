import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, itemTestId, TEST_IDS } from './helpers';

test.describe('TabsSegmented — rendering', () => {
  test('renders tablist with the first item selected', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'tablist');
    await expect(getByTestId(itemTestId('infrastructure'))).toHaveAttribute('aria-selected', 'true');
  });

  test('props propagate to data-*', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    for (const { size, appearance, wrap } of [
      { size: 's', appearance: 'default', wrap: true },
      { size: 'l', appearance: 'onAccent', wrap: false },
    ]) {
      await test.step(`${size} + ${appearance} + wrap=${wrap}`, async () => {
        await setStoryArgs({ size, appearance, wrap });
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-appearance', appearance);
        if (wrap) {
          await expect(root).toHaveAttribute('data-wrap');
        } else {
          await expect(root).not.toHaveAttribute('data-wrap');
        }
      });
    }
  });

  test('defaultValue selects the item', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultValue: 'ai' }));

    await expect(getByTestId(itemTestId('ai'))).toHaveAttribute('aria-selected', 'true');
    await expect(getByTestId(itemTestId('infrastructure'))).toHaveAttribute('aria-selected', 'false');
  });
});
