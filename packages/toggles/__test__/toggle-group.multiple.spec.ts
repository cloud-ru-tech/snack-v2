import { expect, test } from '../../../playwright/fixtures';
import { buildToggleGroupStory } from './helpers';

test.describe('ToggleGroup — multiple selection', () => {
  test('clicking multiple items keeps all selected', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'multiple' }));

    await getByTestId('item-1').click();
    await getByTestId('item-3').click();

    await expect(getByTestId('item-1')).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId('item-3')).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId('item-2')).toHaveAttribute('data-checked', 'false');
  });

  test('clicking selected item removes from selection', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'multiple' }));

    await getByTestId('item-2').click();
    await expect(getByTestId('item-2')).toHaveAttribute('data-checked', 'true');
    await getByTestId('item-2').click();
    await expect(getByTestId('item-2')).toHaveAttribute('data-checked', 'false');
  });
});
