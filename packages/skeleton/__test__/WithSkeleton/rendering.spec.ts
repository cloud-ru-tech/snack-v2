import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, WITH_SKELETON_WRAPPER_TEST_ID } from './helpers';

test.describe('WithSkeleton — rendering', () => {
  test.describe('render', () => {
    test('renders skeleton when loading=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true, skeletonVariant: 'text' }));

      await expect(getByTestId(WITH_SKELETON_WRAPPER_TEST_ID)).toBeVisible();
    });

    test('renders children when loading=false', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildStoryOptions({ loading: false, skeletonVariant: 'text' }));

      await expect(getByTestId(WITH_SKELETON_WRAPPER_TEST_ID)).toBeVisible();
      await expect(page.locator('text=Контент после загрузки')).toBeVisible();
    });
  });
});
