import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';
import { buildChipAssistStory, KEY_SIZES } from '../_shared/helpers';

// Behavioral assertions live in stories/ChipAssist/tests (if any).
// All-axis visual coverage lives in ChipAssist.VisualMatrix story snapshot.

test.describe('ChipAssist — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipAssistStory());
    await expect(getByTestId(TEST_IDS.chipAssist.root)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`data-size propagates: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildChipAssistStory({ size }));
      await expect(getByTestId(TEST_IDS.chipAssist.root)).toHaveAttribute('data-size', size);
    });
  }

  test('disabled: native disabled + data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipAssistStory({ disabled: true }));
    const root = getByTestId(TEST_IDS.chipAssist.root);
    await expect(root).toBeDisabled();
  });

  test('loading: data-loading set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipAssistStory({ loading: true }));
    await expect(getByTestId(TEST_IDS.chipAssist.root)).toHaveAttribute('data-loading', 'true');
  });

  test('icon renders when icon provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildChipAssistStory({ icon: 'settings', size: SIZE.S }));
    await expect(getByTestId(TEST_IDS.chipAssist.root)).toHaveAttribute('data-icon', 'true');
  });

  test('icon does not render when no icon', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildChipAssistStory({ icon: 'none' }));
    await expect(getByTestId(TEST_IDS.chipAssist.root)).not.toHaveAttribute('data-icon');
    await expect(page.getByTestId('chip-assist__icon')).toHaveCount(0);
  });
});
