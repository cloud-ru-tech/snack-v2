import { expect, test } from '../../../playwright/fixtures';
import { buildToggleGroupStory } from './helpers';

test.describe('ToggleGroup — single selection', () => {
  test('clicking item selects it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'single' }));

    await getByTestId('item-2').click();
    await expect(getByTestId('item-2')).toHaveAttribute('data-checked', 'true');
  });

  test('clicking another item replaces selection', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'single' }));

    await getByTestId('item-1').click();
    await expect(getByTestId('item-1')).toHaveAttribute('data-checked', 'true');

    await getByTestId('item-3').click();
    await expect(getByTestId('item-1')).toHaveAttribute('data-checked', 'false');
    await expect(getByTestId('item-3')).toHaveAttribute('data-checked', 'true');
  });

  test('clicking selected item deselects', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'single' }));

    await getByTestId('item-1').click();
    await expect(getByTestId('item-1')).toHaveAttribute('data-checked', 'true');

    await getByTestId('item-1').click();
    await expect(getByTestId('item-1')).toHaveAttribute('data-checked', 'false');
  });
});
