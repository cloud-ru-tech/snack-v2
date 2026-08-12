import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  MAIN_MENU_STORIES,
  NAVIGATION_SEARCH_TEST_IDS,
  NEW_NAVIGATION_BANNER_TEST_IDS,
  PLATFORM_SELECTOR_TEST_IDS,
  STORY_TEST_IDS,
  TEST_IDS,
} from './helpers';

test.describe('MainMenu — rendering', () => {
  test.describe('render', () => {
    test('renders trigger', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.trigger)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    test('desktop surface renders two-column drawer', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.playground, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.drawer)).toBeVisible();
      await expect(getByTestId(TEST_IDS.drawerMobile)).toHaveCount(0);
    });

    test('mobile surface renders left drawer shell', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.playground, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.drawerMobile)).toBeVisible();
      await expect(getByTestId(TEST_IDS.drawer)).toHaveCount(0);
    });
  });

  test.describe('drawer structure', () => {
    // Open/close + setOpen — в InteractionTest::play. Здесь только структура портала после открытия.
    test('opens with left/right columns and services', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.drawer)).toBeVisible();
      await expect(getByTestId(TEST_IDS.left)).toBeVisible();
      await expect(getByTestId(TEST_IDS.right)).toBeVisible();
      await expect(getByTestId(TEST_IDS.leftBottomItems)).toBeVisible();
      await expect(getByTestId(TEST_IDS.search)).toBeVisible();
      await expect(getByTestId(TEST_IDS.services)).toBeVisible();
    });

    test('hides optional slots when disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          showSidebarBottomSlot: false,
          showRightTop: false,
        }),
      );
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.drawer)).toBeVisible();
      await expect(getByTestId(TEST_IDS.search)).toBeVisible();
      await expect(getByTestId(TEST_IDS.services)).toBeVisible();
      await expect(getByTestId(TEST_IDS.banners)).toHaveCount(0);
    });
  });

  test.describe('mobile drawer structure', () => {
    test('opens left drawer without desktop columns', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.playground, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.drawerMobile)).toBeVisible();
      await expect(getByTestId(TEST_IDS.left)).toHaveCount(0);
      await expect(getByTestId(TEST_IDS.right)).toHaveCount(0);
      await expect(getByTestId(TEST_IDS.search)).toBeVisible();
      await expect(getByTestId(TEST_IDS.services)).toBeVisible();
    });

    test('renders setting items as cards', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.playground, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.drawerMobile)).toBeVisible();
      await expect(getByTestId(TEST_IDS.leftBottomItems)).toBeVisible();
      await expect(page.locator('[data-test-id^="header__drawer-menu__setting-"]').first()).toBeVisible();
    });

    test('stacks banners vertically', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.playground, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(TEST_IDS.banners)).toHaveAttribute('data-mobile', 'true');
    });
  });

  test.describe('withSampleContent composition', () => {
    test('mobile leftTop renders platform and project selectors', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.withSampleContent, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(PLATFORM_SELECTOR_TEST_IDS.root)).toBeVisible();
      await expect(getByTestId(STORY_TEST_IDS.projectSelector)).toBeVisible();
    });

    test('desktop leftTop renders platform selector only', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.withSampleContent, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(PLATFORM_SELECTOR_TEST_IDS.root)).toBeVisible();
      await expect(getByTestId(STORY_TEST_IDS.projectSelector)).toHaveCount(0);
    });

    test('mobile hides sidebarBottomSlot', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.withSampleContent, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(NEW_NAVIGATION_BANNER_TEST_IDS.root)).toHaveCount(0);
    });

    test('desktop renders sidebarBottomSlot in left column', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.withSampleContent, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(NEW_NAVIGATION_BANNER_TEST_IDS.root)).toBeVisible();
    });

    test('mobile search renders collapsed NavigationSearch', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.withSampleContent, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.trigger).click();
      await expect(getByTestId(NAVIGATION_SEARCH_TEST_IDS.root)).toHaveAttribute('data-mobile', 'true');
      await expect(getByTestId(NAVIGATION_SEARCH_TEST_IDS.title)).toBeVisible();
    });
  });
});
