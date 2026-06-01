import { expect, test } from '#playwright-tooling/fixtures';

import { CHIP_CHOICE_ROW_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';
import { buildChipChoiceRowStory } from '../_shared/helpers';

test.describe('ChipChoiceRow — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceRowStory());
    await expect(getByTestId(TEST_IDS.chipChoiceRow.root)).toBeVisible();
  });

  test('add button is rendered by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceRowStory());
    await expect(getByTestId(CHIP_CHOICE_ROW_TEST_IDS.addButton)).toBeVisible();
  });

  test('add button is hidden when showAddButton=false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceRowStory({ showAddButton: false }));
    await expect(getByTestId(CHIP_CHOICE_ROW_TEST_IDS.addButton)).not.toBeVisible();
  });

  test('clear button is hidden when no filters applied', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceRowStory({ showClearButton: true }));
    await expect(getByTestId(CHIP_CHOICE_ROW_TEST_IDS.clearButton)).not.toBeVisible();
  });
});
