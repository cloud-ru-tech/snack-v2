import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('DropTarget — rendering', () => {
  test('renders root with content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.dropTarget);
    await expect(root).toBeVisible();
    await expect(root).toContainText('ListItemGroup 1');
  });

  test('props propagation: active toggles the highlight attribute', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ active: true }));
    await expect(getByTestId(TEST_IDS.dropTarget)).toHaveAttribute('data-active', 'true');

    await gotoStory(buildStoryOptions({ active: false }));
    await expect(getByTestId(TEST_IDS.dropTarget)).not.toHaveAttribute('data-active');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-drop-target-class' }));

    await expect(getByTestId(TEST_IDS.dropTarget)).toHaveClass(/custom-drop-target-class/);
  });
});
