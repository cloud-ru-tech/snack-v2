import { expect, test } from '../../../playwright/fixtures';
import { buildToggleGroupStory } from './helpers';

test.describe('ToggleGroup — rendering', () => {
  test('renders all items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory());

    for (const id of ['1', '2', '3', '4']) {
      await expect(getByTestId(`item-${id}`)).toBeVisible();
    }
  });

  test('items start unchecked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory());

    await expect(getByTestId('item-1')).toHaveAttribute('data-checked', 'false');
  });
});
