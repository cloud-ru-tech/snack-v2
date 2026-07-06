import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral assertions (ввод кода, backspace-навигация, onComplete, resend)
// живут в stories/FieldCode/tests/FieldCode.InteractionTest.stories.tsx::play.
// Все статические оси покрывает снимок FieldCode.VisualMatrix.

const KEY_SIZES = ['s', 'm', 'l'] as const;

test.describe('FieldCode — rendering', () => {
  test('renders with default props (codeLength cells)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldCode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldCodeCell)).toHaveCount(6);
  });

  for (const size of KEY_SIZES) {
    test(`size propagates to data-size: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.fieldCode)).toHaveAttribute('data-size', size);
    });
  }

  test('disabled propagates to data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldCode)).toHaveAttribute('data-disabled', 'true');
  });
});
