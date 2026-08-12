import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, LOGO_KEY_COMBOS, LOGO_STORIES, TEST_IDS } from './helpers';

test.describe('Logo — rendering', () => {
  test.describe('render', () => {
    test('renders root and icon', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      await expect(getByTestId(TEST_IDS.icon)).toBeVisible();
    });

    test('visual matrix mounts', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, LOGO_STORIES.visualMatrix));
      await expect(getByTestId(TEST_IDS.root).first()).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('loading sets data-loading', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-loading', 'true');
    });
  });

  test.describe('props propagation', () => {
    for (const { mode } of LOGO_KEY_COMBOS) {
      test(`mode=${mode}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ mode }));
        await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-mode', mode);
      });
    }
  });
});
