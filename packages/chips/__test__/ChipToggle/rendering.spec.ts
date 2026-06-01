import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/testIds';
import { buildChipToggleStory, KEY_SIZES } from '../_shared/helpers';

test.describe('ChipToggle — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipToggleStory());
    await expect(getByTestId(TEST_IDS.chipToggle.root)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`data-size propagates: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildChipToggleStory({ size }));
      await expect(getByTestId(TEST_IDS.chipToggle.root)).toHaveAttribute('data-size', size);
    });
  }

  test('checked=true: data-checked set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipToggleStory({ checked: true }));
    await expect(getByTestId(TEST_IDS.chipToggle.root)).toHaveAttribute('data-checked', 'true');
  });

  test('disabled: data-disabled set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipToggleStory({ disabled: true }));
    await expect(getByTestId(TEST_IDS.chipToggle.root)).toHaveAttribute('data-disabled', 'true');
  });

  test('loading: data-loading set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipToggleStory({ loading: true }));
    await expect(getByTestId(TEST_IDS.chipToggle.root)).toHaveAttribute('data-loading', 'true');
  });
});
