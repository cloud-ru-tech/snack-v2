import { LAYOUT_TYPE } from '@ds/adaptive';

import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
  STORYBOOK_ROOT_SELECTOR,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForStableBbox } from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  COMFORT_DENSITY_GLOBALS,
  TEST_IDS,
  TOOLBAR_COMPONENT_TEST_IDS,
  TOOLBAR_STORIES,
} from './helpers';

test.describe('Toolbar — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLBAR_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('open-more-actions (desktop droplist)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ showMoreActions: true }));
    await waitForFonts();
    await getByTestId(TOOLBAR_COMPONENT_TEST_IDS.moreActionsButton).click();
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.droplist)).toBeVisible();

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'open-more-actions.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test('open-mobile-more-actions (bottom sheet with overflow)', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildStoryOptions(
        {
          showRefresh: true,
          showMoreActions: true,
          showExtraSlot: true,
        },
        TOOLBAR_STORIES.playground,
        { ...COMFORT_DENSITY_GLOBALS, layoutType: LAYOUT_TYPE.Mobile },
      ),
    );
    await waitForFonts();
    await getByTestId(TOOLBAR_COMPONENT_TEST_IDS.moreActionsButton).click();
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshOption)).toBeVisible();
    await expect(getByTestId(`${TOOLBAR_COMPONENT_TEST_IDS.afterOption}__0`)).toBeVisible();
    // toBeVisible срабатывает уже на старте slide-up sheet'а — ждём остановки его bbox.
    await waitForStableBbox(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshOption));

    // Mobile-выпадашка (Droplist → BottomSheet) — full-viewport overlay: снимаем viewport, а не
    // `#storybook-root` (он выше мобильного вьюпорта → под sheet'ом зияет фон DemoPage).
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile-more-actions.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  test('open-mobile-bulk (BottomSheet without backdrop)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildStoryOptions({ 'data-test-id': TEST_IDS.mobile }, TOOLBAR_STORIES.mobile, {
        ...COMFORT_DENSITY_GLOBALS,
        layoutType: LAYOUT_TYPE.Mobile,
      }),
    );
    await waitForFonts();
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.mobileBulkActionsSheet)).toBeVisible();

    // Mobile bulk-actions — full-viewport BottomSheet overlay: снимаем viewport, а не `#storybook-root`
    // (он выше мобильного вьюпорта → под sheet'ом зияет фон DemoPage).
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile-bulk.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
