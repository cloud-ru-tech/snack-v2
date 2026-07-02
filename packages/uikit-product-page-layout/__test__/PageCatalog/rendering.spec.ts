import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PAGE_CATALOG_LAYOUTS, PAGE_CATALOG_STORIES, PAGE_CATALOG_TEST_ID } from './helpers';

test.describe('PageCatalog — rendering', () => {
  test('playground renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(PAGE_CATALOG_TEST_ID)).toBeVisible();
  });

  test.describe('layoutType', () => {
    for (const layoutType of PAGE_CATALOG_LAYOUTS) {
      test(`renders root in ${layoutType}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(undefined, PAGE_CATALOG_STORIES.playground, { layoutType }));
        await expect(getByTestId(PAGE_CATALOG_TEST_ID)).toBeVisible();
      });
    }
  });
});
