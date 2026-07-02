import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TREE_NAVIGATION_MODES, TREE_NAVIGATION_TEST_ID } from './helpers';

test.describe('TreeNavigation — rendering', () => {
  test('playground renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TREE_NAVIGATION_TEST_ID)).toBeVisible();
  });

  // Все режимы меню монтируются без ошибок.
  test.describe('mode', () => {
    for (const mode of TREE_NAVIGATION_MODES) {
      test(`renders root in ${mode}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ mode }));
        await expect(getByTestId(TREE_NAVIGATION_TEST_ID)).toBeVisible();
      });
    }
  });
});
