import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, INFO_BLOCK_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('InfoBlock — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders title and description', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.title)).toBeVisible();
      await expect(getByTestId(TEST_IDS.content)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, align } of INFO_BLOCK_KEY_COMBOS) {
      test(`size=${size} + align=${align}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, align }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-align', align);
      });
    }
  });
});
