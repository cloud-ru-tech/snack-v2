import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('DragPreview — rendering', () => {
  test('renders root with content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.dragPreview);
    await expect(root).toBeVisible();
    await expect(root).toContainText('ListItem 2');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-drag-preview-class' }));

    await expect(getByTestId(TEST_IDS.dragPreview)).toHaveClass(/custom-drag-preview-class/);
  });

  test('declares the acrylic material of the layout', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    // Материал приходит из `backgroundPredefined: neutralBackground1Level` (макет `backgroundDragged`).
    const root = getByTestId(TEST_IDS.dragPreview);
    await expect(root).toHaveAttribute('data-acrylic-appearance', 'neutral');
    await expect(root).toHaveAttribute('data-acrylic-level', '1Level');
  });
});
