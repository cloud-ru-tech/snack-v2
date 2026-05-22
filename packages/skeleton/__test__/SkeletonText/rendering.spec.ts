import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, KEY_COMBOS, SKELETON_TEXT_TEST_ID } from './helpers';

test.describe('SkeletonText — rendering', () => {
  test.describe('render', () => {
    test('renders skeleton text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(SKELETON_TEXT_TEST_ID)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, variant, align } of KEY_COMBOS) {
      test(`size=${size} + variant=${variant} + align=${align}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, variant, align }));

        const root = getByTestId(SKELETON_TEXT_TEST_ID);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-purpose', variant);
        await expect(root).toHaveAttribute('data-align', align);
      });
    }
  });
});
