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
    for (const { size, view } of KEY_COMBOS) {
      test(`size=${size}, view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, view }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-view', view);
      });
    }
  });
});
