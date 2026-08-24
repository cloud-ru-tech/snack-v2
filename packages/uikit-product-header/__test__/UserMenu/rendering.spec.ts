import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/testIds';
import { buildUserMenuStoryOptions } from './helpers';

test.describe('UserMenu — rendering', () => {
  test('renders trigger button', async ({ page, gotoStory }) => {
    await gotoStory(buildUserMenuStoryOptions());
    await expect(page.getByTestId(TEST_IDS.userMenu.button)).toBeVisible();
  });
});
