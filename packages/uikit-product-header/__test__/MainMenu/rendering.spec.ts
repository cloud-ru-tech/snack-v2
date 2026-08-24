import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/testIds';
import { buildMainMenuStoryOptions } from './helpers';

test.describe('MainMenu — rendering', () => {
  test('renders drawer trigger', async ({ page, gotoStory }) => {
    await gotoStory(buildMainMenuStoryOptions());
    await expect(page.getByTestId(TEST_IDS.mainMenu.drawerButton)).toBeVisible();
  });
});
