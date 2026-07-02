import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PAGE_FORM_LAYOUTS, PAGE_FORM_STORIES, PAGE_FORM_TEST_ID } from './helpers';

test.describe('PageForm — rendering', () => {
  test('playground renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(PAGE_FORM_TEST_ID)).toBeVisible();
  });

  // На mobile форма перестраивается (kebab «ещё» в шапке, footer с бюджетом и кнопками).
  test.describe('layoutType', () => {
    for (const layoutType of PAGE_FORM_LAYOUTS) {
      test(`renders root in ${layoutType}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(undefined, PAGE_FORM_STORIES.playground, { layoutType }));
        await expect(getByTestId(PAGE_FORM_TEST_ID)).toBeVisible();
      });
    }
  });
});
