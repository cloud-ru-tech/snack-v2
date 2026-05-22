import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TABS_STORIES, TEST_IDS } from './helpers';

test.describe('Tabs — rendering', () => {
  test('playground renders bar + tabs + active panel', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
    await expect(getByTestId(TEST_IDS.tabBar.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tab.overview)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tab.settings)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tab.billing)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tabContent.overview)).toBeVisible();
  });

  test('visual-matrix renders', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.visualMatrix));
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeVisible();
  });

  test.describe('ARIA roles', () => {
    test('bar exposes role=tablist', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
      await expect(getByTestId(TEST_IDS.tabBar.root)).toHaveAttribute('role', 'tablist');
    });

    test('tab exposes role=tab', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
      await expect(getByTestId(TEST_IDS.tab.overview)).toHaveAttribute('role', 'tab');
    });

    test('active tab has aria-selected=true, inactive false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
      await expect(getByTestId(TEST_IDS.tab.overview)).toHaveAttribute('aria-selected', 'true');
      await expect(getByTestId(TEST_IDS.tab.settings)).toHaveAttribute('aria-selected', 'false');
    });

    test('active panel has role=tabpanel and is visible; inactive are hidden', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TABS_STORIES.playground));
      const panel = getByTestId(TEST_IDS.tabContent.overview);
      await expect(panel).toBeVisible();
      await expect(panel).toHaveAttribute('role', 'tabpanel');
      await expect(getByTestId(TEST_IDS.tabContent.settings)).toBeHidden();
      await expect(getByTestId(TEST_IDS.tabContent.billing)).toBeHidden();
    });
  });

  test('disabled tab exposes aria-disabled=true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.disabledTab));
    await expect(getByTestId(TEST_IDS.tab.billing)).toHaveAttribute('aria-disabled', 'true');
  });
});
