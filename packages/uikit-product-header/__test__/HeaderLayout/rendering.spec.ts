import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/testIds';
import { buildHeaderLayoutStoryOptions } from './helpers';

test.describe('HeaderLayout — rendering', () => {
  test('renders root', async ({ page, gotoStory }) => {
    await gotoStory(buildHeaderLayoutStoryOptions());
    await expect(page.getByTestId(TEST_IDS.headerLayout.root)).toBeVisible();
  });
});
