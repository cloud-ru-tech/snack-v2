import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Block — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, variant } of KEY_COMBOS) {
      test(`size=${size}, variant=${variant}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, variant }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-variant', variant);
      });
    }
  });
});
