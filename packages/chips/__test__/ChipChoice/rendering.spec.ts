import { expect, test } from '#playwright-tooling/fixtures';

import { CHIP_CHOICE_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';
import { buildChipChoiceStory, KEY_SIZES } from '../_shared/helpers';

test.describe('ChipChoice — rendering', () => {
  test('renders with default props (Single)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceStory());
    await expect(getByTestId(TEST_IDS.chipChoice.root)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`data-size propagates: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildChipChoiceStory({ size }));
      await expect(getByTestId(TEST_IDS.chipChoice.root)).toHaveAttribute('data-size', size);
    });
  }

  test('disabled: data-disabled set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceStory({ disabled: true }));
    await expect(getByTestId(TEST_IDS.chipChoice.root)).toHaveAttribute('data-disabled', 'true');
  });

  test('loading: data-loading set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceStory({ loading: true }));
    await expect(getByTestId(TEST_IDS.chipChoice.root)).toHaveAttribute('data-loading', 'true');
  });

  test('label renders in chip', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceStory({ label: 'Status' }));
    await expect(getByTestId(CHIP_CHOICE_TEST_IDS.label)).toBeVisible();
  });

  test('clear button shown when value set and showButtonClear', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipChoiceStory({ value: 'opt1', showButtonClear: true }));
    await expect(getByTestId(CHIP_CHOICE_TEST_IDS.clearButton)).toBeVisible();
  });
});
