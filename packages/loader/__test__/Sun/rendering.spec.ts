import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SUN_KEY_SIZES, TEST_IDS } from './helpers';

test.describe('Sun — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.sun.root)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of SUN_KEY_SIZES) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.sun.root)).toHaveAttribute('data-size', size);
      });
    }
  });
});
