import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('DragGhost — rendering', () => {
  test('renders root with content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.dragGhost);
    await expect(root).toBeVisible();
    await expect(root).toContainText('ListItem 2');
  });

  test('props propagation: dragging toggles the dimmed state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ dragging: true }));
    await expect(getByTestId(TEST_IDS.dragGhost)).toHaveAttribute('data-dragging', 'true');

    await gotoStory(buildStoryOptions({ dragging: false }));
    await expect(getByTestId(TEST_IDS.dragGhost)).not.toHaveAttribute('data-dragging');
  });

  test('props propagation: mode selects the drag pattern', async ({ gotoStory, getByTestId }) => {
    // В `dynamic` слот пустеет (`visibility: hidden`) — проверяется атрибут, а не видимость.
    await gotoStory(buildStoryOptions({ mode: 'dynamic' }));
    await expect(getByTestId(TEST_IDS.dragGhost)).toHaveAttribute('data-mode', 'dynamic');

    await gotoStory(buildStoryOptions({ mode: 'static' }));
    await expect(getByTestId(TEST_IDS.dragGhost)).toHaveAttribute('data-mode', 'static');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-drag-ghost-class' }));

    await expect(getByTestId(TEST_IDS.dragGhost)).toHaveClass(/custom-drag-ghost-class/);
  });
});
