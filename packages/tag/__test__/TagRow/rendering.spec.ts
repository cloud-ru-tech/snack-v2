import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TAG_ROW_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('TagRow — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.tagRow.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size } of TAG_ROW_KEY_COMBOS) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        const root = getByTestId(TEST_IDS.tagRow.root);
        await expect(root).toBeVisible();
        // TagRow renders inner wrapper(s) with data-size; assert at least one is present.
        const sized = root.locator(`[data-size="${size}"]`).first();
        await expect(sized).toBeVisible();
      });
    }
  });
});
