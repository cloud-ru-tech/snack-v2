import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SKELETON_TEST_ID } from './helpers';

test.describe('Skeleton — rendering', () => {
  test.describe('render', () => {
    test('renders skeleton when loading=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(SKELETON_TEST_ID)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    test('width/height/borderRadius applied as inline style', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true, width: 300, height: 40, borderRadius: 8 }));

      const root = getByTestId(SKELETON_TEST_ID);
      await expect(root).toHaveCSS('width', '300px');
      await expect(root).toHaveCSS('height', '40px');
      await expect(root).toHaveCSS('border-radius', '8px');
    });
  });
});
