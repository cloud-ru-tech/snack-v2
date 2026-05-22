import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PROGRESS_BAR_CIRCLE_KEY_COMBOS, PROGRESS_BAR_CIRCLE_TEST_ID } from './helpers';

test.describe('ProgressBarCircle — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(PROGRESS_BAR_CIRCLE_TEST_ID)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { size, appearance } of PROGRESS_BAR_CIRCLE_KEY_COMBOS) {
      test(`size=${size} + appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, appearance }));

        const root = getByTestId(PROGRESS_BAR_CIRCLE_TEST_ID);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-appearance', appearance);
      });
    }
  });
});
