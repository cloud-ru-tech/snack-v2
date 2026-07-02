import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PAGE_SERVICES_LAYOUTS, PAGE_SERVICES_STORIES, PAGE_SERVICES_TEST_ID } from './helpers';

test.describe('PageServices — rendering', () => {
  test('playground renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(PAGE_SERVICES_TEST_ID)).toBeVisible();
  });

  // Обе раскладки монтируются (desktop → PageServices, mobile → MobilePageServices).
  test.describe('layoutType', () => {
    for (const layoutType of PAGE_SERVICES_LAYOUTS) {
      test(`renders root in ${layoutType}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(undefined, PAGE_SERVICES_STORIES.playground, { layoutType }));
        await expect(getByTestId(PAGE_SERVICES_TEST_ID)).toBeVisible();
      });
    }
  });
});
