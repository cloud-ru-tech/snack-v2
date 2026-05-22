import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, KEY_APPEARANCES, TEST_IDS } from './helpers';

test.describe('AlertTop — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.alertTop.root)).toBeVisible();
    });

    test('has data-variant=top', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.alertTop.root)).toHaveAttribute('data-variant', 'top');
    });
  });

  test.describe('props propagation', () => {
    test('appearance propagation covers all key values', async ({ gotoStory, getByTestId }) => {
      for (const appearance of KEY_APPEARANCES) {
        await gotoStory(buildStoryOptions({ appearance }));

        await expect(getByTestId(TEST_IDS.alertTop.root)).toHaveAttribute('data-appearance', appearance);
      }
    });
  });
});
