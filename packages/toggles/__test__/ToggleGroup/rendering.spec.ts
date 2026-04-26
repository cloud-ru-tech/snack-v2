import { expect, test } from '../../../../playwright/fixtures';
import { buildToggleGroupStory } from '../_shared/helpers';

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

  test.describe('single selection', () => {
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

  test.describe('multiple selection', () => {
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
});
