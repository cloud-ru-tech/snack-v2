import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  PROGRESS_BAR_FILLER_TEST_ID,
  PROGRESS_BAR_KEY_COMBOS,
  PROGRESS_BAR_TEST_ID,
} from './helpers';

test.describe('ProgressBar — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(PROGRESS_BAR_TEST_ID)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { size, appearance } of PROGRESS_BAR_KEY_COMBOS) {
      test(`size=${size} + appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, appearance }));

        await expect(getByTestId(PROGRESS_BAR_TEST_ID)).toHaveAttribute('data-size', size);
        await expect(getByTestId(PROGRESS_BAR_FILLER_TEST_ID)).toHaveAttribute('data-appearance', appearance);
      });
    }
  });
});
