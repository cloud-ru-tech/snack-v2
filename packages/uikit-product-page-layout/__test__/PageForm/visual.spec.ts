import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForSettledInViewport } from '#playwright-tooling/utils';

import { buildStoryOptions, INTERNAL_TEST_IDS, PAGE_FORM_STORIES } from './helpers';

test.describe('PageForm — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // VisualMatrix покрывает desktop + mobile (kebab у правого края шапки, sticky-footer).
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, PAGE_FORM_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Mobile: строка price-summary открывает детализацию стоимости как BottomSheet (портал — VisualMatrix его не собирает).
  // layoutType='mobile' + mobile-viewport обязательны вместе; full-overlay → снимаем всю страницу.
  test('open-mobile (price summary bottom sheet)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, PAGE_FORM_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(INTERNAL_TEST_IDS.pageForm.priceSummaryTrigger).click();
    // data-test-id Dropdown'а на mobile оседает на корне BottomSheet'а.
    const sheet = getByTestId(INTERNAL_TEST_IDS.pageForm.priceSummarySheet);
    await expect(sheet).toBeVisible();
    await waitForSettledInViewport(sheet);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
