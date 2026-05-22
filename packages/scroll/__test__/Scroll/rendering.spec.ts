import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SCROLL_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Scroll — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { size, autoscrollTo } of SCROLL_KEY_COMBOS) {
      test(`size=${size} + autoscrollTo=${autoscrollTo}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, autoscrollTo }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-size', size);
      });
    }
  });
});
