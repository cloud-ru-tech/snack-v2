import { expect, test } from '#playwright-tooling/fixtures';

import { buildNoAccessStoryOptions, NO_ACCESS_SERVICE_NAME_TEST_ID, NO_ACCESS_TEST_ID } from './helpers';

test.describe('NoAccess — rendering', () => {
  test('renders root', async ({ page, gotoStory }) => {
    await gotoStory(buildNoAccessStoryOptions());
    await expect(page.getByTestId(NO_ACCESS_TEST_ID)).toBeVisible();
  });

  test('renders serviceName slot when provided', async ({ page, gotoStory }) => {
    await gotoStory(buildNoAccessStoryOptions({ serviceName: 'My service' }));
    await expect(page.getByTestId(NO_ACCESS_SERVICE_NAME_TEST_ID)).toHaveText('My service');
  });

  test('mobile layout propagates to data-mobile', async ({ page, gotoStory }) => {
    await gotoStory(buildNoAccessStoryOptions(undefined, undefined, { layoutType: 'mobile' }));
    await expect(page.getByTestId(NO_ACCESS_TEST_ID)).toHaveAttribute('data-mobile', 'true');
  });

  test('desktop layout has no data-mobile', async ({ page, gotoStory }) => {
    await gotoStory(buildNoAccessStoryOptions(undefined, undefined, { layoutType: 'desktop' }));
    await expect(page.getByTestId(NO_ACCESS_TEST_ID)).not.toHaveAttribute('data-mobile', 'true');
  });
});
