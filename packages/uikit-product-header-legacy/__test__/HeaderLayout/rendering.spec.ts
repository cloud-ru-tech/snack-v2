import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, HEADER_LAYOUT_KEY_COMBOS, HEADER_LAYOUT_STORIES, TEST_IDS } from './helpers';

test.describe('HeaderLayout — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('visual matrix mounts', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, HEADER_LAYOUT_STORIES.visualMatrix));
      await expect(getByTestId(TEST_IDS.root).first()).toBeVisible();
    });
  });

  test.describe('states', () => {
    for (const { isMobile } of HEADER_LAYOUT_KEY_COMBOS) {
      test(`isMobile=${isMobile}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ isMobile }));
        await expect(getByTestId(TEST_IDS.root)).toBeVisible();

        if (isMobile) {
          await expect(page.getByTestId('breadcrumbs-mobile')).toBeVisible();
          await expect(page.getByTestId('project-select')).toHaveCount(0);
        } else {
          await expect(page.getByTestId('breadcrumbs')).toBeVisible();
          await expect(page.getByTestId('project-select')).toBeVisible();
        }
      });
    }
  });
});
