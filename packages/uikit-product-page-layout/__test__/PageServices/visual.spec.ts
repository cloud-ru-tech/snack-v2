import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, INTERNAL_TEST_IDS, LIST_MOBILE_DROPLIST_ROOT, PAGE_SERVICES_STORIES } from './helpers';

test.describe('PageServices — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // VisualMatrix покрывает desktop + mobile секции (full-bleed «Информация»-селект,
  // растянутый primary + kebab, стек карточек на mobile).
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, PAGE_SERVICES_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Mobile: строка-селект «Информация» открывает сайдбар как BottomSheet (портал — VisualMatrix его не собирает).
  // layoutType='mobile' + mobile-viewport обязательны вместе; full-overlay → снимаем всю страницу.
  test('open-mobile (sidebar bottom sheet)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, PAGE_SERVICES_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(INTERNAL_TEST_IDS.sidebarSelect.trigger).click();
    const sheet = getByTestId(LIST_MOBILE_DROPLIST_ROOT);
    await expect(sheet).toBeVisible();
    await waitForStableBbox(sheet);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
