import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import {
  BOTTOM_SHEET_HANDLE_TEST_ID,
  buildStoryOptions,
  MODAL_CUSTOM_TEST_ID,
  MODAL_CUSTOM_TRIGGER_TEST_ID,
} from './helpers';

test.describe('ModalCustom — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Desktop: composed modal во frame'е (Header/Body/Footer собираются вручную).
  test('open (desktop frame)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'desktop' }));
    await waitForFonts();
    await getByTestId(MODAL_CUSTOM_TRIGGER_TEST_ID).click();
    const root = getByTestId(MODAL_CUSTOM_TEST_ID);
    await expect(root).toBeVisible();
    await waitForStableBbox(root);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile: те же слоты авто-свапаются в BottomSheet (адаптивный surface). Форсим раскладку
  // тулбар-глобалом `layoutType='mobile'` + mobile viewport; снимок — весь viewport (full-overlay).
  test('open mobile (bottom sheet surface)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(MODAL_CUSTOM_TRIGGER_TEST_ID).click();
    const root = getByTestId(MODAL_CUSTOM_TEST_ID);
    await expect(root).toBeVisible();
    await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    await waitForStableBbox(root);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
